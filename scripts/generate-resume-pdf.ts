import { spawn, type ChildProcess } from "child_process";
import fs from "fs";
import path from "path";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer";

const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;
const CV_URL = `${BASE_URL}/resume`;
const OUTPUT_PATH = path.resolve("public/download/resume.pdf");

const SERVER_STARTUP_TIMEOUT = 30_000;
const POLL_INTERVAL = 500;

async function waitForServer(url: string, timeout: number): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }
  throw new Error(`Server did not start within ${timeout}ms`);
}

async function main() {
  let server: ChildProcess | null = null;

  try {
    // Standalone server requires static files and public dir alongside it
    const standaloneDir = path.resolve(".next/standalone");
    fs.cpSync(path.resolve(".next/static"), path.join(standaloneDir, ".next/static"), {
      recursive: true,
    });
    fs.cpSync(path.resolve("public"), path.join(standaloneDir, "public"), { recursive: true });

    console.log(`Starting Next.js server on port ${PORT}...`);

    server = spawn(process.execPath, [path.join(standaloneDir, "server.js")], {
      env: { ...process.env, PORT: String(PORT), HOSTNAME: "localhost" },
      stdio: "pipe",
    });

    server.stderr?.on("data", (data: Buffer) => {
      const msg = data.toString();
      if (!msg.includes("ExperimentalWarning")) {
        process.stderr.write(msg);
      }
    });

    await waitForServer(BASE_URL, SERVER_STARTUP_TIMEOUT);
    console.log("Server is ready.");

    // Resolve Chromium executable
    let executablePath: string | undefined;
    let extraArgs: string[] = [];
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      // Docker: system Chromium set explicitly
      executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    } else if (process.platform === "linux") {
      // Vercel/CI: @sparticuz/chromium bundles its own libs — avoids missing .so errors
      executablePath = await chromium.executablePath();
      extraArgs = chromium.args;
    }
    // else Windows/Mac local: use puppeteer's bundled Chromium (default)

    const browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: ["--no-sandbox", "--disable-setuid-sandbox", ...extraArgs],
    });
    const page = await browser.newPage();

    // Force light mode
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);

    console.log(`Navigating to ${CV_URL}...`);
    await page.goto(CV_URL, { waitUntil: "networkidle0", timeout: 30_000 });

    // Wait a bit for fonts/images to settle
    await new Promise((r) => setTimeout(r, 1000));

    console.log(`Generating PDF at ${OUTPUT_PATH}...`);
    await page.pdf({
      path: OUTPUT_PATH,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();
    console.log("PDF generated successfully.");
  } finally {
    if (server) {
      server.kill("SIGTERM");
    }
  }
}

main().catch((err) => {
  console.error("Failed to generate resume PDF:", err);
  process.exit(1);
});
