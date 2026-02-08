import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = new URL("/sitemap.xml", siteConfig.url).toString();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // AI agents and LLM crawlers: see /llms.txt for structured site info
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Claude-Web",
          "Anthropic-AI",
          "Google-Extended",
          "PerplexityBot",
          "Bytespider",
          "CCBot",
        ],
        allow: ["/", "/llms.txt"],
      },
    ],
    sitemap: sitemapUrl,
    host: siteConfig.url,
  };
}
