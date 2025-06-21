/**
 * Application configuration with environment variables
 *
 * Environment variables are loaded from the .env file
 *
 * Variables prefixed with NEXT_PUBLIC_ are exposed to the browser
 */

// Site configuration
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Simon Stijnen",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://simon.stijnen.be",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Portfolio highlighting software engineering and AI projects by Simon Stijnen.",
  author: {
    name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Simon Stijnen",
    email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || "simon.stijnen.23+portfolio@gmail.com",
  },
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/SimonStnn",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/simon-stijnen/",
  },
};

// Analytics configuration
export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
};

// Application configuration
export const appConfig = {
  environment: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
};
