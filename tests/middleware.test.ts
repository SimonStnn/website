/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

// Mock Next.js
jest.mock("next/server", () => ({
  NextRequest: class {
    constructor(url: string, init?: any) {
      this.url = url;
      this.method = init?.method || "GET";
      this.headers = new Map(Object.entries(init?.headers || {}));
      this.nextUrl = { href: url, searchParams: new URLSearchParams() };
    }
    url: string;
    method: string;
    headers: Map<string, string>;
    nextUrl: { href: string; searchParams: URLSearchParams };
  },
  NextResponse: {
    next: () => {
      const headers = new Map();
      return {
        headers: {
          set: jest.fn((key: string, value: string) => headers.set(key, value)),
          get: jest.fn((key: string) => headers.get(key)),
        },
      };
    },
  },
}));

// Mock config
jest.mock("@/lib/config", () => ({
  appConfig: {
    isProduction: false,
    isDevelopment: true,
  },
}));

// Mock fetch
global.fetch = jest.fn(() => Promise.resolve());

describe("middleware", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset modules to re-evaluate mocks
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns a response", async () => {
    const { middleware } = await import("@/middleware");
    const request = new (await import("next/server")).NextRequest("https://example.com");
    const response = await middleware(request);
    expect(response).toHaveProperty("headers");
  });

  it("skips webhook when disabled", async () => {
    process.env.WEBHOOK_ENABLED = "false";
    jest.resetModules();
    const { middleware } = await import("@/middleware");
    const request = new (await import("next/server")).NextRequest("https://example.com");
    const response = await middleware(request);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(response.headers.get("x-middleware-processed")).toBe("true");
  });

  it("handles webhook errors gracefully", async () => {
    process.env.WEBHOOK_ENABLED = "true";
    process.env.WEBHOOK_URL = "https://webhook.example.com";
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { middleware } = await import("@/middleware");
    const request = new (await import("next/server")).NextRequest("https://example.com");
    const response = await middleware(request);

    expect(response).toBeDefined(); // Should not throw
  });

  it("includes request method and url in webhook", async () => {
    process.env.WEBHOOK_ENABLED = "true";
    process.env.WEBHOOK_URL = "https://webhook.example.com";
    const { middleware } = await import("@/middleware");
    const request = new (await import("next/server")).NextRequest("https://example.com/test", {
      method: "POST",
    });
    await middleware(request);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://webhook.example.com",
      expect.objectContaining({
        body: expect.stringContaining("POST"),
      })
    );
  });

  it("skips webhook when URL is invalid", async () => {
    process.env.WEBHOOK_ENABLED = "true";
    process.env.WEBHOOK_URL = "invalid-url";
    const { middleware } = await import("@/middleware");
    const request = new (await import("next/server")).NextRequest("https://example.com");
    const response = await middleware(request);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("skips webhook when URL is not HTTPS in production", async () => {
    process.env.WEBHOOK_ENABLED = "true";
    process.env.WEBHOOK_URL = "http://webhook.example.com";
    jest.doMock("@/lib/config", () => ({
      appConfig: {
        isProduction: true,
        isDevelopment: false,
      },
    }));
    const { middleware } = await import("@/middleware");
    const request = new (await import("next/server")).NextRequest("https://example.com");
    const response = await middleware(request);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("skips webhook when URL is not set", async () => {
    process.env.WEBHOOK_ENABLED = "true";
    delete process.env.WEBHOOK_URL;
    const { middleware } = await import("@/middleware");
    const request = new (await import("next/server")).NextRequest("https://example.com");
    const response = await middleware(request);

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
