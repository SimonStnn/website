/**
 * Middleware configuration
 *
 * Configure webhook settings and other middleware-related options
 */

// Webhook configuration - Disabled by default for security
export const webhookConfig = {
  url: process.env.WEBHOOK_URL || null,
  enabled: process.env.WEBHOOK_ENABLED === "true", // Defaults to false unless explicitly enabled
  includeHeaders: ["user-agent", "referer", "accept", "accept-language", "x-forwarded-for"],
};

// Validate webhook URL if provided
if (webhookConfig.url) {
  try {
    const url = new URL(webhookConfig.url);
    if (url.protocol !== "https:") {
      console.warn("Webhook URL must use HTTPS protocol for security");
      webhookConfig.url = null; // Disable if not HTTPS
    }
  } catch (error) {
    console.error("Invalid webhook URL:", error);
    webhookConfig.url = null; // Disable if invalid
  }
}

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
