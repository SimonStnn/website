# Performance Optimization Guide

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [SEO](./index.md) > Performance

This guide covers performance optimization techniques for faster page loads and better Core Web Vitals scores.

## Table of Contents

- [Core Web Vitals](#core-web-vitals)
- [Image Optimization](#image-optimization)
- [Code Optimization](#code-optimization)
- [Font Optimization](#font-optimization)
- [Caching Strategy](#caching-strategy)
- [Bundle Analysis](#bundle-analysis)
- [Performance Monitoring](#performance-monitoring)

## Core Web Vitals

### What are Core Web Vitals?

Three key metrics Google uses for ranking:

1. **LCP (Largest Contentful Paint)** - Loading performance
2. **FID (First Input Delay)** - Interactivity
3. **CLS (Cumulative Layout Shift)** - Visual stability

### Target Scores

| Metric | Good    | Needs Improvement | Poor    |
| ------ | ------- | ----------------- | ------- |
| LCP    | ≤ 2.5s  | 2.5s - 4s         | > 4s    |
| FID    | ≤ 100ms | 100ms - 300ms     | > 300ms |
| CLS    | ≤ 0.1   | 0.1 - 0.25        | > 0.25  |

### Check Your Scores

```bash
# Using Lighthouse
lighthouse https://your-domain.com --view

# Or visit
https://pagespeed.web.dev/
```

## Image Optimization

### Next.js Image Component

**Always use Next.js Image component:**

```typescript
import Image from 'next/image';

// ✅ GOOD: Optimized image
<Image
  src="/images/profile.jpg"
  alt="Profile photo"
  width={500}
  height={500}
  priority // For above-the-fold images
  placeholder="blur"
  quality={90}
/>

// ❌ BAD: Regular img tag
<img src="/images/profile.jpg" alt="Profile" />
```

### Priority Images

**Above-the-fold images:**

```typescript
// Hero image - loads immediately
<Image src="/hero.jpg" alt="Hero" width={1920} height={1080} priority />

// Below-fold images - lazy loaded
<Image src="/image1.jpg" alt="Image 1" width={800} height={600} />
```

### Blur Placeholder

**Option 1: Automatic blur (import image):**

```typescript
import profileImage from '@/public/images/profile.jpg';

<Image
  src={profileImage}
  alt="Profile"
  placeholder="blur" // Automatic blur from import
/>
```

**Option 2: Manual blur data:**

```typescript
<Image
  src="/images/profile.jpg"
  alt="Profile"
  width={500}
  height={500}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>
```

### Responsive Images

**Provide sizes for responsive loading:**

```typescript
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Image Formats

**Preferred order:**

1. **WebP** - Best compression (automatic with next/image)
2. **AVIF** - Even better, if supported
3. **JPEG** - Fallback for photos
4. **PNG** - For images with transparency

### Manual Optimization

**Before adding images:**

```bash
# Install tools
brew install webp imagemagick

# Convert to WebP
cwebp input.jpg -q 85 -o output.webp

# Resize images
convert input.jpg -resize 1920x1080 output.jpg

# Or use online tools: tinypng.com, squoosh.app
```

## Code Optimization

### Code Splitting

**Dynamic imports for large components:**

```typescript
import dynamic from 'next/dynamic';

// ✅ GOOD: Lazy load heavy component
const ProjectGallery = dynamic(() => import('@/components/project-gallery'), {
  loading: () => <div>Loading gallery...</div>,
  ssr: false, // Disable SSR if not needed
});

export default function ProjectPage() {
  return (
    <div>
      <h1>Project Title</h1>
      <ProjectGallery />
    </div>
  );
}
```

### Route-based Code Splitting

**Automatic with Next.js:**

```
app/
├── page.tsx          # Bundle 1
├── projects/
│   ├── page.tsx      # Bundle 2
│   └── [slug]/
│       └── page.tsx  # Bundle 3
```

Each route gets its own bundle.

### Tree Shaking

**Import only what you need:**

```typescript
// ❌ BAD: Imports entire library
import _ from "lodash";
const sorted = _.sortBy(items, "name");

// ✅ GOOD: Import specific function
import { sortBy } from "lodash-es";
const sorted = sortBy(items, "name");
```

### Memoization

**Prevent unnecessary re-renders:**

```typescript
'use client';
import { useMemo, useCallback } from 'react';

export function ProjectList({ projects }: { projects: Project[] }) {
  // Memoize filtered results
  const featuredProjects = useMemo(
    () => projects.filter((p) => p.order && p.order <= 6),
    [projects]
  );

  // Memoize callback
  const handleClick = useCallback((project: Project) => {
    console.log('Clicked:', project.title);
  }, []);

  return (
    <div>
      {featuredProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} onClick={handleClick} />
      ))}
    </div>
  );
}
```

## Font Optimization

### next/font Integration

**Use next/font for optimal loading:**

```typescript
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Custom Fonts

**For local fonts:**

```typescript
import localFont from "next/font/local";

const myFont = localFont({
  src: "./fonts/my-font.woff2",
  variable: "--font-custom",
  display: "swap",
});
```

### Font Display Strategies

| Strategy   | Description                 | Use Case                 |
| ---------- | --------------------------- | ------------------------ |
| `auto`     | Browser default             | Default                  |
| `swap`     | Show fallback immediately   | Most cases (recommended) |
| `block`    | Wait for font (max 3s)      | Brand-critical fonts     |
| `fallback` | Short block, long swap      | Body text                |
| `optional` | Use if available, else skip | Non-critical fonts       |

## Caching Strategy

### Static Generation

**Pre-render pages at build time:**

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
    fetch('/api/projects').then(/* ... */); // Runs on every visit
  }, []);
}
```

### Revalidation

**Incremental Static Regeneration:**

```typescript
// Revalidate every hour
export const revalidate = 3600;

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* Content */}</div>;
}
```

### HTTP Caching

**Set cache headers:**

```typescript
// app/api/data/route.ts
export async function GET() {
  const data = await getData();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
```

**Cache durations:**

| Content Type  | Duration | Cache-Control                 |
| ------------- | -------- | ----------------------------- |
| Static assets | 1 year   | `max-age=31536000, immutable` |
| API data      | 1 hour   | `max-age=3600`                |
| HTML pages    | 1 minute | `max-age=60, s-maxage=60`     |
| User-specific | None     | `no-cache, no-store`          |

## Bundle Analysis

### Enable Bundle Analyzer

**Install:**

```bash
npm install --save-dev @next/bundle-analyzer
```

**Configure:**

```javascript
// next.config.mjs
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // Your config
};

export default withBundleAnalyzer(nextConfig);
```

**Run:**

```bash
npm run build:analyze
# Opens browser with bundle visualization
```

### Optimize Large Dependencies

**If a dependency is too large:**

1. **Find lighter alternative:**

```bash
npm uninstall moment
npm install date-fns # Lighter alternative
```

2. **Use dynamic imports:**

```typescript
// Only load when needed
const handleExport = async () => {
  const { exportToCSV } = await import("csv-exporter");
  exportToCSV(data);
};
```

3. **Configure package imports:**

```javascript
// next.config.mjs
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-dialog"],
  },
};
```

## Performance Monitoring

### Vercel Speed Insights

**Already integrated:**

```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Lighthouse CI

**Continuous performance monitoring:**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/projects
          uploadArtifacts: true
```

### Web Vitals Tracking

**Custom tracking:**

```typescript
// app/layout.tsx
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);

    // Or send to your analytics service
    if (window.gtag) {
      window.gtag("event", metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_rating: metric.rating,
      });
    }
  });

  return null;
}
```

## Performance Checklist

### Build Optimizations

- [ ] Use Next.js Image component for all images
- [ ] Set priority on above-fold images
- [ ] Add blur placeholders to images
- [ ] Optimize image sizes (< 200KB each)
- [ ] Use WebP format when possible
- [ ] Dynamic import heavy components
- [ ] Optimize font loading with next/font
- [ ] Remove unused dependencies
- [ ] Enable compression (Gzip/Brotli)

### Runtime Optimizations

- [ ] Use static generation when possible
- [ ] Implement proper caching headers
- [ ] Minimize client-side JavaScript
- [ ] Use React Server Components
- [ ] Memoize expensive computations
- [ ] Debounce user input handlers
- [ ] Lazy load below-fold content

### Monitoring

- [ ] Run Lighthouse regularly
- [ ] Monitor Core Web Vitals
- [ ] Check bundle size after changes
- [ ] Set performance budgets
- [ ] Track real user metrics

## Common Performance Issues

### Issue: Slow LCP

**Causes:**

- Large images above fold
- Blocking JavaScript
- Slow server response

**Solutions:**

- Optimize images
- Use priority attribute
- Implement CDN

### Issue: Poor FID

**Causes:**

- Heavy JavaScript execution
- Long tasks blocking main thread

**Solutions:**

- Code splitting
- Remove unused code
- Use web workers for heavy tasks

### Issue: High CLS

**Causes:**

- Images without dimensions
- Dynamically injected content
- Web fonts causing layout shifts

**Solutions:**

- Set image width/height
- Reserve space for dynamic content
- Use `font-display: swap`

## See Also

- [SEO Guide](./01-seo-guide.md) - Complete SEO implementation
- [Analytics](./04-analytics.md) - Google Analytics & GTM
- [Best Practices](../03-best-practices.md) - Code patterns

## Next Steps

- Run Lighthouse audit
- Optimize images
- Enable bundle analyzer
- Set performance budgets
- Monitor Core Web Vitals
- Implement improvements

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
