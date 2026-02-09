# Sitemap and Robots.txt Configuration

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [SEO](./index.md) > Sitemap & Robots

This guide explains the dynamic sitemap generation and robots.txt configuration for search engines and AI crawlers.

## Table of Contents

- [Sitemap Implementation](#sitemap-implementation)
- [Robots.txt Implementation](#robotstxt-implementation)
- [AI Crawler Configuration](#ai-crawler-configuration)
- [Testing and Validation](#testing-and-validation)
- [Best Practices](#best-practices)

## Sitemap Implementation

### What is a Sitemap?

An XML file listing all pages on your site, helping search engines:

- Discover all pages
- Understand site structure
- Determine crawl priority
- Know update frequency

### File Location

```
app/sitemap.ts
```

### Basic Implementation

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
```

### Dynamic Routes

**Include all projects:**

```typescript
import { getProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const projects = await getProjects();

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    // Static routes
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Dynamic project routes
    ...projectRoutes,
  ];
}
```

### Priority Guidelines

| Page Type       | Priority | Change Frequency |
| --------------- | -------- | ---------------- |
| Homepage        | 1.0      | weekly           |
| Main sections   | 0.9      | weekly           |
| Project details | 0.8      | monthly          |
| About sections  | 0.7      | monthly          |
| Downloads       | 0.6      | monthly          |
| AI endpoints    | 0.5      | monthly          |

### Access

**URL:** `https://your-domain.com/sitemap.xml`

**Output format:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://simon.stijnen.be</loc>
    <lastmod>2026-02-09T12:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://simon.stijnen.be/projects</loc>
    <lastmod>2026-02-09T12:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

## Robots.txt Implementation

### What is robots.txt?

A file that tells search engines:

- Which pages to crawl
- Which pages to skip
- Where the sitemap is located
- Crawl rate limits (optional)

### File Location

```
app/robots.ts
```

### Basic Implementation

```typescript
// app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

### Multiple Rules

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/private/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/llms.txt", "/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

### Access

**URL:** `https://your-domain.com/robots.txt`

**Output format:**

```
User-Agent: *
Allow: /
Disallow: /admin/

User-Agent: GPTBot
Allow: /llms.txt
Allow: /

Sitemap: https://simon.stijnen.be/sitemap.xml
Host: https://simon.stijnen.be
```

## AI Crawler Configuration

### Supported AI Crawlers

**List of known AI crawlers:**

| Crawler           | Owner        | Purpose              |
| ----------------- | ------------ | -------------------- |
| `GPTBot`          | OpenAI       | ChatGPT training     |
| `ChatGPT-User`    | OpenAI       | ChatGPT browsing     |
| `Claude-Web`      | Anthropic    | Claude web search    |
| `Anthropic-AI`    | Anthropic    | AI training          |
| `Google-Extended` | Google       | Bard/Gemini training |
| `PerplexityBot`   | Perplexity   | Perplexity search    |
| `Bytespider`      | ByteDance    | TikTok AI            |
| `CCBot`           | Common Crawl | Web archive for AI   |

### Allow AI Crawlers

```typescript
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "Claude-Web",
    "Anthropic-AI",
    "Google-Extended",
    "PerplexityBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: aiCrawlers,
        allow: ["/", "/llms.txt"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

### Block Specific Crawlers

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Block specific crawler
        userAgent: "BadBot",
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

## Testing and Validation

### Test Sitemap

**1. Visit directly:**

```
https://your-domain.com/sitemap.xml
```

**2. Validate XML:**

```bash
curl https://your-domain.com/sitemap.xml | xmllint --format -
```

**3. Check in Google Search Console:**

- Go to Sitemaps section
- Enter `sitemap.xml`
- Click Submit
- Check for errors

### Test Robots.txt

**1. Visit directly:**

```
https://your-domain.com/robots.txt
```

**2. Test with Google:**

- Google Search Console → robots.txt Tester
- Enter your domain
- Test specific URLs

**3. Verify crawlers can access:**

```bash
curl https://your-domain.com/robots.txt
```

## Best Practices

### Sitemap Best Practices

1. **Keep it updated** - Regenerate on content changes
2. **Include all pages** - Don't miss important pages
3. **Accurate priorities** - Homepage highest, details lower
4. **Realistic change frequency** - Match actual update schedule
5. **Submit to Search Console** - Help Google discover faster

### Robots.txt Best Practices

1. **Allow by default** - Only block what's necessary
2. **Don't block CSS/JS** - Search engines need them
3. **Include sitemap** - Help crawlers find it
4. **Test thoroughly** - Ensure no accidental blocks
5. **Monitor crawl stats** - Watch for issues

### Common Mistakes

**❌ Blocking important resources:**

```
User-Agent: *
Disallow: /css/
Disallow: /js/
```

This prevents search engines from rendering pages properly.

**❌ Forgetting sitemap:**

```
User-Agent: *
Allow: /
# Missing: Sitemap: ...
```

**❌ Blocking all AI crawlers:**

```
User-Agent: GPTBot
Disallow: /
```

Prevents AI discovery and recommendations.

## See Also

- [SEO Guide](./01-seo-guide.md) - Complete SEO implementation
- [Structured Data](./02-structured-data.md) - JSON-LD schemas
- [LLMs.txt](../api/02-llms-txt.md) - AI agent discovery
- [Analytics](./04-analytics.md) - Google Analytics & GTM

## Next Steps

- Implement sitemap.ts
- Implement robots.ts
- Submit sitemap to Search Console
- Test with robots.txt tester
- Monitor crawl statistics

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
