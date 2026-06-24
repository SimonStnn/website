import "@testing-library/jest-dom";

// Mock Next.js Image globally
jest.mock("next/image", () => ({
  __esModule: true,
  default: () => "mocked image",
}));

// Suppress expected console errors/warnings and fail on unexpected ones
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    const message = args.join(" ");
    if (
      !message.includes("Error parsing JSON for") &&
      !message.includes("Invalid JSON structure for") &&
      !message.includes("Error reading or parsing markdown for") &&
      !message.includes("Middleware error:") &&
      !message.includes("Invalid webhook URL:") &&
      !message.includes("In HTML, <div> cannot be a descendant of <p>")
    ) {
      throw new Error(`Unexpected console.error: ${message}`);
    }
    // Suppress expected errors by not calling original
  });

  jest.spyOn(console, "warn").mockImplementation((...args) => {
    const message = args.join(" ");
    if (!message.includes("Webhook URL must use HTTPS protocol for security")) {
      throw new Error(`Unexpected console.warn: ${message}`);
    }
    // Suppress expected warnings by not calling original
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
