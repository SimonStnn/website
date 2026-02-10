const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  // Start with a clean environment — only NODE_ENV is kept for Jest
  process.env = { NODE_ENV: "test" };
});

afterEach(() => {
  process.env = originalEnv;
});

describe("siteConfig", () => {
  it("uses hardcoded defaults when no env vars are set", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { siteConfig } = require("@/lib/config");

    expect(siteConfig.name).toBe("Simon Stijnen");
    expect(siteConfig.url).toBe("https://simon.stijnen.be");
    expect(siteConfig.description).toBe(
      "Software engineer and AI student in Belgium building scalable, reliable products."
    );
    expect(siteConfig.author.name).toBe("Simon Stijnen");
    expect(siteConfig.author.email).toBe("simon.stijnen.23+portfolio@gmail.com");
    expect(siteConfig.social.github).toBe("https://github.com/SimonStnn");
    expect(siteConfig.social.linkedin).toBe("https://www.linkedin.com/in/simon-stijnen/");
  });

  it("uses env var values when set", () => {
    process.env.NEXT_PUBLIC_SITE_NAME = "Custom Name";
    process.env.NEXT_PUBLIC_SITE_URL = "https://custom.example.com";
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION = "Custom description.";
    process.env.NEXT_PUBLIC_AUTHOR_NAME = "Custom Author";
    process.env.NEXT_PUBLIC_AUTHOR_EMAIL = "custom@example.com";
    process.env.NEXT_PUBLIC_GITHUB_URL = "https://github.com/custom";
    process.env.NEXT_PUBLIC_LINKEDIN_URL = "https://linkedin.com/in/custom";

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { siteConfig } = require("@/lib/config");

    expect(siteConfig.name).toBe("Custom Name");
    expect(siteConfig.url).toBe("https://custom.example.com");
    expect(siteConfig.description).toBe("Custom description.");
    expect(siteConfig.author.name).toBe("Custom Author");
    expect(siteConfig.author.email).toBe("custom@example.com");
    expect(siteConfig.social.github).toBe("https://github.com/custom");
    expect(siteConfig.social.linkedin).toBe("https://linkedin.com/in/custom");
  });
});

describe("analyticsConfig", () => {
  it("uses empty strings when no env vars are set", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { analyticsConfig } = require("@/lib/config");

    expect(analyticsConfig.gaId).toBe("");
    expect(analyticsConfig.gtmId).toBe("");
  });

  it("uses env var values when set", () => {
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST123";
    process.env.NEXT_PUBLIC_GTM_ID = "GTM-TEST456";

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { analyticsConfig } = require("@/lib/config");

    expect(analyticsConfig.gaId).toBe("G-TEST123");
    expect(analyticsConfig.gtmId).toBe("GTM-TEST456");
  });
});

describe("appConfig", () => {
  it("detects test environment", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { appConfig } = require("@/lib/config");

    expect(appConfig.environment).toBe("test");
    expect(appConfig.isTest).toBe(true);
    expect(appConfig.isProduction).toBe(false);
    expect(appConfig.isDevelopment).toBe(false);
  });
});
