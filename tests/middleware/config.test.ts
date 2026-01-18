import { webhookConfig } from "@/middleware/config";

/* eslint-disable @typescript-eslint/no-require-imports */

describe("webhookConfig", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset env
    process.env = { ...originalEnv };
    delete process.env.WEBHOOK_URL;
    delete process.env.WEBHOOK_ENABLED;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("enables when WEBHOOK_ENABLED is true", () => {
    process.env.WEBHOOK_ENABLED = "true";
    process.env.WEBHOOK_URL = "https://example.com";
    // Re-import to re-evaluate
    jest.resetModules();
    const { webhookConfig: config } = require("@/middleware/config");
    expect(config.enabled).toBe(true);
    expect(config.url).toBe("https://example.com");
  });

  it("disables if URL is not HTTPS", () => {
    process.env.WEBHOOK_ENABLED = "true";
    process.env.WEBHOOK_URL = "http://example.com";
    jest.resetModules();
    const { webhookConfig: config } = require("@/middleware/config");
    expect(config.url).toBeNull();
  });

  it("includes default headers", () => {
    expect(webhookConfig.includeHeaders).toEqual([
      "user-agent",
      "referer",
      "accept",
      "accept-language",
      "x-forwarded-for",
    ]);
  });
});
