/**
 * Middleware configuration
 *
 * Configure webhook settings and other middleware-related options
 */

// Webhook configuration - Consider moving URL to environment variables in production
export const webhookConfig = {
  url: process.env.WEBHOOK_URL || null,
  enabled: process.env.WEBHOOK_ENABLED !== "false", // Defaults to true unless explicitly disabled
  includeHeaders: ["user-agent", "referer", "accept", "accept-language", "x-forwarded-for"],
};

// Paths to exclude from middleware processing
export const excludedPaths = [
  "api", // API routes
  "_next/static", // Static files
  "_next/image", // Image optimization files
  "favicon.ico", // Favicon file
  "robots.txt", // Robots file
  "sitemap.xml", // Sitemap file
];

// Matcher configuration for middleware
export const middlewareMatcher = [`/((?!${excludedPaths.join("|")}).*)`];
