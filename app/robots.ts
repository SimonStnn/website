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
    ],
    sitemap: sitemapUrl,
  };
}
