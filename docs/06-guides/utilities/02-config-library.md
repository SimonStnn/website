# Configuration Library

**Breadcrumbs:** [Documentation](../../README.md) > [Guides](../README.md) > [Utilities](./README.md) > Config Library

This guide documents the configuration system in `lib/config.ts`.

## Overview

Centralized configuration using environment variables with fallback defaults.

## Configuration Objects

### siteConfig

**Site-wide information:**

```typescript
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Simon Stijnen',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://simon.stijnen.be',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Software engineer...',
  recruiterSummary: process.env.NEXT_PUBLIC_RECRUITER_SUMMARY || '...',
  author: {
    name: process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Simon Stijnen',
    email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || 'email@example.com',
  },
  location: {
    city: process.env.NEXT_PUBLIC_AUTHOR_CITY || 'Bruges',
    country: process.env.NEXT_PUBLIC_AUTHOR_COUNTRY || 'Belgium',
  },
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/...',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/...',
  },
  person: {
    jobTitle: process.env.NEXT_PUBLIC_AUTHOR_JOB_TITLE || 'Software Engineer',
    worksFor: [...],
    alumniOf: [...],
    hasCredential: [...],
    knowsAbout: ['TypeScript', 'React', 'Next.js', ...],
  },
};
```

### analyticsConfig

**Analytics settings:**

```typescript
export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
};
```

### appConfig

**Application environment:**

```typescript
export const appConfig = {
  environment: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
};
```

## Usage

```typescript
import { siteConfig, analyticsConfig, appConfig } from "@/lib/config";

// Site info
const siteName = siteConfig.name;
const siteUrl = siteConfig.url;

// Analytics
if (analyticsConfig.gaId) {
  // Initialize GA
}

// Environment checks
if (appConfig.isDevelopment) {
  console.log("Development mode");
}
```

## Environment Variables

**Required:**

```bash
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

**Optional (with defaults):**

```bash
NEXT_PUBLIC_SITE_NAME="Your Name"
NEXT_PUBLIC_SITE_DESCRIPTION="Your description"
NEXT_PUBLIC_AUTHOR_NAME="Your Name"
NEXT_PUBLIC_AUTHOR_EMAIL="your@email.com"
NEXT_PUBLIC_AUTHOR_CITY="Your City"
NEXT_PUBLIC_AUTHOR_COUNTRY="Your Country"
NEXT_PUBLIC_GITHUB_URL="https://github.com/username"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/in/username"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
```

## See Also

- [Utility Functions](./01-utility-functions.md)
- [Environment Setup](../../01-getting-started/02-installation.md)

---

**Last Updated:** February 2026
