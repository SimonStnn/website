# Bundle Analysis

**Navigation:** [Home](../../README.md) > [Development](./README.md) > Bundle Analysis

---

## Overview

Bundle analysis helps you understand the size and composition of your application's JavaScript bundles. This guide covers how to analyze, optimize, and monitor bundle size in the Simon Stijnen Portfolio project using Next.js Bundle Analyzer.

## Why Bundle Size Matters

### Performance Impact

**Large bundles lead to:**

- Slower page loads
- Poor user experience on slow networks
- Higher data costs for users
- Lower search engine rankings
- Reduced conversion rates

**Research findings:**

- 1-second delay = 7% reduction in conversions
- 53% of mobile users abandon sites that take > 3 seconds to load
- Google uses page speed as a ranking factor

### Core Web Vitals

Bundle size directly affects Core Web Vitals:

- **LCP (Largest Contentful Paint)** - How quickly main content loads
- **FID (First Input Delay)** - How quickly page responds to interactions
- **CLS (Cumulative Layout Shift)** - Visual stability during loading

**Target metrics:**

- LCP < 2.5 seconds
- FID < 100 milliseconds
- CLS < 0.1

## Bundle Analyzer Setup

### Installation

The project already includes `@next/bundle-analyzer`:

```json
{
  "devDependencies": {
    "@next/bundle-analyzer": "^16.1.3"
  }
}
```

**If not installed:**

```bash
npm install --save-dev @next/bundle-analyzer
```

### Configuration

**File:** `next.config.ts`

```typescript
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
```

**How it works:**

- Only runs when `ANALYZE=true` environment variable is set
- Wraps Next.js config with analyzer
- Generates visual reports after build

### NPM Script

**File:** `package.json`

```json
{
  "scripts": {
    "build:analyze": "ANALYZE=true next build"
  }
}
```

## Running Bundle Analysis

### Basic Usage

```bash
npm run build:analyze
```

**What happens:**

1. Sets `ANALYZE=true` environment variable
2. Builds production version of app
3. Generates bundle analysis reports
4. Opens reports in browser automatically

**Terminal output:**

```
  ▲ Next.js 15.5.9

   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (7/7)
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.2 kB
├ ○ /_not-found                          871 B          81.9 kB
├ ○ /about                               142 B          87.2 kB
├ ○ /achievements                        142 B          87.2 kB
├ ○ /contact                             142 B          87.2 kB
├ ƒ /projects/[slug]                     142 B          87.2 kB
└ ○ /skills                              142 B          87.2 kB

Webpack Bundle Analyzer saved reports to:
  .next/analyze/client.html
  .next/analyze/server.html
```

**Browser automatically opens:**

- Client bundle: [http://127.0.0.1:8888](http://127.0.0.1:8888)
- Server bundle: [http://127.0.0.1:8889](http://127.0.0.1:8889)

### Manual Report Access

**If browser doesn't open automatically:**

```bash
# macOS
open .next/analyze/client.html
open .next/analyze/server.html

# Linux
xdg-open .next/analyze/client.html
xdg-open .next/analyze/server.html

# Windows
start .next/analyze/client.html
start .next/analyze/server.html
```

## Understanding the Report

### Visual Layout

The bundle analyzer shows a **tree map** where:

- Each rectangle represents a module
- Size of rectangle = size of module
- Color = different package or chunk
- Hover for details (file path, size)

**Example visualization:**

```
┌─────────────────────────────────────────────────────┐
│ node_modules                                        │
│ ┌─────────────┐ ┌──────┐ ┌────────┐               │
│ │ react-dom   │ │ react│ │ next   │               │
│ │ 130 KB      │ │ 85 KB│ │ 180 KB │               │
│ └─────────────┘ └──────┘ └────────┘               │
│                                                     │
│ ┌────────┐ ┌─────────┐                            │
│ │ lucide │ │ @radix  │                            │
│ │ 45 KB  │ │ 90 KB   │                            │
│ └────────┘ └─────────┘                            │
└─────────────────────────────────────────────────────┘
```

### Size Metrics

**Three size metrics displayed:**

1. **Stat Size** - Size of original source code
2. **Parsed Size** - Size after minification (before gzip)
3. **Gzipped Size** - Size after compression (what users download)

**Example:**

```
react-dom
  Stat: 895 KB
  Parsed: 180 KB
  Gzipped: 65 KB
```

**Focus on gzipped size** - that's what users actually download.

### Client vs Server Bundles

**Client bundle** (`.next/analyze/client.html`)

- JavaScript sent to browser
- Includes React, components, libraries
- Critical for page load performance
- **Optimize this first**

**Server bundle** (`.next/analyze/server.html`)

- Code running on server
- Server Components, API routes, middleware
- Doesn't affect client performance
- Still important for server costs

## Analyzing Results

### Identifying Large Dependencies

**Look for:**

1. **Unexpectedly large packages**

   ```
   Example: date-fns (100 KB)
   Why large? Importing entire library instead of specific functions
   ```

2. **Duplicate dependencies**

   ```
   Example: react@18.0.0 and react@18.2.0 both present
   Why? Conflicting version requirements
   ```

3. **Unused dependencies**
   ```
   Example: lodash (70 KB)
   Why present? Imported but not actually used
   ```

### Finding Optimization Opportunities

**Questions to ask:**

1. **Can this be code-split?**
   - Is this needed on first load?
   - Can it be loaded dynamically?

2. **Can this be tree-shaken?**
   - Am I importing only what I need?
   - Does the package support tree shaking?

3. **Is there a smaller alternative?**
   - date-fns vs day.js
   - lodash vs lodash-es
   - moment.js vs date-fns

4. **Can this be removed?**
   - Unused dependencies
   - Development-only code in production
   - Commented-out code

## Optimization Strategies

### 1. Code Splitting

**Dynamic imports for heavy components:**

```typescript
// ❌ Before: Loads immediately
import { HeavyChart } from "@/components/heavy-chart";

export default function Dashboard() {
  return <HeavyChart data={data} />;
}

// ✅ After: Loads only when needed
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  loading: () => <div>Loading chart...</div>,
});

export default function Dashboard() {
  return <HeavyChart data={data} />;
}
```

**Savings:** Move 50-100 KB from initial bundle to lazy-loaded chunk

**Route-based code splitting:**

Next.js automatically code-splits by route:

```
pages/
├── index.tsx         → bundles/page-index.js (30 KB)
├── about.tsx         → bundles/page-about.js (15 KB)
└── projects/
    └── [slug].tsx    → bundles/page-project.js (25 KB)
```

Each page only loads its own JavaScript.

### 2. Tree Shaking

**Import only what you need:**

```typescript
// ❌ Before: Imports entire library (100 KB)
import _ from "lodash";
const result = _.groupBy(items, "category");

// ✅ After: Imports single function (5 KB)
import { groupBy } from "lodash-es";
const result = groupBy(items, "category");

// ✅ Even better: Native JavaScript
const result = items.reduce((acc, item) => {
  acc[item.category] = acc[item.category] || [];
  acc[item.category].push(item);
  return acc;
}, {});
```

**Lucide icons example:**

```typescript
// ❌ Before: Could import all icons (200+ KB)
import * as Icons from "lucide-react";

// ✅ After: Import specific icons (2 KB per icon)
import { Home, User, Settings } from "lucide-react";
```

**Radix UI example:**

```typescript
// ❌ Before: Imports entire package
import * as Dialog from "@radix-ui/react-dialog";

// ✅ After: Import specific components
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
```

### 3. Replace Large Dependencies

**Common replacements:**

| Large Library     | Size    | Smaller Alternative | Size   | Savings |
| ----------------- | ------- | ------------------- | ------ | ------- |
| moment.js         | 288 KB  | date-fns            | 78 KB  | 210 KB  |
| lodash            | 70 KB   | lodash-es           | 24 KB  | 46 KB   |
| axios             | 32 KB   | native fetch        | 0 KB   | 32 KB   |
| chart.js          | 240 KB  | recharts            | 150 KB | 90 KB   |
| material-ui       | 350 KB  | shadcn/ui           | ~50 KB | 300 KB  |
| react-icons (all) | 2500 KB | lucide-react        | 100 KB | 2400 KB |

**Example replacement:**

```bash
# Remove large library
npm uninstall moment

# Install smaller alternative
npm install date-fns
```

```typescript
// Before
import moment from "moment";
const formatted = moment(date).format("MMMM DD, YYYY");

// After
import { format } from "date-fns";
const formatted = format(date, "MMMM dd, yyyy");
```

### 4. Next.js Optimizations

**Experimental package imports:**

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};
```

**What it does:**

- Automatically tree-shakes specified packages
- Only includes icons/components actually used
- No manual import optimization needed

**SWC minification:**

```typescript
// next.config.ts (already enabled by default)
const nextConfig = {
  swcMinify: true, // Faster minification than Terser
};
```

### 5. Remove Unused Code

**Find unused dependencies:**

```bash
# Install depcheck
npm install -g depcheck

# Run analysis
depcheck

# Output:
Unused dependencies
* unused-package
* old-library
```

**Remove unused imports:**

```bash
# ESLint finds unused imports
npm run lint

# Output:
app/page.tsx
  15:7  warning  'UnusedImport' is defined but never used  @typescript-eslint/no-unused-vars
```

**Remove and clean:**

```bash
# Remove unused package
npm uninstall unused-package

# Remove unused imports in code
# (ESLint auto-fix handles this)
npm run lint -- --fix
```

### 6. Compress and Optimize

**Enable compression (already enabled by default):**

```typescript
// next.config.ts
const nextConfig = {
  compress: true, // Gzip compression
};
```

**Image optimization (already configured):**

```tsx
import Image from "next/image";

// Next.js automatically:
// - Converts to WebP/AVIF
// - Generates responsive sizes
// - Lazy loads images
<Image src="/image.png" alt="Description" width={800} height={600} />;
```

## Monitoring Bundle Size

### Build Output

**Every production build shows sizes:**

```bash
npm run build
```

**Output:**

```
Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.2 kB
├ ○ /_not-found                          871 B          81.9 kB
├ ○ /about                               142 B          87.2 kB
├ ○ /achievements                        142 B          87.2 kB
├ ○ /contact                             142 B          87.2 kB
├ ƒ /projects/[slug]                     142 B          87.2 kB
└ ○ /skills                              142 B          87.2 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

First Load JS shared by all              87.1 kB
  ├ chunks/framework-[hash].js           42.3 kB
  ├ chunks/main-[hash].js                31.8 kB
  ├ chunks/webpack-[hash].js             1.95 kB
  └ css/[hash].css                       11.0 kB
```

**Key metrics:**

- **Size** - Page-specific code
- **First Load JS** - Total JavaScript for first page load
- **Shared by all** - Common code used by all pages

### Setting Size Budgets

**Create size budget file:**

```json
// size-budgets.json
{
  "budgets": [
    {
      "path": "**/*",
      "maxSize": "100kb",
      "maxGzippedSize": "35kb"
    },
    {
      "path": "**/chunks/framework-*.js",
      "maxSize": "150kb"
    }
  ]
}
```

**Check against budget:**

```bash
# After build
npm run build

# Manually compare against budgets
# (Next.js doesn't enforce budgets directly)
```

### CI Integration

**Add bundle size check to CI:**

```yaml
# .github/workflows/bundle-size.yml
name: Bundle Size

on: [push, pull_request]

jobs:
  analyze:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Build and analyze
        run: npm run build:analyze

      - name: Upload reports
        uses: actions/upload-artifact@v3
        with:
          name: bundle-analysis
          path: .next/analyze/

      - name: Comment bundle size
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const buildOutput = fs.readFileSync('.next/build-manifest.json');
            // Parse and comment on PR
```

### Third-party Tools

**Bundle analysis services:**

1. **Bundlephobia** - Check npm package sizes
   - [bundlephobia.com](https://bundlephobia.com/)
   - Search for packages before installing

2. **Package Phobia** - Alternative bundle size checker
   - [packagephobia.com](https://packagephobia.com/)
   - Shows install size and dependencies

3. **Bundle Buddy** - Webpack bundle analysis
   - [bundlebuddy.com](https://bundlebuddy.com/)
   - Upload webpack stats for analysis

## Best Practices

### ✅ Do's

- Run bundle analysis before major releases
- Monitor bundle size trends over time
- Set and enforce size budgets
- Use dynamic imports for heavy components
- Import only what you need (tree shaking)
- Replace large dependencies with smaller alternatives
- Remove unused dependencies regularly
- Enable all Next.js optimizations

### ❌ Don'ts

- Don't ignore bundle size warnings
- Don't import entire libraries
- Don't add dependencies without checking size
- Don't skip bundle analysis
- Don't assume "it's just a small library"
- Don't ignore duplicate dependencies
- Don't load everything on initial render

## Troubleshooting

### Issue: Analysis Report Not Opening

**Solution:**

```bash
# Manually open reports
open .next/analyze/client.html

# Or check if files exist
ls -lh .next/analyze/
```

### Issue: No .next/analyze Directory

**Solution:**

```bash
# Ensure ANALYZE=true is set
ANALYZE=true npm run build

# Or use the npm script
npm run build:analyze
```

### Issue: Can't Identify Large Module

**Solution:**

Use the search feature in the bundle analyzer report:

1. Open client.html in browser
2. Use search box at top
3. Search for package name
4. View hierarchy and size

## Real-World Example

### Before Optimization

```
Total bundle size: 450 KB (gzipped)

Largest packages:
- react-dom: 130 KB
- moment.js: 288 KB
- lodash: 70 KB
- chart.js: 240 KB
- @material-ui/core: 350 KB

First Load JS: 650 KB
```

### After Optimization

```
Total bundle size: 180 KB (gzipped)

Optimized packages:
- react-dom: 130 KB (no change, essential)
- date-fns: 78 KB (replaced moment.js, -210 KB)
- lodash-es: 24 KB (replaced lodash, -46 KB)
- recharts: 150 KB (replaced chart.js, -90 KB)
- shadcn/ui: 50 KB (replaced Material-UI, -300 KB)

First Load JS: 280 KB

Total savings: 270 KB (60% reduction)
```

**Performance improvements:**

- Load time: 4.2s → 1.8s (57% faster)
- Time to Interactive: 5.1s → 2.3s (55% faster)
- Lighthouse score: 72 → 95

## See Also

- [Next.js Config](./05-nextjs-config.md) - Configuration for bundle optimization
- [Development Workflow](./02-development-workflow.md) - Including bundle analysis in workflow
- [NPM Scripts](./04-npm-scripts.md) - Build and analyze commands
- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Web.dev Bundle Size Guide](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

## Next Steps

- [Optimize images](../06-optimization/) with Next.js Image component
- [Set up performance monitoring](../07-monitoring/) to track real-world performance
- [Configure CDN](../05-deployment/) for faster asset delivery

---

**Last updated:** February 2026
