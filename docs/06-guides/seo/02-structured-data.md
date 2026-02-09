# Structured Data (JSON-LD) Implementation

**Breadcrumbs:** [Documentation](../../README.md) > [Guides](../README.md) > [SEO](./README.md) > Structured Data

This guide explains the implementation of structured data using JSON-LD schemas for enhanced search engine understanding.

## Table of Contents

- [Overview](#overview)
- [What is Structured Data?](#what-is-structured-data)
- [Implementation](#implementation)
- [Schema Types](#schema-types)
- [Testing and Validation](#testing-and-validation)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Structured data helps search engines understand your content and can enable rich results in search (e.g., cards, snippets, knowledge panels).

**Implemented schemas:**

- **Person** - Portfolio owner information
- **CreativeWork** - Individual projects
- **Organization** - Current employer (if applicable)
- **BreadcrumbList** - Page navigation paths

**Benefits:**

- Enhanced search results appearance
- Better AI agent understanding
- Knowledge panel eligibility
- Rich snippets in search
- Improved click-through rates

## What is Structured Data?

### JSON-LD Format

JSON-LD (JavaScript Object Notation for Linked Data) is the recommended format by Google.

**Example:**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Simon Stijnen",
  "jobTitle": "Software Engineer & AI student",
  "url": "https://simon.stijnen.be"
}
```

### Why Schema.org?

[Schema.org](https://schema.org) is a collaborative vocabulary for structured data, supported by:

- Google
- Microsoft
- Yahoo
- Yandex

**Coverage:**

- 800+ types
- 1,000+ properties
- Multiple domains (products, events, organizations, etc.)

## Implementation

### File Structure

```
components/
└── meta/
    └── structured-data.tsx
```

### Person Schema

**Component:**

{% raw %}

```typescript
// components/meta/structured-data.tsx
interface PersonJsonLdProps {
  name: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  homeCountry: string;
  worksFor: Array<{ name: string; url: string }>;
  alumniOf: Array<{ name: string; url: string }>;
  hasCredential: Array<{ name: string }>;
  knowsAbout: string[];
  email: string;
}

export function PersonJsonLd({
  name,
  url,
  sameAs,
  jobTitle,
  homeCountry,
  worksFor,
  alumniOf,
  hasCredential,
  knowsAbout,
  email,
}: PersonJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    url: url,
    sameAs: sameAs,
    jobTitle: jobTitle,
    email: email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: homeCountry,
    },
    worksFor: worksFor.map((org) => ({
      '@type': 'Organization',
      name: org.name,
      url: org.url,
    })),
    alumniOf: alumniOf.map((school) => ({
      '@type': 'EducationalOrganization',
      name: school.name,
      url: school.url,
    })),
    hasCredential: hasCredential.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      name: credential.name,
    })),
    knowsAbout: knowsAbout,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

{% endraw %}

**Usage in layout:**

```typescript
// app/layout.tsx
import { PersonJsonLd } from '@/components/meta/structured-data';
import { siteConfig } from '@/lib/config';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <PersonJsonLd
          name={siteConfig.author.name}
          url={siteConfig.url}
          sameAs={[siteConfig.social.linkedin, siteConfig.social.github]}
          jobTitle={siteConfig.person.jobTitle}
          homeCountry={siteConfig.location.country}
          worksFor={siteConfig.person.worksFor}
          alumniOf={siteConfig.person.alumniOf}
          hasCredential={siteConfig.person.hasCredential}
          knowsAbout={siteConfig.person.knowsAbout}
          email={siteConfig.author.email}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Result in HTML:**

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Simon Stijnen",
    "jobTitle": "Software Engineer & AI student",
    "url": "https://simon.stijnen.be",
    "email": "simon.stijnen.23+portfolio@gmail.com",
    "sameAs": ["https://www.linkedin.com/in/simon-stijnen/", "https://github.com/SimonStnn"],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Cerm",
        "url": "https://www.cerm.be/"
      }
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "VIVES University of Applied Sciences",
        "url": "https://www.vives.be/en"
      }
    ],
    "knowsAbout": ["TypeScript", "React", "Next.js", "Python", "AI"]
  }
</script>
```

### Project (CreativeWork) Schema

**Component:**

{% raw %}

```typescript
// components/meta/structured-data.tsx
import { Project } from '@/lib/projects';
import { siteConfig } from '@/lib/config';

interface ProjectJsonLdProps {
  project: Project;
}

export function ProjectJsonLd({ project }: ProjectJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    keywords: project.technologies.join(', '),
    image: project.images.map((img) => ({
      '@type': 'ImageObject',
      url: img.src,
      description: img.alt,
    })),
    dateCreated: project.dateCreated || new Date().toISOString(),
    inLanguage: 'en',
  };

  // Add demo URL if available
  if (project.demoUrl) {
    jsonLd.url = project.demoUrl;
  }

  // Add GitHub URL as codeRepository
  if (project.githubUrl) {
    jsonLd['codeRepository'] = project.githubUrl;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

{% endraw %}

**Usage in project page:**

```typescript
// app/projects/[slug]/page.tsx
import { ProjectJsonLd } from '@/components/meta/structured-data';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectJsonLd project={project} />
      <div>
        <h1>{project.title}</h1>
        {/* Project content */}
      </div>
    </>
  );
}
```

### BreadcrumbList Schema

**Component:**

{% raw %}

```typescript
// components/meta/structured-data.tsx
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

{% endraw %}

**Usage:**

```typescript
// app/projects/[slug]/page.tsx
import { BreadcrumbJsonLd } from '@/components/meta/structured-data';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Projects', url: `${siteConfig.url}/projects` },
    { name: project.title, url: `${siteConfig.url}/projects/${params.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Page content */}
    </>
  );
}
```

## Schema Types

### Person Schema

**Properties:**

| Property        | Type             | Description              |
| --------------- | ---------------- | ------------------------ |
| `name`          | `Text`           | Full name                |
| `givenName`     | `Text`           | First name               |
| `familyName`    | `Text`           | Last name                |
| `jobTitle`      | `Text`           | Current job title        |
| `url`           | `URL`            | Portfolio URL            |
| `email`         | `Text`           | Email address            |
| `telephone`     | `Text`           | Phone number             |
| `image`         | `URL`            | Profile photo            |
| `sameAs`        | `URL[]`          | Social profile URLs      |
| `address`       | `PostalAddress`  | Physical address         |
| `worksFor`      | `Organization[]` | Current employers        |
| `alumniOf`      | `Organization[]` | Educational institutions |
| `hasCredential` | `Credential[]`   | Certifications/degrees   |
| `knowsAbout`    | `Text[]`         | Skills and expertise     |

**Full example:**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Simon Stijnen",
  "givenName": "Simon",
  "familyName": "Stijnen",
  "jobTitle": "Software Engineer & AI student",
  "url": "https://simon.stijnen.be",
  "email": "simon.stijnen.23+portfolio@gmail.com",
  "image": "https://simon.stijnen.be/images/profile.jpg",
  "sameAs": ["https://www.linkedin.com/in/simon-stijnen/", "https://github.com/SimonStnn"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bruges",
    "addressRegion": "West Flanders",
    "addressCountry": "Belgium"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Cerm",
    "url": "https://www.cerm.be/"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "VIVES University of Applied Sciences",
    "url": "https://www.vives.be/en"
  },
  "knowsAbout": [
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "Artificial Intelligence",
    "Machine Learning"
  ]
}
```

### CreativeWork Schema

**For projects:**

| Property         | Type            | Description         |
| ---------------- | --------------- | ------------------- |
| `name`           | `Text`          | Project title       |
| `description`    | `Text`          | Project description |
| `url`            | `URL`           | Project URL         |
| `author`         | `Person`        | Creator             |
| `keywords`       | `Text`          | Technologies used   |
| `image`          | `ImageObject[]` | Screenshots         |
| `dateCreated`    | `Date`          | Creation date       |
| `dateModified`   | `Date`          | Last modified       |
| `inLanguage`     | `Text`          | Language code       |
| `codeRepository` | `URL`           | GitHub URL          |

**Example:**

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Pop-a-loon Browser Extension",
  "description": "Full-stack Chrome extension with 200+ active users, featuring real-time stats and global leaderboard",
  "url": "https://simon.stijnen.be/projects/pop-a-loon",
  "author": {
    "@type": "Person",
    "name": "Simon Stijnen"
  },
  "keywords": "TypeScript, React, Chrome Extension, MongoDB, Express",
  "image": [
    {
      "@type": "ImageObject",
      "url": "https://simon.stijnen.be/images/projects/pop-a-loon/screenshot.jpg",
      "description": "Pop-a-loon dashboard"
    }
  ],
  "dateCreated": "2023-01-15",
  "codeRepository": "https://github.com/SimonStnn/pop-a-loon",
  "inLanguage": "en"
}
```

### Organization Schema

**For employers:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cerm",
  "url": "https://www.cerm.be/",
  "logo": "https://www.cerm.be/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "General Inquiries",
    "url": "https://www.cerm.be/contact"
  }
}
```

### WebSite Schema

**For the portfolio site:**

{% raw %}

```typescript
export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    inLanguage: 'en',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

{% endraw %}

## Testing and Validation

### Google Rich Results Test

**Test URL:**

```
https://search.google.com/test/rich-results
```

**Steps:**

1. Visit the Rich Results Test
2. Enter your page URL
3. Click "Test URL"
4. Review results

**What to check:**

- All schemas detected
- No errors
- No warnings (if possible)
- All properties present

### Schema Markup Validator

**Alternative validator:**

```
https://validator.schema.org/
```

**Supports:**

- JSON-LD
- Microdata
- RDFa

**Usage:**

1. Copy your JSON-LD
2. Paste into validator
3. Check for errors
4. Fix issues

### Testing with Google Search Console

**Steps:**

1. Go to Google Search Console
2. Navigate to "Enhancements"
3. Check for structured data issues
4. Fix any errors reported

### Manual Testing

**Check HTML source:**

```bash
curl https://your-domain.com | grep -A 50 'application/ld+json'
```

**Validate JSON:**

```bash
# Extract JSON-LD from page
curl https://your-domain.com | \
  grep -o '<script type="application/ld+json">.*</script>' | \
  sed 's/<[^>]*>//g' | \
  jq '.'
```

## Best Practices

### 1. Use Specific Types

```typescript
// ✅ GOOD: Specific type
{
  "@type": "Person",
  "jobTitle": "Software Engineer"
}

// ❌ BAD: Generic type
{
  "@type": "Thing",
  "description": "A person"
}
```

### 2. Include All Relevant Properties

```typescript
// ✅ GOOD: Comprehensive
{
  "@type": "Person",
  "name": "Simon Stijnen",
  "jobTitle": "Software Engineer",
  "url": "https://simon.stijnen.be",
  "sameAs": ["https://linkedin.com/in/simon-stijnen"],
  "worksFor": { "@type": "Organization", "name": "Cerm" }
}

// ❌ BAD: Minimal
{
  "@type": "Person",
  "name": "Simon Stijnen"
}
```

### 3. Nest Related Entities

```typescript
// ✅ GOOD: Nested organization
{
  "@type": "Person",
  "worksFor": {
    "@type": "Organization",
    "name": "Cerm",
    "url": "https://www.cerm.be/"
  }
}

// ❌ BAD: Just a string
{
  "@type": "Person",
  "worksFor": "Cerm"
}
```

### 4. Use Absolute URLs

```typescript
// ✅ GOOD: Absolute URL
"url": "https://simon.stijnen.be/projects/project-slug"

// ❌ BAD: Relative URL
"url": "/projects/project-slug"
```

### 5. Validate Before Deploying

```bash
# Run validation in CI/CD
npm run build
npm run validate-schema
```

### 6. Keep Data Consistent

Ensure structured data matches visible content:

```typescript
// ✅ GOOD: Matches page content
<h1>Pop-a-loon Browser Extension</h1>
<script type="application/ld+json">
{
  "@type": "CreativeWork",
  "name": "Pop-a-loon Browser Extension"
}
</script>

// ❌ BAD: Doesn't match
<h1>Pop-a-loon</h1>
<script type="application/ld+json">
{
  "@type": "CreativeWork",
  "name": "Different Project Name"
}
</script>
```

## Troubleshooting

### Issue: Schema not detected

**Possible causes:**

1. **Invalid JSON**

```bash
# Validate JSON syntax
cat schema.json | jq '.'
```

2. **Wrong script type**

```html
<!-- ❌ Wrong -->
<script type="text/javascript">
  ...
</script>

<!-- ✅ Correct -->
<script type="application/ld+json">
  ...
</script>
```

3. **Not in `<head>` or `<body>`**

Structured data must be in `<head>` or `<body>`, not elsewhere.

### Issue: Properties not recognized

**Check property names:**

```typescript
// ❌ Wrong property name
{
  "@type": "Person",
  "job": "Engineer"  // Should be "jobTitle"
}

// ✅ Correct
{
  "@type": "Person",
  "jobTitle": "Engineer"
}
```

**Reference:** [Schema.org documentation](https://schema.org)

### Issue: Warnings in Rich Results Test

**Common warnings:**

1. **Missing recommended property**

Add recommended properties for better results.

2. **Property not recognized for this type**

Remove properties not applicable to the schema type.

## See Also

- [SEO Guide](./01-seo-guide.md) - Complete SEO implementation
- [Sitemap & Robots](./03-sitemap-robots.md) - Search engine configuration
- [Analytics](./04-analytics.md) - Google Analytics & GTM
- [Performance](./05-performance.md) - Performance optimization

## Next Steps

- Implement Person schema
- Add Project schemas
- Test with Rich Results Test
- Monitor in Search Console
- Add more schema types as needed

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
