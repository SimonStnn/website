# Environment Variables

**Navigation:** [Home](../../README.md) > [Development](./README.md) > Environment Variables

---

## Overview

Environment variables are used to configure the Simon Stijnen Portfolio website for different environments (development, production, testing). This guide provides a complete reference for all environment variables used in the project.

## Environment Files

### File Structure

```
/workspaces/website/
├── .env                # Your local environment (git-ignored)
├── .env.example        # Template file (committed to git)
└── .env.local          # Optional local overrides (git-ignored)
```

### File Priority

Next.js loads environment variables in this order (later files override earlier ones):

1. `.env` - Default values for all environments
2. `.env.local` - Local overrides (not committed to git)
3. `.env.development` - Development-specific (during `npm run dev`)
4. `.env.production` - Production-specific (during `npm run build`)
5. `.env.test` - Test-specific (during `npm test`)

**For this project, we primarily use `.env` for simplicity.**

## Variable Types

### Public Variables (`NEXT_PUBLIC_*`)

Variables prefixed with `NEXT_PUBLIC_` are **exposed to the browser** and can be accessed in client-side code.

**Characteristics:**

- Available in both server and client components
- Embedded in the JavaScript bundle at build time
- Visible in browser DevTools (anyone can see them)
- **Never store secrets here**

**Example:**

```typescript
// Accessible anywhere (server or client)
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
```

### Server-Only Variables

Variables **without** the `NEXT_PUBLIC_` prefix are **server-side only**.

**Characteristics:**

- Only available on the server
- Not included in the browser bundle
- Safe for secrets (API keys, webhook URLs)
- Accessed via `process.env` in server components

**Example:**

```typescript
// Only accessible in Server Components, API routes, middleware
const webhookUrl = process.env.WEBHOOK_URL;
```

## Complete Variable Reference

### `.env.example` Template

```env
# ==============================================================================
# PUBLIC VARIABLES (Exposed to Browser)
# ==============================================================================

# Site Information
NEXT_PUBLIC_SITE_NAME="Simon Stijnen"
NEXT_PUBLIC_SITE_URL="https://simon.stijnen.be"
NEXT_PUBLIC_SITE_DESCRIPTION="Personal portfolio website for Simon Stijnen."

# Author Information
NEXT_PUBLIC_AUTHOR_NAME="Simon Stijnen"
NEXT_PUBLIC_AUTHOR_EMAIL="simon.stijnen.23+portfolio@gmail.com"
NEXT_PUBLIC_AUTHOR_CITY="Bruges"
NEXT_PUBLIC_AUTHOR_COUNTRY="Belgium"
NEXT_PUBLIC_AUTHOR_JOB_TITLE="Software Engineer & AI student"

# Education
NEXT_PUBLIC_AUTHOR_ALUMNI_OF="VIVES University of Applied Sciences"
NEXT_PUBLIC_AUTHOR_ALUMNI_OF_URL="https://www.vives.be/en"
NEXT_PUBLIC_AUTHOR_CREDENTIAL="Computer Science - Software Engineering & AI (in progress)"

# Employment
NEXT_PUBLIC_AUTHOR_WORKS_FOR="Cerm"
NEXT_PUBLIC_AUTHOR_WORKS_FOR_URL="https://www.cerm.be/"

# Social Links
NEXT_PUBLIC_GITHUB_URL="https://github.com/SimonStnn"
NEXT_PUBLIC_LINKEDIN_URL="https://www.linkedin.com/in/simon-stijnen/"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"     # Google Analytics ID
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"     # Google Tag Manager ID

# ==============================================================================
# SERVER-SIDE ONLY VARIABLES (Never Exposed to Browser)
# ==============================================================================

# Webhooks (Optional)
WEBHOOK_URL="https://example.com/webhook"
WEBHOOK_ENABLED="false"
```

## Variable Descriptions

### Site Configuration

#### `NEXT_PUBLIC_SITE_NAME`

**Type:** String (public)  
**Required:** Yes  
**Default:** `"Simon Stijnen"`  
**Used in:** Site title, meta tags, footer

**Description:** The name displayed across the website and in browser tabs.

**Example:**

```typescript
// lib/config.ts
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Simon Stijnen",
};
```

**Usage in components:**

```tsx
// app/layout.tsx
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: siteConfig.name,
};
```

#### `NEXT_PUBLIC_SITE_URL`

**Type:** String (public)  
**Required:** Yes  
**Default:** `"https://simon.stijnen.be"`  
**Used in:** Meta tags, sitemap, canonical URLs, Open Graph

**Description:** The canonical URL of your website. Must be the full URL including protocol.

**Important:**

- Use `http://localhost:3000` for local development
- Use production URL for deployed environments
- Affects Open Graph sharing and SEO

**Example:**

```typescript
// Used for canonical URLs
const url = new URL(siteConfig.url);
console.log(url.hostname); // "simon.stijnen.be"
```

#### `NEXT_PUBLIC_SITE_DESCRIPTION`

**Type:** String (public)  
**Required:** Yes  
**Default:** `"Personal portfolio website for Simon Stijnen."`  
**Used in:** Meta description tags, SEO

**Description:** A brief description of your site for search engines and social media previews.

**Best practices:**

- Keep it under 160 characters
- Include relevant keywords
- Make it compelling for click-through

**Example:**

```typescript
export const metadata = {
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
};
```

### Author Information

#### `NEXT_PUBLIC_AUTHOR_NAME`

**Type:** String (public)  
**Required:** Yes  
**Default:** `"Simon Stijnen"`  
**Used in:** About page, footer, contact info

**Description:** Your full name as displayed throughout the site.

#### `NEXT_PUBLIC_AUTHOR_EMAIL`

**Type:** String (public)  
**Required:** Yes  
**Default:** `"simon.stijnen.23+portfolio@gmail.com"`  
**Used in:** Contact page, structured data

**Description:** Your contact email address.

**Note:** This is public and will be visible in the page source. Use a email address you're comfortable sharing publicly or use a contact form service.

#### `NEXT_PUBLIC_AUTHOR_CITY` & `NEXT_PUBLIC_AUTHOR_COUNTRY`

**Type:** String (public)  
**Required:** No  
**Default:** `"Bruges"`, `"Belgium"`  
**Used in:** About page, structured data

**Description:** Your location for professional context.

#### `NEXT_PUBLIC_AUTHOR_JOB_TITLE`

**Type:** String (public)  
**Required:** No  
**Default:** `"Software Engineer & AI student"`  
**Used in:** Homepage, About page, structured data

**Description:** Your current job title or professional identity.

### Education & Employment

#### `NEXT_PUBLIC_AUTHOR_ALUMNI_OF`

**Type:** String (public)  
**Required:** No  
**Default:** `"VIVES University of Applied Sciences"`  
**Used in:** About page, structured data (schema.org Person)

**Description:** Educational institution name.

#### `NEXT_PUBLIC_AUTHOR_ALUMNI_OF_URL`

**Type:** String (public)  
**Required:** No  
**Default:** `"https://www.vives.be/en"`  
**Used in:** About page links, structured data

**Description:** URL to educational institution website.

#### `NEXT_PUBLIC_AUTHOR_CREDENTIAL`

**Type:** String (public)  
**Required:** No  
**Default:** `"Computer Science - Software Engineering & AI (in progress)"`  
**Used in:** About page, structured data

**Description:** Degree or credential information.

#### `NEXT_PUBLIC_AUTHOR_WORKS_FOR`

**Type:** String (public)  
**Required:** No  
**Default:** `"Cerm"`  
**Used in:** About page, structured data

**Description:** Current employer name.

#### `NEXT_PUBLIC_AUTHOR_WORKS_FOR_URL`

**Type:** String (public)  
**Required:** No  
**Default:** `"https://www.cerm.be/"`  
**Used in:** About page links, structured data

**Description:** Employer website URL.

### Social Links

#### `NEXT_PUBLIC_GITHUB_URL`

**Type:** String (public)  
**Required:** Yes  
**Default:** `"https://github.com/SimonStnn"`  
**Used in:** Social links, footer, project links

**Description:** Your GitHub profile URL.

**Example:**

```tsx
import { siteConfig } from "@/lib/config";

export function SocialLinks() {
  return (
    <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
      GitHub
    </a>
  );
}
```

#### `NEXT_PUBLIC_LINKEDIN_URL`

**Type:** String (public)  
**Required:** Yes  
**Default:** `"https://www.linkedin.com/in/simon-stijnen/"`  
**Used in:** Social links, footer, contact page

**Description:** Your LinkedIn profile URL.

### Analytics

#### `NEXT_PUBLIC_GA_ID`

**Type:** String (public)  
**Required:** No  
**Default:** `""`  
**Used in:** Google Analytics integration

**Description:** Google Analytics 4 measurement ID (format: `G-XXXXXXXXXX`).

**Where to get it:**

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com/)
2. Go to Admin → Data Streams → Your stream
3. Copy the Measurement ID

**Example:**

```env
NEXT_PUBLIC_GA_ID="G-ABC123XYZ"
```

**Usage:**

```typescript
// lib/config.ts
export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
};

// Only loads if ID is present
if (analyticsConfig.gaId) {
  // Initialize Google Analytics
}
```

#### `NEXT_PUBLIC_GTM_ID`

**Type:** String (public)  
**Required:** No  
**Default:** `""`  
**Used in:** Google Tag Manager integration

**Description:** Google Tag Manager container ID (format: `GTM-XXXXXXX`).

**Where to get it:**

1. Create a container at [tagmanager.google.com](https://tagmanager.google.com/)
2. Copy the Container ID from the top of the workspace

**Example:**

```env
NEXT_PUBLIC_GTM_ID="GTM-1234567"
```

### Server-Side Variables

#### `WEBHOOK_URL`

**Type:** String (server-only)  
**Required:** No  
**Default:** `""`  
**Used in:** Analytics webhook middleware

**Description:** URL to send analytics events to via webhook (must use HTTPS).

**Example:**

```env
WEBHOOK_URL="https://api.yourservice.com/analytics/events"
```

**Security:**

- Must use HTTPS in production
- Can use HTTP for local testing
- Never exposed to client

**Code usage:**

```typescript
// middleware/analytics.ts (server-side only)
const webhookUrl = process.env.WEBHOOK_URL;

if (webhookUrl) {
  await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify(analyticsData),
  });
}
```

#### `WEBHOOK_ENABLED`

**Type:** Boolean (server-only)  
**Required:** No  
**Default:** `"false"`  
**Used in:** Analytics webhook toggle

**Description:** Enable or disable webhook functionality.

**Values:**

- `"true"` - Enable webhooks
- `"false"` - Disable webhooks

**Example:**

```typescript
const isWebhookEnabled = process.env.WEBHOOK_ENABLED === "true";
```

## Configuration Access

### Using the Config Module

The project provides a centralized configuration module at `lib/config.ts`:

```typescript
// lib/config.ts
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Simon Stijnen",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://simon.stijnen.be",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Software engineer and AI student in Belgium building scalable, reliable products.",
  author: {
    name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Simon Stijnen",
    email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || "simon.stijnen.23+portfolio@gmail.com",
  },
  location: {
    city: process.env.NEXT_PUBLIC_AUTHOR_CITY || "Bruges",
    country: process.env.NEXT_PUBLIC_AUTHOR_COUNTRY || "Belgium",
  },
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/SimonStnn",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/simon-stijnen/",
  },
};

export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
};

export const appConfig = {
  environment: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
};
```

### Using Config in Components

**Always import from the config module, not directly from `process.env`:**

```typescript
// ✅ Correct - Type-safe and centralized
import { siteConfig } from "@/lib/config";

export function Header() {
  return <h1>{siteConfig.name}</h1>;
}

// ❌ Avoid - Direct access bypasses defaults
export function Header() {
  return <h1>{process.env.NEXT_PUBLIC_SITE_NAME}</h1>;
}
```

## Environment-Specific Configuration

### Development Environment

**File:** `.env` (local)

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_GA_ID=""  # Leave empty to disable analytics
NEXT_PUBLIC_GTM_ID="" # Leave empty to disable GTM
WEBHOOK_ENABLED="false"
```

**Running:**

```bash
npm run dev
```

### Production Environment

**Platform-specific (Vercel, Docker, etc.)**

**Vercel:**

Set environment variables in Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable with production values
3. Deploy

**Docker:**

```bash
# Pass via docker-compose.yml
environment:
  - NEXT_PUBLIC_SITE_URL=https://simon.stijnen.be
  - NEXT_PUBLIC_GA_ID=G-ABC123XYZ

# Or via .env file
docker-compose up --env-file .env.production
```

### Test Environment

**File:** `.env.test` (optional)

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Test Site"
```

**Running:**

```bash
npm test
```

## Validation and Debugging

### Checking Loaded Variables

**During development:**

```bash
npm run dev
```

Terminal shows:

```
  ▲ Next.js 15.5.9 (turbo)
  - Local:        http://localhost:3000
  - Environments: .env          # Shows which files are loaded
```

**In code (Server Component only):**

```typescript
export default function DebugPage() {
  console.log("Site URL:", process.env.NEXT_PUBLIC_SITE_URL);
  console.log("GA ID:", process.env.NEXT_PUBLIC_GA_ID);
  console.log("Webhook URL:", process.env.WEBHOOK_URL); // Server-only

  return <div>Check terminal/console</div>;
}
```

**In code (Client Component):**

```typescript
"use client";

export function DebugClient() {
  console.log("Site URL:", process.env.NEXT_PUBLIC_SITE_URL); // ✅ Works
  console.log("Webhook URL:", process.env.WEBHOOK_URL); // ❌ undefined (server-only)

  return <div>Check browser console</div>;
}
```

### Common Issues

#### Issue: Variables Not Updating

**Problem:** Changed `.env` but values don't update.

**Solution:** Restart the dev server:

```bash
# Stop server (Ctrl + C)
npm run dev
```

Environment variables are loaded once at startup, not hot-reloaded.

#### Issue: `undefined` in Client Component

**Problem:** `process.env.WEBHOOK_URL` is `undefined` in client component.

**Solution:** Server-only variables aren't accessible in client components. Either:

1. Use `NEXT_PUBLIC_*` prefix (if safe to expose)
2. Access via API route or Server Action

#### Issue: Build-Time vs Runtime

**Problem:** Variable changes don't appear in production build.

**Solution:**

- `NEXT_PUBLIC_*` variables are embedded at **build time**
- Rebuild after changing them:

  ```bash
  npm run build
  ```

- Server-only variables are read at **runtime** (no rebuild needed)

## Security Best Practices

### ✅ Do's

- **Use `NEXT_PUBLIC_*` only for non-sensitive data**
- Store API keys, secrets as server-only variables
- Use different values for development and production
- Add `.env` to `.gitignore` (already done)
- Commit `.env.example` as a template

### ❌ Don'ts

- Never commit `.env` with real credentials
- Don't put secrets in `NEXT_PUBLIC_*` variables
- Don't hardcode values in source code
- Don't share production `.env` files publicly

## See Also

- [Getting Started](./01-getting-started.md) - Initial setup with environment variables
- [Development Workflow](./02-development-workflow.md) - Using variables during development
- [Next.js Config](./05-nextjs-config.md) - How config uses environment variables
- [Next.js Environment Variables Docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## Next Steps

- [Configure npm scripts](./04-npm-scripts.md) for different environments
- [Set up Next.js config](./05-nextjs-config.md) to use environment variables
- [Deploy your site](../05-deployment/) with production environment variables

---

**Last updated:** February 2026
