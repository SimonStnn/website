import { NextRequest, NextResponse } from "next/server";
import { webhookConfig } from "@/middleware/config";
import { appConfig } from "@/lib/config";

export async function middleware(request: NextRequest) {
  // Add a response header to track that the request went through our middleware
  // Only in development to avoid leaking information in production
  const response = NextResponse.next();
  if (appConfig.isDevelopment) {
    response.headers.set("x-middleware-processed", "true");
  }

  // Skip webhook if disabled
  if (!webhookConfig.enabled) {
    return response;
  }

  // Collect headers that we want to include
  const headers: Record<string, string> = {};
  webhookConfig.includeHeaders.forEach((header) => {
    const value = request.headers.get(header);
    if (value) headers[header] = value;
  });
  try {
    // Skip if webhook URL is not set or invalid
    if (!webhookConfig.url) {
      console.warn("Webhook URL is not set, skipping webhook");
      return NextResponse.next();
    }

    // Validate webhook URL
    let webhookUrl: URL;
    try {
      webhookUrl = new URL(webhookConfig.url);
      // Only allow HTTPS in production
      if (appConfig.isProduction && webhookUrl.protocol !== "https:") {
        console.warn("Webhook URL must be HTTPS in production, skipping webhook");
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Invalid webhook URL:", error);
      return NextResponse.next();
    }

    // const queryParams = request.nextUrl.searchParams;
    // const headerEntries = request.headers;

    const content =
      `-# *${new Date().toLocaleDateString("nl-BE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Brussels",
      })}*\n` + `**\`${request.method.padStart(6)}\`**: \`${request.nextUrl.href}\`\n`;

    // Send request information to webhook
    await fetch(webhookConfig.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }).catch((error) => {
      // Log errors but don't block the request
      console.error("Error sending to webhook:", error);
    });
  } catch (e) {
    console.error("Middleware error:", e);
  }

  return response;
}

// Use a static configuration object for Next.js middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml).*)"],
};
