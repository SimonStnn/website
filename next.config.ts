import type { NextConfig } from "next";

// Import site configuration for URL parsing
import { siteConfig } from "./lib/config";

// Extract domain from site URL
const siteUrlDomain = new URL(siteConfig.url).hostname;

// Common domains for images
const commonDomains = ["github.githubassets.com", "colorsplash.vercel.app"];
const domains = ["localhost", siteUrlDomain, ...commonDomains];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: domains.map((domain) => ({
      protocol: "https",
      hostname: domain,
      port: "",
      pathname: "/**",
    })),
  },
  // For Docker deployment - creates a standalone build
  output: "standalone",
};

export default nextConfig;
