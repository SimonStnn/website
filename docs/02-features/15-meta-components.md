# Meta Components: SEO & Analytics

**Navigation:** [Home](../README.md) → [Features & Components](./01-components-overview.md) → Meta Components

## Table of Contents

- [Introduction](#introduction)
- [Analytics Component](#analytics-component)
- [Structured Data Components](#structured-data-components)
- [Project Structured Data](#project-structured-data)
- [SEO Best Practices](#seo-best-practices)
- [Usage Examples](#usage-examples)
- [See Also](#see-also)
- [Next Steps](#next-steps)

## Introduction

**Meta Components** handle Search Engine Optimization (SEO), structured data (JSON-LD), and analytics tracking. These components enhance discoverability, provide rich search results, and track user behavior.

### Components

- **Analytics**: Google Analytics & Google Tag Manager integration
- **Structured Data**: JSON-LD schemas for Person, BreadcrumbList
- **Project Structured Data**: JSON-LD for individual project pages

## Analytics Component

### Purpose

Integrates Google Analytics (GA4) and Google Tag Manager (GTM) for tracking user interactions, page views, and conversions.

### File: `components/meta/analytics.tsx`

{% raw %}

```typescript:1:27:components/meta/analytics.tsx
// import Script from "next/script";
import { analyticsConfig, appConfig } from "@/lib/config";

export function Analytics() {
  // Don't render analytics if no ID is provided or we're in development
  if (!analyticsConfig.gaId || !analyticsConfig.gtmId || appConfig.isDevelopment) {
    return null;
  }

  return (
    <>
      <meta name="google-site-verification" content="Yr7tvEhqrFxE-am7WS4b7RiQJhy_F9grOg12XEhHtLw" />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${analyticsConfig.gaId}');`,
        }}
      />
      <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${analyticsConfig.gtmId}');`}</script>
    </>
  );
}

export default Analytics;
```

{% endraw %}

### Features

1. **Google Analytics 4 (GA4)**
   - Page view tracking
   - Event tracking
   - User engagement metrics

2. **Google Tag Manager (GTM)**
   - Tag management without code changes
   - Custom event triggers
   - Third-party integrations

3. **Development Guard**

   ```typescript
   if (!analyticsConfig.gaId || !analyticsConfig.gtmId || appConfig.isDevelopment) {
     return null;
   }
   ```

   Prevents analytics in development to avoid skewing data.

4. **Google Site Verification**
   ```typescript
   <meta name="google-site-verification" content="..." />
   ```
   Verifies site ownership in Google Search Console.

### Configuration

```typescript
// lib/config.ts
export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
};

export const appConfig = {
  isDevelopment: process.env.NODE_ENV === "development",
};
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## Structured Data Components

### Purpose

Provides JSON-LD structured data for enhanced search results (rich snippets) and better SEO.

### File: `components/meta/structured-data.tsx`

{% raw %}

```typescript:1:80:components/meta/structured-data.tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

// Helper component to render JSON-LD as a script tag
function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

interface ProjectJsonLdProps {
  name: string;
  description: string;
  url: string;
  image: string;
  author: {
    name: string;
    url: string;
  };
  technologies: string[];
}

export function ProjectJsonLd({
  name,
  description,
  url,
  image,
  author,
  technologies,
}: ProjectJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: "0",
    },
    keywords: technologies.join(", "),
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item,
    })),
  };

  return <JsonLd data={data} />;
}
```

{% endraw %}

### Schema Types

#### 1. SoftwareApplication (ProjectJsonLd)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Portfolio Website",
  "description": "Modern portfolio built with Next.js",
  "url": "https://example.com/projects/portfolio",
  "image": "https://example.com/images/portfolio.jpg",
  "author": {
    "@type": "Person",
    "name": "John Doe",
    "url": "https://example.com"
  },
  "applicationCategory": "WebApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/OnlineOnly",
    "price": "0"
  },
  "keywords": "Next.js, React, TypeScript"
}
```

**Benefits:**

- Rich snippets in search results
- Better project categorization
- Enhanced visibility

#### 2. BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Projects",
      "item": "https://example.com/projects"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Portfolio Website",
      "item": "https://example.com/projects/portfolio"
    }
  ]
}
```

**Benefits:**

- Breadcrumb navigation in search results
- Improved site structure understanding
- Better UX in SERPs

#### 3. Person

```typescript:82:156:components/meta/structured-data.tsx
interface PersonJsonLdProps {
  name: string;
  url: string;
  sameAs: string[];
  jobTitle?: string;
  homeCountry?: string; // e.g., "Belgium"
  email?: string;
  worksFor?: { name: string; url?: string }[];
  alumniOf?: { name: string; url?: string }[];
  hasCredential?: { name: string; url?: string }[];
  knowsAbout?: string[];
}

export function PersonJsonLd({
  name,
  url,
  sameAs,
  jobTitle,
  homeCountry,
  email,
  worksFor,
  alumniOf,
  hasCredential,
  knowsAbout,
}: PersonJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    sameAs,
  };

  if (email) {
    data.email = email;
  }
  if (jobTitle) {
    data.jobTitle = jobTitle;
  }
  if (worksFor && worksFor.length > 0) {
    data.worksFor = worksFor.map((org) => ({
      "@type": "Organization",
      name: org.name,
      url: org.url,
    }));
  }
  if (alumniOf && alumniOf.length > 0) {
    data.alumniOf = alumniOf.map((org) => ({
      "@type": "EducationalOrganization",
      name: org.name,
      url: org.url,
    }));
  }
  if (hasCredential && hasCredential.length > 0) {
    data.hasCredential = hasCredential.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential.name,
      url: credential.url,
    }));
  }
  if (knowsAbout && knowsAbout.length > 0) {
    data.knowsAbout = knowsAbout;
  }
  if (homeCountry) {
    data.homeLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: homeCountry,
      },
    };
  }

  return <JsonLd data={data} />;
}
```

**Benefits:**

- Knowledge Graph inclusion
- Personal brand recognition
- Social profile connections

## Project Structured Data

### Purpose

Wrapper component that combines ProjectJsonLd and BreadcrumbJsonLd for project pages.

### File: `components/meta/project-structured-data.tsx`

```typescript:1:68:components/meta/project-structured-data.tsx
import { ProjectJsonLd, BreadcrumbJsonLd } from "@/components/meta/structured-data";
import { siteConfig } from "@/lib/config";
import type { ProjectImage } from "@/lib/projects";
import { isVideoFile } from "@/lib/utils";

interface ProjectStructuredDataProps {
  title: string;
  description: string;
  slug: string;
  technologies: string[];
  images?: ProjectImage[];
}

export default function ProjectStructuredData({
  title,
  description,
  slug,
  technologies,
  images,
}: ProjectStructuredDataProps) {
  const domain = siteConfig.url;
  const firstImage = images?.find((image) => {
    const src = typeof image === "string" ? image : image.src;
    return !isVideoFile(src);
  });
  const imageSrc = firstImage
    ? typeof firstImage === "string"
      ? firstImage
      : firstImage.src
    : `/images/projects/${slug}.jpg`;
  const imagePath = `${domain}${imageSrc}`;

  return (
    <>
      <ProjectJsonLd
        name={title}
        description={description}
        url={`${domain}/projects/${slug}`}
        image={imagePath}
        author={{
          name: siteConfig.author.name,
          url: domain,
        }}
        technologies={technologies}
      />

      <BreadcrumbJsonLd
        items={[
          {
            position: 1,
            name: "Home",
            item: domain,
          },
          {
            position: 2,
            name: "Projects",
            item: `${domain}/projects`,
          },
          {
            position: 3,
            name: title,
            item: `${domain}/projects/${slug}`,
          },
        ]}
      />
    </>
  );
}
```

### Features

1. **Smart Image Selection**: Filters out videos, uses first image
2. **Fallback Image**: Uses slug-based default if no images provided
3. **Automatic Breadcrumbs**: Generates 3-level breadcrumb structure
4. **Config Integration**: Uses `siteConfig` for domain and author

## SEO Best Practices

### Meta Tags (Next.js Metadata)

```typescript
// app/projects/[slug]/page.tsx
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.images[0]?.src],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.images[0]?.src],
    },
  };
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const projects = await getProjects();

  return [
    {
      url: "https://example.com",
      lastModified: new Date(),
    },
    ...projects.map((project) => ({
      url: `https://example.com/projects/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
```

### Robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://example.com/sitemap.xml",
  };
}
```

## Usage Examples

### Analytics in Layout

```typescript
// app/layout.tsx
import { Analytics } from "@/components/meta/analytics";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Analytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Project Page with Structured Data

```typescript
// app/projects/[slug]/page.tsx
import ProjectStructuredData from "@/components/meta/project-structured-data";

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug);

  return (
    <>
      <ProjectStructuredData
        title={project.title}
        description={project.description}
        slug={project.slug}
        technologies={project.technologies}
        images={project.images}
      />

      {/* Page content */}
    </>
  );
}
```

### Homepage with Person Schema

```typescript
// app/page.tsx
import { PersonJsonLd } from "@/components/meta/structured-data";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd
        name={siteConfig.author.name}
        url={siteConfig.url}
        sameAs={[
          siteConfig.social.github,
          siteConfig.social.linkedin,
        ]}
        jobTitle="Software Engineer"
        knowsAbout={["Next.js", "React", "TypeScript", "AI"]}
        email={siteConfig.author.email}
      />

      {/* Page content */}
    </>
  );
}
```

## See Also

- [Google Analytics](https://analytics.google.com/) - Analytics platform
- [Google Tag Manager](https://tagmanager.google.com/) - Tag management
- [Schema.org](https://schema.org/) - Structured data vocabulary
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Test structured data
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) - Metadata API

## Next Steps

1. **Enhanced Analytics**: Add custom event tracking
2. **More Schemas**: Add Organization, WebSite, and FAQPage schemas
3. **A/B Testing**: Integrate with experimentation platform
4. **Heatmaps**: Add Hotjar or Microsoft Clarity
5. **Error Tracking**: Integrate Sentry for error monitoring
6. **Performance Monitoring**: Add Web Vitals tracking
7. **Cookie Consent**: Implement GDPR-compliant cookie banner

---

**Last Updated:** 2024-02-09  
**Related Docs:** [Components](./01-components-overview.md) | [Configuration](../01-architecture/04-configuration.md) | [SEO](../04-deployment/03-seo-optimization.md)
