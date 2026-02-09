# Configuration Reference

**Navigation:** [Documentation Home](../index.md) → [Architecture](./README.md) → Configuration

---

## Table of Contents

- [Overview](#overview)
- [Next.js Configuration](#nextjs-configuration)
- [TypeScript Configuration](#typescript-configuration)
- [Tailwind CSS Configuration](#tailwind-css-configuration)
- [ESLint Configuration](#eslint-configuration)
- [Prettier Configuration](#prettier-configuration)
- [Jest Configuration](#jest-configuration)
- [Package Configuration](#package-configuration)
- [Docker Configuration](#docker-configuration)
- [Git Configuration](#git-configuration)
- [Environment Variables](#environment-variables)
- [See Also](#see-also)
- [Next Steps](#next-steps)

---

## Overview

All configuration files live at the project root. This document provides a complete reference for each configuration file, its purpose, and key settings.

### Configuration Files Summary

| File                 | Purpose                     | Format     |
| -------------------- | --------------------------- | ---------- |
| `next.config.ts`     | Next.js framework settings  | TypeScript |
| `tsconfig.json`      | TypeScript compiler options | JSON       |
| `tailwind.config.ts` | Tailwind CSS customization  | TypeScript |
| `eslint.config.mjs`  | ESLint linting rules        | ES Module  |
| `.prettierrc.json`   | Prettier formatting rules   | JSON       |
| `jest.config.js`     | Jest testing framework      | CommonJS   |
| `package.json`       | Dependencies and scripts    | JSON       |
| `docker-compose.yml` | Docker orchestration        | YAML       |
| `Dockerfile`         | Docker image definition     | Dockerfile |
| `.gitignore`         | Git ignore patterns         | Plain text |

---

## Next.js Configuration

**File:** `next.config.ts`

### Complete Configuration

```1:37:/workspaces/website/next.config.ts
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Import site configuration for URL parsing
import { siteConfig } from "./lib/config";

// Extract domain from site URL
const siteUrlDomain = new URL(siteConfig.url).hostname;

// Common domains for images
const commonDomains = [
  "github.githubassets.com",
  "github.com",
  "colorsplash.vercel.app",
  "flagcdn.com",
];
const domains = ["localhost", siteUrlDomain, ...commonDomains];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: domains.map((domain) => ({
      protocol: "https",
      hostname: domain,
      port: "",
      pathname: "/**",
    })),
  },
  // For Docker deployment - creates a standalone build
  output: "standalone",
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
```

### Key Settings Explained

#### Image Optimization

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "github.com",
      pathname: "/**",
    },
  ];
}
```

**Purpose:** Allow Next.js Image component to optimize images from external domains.

**Domains Allowed:**

- `localhost` - Development
- `simon.stijnen.be` - Production site (from config)
- `github.com` - GitHub avatars/images
- `flagcdn.com` - Country flags

#### Standalone Output

```typescript
output: "standalone";
```

**Purpose:** Creates a self-contained build for Docker deployment.

**What it does:**

- Bundles all dependencies in `.next/standalone/`
- Copies only production dependencies
- Creates a minimal Node.js server
- Reduces Docker image size

#### Bundle Analyzer

```typescript
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
```

**Usage:**

```bash
npm run build:analyze
```

**Output:** Opens browser with interactive bundle size visualization.

---

## TypeScript Configuration

**File:** `tsconfig.json`

### Complete Configuration

```1:28:/workspaces/website/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
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

### Key Settings Explained

#### Strict Mode

```json
"strict": true
```

Enables all strict type-checking options:

- `noImplicitAny`
- `strictNullChecks`
- `strictFunctionTypes`
- `strictBindCallApply`
- `strictPropertyInitialization`
- `noImplicitThis`
- `alwaysStrict`

#### Path Aliases

```json
"paths": {
  "@/*": ["./*"]
}
```

Enables absolute imports with `@/` prefix:

```typescript
import { Button } from "@/components/ui/button";
// Instead of: import { Button } from "../../components/ui/button"
```

#### Module Resolution

```json
"module": "esnext",
"moduleResolution": "bundler"
```

**Purpose:** Optimized for modern bundlers (Turbopack/Webpack).

#### JSX Preservation

```json
"jsx": "preserve"
```

**Purpose:** Let Next.js handle JSX transformation (not TypeScript).

#### Isolated Modules

```json
"isolatedModules": true
```

**Purpose:** Required for Next.js/Turbopack. Each file must be independently compilable.

---

## Tailwind CSS Configuration

**File:** `tailwind.config.ts`

### Complete Configuration

```1:80:/workspaces/website/tailwind.config.ts
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
```

### Key Settings Explained

#### Dark Mode

```typescript
darkMode: "class";
```

**Purpose:** Enable class-based dark mode (managed by `next-themes`).

**Usage:**

```typescript
<html className="dark">  {/* Dark mode enabled */}
<div className="bg-white dark:bg-gray-900">
```

#### Content Paths

```typescript
content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"];
```

**Purpose:** Tell Tailwind where to look for class names (for tree-shaking).

#### HSL Color System

```typescript
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  }
}
```

**Purpose:** Theme colors defined as CSS variables for runtime theming.

**CSS Variables (app/globals.css):**

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

#### Custom Container

```typescript
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1400px",
  },
}
```

**Purpose:** Centered container with consistent padding and max-width.

**Usage:**

```typescript
<div className="container mx-auto">
  {/* Content automatically centered with padding */}
</div>
```

---

## ESLint Configuration

**File:** `eslint.config.mjs`

### Complete Configuration

```1:18:/workspaces/website/eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("prettier"),
];

export default eslintConfig;
```

### Extended Configurations

#### next/core-web-vitals

**Includes:**

- Essential Next.js rules
- React rules
- React Hooks rules
- Core Web Vitals checks

**Key Rules:**

- `@next/next/no-html-link-for-pages` - Use `Link` component
- `@next/next/no-img-element` - Use `Image` component
- `react/no-unescaped-entities` - Escape HTML entities
- `react-hooks/rules-of-hooks` - Follow hooks rules

#### next/typescript

**Includes:**

- TypeScript-specific rules
- Type-aware linting

**Key Rules:**

- `@typescript-eslint/no-unused-vars` - Catch unused variables
- `@typescript-eslint/no-explicit-any` - Discourage `any` type

#### prettier

**Purpose:** Disable ESLint rules that conflict with Prettier.

### Running ESLint

```bash
npm run lint              # Check for issues
npm run lint -- --fix     # Auto-fix issues
```

---

## Prettier Configuration

**File:** `.prettierrc.json`

### Complete Configuration

```1:9:/workspaces/website/.prettierrc.json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Settings Explained

| Setting         | Value   | Purpose                            |
| --------------- | ------- | ---------------------------------- |
| `semi`          | `true`  | Always add semicolons              |
| `singleQuote`   | `false` | Use double quotes for strings      |
| `tabWidth`      | `2`     | 2 spaces for indentation           |
| `trailingComma` | `"es5"` | Trailing commas where valid in ES5 |
| `printWidth`    | `100`   | Wrap lines at 100 characters       |

#### Tailwind Plugin

```json
"plugins": ["prettier-plugin-tailwindcss"]
```

**Purpose:** Automatically sort Tailwind classes in recommended order.

**Before:**

```typescript
<div className="text-white p-4 bg-blue-500">
```

**After:**

```typescript
<div className="bg-blue-500 p-4 text-white">
```

### Prettier Ignore

**File:** `.prettierignore`

```1:12:/workspaces/website/.prettierignore
# Directories
node_modules
.next
build
dist
public

# Files
package-lock.json
yarn.lock
pnpm-lock.yaml
```

### Running Prettier

```bash
npm run format           # Format all files
npm run format:check     # Check if files are formatted
```

---

## Jest Configuration

**File:** `jest.config.js`

### Complete Configuration

```1:32:/workspaces/website/jest.config.js
/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!jest.config.js",
    "!jest.setup.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
```

### Settings Explained

#### Setup File

```javascript
setupFilesAfterEnv: ["<rootDir>/jest.setup.js"];
```

**Purpose:** Run setup code before each test file.

**jest.setup.js:**

```javascript
import "@testing-library/jest-dom";
```

Adds custom matchers like `toBeInTheDocument()`.

#### Module Name Mapper

```javascript
moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/$1"
}
```

**Purpose:** Resolve `@/` imports in tests (matches tsconfig paths).

#### Test Environment

```javascript
testEnvironment: "jest-environment-jsdom";
```

**Purpose:** Simulate browser environment for React component tests.

#### Coverage Collection

```javascript
collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**", "!**/.next/**"];
```

**Purpose:** Define which files to include in coverage reports.

### Running Tests

```bash
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm test -- --coverage      # With coverage report
```

---

## Package Configuration

**File:** `package.json`

### Scripts

```14:26:/workspaces/website/package.json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "ci:check": "npm run lint && npm run format:check",
    "test": "jest",
    "test:watch": "jest --watch",
    "prepare": "husky"
  },
```

| Script          | Purpose                                 |
| --------------- | --------------------------------------- |
| `dev`           | Start development server with Turbopack |
| `build`         | Build production bundle                 |
| `build:analyze` | Build with bundle analyzer              |
| `start`         | Start production server                 |
| `lint`          | Run ESLint checks                       |
| `format`        | Format all files with Prettier          |
| `format:check`  | Check if files are formatted            |
| `ci:check`      | Run all CI checks (lint + format)       |
| `test`          | Run Jest tests                          |
| `test:watch`    | Run tests in watch mode                 |
| `prepare`       | Setup Husky git hooks                   |

### Dependencies

**Production Dependencies:**

```27:46:/workspaces/website/package.json
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tanstack/react-table": "^8.21.3",
    "@vercel/analytics": "^1.6.1",
    "@vercel/speed-insights": "^1.3.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "embla-carousel-react": "^8.6.0",
    "lucide-react": "^0.513.0",
    "next": "^15.5.9",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.3.0"
  },
```

**Key Dependencies:**

- **Next.js 15** - Framework
- **React 19** - UI library
- **Radix UI** - Accessible primitives
- **@tanstack/react-table** - Data tables
- **Vercel Analytics** - Analytics tracking
- **next-themes** - Theme management
- **Lucide React** - Icon library

**Development Dependencies:**

```48:71:/workspaces/website/package.json
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@next/bundle-analyzer": "^16.1.3",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.1",
    "@testing-library/user-event": "^14.6.1",
    "@types/jest": "^30.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.3",
    "eslint-config-prettier": "^10.1.5",
    "husky": "^9.1.7",
    "jest": "^30.2.0",
    "jest-environment-jsdom": "^30.2.0",
    "lint-staged": "^16.1.0",
    "prettier": "^3.5.3",
    "prettier-plugin-tailwindcss": "^0.6.12",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.4",
    "typescript": "^5"
  }
```

### Lint-Staged Configuration

```5:13:/workspaces/website/package.json
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  },
```

**Purpose:** Run tools on staged files before commit.

**What happens:**

1. Format TypeScript/JavaScript files with Prettier
2. Fix ESLint issues automatically
3. Format JSON, CSS, and Markdown files

---

## Docker Configuration

### Dockerfile

**Purpose:** Build production Docker image with standalone Next.js build.

**Key Steps:**

1. Install dependencies
2. Build Next.js application
3. Copy standalone output
4. Run production server

### docker-compose.yml

**Purpose:** Orchestrate development and production containers.

**Services:**

- `website-dev` - Development server with hot reload
- `website-prod` - Production server with standalone build

**Usage:**

```bash
docker-compose up website-dev   # Development
docker-compose up website-prod  # Production
```

---

## Git Configuration

### .gitignore

**File:** `.gitignore`

```1:42:/workspaces/website/.gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

**Key Ignores:**

- `node_modules/` - Dependencies
- `.next/` - Build output
- `.env` - Environment variables
- `coverage/` - Test coverage
- `*.tsbuildinfo` - TypeScript build cache

---

## Environment Variables

### .env File Structure

```bash
# Site Configuration
NEXT_PUBLIC_SITE_NAME="Simon Stijnen"
NEXT_PUBLIC_SITE_URL="https://simon.stijnen.be"
NEXT_PUBLIC_SITE_DESCRIPTION="Software engineer and AI student..."

# Author Information
NEXT_PUBLIC_AUTHOR_NAME="Simon Stijnen"
NEXT_PUBLIC_AUTHOR_EMAIL="simon.stijnen.23+portfolio@gmail.com"
NEXT_PUBLIC_AUTHOR_CITY="Bruges"
NEXT_PUBLIC_AUTHOR_COUNTRY="Belgium"
NEXT_PUBLIC_AUTHOR_JOB_TITLE="Software Engineer & AI student"

# Social Links
NEXT_PUBLIC_GITHUB_URL="https://github.com/SimonStnn"
NEXT_PUBLIC_LINKEDIN_URL="https://www.linkedin.com/in/simon-stijnen/"

# Analytics
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_GTM_ID=""
```

### Environment Variable Rules

1. **Client-side access requires `NEXT_PUBLIC_` prefix**
2. **Server-only variables don't need prefix**
3. **Never commit `.env` to git**
4. **Provide defaults in `lib/config.ts`**

### Usage in Code

```9:30:/workspaces/website/lib/config.ts
// Site configuration
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Simon Stijnen",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://simon.stijnen.be",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Software engineer and AI student in Belgium building scalable, reliable products.",
  recruiterSummary:
    process.env.NEXT_PUBLIC_RECRUITER_SUMMARY ||
    "Software engineer and AI student focused on scalable web apps, LLM automation, and data-driven systems. Available for internships and junior roles.",
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
```

---

## See Also

Related documentation:

- **[Architecture Overview](./01-overview.md)** - Understanding the tech stack
- **[Directory Structure](./02-directory-structure.md)** - Where config files live
- **[Conventions](./05-conventions.md)** - Coding standards
- **[Development Workflow](../04-development/02-development-workflow.md)** - Using these configurations
- **[Deployment Guide](../05-deployment/01-docker-guide.md)** - Production configuration

---

## Next Steps

1. **Review environment variables**: Create `.env` from template
2. **Configure editor**: Install recommended extensions
3. **Test configurations**: Run `npm run lint`, `npm test`, `npm run build`
4. **Customize settings**: Adjust configs for your needs

---

[← Back to Architecture Index](./README.md) | [Documentation Home](../index.md)
