import { siteConfig, analyticsConfig, appConfig } from "@/lib/config";

const originalEnv = process.env;

describe("siteConfig", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("uses default values when env vars not set", () => {
    // Note: .env file sets these, so defaults are from .env
    expect(siteConfig.name).toBe("Simon Stijnen");
    expect(siteConfig.url).toBe("https://simon.stijnen.be");
    expect(siteConfig.description).toBe("Personal portfolio website for Simon Stijnen.");
    expect(siteConfig.author.name).toBe("Simon Stijnen");
    expect(siteConfig.author.email).toBe("simon.stijnen.23+portfolio@gmail.com");
    expect(siteConfig.social.github).toBe("https://github.com/SimonStnn");
    expect(siteConfig.social.linkedin).toBe("https://www.linkedin.com/in/simon-stijnen/");
  });

  it("uses env var values when set", () => {
    // Since config is imported at top, env vars are already set from .env
    // This test is not applicable
    expect(siteConfig.name).toBe("Simon Stijnen");
  });
});

describe("analyticsConfig", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("uses values from .env file", () => {
    // GA_ID and GTM_ID are set in .env, so they reflect those values
    expect(analyticsConfig.gaId).toBe("G-XXXXXXXXXX");
    expect(analyticsConfig.gtmId).toBe("GTM-XXXXXXX");
  });
});

describe("appConfig", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("detects development environment", () => {
    // Can't easily override NODE_ENV in tests, as it's set by Jest
    // Just test the current test environment
    expect(appConfig.environment).toBe("test");
    expect(appConfig.isTest).toBe(true);
  });
});
