# Complete SEO Implementation Guide

**Breadcrumbs:** [Documentation](../../README.md) > [Guides](../README.md) > [SEO](./README.md) > SEO Guide

This comprehensive guide covers all SEO implementations in the portfolio website.

## Table of Contents

- [Overview](#overview)
- [On-Page SEO](#on-page-seo)
- [Technical SEO](#technical-seo)
- [Metadata Implementation](#metadata-implementation)
- [Performance SEO](#performance-seo)
- [Content SEO](#content-seo)
- [Local SEO](#local-seo)
- [Testing and Validation](#testing-and-validation)

## Overview

The portfolio implements comprehensive SEO best practices using Next.js 15's built-in features and modern SEO techniques.

**SEO Features:**

- ✅ Metadata API for all pages
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Structured data (JSON-LD)
- ✅ Open Graph and Twitter Cards
- ✅ Semantic HTML
- ✅ Mobile-responsive design
- ✅ Fast page loads (< 2s)
- ✅ Optimized images
- ✅ AI agent discovery (/llms.txt)

**SEO Goals:**

1. Rank for "[Your Name] developer"
2. Appear in local searches ("[technology] developer in [city]")
3. Get discovered by recruiters and AI agents
4. Showcase projects in search results
5. Build professional online presence

## On-Page SEO

### Title Tags

**Best practices:**

- Unique for each page
- 50-60 characters
- Include primary keyword
- Brand name at end

**Implementation:**

```typescript
// app/layout.tsx - Site-wide template
export const metadata: Metadata = {
  title: {
    template: "%s | Software Engineer & AI",
    default: "Simon Stijnen | Software Engineer & AI",
  },
};

// app/projects/page.tsx - Page-specific title
export const metadata: Metadata = {
  title: "Projects", // Results in: "Projects | Software Engineer & AI"
};

// app/projects/[slug]/page.tsx - Dynamic title
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  return {
    title: project.title, // Results in: "Project Name | Software Engineer & AI"
  };
}
```

**Title tag examples:**

- Homepage: `Simon Stijnen | Software Engineer & AI`
- Projects: `Projects | Software Engineer & AI`
- Project detail: `Pop-a-loon Browser Extension | Software Engineer & AI`

### Meta Descriptions

**Best practices:**

- 150-160 characters
- Include call-to-action
- Unique for each page
- Use primary keywords naturally

**Implementation:**

```typescript
// app/page.tsx
export const metadata: Metadata = {
  description:
    "Software engineer and AI student in Belgium building scalable, reliable products. Experienced in Next.js, React, Python, and AI/ML.",
};

// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  return {
    description: project.shortDescription,
  };
}
```

### Heading Structure

**Proper hierarchy:**

```html
<!-- ✅ GOOD: Proper heading hierarchy -->
<h1>Main Page Title</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>
<h3>Another Subsection</h3>
<h2>Another Section</h2>

<!-- ❌ BAD: Skipping levels -->
<h1>Main Title</h1>
<h3>Subsection</h3>
<!-- Skipped h2 -->
```

**Implementation in React:**

```typescript
// components/project-detail.tsx
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <h1 className="text-4xl font-bold">{project.title}</h1>

      <section>
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>{project.description}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Technologies</h2>
        <ul>
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
```

### Internal Linking

**Benefits:**

- Helps search engines discover pages
- Distributes page authority
- Improves user navigation
- Reduces bounce rate

**Implementation:**

```typescript
// components/project-card.tsx
import Link from 'next/link';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <Link href={`/projects/${project.slug}`}>
          <CardTitle>{project.title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p>{project.shortDescription}</p>
        {/* Related technologies linking to skills */}
        {project.technologies.map((tech) => (
          <Link key={tech} href={`/skills#${generateSkillId(tech)}`}>
            {tech}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
```

**Internal linking strategy:**

- Homepage → Featured projects
- Projects page → Individual projects
- Project details → Related projects (by technology)
- Skills table → Projects using that skill
- Footer → All major sections

### Image Optimization

**Alt text:**

```typescript
// ✅ GOOD: Descriptive alt text
<Image
  src="/images/projects/pop-a-loon/dashboard.jpg"
  alt="Pop-a-loon browser extension dashboard showing user statistics and leaderboard"
  width={800}
  height={600}
/>

// ❌ BAD: Generic or missing alt text
<Image src="/image.jpg" alt="Image" width={800} height={600} />
<Image src="/image.jpg" alt="" width={800} height={600} />
```

**Next.js Image component benefits:**

- Automatic optimization
- Lazy loading
- Responsive images
- WebP format
- Blur placeholder

```typescript
import Image from 'next/image';

<Image
  src="/images/profile.jpg"
  alt="Simon Stijnen - Software Engineer"
  width={500}
  height={500}
  priority // Above-the-fold image
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Or import for auto-blur
/>;
```

## Technical SEO

### Sitemap

**Dynamic sitemap generation:**

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const projects = await getProjects();

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Projects page
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Individual projects
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
```

**Access:** `https://your-domain.com/sitemap.xml`

See [Sitemap & Robots Guide](./03-sitemap-robots.md) for details.

### Robots.txt

**Configuration:**

```typescript
// app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "Claude-Web", "Anthropic-AI"],
        allow: ["/llms.txt"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

**Access:** `https://your-domain.com/robots.txt`

### Canonical URLs

**Prevent duplicate content:**

```typescript
// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  return {
    title: project.title,
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}
```

### Mobile Responsiveness

**Built-in with Tailwind:**

```typescript
// Mobile-first responsive design
<div className="
  flex flex-col gap-4       // Mobile: vertical
  md:flex-row md:gap-6      // Tablet: horizontal
  lg:gap-8                  // Desktop: larger gaps
">
```

**Test:**

- Chrome DevTools (F12) → Toggle device toolbar
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### HTTPS

**Always use HTTPS in production:**

```bash
# Environment variable
NEXT_PUBLIC_SITE_URL="https://your-domain.com"  # ✅
NEXT_PUBLIC_SITE_URL="http://your-domain.com"   # ❌
```

**Automatic with:**

- Vercel (free SSL)
- Netlify (free SSL)
- Cloudflare (free SSL)
- Let's Encrypt (self-hosted)

### Page Speed

**Targets:**

- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Optimizations:**

1. **Image optimization** - Next.js Image component
2. **Code splitting** - Dynamic imports
3. **Font optimization** - next/font
4. **Caching** - Static generation
5. **Compression** - Gzip/Brotli

See [Performance Guide](./05-performance.md) for details.

## Metadata Implementation

### Homepage Metadata

```typescript
// app/page.tsx
import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Software Engineer & AI`,
  },
  description: siteConfig.description,
  keywords: [
    "Software Engineer",
    "AI",
    "Belgium",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Full Stack Developer",
  ],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Software Engineer & AI Portfolio",
    title: `${siteConfig.name} | Software Engineer & AI`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/profile-meta.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Software Engineer & AI`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Software Engineer & AI | ${siteConfig.name}`,
    description: siteConfig.description,
    images: ["/images/profile-meta.jpg"],
  },
};
```

### Dynamic Metadata

```typescript
// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    keywords: project.technologies,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: project.images.map((img) => ({
        url: img.src,
        alt: img.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: [project.images[0]?.src],
    },
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}
```

## Performance SEO

### Core Web Vitals

**Measure:**

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-domain.com --view

# Or use PageSpeed Insights
open https://pagespeed.web.dev/
```

**Optimize:**

1. **LCP (Largest Contentful Paint):**
   - Optimize images
   - Preload critical resources
   - Use CDN

2. **FID (First Input Delay):**
   - Minimize JavaScript
   - Code splitting
   - Defer non-critical JS

3. **CLS (Cumulative Layout Shift):**
   - Set image dimensions
   - Reserve space for dynamic content
   - Avoid layout shifts

### Static Generation

**Use static generation when possible:**

```typescript
// ✅ GOOD: Static generation
export default async function ProjectsPage() {
  const projects = await getProjects(); // Runs at build time
  return <ProjectList projects={projects} />;
}

// ❌ BAD: Client-side fetching
'use client';
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/api/projects').then(/* ... */); // Runs on client
  }, []);
}
```

## Content SEO

### Content Strategy

**Focus areas:**

1. **Project descriptions** - Detailed, keyword-rich
2. **Technology stack** - List all technologies used
3. **Achievements** - Quantifiable results
4. **Skills** - Comprehensive list
5. **Blog posts** - Technical articles (future feature)

### Keyword Research

**Target keywords:**

- **Primary:** "[Your Name] developer"
- **Secondary:**
  - "Next.js developer Belgium"
  - "React developer [City]"
  - "Full-stack developer [City]"
  - "AI engineer Belgium"

**Tools:**

- Google Keyword Planner
- Ubersuggest
- AnswerThePublic
- Google Search Console

### Content Quality

**Checklist:**

- [ ] Original content (not copied)
- [ ] Well-written (grammar, spelling)
- [ ] Comprehensive (detailed descriptions)
- [ ] Relevant (focuses on your expertise)
- [ ] Updated regularly (add new projects)
- [ ] Engaging (tells a story)

## Local SEO

### Local Business Schema

```typescript
// components/meta/structured-data.tsx
export function PersonJsonLd({ name, location, ...props }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressCountry: location.country,
    },
    knowsAbout: props.knowsAbout,
    // ... other fields
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

See [Structured Data Guide](./02-structured-data.md) for details.

### Google My Business

**If applicable:**

1. Create Google Business Profile
2. Verify location
3. Add portfolio URL
4. Add photos
5. Get reviews

## Testing and Validation

### SEO Testing Tools

**1. Google Search Console:**

- Monitor search performance
- Check indexing status
- Find crawl errors
- View search queries

**Setup:**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property (your domain)
3. Verify ownership
4. Submit sitemap

**2. Lighthouse:**

```bash
lighthouse https://your-domain.com --view
```

**Checks:**

- Performance
- Accessibility
- Best Practices
- SEO
- PWA (if applicable)

**3. Rich Results Test:**

Test structured data:

```
https://search.google.com/test/rich-results
```

**4. Mobile-Friendly Test:**

```
https://search.google.com/test/mobile-friendly
```

### Validation Checklist

- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Sitemap generates correctly
- [ ] Robots.txt accessible
- [ ] All images have alt text
- [ ] Structured data valid
- [ ] No broken links
- [ ] Mobile responsive
- [ ] Fast page loads (< 3s)
- [ ] HTTPS enabled
- [ ] Canonical URLs set

### Monitoring

**Track:**

- Search rankings (Google Search Console)
- Organic traffic (Analytics)
- Core Web Vitals (PageSpeed Insights)
- Backlinks (Ahrefs, Moz)
- Keyword rankings (SEMrush, Ahrefs)

## Common Issues and Solutions

### Issue: Pages not indexed

**Solutions:**

1. Submit sitemap to Google Search Console
2. Check robots.txt isn't blocking
3. Ensure pages are linked from other pages
4. Create backlinks from other sites

### Issue: Low rankings

**Solutions:**

1. Improve content quality
2. Add more content (blog posts, case studies)
3. Build backlinks
4. Optimize page speed
5. Improve user engagement

### Issue: Duplicate content

**Solutions:**

1. Set canonical URLs
2. Use 301 redirects for old URLs
3. Avoid URL parameters
4. Consolidate similar pages

## See Also

- [Structured Data](./02-structured-data.md) - JSON-LD schemas
- [Sitemap & Robots](./03-sitemap-robots.md) - Search engine configuration
- [Analytics](./04-analytics.md) - Google Analytics & GTM
- [Performance](./05-performance.md) - Performance optimization

## Next Steps

- Implement all metadata
- Generate sitemap
- Add structured data
- Test with Lighthouse
- Submit to Google Search Console
- Monitor and improve

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
