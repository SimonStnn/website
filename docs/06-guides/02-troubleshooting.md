# Troubleshooting Guide

**Breadcrumbs:** [Documentation](../index.md) > [Guides](./index.md) > Troubleshooting

This guide provides solutions to common issues you may encounter while developing or deploying the portfolio website.

## Table of Contents

- [Development Issues](#development-issues)
- [Build Issues](#build-issues)
- [Deployment Issues](#deployment-issues)
- [Content Issues](#content-issues)
- [Performance Issues](#performance-issues)
- [SEO Issues](#seo-issues)
- [Environment Issues](#environment-issues)
- [Database/Content Issues](#databasecontent-issues)

## Development Issues

### Issue: Development server won't start

**Symptoms:**

```bash
npm run dev
# Error: Cannot find module 'next'
```

**Solution:**

1. Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clear Next.js cache:

```bash
rm -rf .next
npm run dev
```

3. Check Node.js version:

```bash
node --version
# Should be v20 or higher
```

If version is too low, upgrade Node.js:

```bash
# Using nvm
nvm install 20
nvm use 20
```

### Issue: Module not found errors

**Symptoms:**

```bash
Module not found: Can't resolve '@/components/ui/button'
```

**Solution:**

1. Check `tsconfig.json` has correct path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

2. Restart TypeScript server in VS Code:
   - Press `Cmd/Ctrl + Shift + P`
   - Type "TypeScript: Restart TS Server"
   - Select and run

3. Restart development server:

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Issue: Hot reload not working

**Symptoms:**

- Changes to files don't reflect in browser
- Must manually refresh to see changes

**Solution:**

1. **Check file watchers limit (Linux/WSL):**

```bash
# Check current limit
cat /proc/sys/fs/inotify/max_user_watches

# Increase limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

2. **Restart development server with Turbopack:**

```bash
npm run dev
# Uses --turbopack flag by default
```

3. **Check for TypeScript errors:**

- Fix any TypeScript errors in the console
- Errors can prevent hot reload

### Issue: Styles not applying correctly

**Symptoms:**

- Tailwind classes not working
- Components look unstyled
- Dark mode not working

**Solution:**

1. **Check Tailwind CSS configuration:**

```typescript
// tailwind.config.ts
content: [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
],
```

2. **Verify CSS imports:**

```typescript
// app/layout.tsx
import "./globals.css";
```

3. **Check dark mode configuration:**

```typescript
// tailwind.config.ts
darkMode: 'class',
```

4. **Clear browser cache:**

- Open DevTools (F12)
- Right-click refresh button
- Select "Empty Cache and Hard Reload"

5. **Rebuild Tailwind:**

```bash
rm -rf .next
npm run dev
```

### Issue: TypeScript errors in components

**Symptoms:**

```typescript
Property 'slug' does not exist on type 'Project'
```

**Solution:**

1. **Check interface definitions:**

```typescript
// lib/projects.ts
export interface Project {
  slug: string;
  title: string;
  // ... other fields
}
```

2. **Verify type imports:**

```typescript
import { Project } from "@/lib/projects";
```

3. **Restart TypeScript server** (see above)

## Build Issues

### Issue: Build fails with TypeScript errors

**Symptoms:**

```bash
npm run build
# Type error: Property 'x' does not exist on type 'Y'
```

**Solution:**

1. **Run type checking locally:**

```bash
npx tsc --noEmit
```

2. **Fix all type errors** - No `any` workarounds in production

3. **Check for unused imports:**

```bash
npm run lint
```

### Issue: Build fails with "Out of memory"

**Symptoms:**

```bash
npm run build
# FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

**Solution:**

1. **Increase Node.js memory:**

```bash
# package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

2. **Check for circular dependencies:**

```bash
npm install --save-dev madge
npx madge --circular --extensions ts,tsx .
```

3. **Optimize imports:**

```typescript
// ❌ BAD: Imports entire library
import { Button } from "@/components/ui";

// ✅ GOOD: Specific import
import { Button } from "@/components/ui/button";
```

### Issue: Build succeeds but pages are blank

**Symptoms:**

- `npm run build` succeeds
- Deployed site shows blank pages
- Console shows errors

**Solution:**

1. **Check environment variables:**

```bash
# .env.production
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

2. **Check for client-only code in server components:**

```typescript
// ❌ BAD: Using browser APIs in server component
export default function Page() {
  const width = window.innerWidth; // Error!
  return <div>{width}</div>;
}

// ✅ GOOD: Use client component
'use client';

export default function Page() {
  const width = window.innerWidth;
  return <div>{width}</div>;
}
```

3. **Check console for errors:**

- Open browser DevTools (F12)
- Look for errors in Console tab
- Fix any runtime errors

### Issue: Static generation fails

**Symptoms:**

```bash
Error: Page "/projects/[slug]" is missing "generateStaticParams()"
```

**Solution:**

```typescript
// app/projects/[slug]/page.tsx
import { getProjects } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

## Deployment Issues

### Issue: Docker build fails

**Symptoms:**

```bash
docker-compose up website-prod
# Error: failed to solve with frontend dockerfile.v0
```

**Solution:**

1. **Check Dockerfile syntax:**

```dockerfile
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["npm", "start"]
```

2. **Check Docker Compose configuration:**

```yaml
version: "3.8"
services:
  website-prod:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
```

3. **Rebuild without cache:**

```bash
docker-compose build --no-cache website-prod
docker-compose up website-prod
```

### Issue: Deployed site shows 404 errors

**Symptoms:**

- Home page works
- Other pages show 404

**Solution:**

1. **Check Next.js output mode:**

```typescript
// next.config.mjs
const nextConfig = {
  output: "standalone", // For Docker deployments
};
```

2. **Verify file structure in build:**

```bash
docker-compose exec website-prod ls -la /app/.next/standalone
```

3. **Check server configuration** - Ensure all routes are handled by Next.js

### Issue: Environment variables not working

**Symptoms:**

- Site loads but features don't work
- Console shows "undefined" for config values

**Solution:**

1. **Check variable prefix:**

```bash
# ✅ GOOD: Available in browser
NEXT_PUBLIC_SITE_URL="https://example.com"

# ❌ BAD: Only available server-side
SITE_URL="https://example.com"
```

2. **Rebuild after changing environment variables:**

```bash
npm run build
# or
docker-compose build website-prod
```

3. **Verify in Docker Compose:**

```yaml
services:
  website-prod:
    environment:
      - NEXT_PUBLIC_SITE_URL=https://example.com
      - NODE_ENV=production
```

## Content Issues

### Issue: Project not showing up

**Symptoms:**

- Created `my-project.json`
- Project doesn't appear on `/projects` page

**Checklist:**

1. **File location correct?**

```bash
content/projects/my-project.json  # ✅ Correct
content/my-project.json          # ❌ Wrong location
```

2. **Valid JSON?**

```bash
# Test JSON validity
cat content/projects/my-project.json | jq .
```

3. **Required fields present?**

```json
{
  "title": "Project Title",
  "shortDescription": "Brief description",
  "description": "Long description",
  "technologies": ["Next.js"],
  "images": []
}
```

4. **Restart development server:**

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Issue: Project images not displaying

**Symptoms:**

- Images show broken icon
- 404 error in console

**Solution:**

1. **Check image path:**

```json
{
  "images": [
    {
      "src": "/images/projects/my-project/screenshot.jpg",
      "alt": "Screenshot description"
    }
  ]
}
```

2. **Verify file exists:**

```bash
ls -la public/images/projects/my-project/
# Should show screenshot.jpg
```

3. **Check file permissions:**

```bash
chmod 644 public/images/projects/my-project/*.jpg
```

4. **Supported formats:**

- Images: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Videos: `.mp4`, `.webm`, `.mov`

### Issue: Project order not working

**Symptoms:**

- Set `"order": 1` but project appears in wrong position

**Solution:**

1. **Check order values:**

```json
// Featured projects: order 1-6
{
  "order": 1  // Will appear first
}

// Non-featured projects: no order field or order > 6
{
  // No order field - sorted alphabetically
}
```

2. **Verify in code:**

```typescript
// lib/projects.ts sorts by order, then alphabetically
export async function getProjects(): Promise<Project[]> {
  return projects.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    // ...
  });
}
```

## Performance Issues

### Issue: Slow page loads

**Symptoms:**

- Pages take > 3 seconds to load
- Large JavaScript bundles

**Solution:**

1. **Analyze bundle size:**

```bash
npm run build:analyze
```

2. **Optimize images:**

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/profile.jpg"
  alt="Profile"
  width={500}
  height={500}
  priority // For above-the-fold images
/>
```

3. **Lazy load components:**

```typescript
import dynamic from 'next/dynamic';

const ProjectGallery = dynamic(() => import('@/components/project-gallery'), {
  loading: () => <p>Loading...</p>,
});
```

4. **Enable caching:**

```typescript
// app/api/route.ts
export async function GET() {
  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
```

### Issue: Large bundle size

**Symptoms:**

- Build output shows large chunks
- Slow initial page load

**Solution:**

1. **Check bundle analyzer:**

```bash
npm run build:analyze
# Opens browser with bundle visualization
```

2. **Split large dependencies:**

```typescript
// next.config.mjs
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@radix-ui/react-dialog", "lucide-react"],
  },
};
```

3. **Remove unused dependencies:**

```bash
npm uninstall unused-package
```

## SEO Issues

### Issue: Sitemap not generating

**Symptoms:**

- `/sitemap.xml` returns 404

**Solution:**

1. **Check sitemap file exists:**

```typescript
// app/sitemap.ts should exist
export default async function sitemap() {
  // ...
}
```

2. **Verify build output:**

```bash
npm run build
# Check for sitemap generation in output
```

3. **Check deployment:**

```bash
curl https://your-domain.com/sitemap.xml
```

### Issue: Metadata not appearing

**Symptoms:**

- Page title is wrong
- Description missing in search results

**Solution:**

1. **Check metadata exports:**

```typescript
// app/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
};
```

2. **Verify in browser:**

- View page source (Ctrl+U)
- Search for `<title>` and `<meta name="description">`

3. **Check template:**

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: "%s | Software Engineer & AI",
    default: "Simon Stijnen | Software Engineer & AI",
  },
};
```

### Issue: Robots.txt not working

**Symptoms:**

- Search engines not crawling site

**Solution:**

1. **Check robots file:**

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://your-domain.com/sitemap.xml",
  };
}
```

2. **Test robots.txt:**

```bash
curl https://your-domain.com/robots.txt
```

## Environment Issues

### Issue: .env not loading

**Symptoms:**

- Environment variables are undefined

**Solution:**

1. **Check file name:**

```bash
ls -la
# Should see .env (not env.txt or .env.txt)
```

2. **Restart development server:**

```bash
# Changes to .env require restart
npm run dev
```

3. **Check variable usage:**

```typescript
// ✅ GOOD: Public variables
const url = process.env.NEXT_PUBLIC_SITE_URL;

// ❌ BAD: Private variables in client components
("use client");
const secret = process.env.SECRET_KEY; // Undefined!
```

## Database/Content Issues

### Issue: JSON parsing errors

**Symptoms:**

```bash
Error parsing JSON for project my-project
```

**Solution:**

1. **Validate JSON:**

```bash
cat content/projects/my-project.json | jq .
# Should output formatted JSON or show error
```

2. **Common JSON mistakes:**

```json
// ❌ BAD: Trailing comma
{
  "title": "Project",
  "technologies": ["React"],
}

// ✅ GOOD: No trailing comma
{
  "title": "Project",
  "technologies": ["React"]
}

// ❌ BAD: Single quotes
{
  'title': 'Project'
}

// ✅ GOOD: Double quotes
{
  "title": "Project"
}
```

3. **Use a JSON validator:**

- Online: [jsonlint.com](https://jsonlint.com)
- Editor: Install JSON validation extension

## Getting More Help

If you're still experiencing issues:

1. **Check GitHub Issues:**
   - Search for similar issues
   - Open a new issue if needed

2. **Enable debug logging:**

```typescript
// next.config.mjs
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

3. **Check Next.js documentation:**
   - [Next.js Docs](https://nextjs.org/docs)
   - [Next.js Discord](https://discord.gg/nextjs)

4. **Inspect build output:**

```bash
npm run build -- --debug
```

## See Also

- [Contributing Guide](./01-contributing.md) - Development workflow
- [Best Practices](./03-best-practices.md) - Code patterns
- [Architecture Overview](../01-architecture/01-overview.md) - Project structure
- [Deployment Guide](../05-deployment/01-docker-guide.md) - Deployment setup

## Next Steps

- Review common solutions above
- Check logs for error details
- Search GitHub issues
- Open a new issue if problem persists

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Need Help?** Open an issue on GitHub
