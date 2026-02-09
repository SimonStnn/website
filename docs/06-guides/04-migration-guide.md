# Migration Guide

**Breadcrumbs:** [Documentation](../index.md) > [Guides](./index.md) > Migration Guide

This guide provides instructions for migrating between versions and upgrading dependencies for the portfolio website.

## Table of Contents

- [Overview](#overview)
- [Version Migration](#version-migration)
- [Dependency Updates](#dependency-updates)
- [Breaking Changes](#breaking-changes)
- [Data Migration](#data-migration)
- [Configuration Changes](#configuration-changes)
- [Testing After Migration](#testing-after-migration)

## Overview

This portfolio website follows semantic versioning (MAJOR.MINOR.PATCH). This guide helps you:

- Migrate from v1 to v2
- Update Next.js versions
- Upgrade React and dependencies
- Migrate content structure changes
- Handle breaking changes

### Current Version: 2.2.0

**Major versions:**

- **v1.x** - Initial version with Pages Router
- **v2.x** - Current version with App Router (Next.js 15)

**Branch strategy:**

- `main-v2` - Current production branch (Next.js 15, App Router)
- `main` - Legacy v1 branch (archived)

## Version Migration

### Migrating from v1 to v2

**Major changes:**

1. **Next.js 13+ App Router** - New routing system
2. **Server Components** - Default server-side rendering
3. **Metadata API** - New SEO approach
4. **Turbopack** - Faster development
5. **React 19** - Latest React features

#### Step 1: Backup Current Installation

```bash
# Create a backup branch
git checkout main
git checkout -b backup-v1
git push origin backup-v1

# Backup your content
cp -r content content-backup
cp -r public public-backup
```

#### Step 2: Clone v2 Codebase

```bash
# Clone fresh v2 version
git clone -b main-v2 https://github.com/SimonStnn/website.git website-v2
cd website-v2
```

#### Step 3: Migrate Content

**Projects:**

v1 structure (Pages Router):

```
pages/
├── projects/
│   └── [slug].tsx
data/
└── projects.json
```

v2 structure (App Router):

```
app/
└── projects/
    └── [slug]/
        └── page.tsx
content/
└── projects/
    ├── project-1.json
    └── project-2.json
```

**Migration script:**

```bash
# Create migration script
cat > migrate-content.sh << 'EOF'
#!/bin/bash

# Migrate projects from single JSON to individual files
if [ -f "../website-v1/data/projects.json" ]; then
  echo "Migrating projects..."

  # Parse JSON and create individual files
  jq -c '.[]' ../website-v1/data/projects.json | while read project; do
    slug=$(echo $project | jq -r '.slug')
    echo $project | jq '.' > content/projects/${slug}.json
    echo "Created content/projects/${slug}.json"
  done
fi

# Migrate images
if [ -d "../website-v1/public/images/projects" ]; then
  echo "Migrating project images..."
  cp -r ../website-v1/public/images/projects/* public/images/projects/
fi

echo "Migration complete!"
EOF

chmod +x migrate-content.sh
./migrate-content.sh
```

#### Step 4: Update Environment Variables

```bash
# Copy and update .env
cp ../website-v1/.env .env

# Update variables for v2
cat > .env << 'EOF'
# Site Configuration (v2 uses NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_SITE_NAME="Simon Stijnen"
NEXT_PUBLIC_SITE_URL="https://simon.stijnen.be"
NEXT_PUBLIC_SITE_DESCRIPTION="Software engineer and AI student"

# Author Information
NEXT_PUBLIC_AUTHOR_NAME="Simon Stijnen"
NEXT_PUBLIC_AUTHOR_EMAIL="your-email@example.com"
NEXT_PUBLIC_AUTHOR_CITY="Bruges"
NEXT_PUBLIC_AUTHOR_COUNTRY="Belgium"

# Social Links
NEXT_PUBLIC_GITHUB_URL="https://github.com/SimonStnn"
NEXT_PUBLIC_LINKEDIN_URL="https://www.linkedin.com/in/simon-stijnen/"

# Analytics (optional)
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_GTM_ID=""

# Webhook (optional)
WEBHOOK_URL=""
WEBHOOK_ENABLED="false"
EOF
```

#### Step 5: Install Dependencies and Test

```bash
# Install v2 dependencies
npm install

# Test development server
npm run dev

# Visit http://localhost:3000
# Verify all content migrated correctly

# Run tests
npm test

# Build for production
npm run build
```

#### Step 6: Update Deployment

If using Docker:

```bash
# Build new image
docker-compose build website-prod

# Stop old version
docker-compose down

# Start v2
docker-compose up -d website-prod
```

### Handling Breaking Changes

#### App Router Routing

**v1 (Pages Router):**

```typescript
// pages/projects/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();
  return {
    paths: projects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = await getProjectBySlug(params.slug as string);
  return {
    props: { project },
  };
};

export default function ProjectPage({ project }) {
  return <div>{project.title}</div>;
}
```

**v2 (App Router):**

```typescript
// app/projects/[slug]/page.tsx
import { getProjects, getProjectBySlug } from '@/lib/projects';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  return <div>{project.title}</div>;
}
```

#### Metadata API

**v1 (Head component):**

```typescript
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Page Title</title>
        <meta name="description" content="Page description" />
      </Head>
      <div>Content</div>
    </>
  );
}
```

**v2 (Metadata export):**

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};

export default function Page() {
  return <div>Content</div>;
}
```

#### Image Component

**v1:**

```typescript
import Image from 'next/image';

<Image src="/image.jpg" width={500} height={300} alt="Image" />;
```

**v2 (same API, improved performance):**

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  width={500}
  height={300}
  alt="Image"
  priority // New: prioritize loading
  placeholder="blur" // New: blur placeholder
/>;
```

## Dependency Updates

### Updating Next.js

**Check current version:**

```bash
npm list next
```

**Update to latest 15.x:**

```bash
npm install next@latest react@latest react-dom@latest
```

**Update to specific version:**

```bash
npm install next@15.5.9 react@19.0.0 react-dom@19.0.0
```

**Test after update:**

```bash
# Clear cache
rm -rf .next

# Run dev server
npm run dev

# Run tests
npm test

# Build
npm run build
```

### Updating TypeScript

```bash
# Update TypeScript
npm install --save-dev typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest

# Verify
npx tsc --version
```

### Updating Tailwind CSS

**v3 to v4 (Current):**

```bash
# Update to Tailwind v4
npm install --save-dev tailwindcss@latest @tailwindcss/postcss@latest

# Update config for v4
```

**tailwind.config.ts changes:**

```typescript
// v3
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
};

// v4 (current)
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
};

export default config;
```

### Updating shadcn/ui Components

```bash
# Check for component updates
npx shadcn@latest diff

# Update specific component
npx shadcn@latest add button --overwrite

# Update all components
npx shadcn@latest add --all --overwrite
```

### Updating ESLint and Prettier

```bash
# Update linting tools
npm install --save-dev eslint@latest eslint-config-next@latest eslint-config-prettier@latest prettier@latest prettier-plugin-tailwindcss@latest

# Run format check
npm run format:check

# Fix formatting
npm run format
```

## Breaking Changes

### Next.js 14 → 15

**1. App Router is now stable:**

- No more experimental flags needed
- Improved performance
- Better error handling

**2. Turbopack is default for dev:**

```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack"
  }
}
```

**3. Metadata changes:**

- `metadata` export is required for all pages
- `generateMetadata` for dynamic metadata

**4. Image optimization:**

- Improved automatic optimization
- Better blur placeholder support

### React 18 → 19

**1. Server Components:**

- Default for all components in App Router
- Must explicitly mark client components with `'use client'`

**2. Hooks changes:**

- Some hooks behavior updated
- New hooks available (useOptimistic, etc.)

**3. Suspense improvements:**

- Better error boundaries
- Improved loading states

### Tailwind CSS 3 → 4

**1. Configuration format:**

- ESM format (export default) instead of CommonJS
- TypeScript support built-in

**2. CSS changes:**

- New `@theme` directive
- Improved color system
- Better dark mode support

**3. Plugin changes:**

- Some plugins now built-in
- Updated plugin API

## Data Migration

### Migrating Project Data

**From single JSON file to individual files:**

```bash
# Python script for migration
cat > migrate_projects.py << 'EOF'
import json
import os

# Read old format
with open('../old-site/data/projects.json', 'r') as f:
    projects = json.load(f)

# Create projects directory
os.makedirs('content/projects', exist_ok=True)

# Write individual files
for project in projects:
    slug = project['slug']
    filename = f'content/projects/{slug}.json'

    with open(filename, 'w') as f:
        json.dump(project, f, indent=2)

    print(f'Created {filename}')

print(f'Migrated {len(projects)} projects')
EOF

python3 migrate_projects.py
```

### Updating Image Paths

**If image paths changed:**

```bash
# Update image references in JSON files
find content/projects -name "*.json" -type f -exec sed -i 's|/static/images/|/images/projects/|g' {} +

# Move images to new location
mkdir -p public/images/projects
mv public/static/images/projects/* public/images/projects/
```

### Adding New Fields

**Add missing fields to existing projects:**

```bash
# Node.js script to add 'order' field
cat > add_order_field.js << 'EOF'
const fs = require('fs');
const path = require('path');

const projectsDir = 'content/projects';
const files = fs.readdirSync(projectsDir);

files.forEach((file, index) => {
  const filePath = path.join(projectsDir, file);
  const project = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add order field if missing
  if (!project.order) {
    project.order = index + 1;
    fs.writeFileSync(filePath, JSON.stringify(project, null, 2));
    console.log(`Added order ${project.order} to ${file}`);
  }
});
EOF

node add_order_field.js
```

## Configuration Changes

### next.config.mjs Updates

**v1 (next.config.js):**

```javascript
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["example.com"],
  },
};
```

**v2 (next.config.mjs):**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // For Docker
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
```

### TypeScript Configuration

**Updated tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Testing After Migration

### Checklist

- [ ] Development server starts successfully
- [ ] All pages render without errors
- [ ] All images load correctly
- [ ] Links work correctly
- [ ] Forms work (if any)
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] SEO metadata present
- [ ] Sitemap generates
- [ ] Robots.txt accessible
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Production deployment works

### Testing Commands

```bash
# 1. Clean install
rm -rf node_modules package-lock.json .next
npm install

# 2. Linting
npm run lint
npm run format:check

# 3. Type checking
npx tsc --noEmit

# 4. Tests
npm test

# 5. Development build
npm run dev
# Test in browser: http://localhost:3000

# 6. Production build
npm run build
npm start
# Test in browser: http://localhost:3000

# 7. Check bundle size
npm run build:analyze
```

### Automated Migration Test

```bash
# Create test script
cat > test-migration.sh << 'EOF'
#!/bin/bash
set -e

echo "🧪 Testing migration..."

echo "✓ Installing dependencies..."
npm ci --quiet

echo "✓ Running linter..."
npm run lint

echo "✓ Running tests..."
npm test -- --passWithNoTests

echo "✓ Building application..."
npm run build

echo "✓ Checking for broken links..."
# Add link checker if needed

echo "✅ Migration test passed!"
EOF

chmod +x test-migration.sh
./test-migration.sh
```

## Rollback Procedure

If migration fails:

```bash
# 1. Switch back to v1 branch
git checkout backup-v1

# 2. Restore dependencies
npm install

# 3. Restart services
npm run dev
# or
docker-compose up -d

# 4. Verify v1 works
curl http://localhost:3000

# 5. Investigate issues
# Review logs, fix problems, try migration again
```

## See Also

- [Contributing Guide](./01-contributing.md) - Development workflow
- [Troubleshooting](./02-troubleshooting.md) - Common issues
- [Best Practices](./03-best-practices.md) - Code patterns
- [Architecture Overview](../01-architecture/01-overview.md) - Project structure

## Next Steps

- Backup current installation
- Test migration in development
- Update dependencies
- Migrate content
- Test thoroughly
- Deploy to production

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
