# Directory Structure

**Navigation:** [Documentation Home](../README.md) → [Architecture](./README.md) → Directory Structure

---

## Table of Contents

- [Overview](#overview)
- [Root Level](#root-level)
- [Application Code](#application-code)
- [Configuration Files](#configuration-files)
- [Directory Reference](#directory-reference)
- [See Also](#see-also)
- [Next Steps](#next-steps)

---

## Overview

The project follows Next.js 15 App Router conventions with a clear separation of concerns. All application code lives in dedicated directories, while configuration files reside at the root level.

### Directory Tree

```
/workspaces/website/
├── app/                      # Next.js App Router - pages and layouts
│   ├── projects/            # Projects section routes
│   │   ├── [slug]/          # Dynamic project detail pages
│   │   │   └── page.tsx     # Individual project page
│   │   └── page.tsx         # Projects listing page
│   ├── llms.txt/            # LLM-readable site information
│   ├── layout.tsx           # Root layout (global)
│   ├── page.tsx             # Home page
│   ├── error.tsx            # Global error boundary
│   ├── not-found.tsx        # 404 page
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── carousel.tsx
│   │   ├── table.tsx
│   │   └── ...              # Other UI primitives
│   ├── layout/              # Layout components
│   │   ├── header.tsx       # Site header with navigation
│   │   └── footer.tsx       # Site footer
│   ├── meta/                # SEO and analytics
│   │   ├── analytics.tsx    # Google Analytics component
│   │   ├── structured-data.tsx           # Schema.org Person data
│   │   └── project-structured-data.tsx   # Schema.org Project data
│   ├── icons/               # Custom icon components
│   │   ├── github-icon.tsx
│   │   ├── linkedin-icon.tsx
│   │   └── file-download-icon.tsx
│   ├── project-card.tsx     # Project card component
│   ├── achievement-card.tsx # Achievement card component
│   ├── skills-data-table.tsx # Sortable skills table
│   ├── related-projects.tsx  # Related projects section
│   ├── timeline.tsx         # Timeline for experience
│   ├── social-link.tsx      # Social media link
│   ├── theme-toggle.tsx     # Dark/light mode toggle
│   ├── badge-overflow.tsx   # Badge list with overflow
│   ├── email-copy-button.tsx # Email copy to clipboard
│   └── copyright.tsx        # Copyright notice
│
├── lib/                     # Utilities and data access
│   ├── projects.ts          # Project data access functions
│   ├── achievements.ts      # Achievement data access functions
│   ├── skills.ts            # Skills generation from projects
│   ├── config.ts            # Environment configuration
│   ├── utils.ts             # Utility functions (cn, isVideoFile)
│   └── file-download.ts     # File download utility
│
├── content/                 # Content storage (JSON)
│   ├── projects/            # Project data files
│   │   ├── audionome.json
│   │   ├── bemed.json
│   │   ├── cerm-mcp-poc.json
│   │   └── ...              # One JSON file per project
│   └── achievements/        # Achievement data files
│       ├── rotary-award.json
│       └── ...              # One JSON file per achievement
│
├── public/                  # Static assets
│   ├── images/              # Image assets
│   │   ├── projects/        # Project images
│   │   │   ├── audionome/   # Organized by project slug
│   │   │   │   ├── preview.jpg
│   │   │   │   └── quick-demo.webp
│   │   │   └── ...
│   │   ├── logos/           # Company/school logos
│   │   ├── hero.jpg         # Hero image
│   │   └── profile-meta.jpg # OpenGraph image
│   ├── download/            # Downloadable files
│   │   └── resume.pdf
│   ├── favicon.ico
│   ├── site.webmanifest
│   └── robots.txt
│
├── middleware/              # Next.js middleware
│   └── analytics-webhook.ts # Analytics tracking middleware
│
├── tests/                   # Jest unit tests
│   ├── app/                 # Page component tests
│   ├── components/          # Component tests
│   ├── lib/                 # Library function tests
│   ├── middleware/          # Middleware tests
│   └── utils/               # Utility tests
│
├── docs/                    # Documentation (this file!)
│   ├── 01-architecture/     # Architecture documentation
│   ├── 02-guides/           # Developer guides
│   ├── 03-api/              # API reference
│   └── README.md            # Documentation home
│
├── .github/                 # GitHub configuration
│   ├── workflows/           # GitHub Actions CI/CD
│   │   └── ci.yml           # Continuous integration
│   └── copilot-instructions.md  # AI agent instructions
│
├── .husky/                  # Git hooks
│   ├── _/                   # Husky setup
│   └── pre-commit           # Pre-commit hook
│
├── .devcontainer/           # VS Code dev container
│   └── devcontainer.json
│
├── .vscode/                 # VS Code settings
│   └── settings.json
│
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── eslint.config.mjs        # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
├── docker-compose.yml       # Docker orchestration
├── Dockerfile               # Docker image definition
├── .env                     # Environment variables (not in git)
├── .gitignore               # Git ignore rules
├── README.md                # Project README
└── AGENTS.md                # AI agent instructions
```

---

## Root Level

### Configuration Files

The root directory contains all configuration files for the project's tools and frameworks.

| File                 | Purpose                                   | See Also                                                          |
| -------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| `package.json`       | Dependencies, scripts, lint-staged config | [Configuration Reference](./06-configuration.md#packagejson)      |
| `next.config.ts`     | Next.js framework settings                | [Configuration Reference](./06-configuration.md#nextconfigts)     |
| `tsconfig.json`      | TypeScript compiler options               | [Configuration Reference](./06-configuration.md#tsconfigjson)     |
| `tailwind.config.ts` | Tailwind CSS customization                | [Configuration Reference](./06-configuration.md#tailwindconfigts) |
| `eslint.config.mjs`  | ESLint linting rules                      | [Configuration Reference](./06-configuration.md#eslintconfigmjs)  |
| `.prettierrc.json`   | Prettier formatting rules                 | [Configuration Reference](./06-configuration.md#prettierrjson)    |
| `jest.config.js`     | Jest testing configuration                | [Configuration Reference](./06-configuration.md#jestconfigjs)     |
| `docker-compose.yml` | Docker multi-container setup              | [Deployment Guide](../02-guides/04-deployment.md)                 |
| `Dockerfile`         | Docker image definition                   | [Deployment Guide](../02-guides/04-deployment.md)                 |

### Documentation Files

| File                              | Purpose                           |
| --------------------------------- | --------------------------------- |
| `README.md`                       | Project overview and quick start  |
| `AGENTS.md`                       | Instructions for AI coding agents |
| `.github/copilot-instructions.md` | GitHub Copilot guidance           |

---

## Application Code

### `app/` Directory

The `app/` directory uses Next.js 15 App Router conventions. Each folder can contain:

- `page.tsx` - Page component (required for route)
- `layout.tsx` - Layout wrapper for nested routes
- `error.tsx` - Error boundary
- `loading.tsx` - Loading fallback (optional, not currently used)
- `not-found.tsx` - 404 fallback

#### Route Structure

```
app/
├── layout.tsx           → All pages
├── page.tsx             → / (home)
├── projects/
│   ├── page.tsx         → /projects (listing)
│   └── [slug]/
│       └── page.tsx     → /projects/[slug] (dynamic)
```

**Example: Dynamic Route Handler**

```20:27:/workspaces/website/app/projects/[slug]/page.tsx
// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

See [Routing & Navigation](./04-routing-navigation.md) for detailed routing documentation.

### `components/` Directory

React components are organized by category:

#### UI Components (`components/ui/`)

shadcn/ui components installed via CLI. These are:

- **Owned by the project** (not npm packages)
- **Customizable** - modify freely to fit project needs
- **Styled with Tailwind** - New York style, Slate base color

**Installation Example:**

```bash
npx shadcn@latest add button card badge
```

**Component Example:**

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>Title</CardHeader>
      <CardContent>
        <Button variant="secondary">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

#### Layout Components (`components/layout/`)

- `header.tsx` - Site navigation with theme toggle
- `footer.tsx` - Footer with links and copyright

#### Meta Components (`components/meta/`)

SEO and analytics:

- `analytics.tsx` - Google Analytics and GTM integration
- `structured-data.tsx` - Schema.org Person structured data
- `project-structured-data.tsx` - Schema.org Project structured data

#### Custom Components

Domain-specific components:

- `project-card.tsx` - Project preview card
- `achievement-card.tsx` - Achievement display card
- `skills-data-table.tsx` - Interactive skills table with @tanstack/react-table
- `related-projects.tsx` - Related projects based on shared technologies
- `timeline.tsx` - Timeline for work/education experience

### `lib/` Directory

Server-side utilities and data access functions. All functions are async and run on the server.

#### Data Access Functions

```9:19:/workspaces/website/lib/projects.ts
export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  images: ProjectImage[];
  demoUrl?: string;
  githubUrl?: string;
  order?: number;
}
```

**Key Functions:**

- `getProjects()` - Get all projects
- `getFeaturedProjects()` - Get featured projects (order 1-6)
- `getProjectBySlug(slug)` - Get single project
- `getAchievements()` - Get all achievements
- `getSkills()` - Generate skills from projects

See [Data Flow](./03-data-flow.md) for detailed data access patterns.

#### Utility Functions (`lib/utils.ts`)

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes with conflict resolution
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if file is a video
export function isVideoFile(src: string): boolean {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
  return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
}
```

#### Configuration (`lib/config.ts`)

Centralized environment variable access:

```9:29:/workspaces/website/lib/config.ts
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
```

### `content/` Directory

JSON files store all content. Each file represents one piece of content (project or achievement).

**Naming Convention:** Use kebab-case matching the slug

- `audionome.json` → slug: `"audionome"` → route: `/projects/audionome`
- `cerm-mcp-poc.json` → slug: `"cerm-mcp-poc"` → route: `/projects/cerm-mcp-poc`

**Project JSON Structure:**

```1:28:/workspaces/website/content/projects/audionome.json
{
  "title": "Audionome: Music Genre Classification",
  "shortDescription": "Using a Support Vector Machine (SVM) to classify music clips based on their genre.",
  "description": "For the AI Machine Learning course at VIVES University of Applied Sciences, I worked with Lynn Delaere on Audionome: an AI-powered system for music genre classification.\nWe trained several models (including logistic regression, SGD, and random forest) to automatically recognize and accurately classify music clips based on their genre. The project combines audio processing, machine learning, and a user-friendly interface built with Streamlit.",
  "technologies": [
    "AI",
    "SVM",
    "Streamlit",
    "Python",
    "Pandas",
    "NumPy",
    "Librosa",
    "Scikit-learn"
  ],
  "images": [
    {
      "src": "/images/projects/audionome/preview.jpg",
      "alt": "Audionome application interface showing music genre classification"
    },
    {
      "src": "/images/projects/audionome/quick-demo.webp",
      "alt": "Demo screenshot of Audionome classifying a music track with SVM model results"
    }
  ],
  "demoUrl": "https://audionome.streamlit.app/",
  "githubUrl": "https://github.com/SimonStnn/Audionome"
}
```

See [Adding New Projects](../02-guides/01-adding-projects.md) for content creation guide.

### `public/` Directory

Static assets served directly by Next.js. Files in `public/` are available at the root URL.

**Directory Organization:**

```
public/
├── images/
│   ├── projects/          # Project images
│   │   └── {slug}/        # One folder per project
│   ├── logos/             # Company/school logos
│   ├── hero.jpg           # Hero section image
│   └── profile-meta.jpg   # OpenGraph share image
├── download/
│   └── resume.pdf         # Downloadable resume
├── favicon.ico
├── site.webmanifest
└── robots.txt
```

**Image Path Convention:**

- Project images: `/images/projects/{slug}/image.jpg`
- Logos: `/images/logos/company.webp`
- Static images: `/images/hero.jpg`

**Example Usage:**

```typescript
<Image
  src="/images/projects/audionome/preview.jpg"
  alt="Audionome preview"
  width={1200}
  height={675}
/>
```

### `tests/` Directory

Jest unit tests mirror the source structure:

```
tests/
├── app/               # Page tests
│   ├── page.test.tsx
│   └── projects/
│       └── [slug]/
│           └── page.test.tsx
├── components/        # Component tests
│   ├── project-card.test.tsx
│   └── ui/
│       └── button.test.tsx
├── lib/              # Library tests
│   ├── projects.test.ts
│   └── skills.test.ts
└── middleware/       # Middleware tests
    └── analytics-webhook.test.ts
```

**Test Naming Convention:**

- `{filename}.test.ts` for utilities
- `{filename}.test.tsx` for components

**Running Tests:**

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
```

---

## Configuration Files

### TypeScript Configuration

Path aliases are configured in `tsconfig.json`:

```20:24:/workspaces/website/tsconfig.json
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
```

**Usage:**

```typescript
// Instead of: import { Button } from "../../components/ui/button"
import { Button } from "@/components/ui/button";
```

See [Conventions](./05-conventions.md#absolute-imports) for import standards.

### Tailwind Configuration

```1:19:/workspaces/website/tailwind.config.ts
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
```

**Key Features:**

- Dark mode via `class` strategy
- Custom HSL color variables
- shadcn/ui design tokens
- Container responsive utilities

### ESLint & Prettier

**ESLint extends:**

- `next/core-web-vitals` - Next.js best practices
- `next/typescript` - TypeScript rules
- `prettier` - Disable conflicting rules

**Prettier configuration:**

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

**Key Settings:**

- Double quotes for consistency
- 2-space indentation
- 100 character line width
- Automatic Tailwind class sorting

---

## Directory Reference

### Quick Reference Table

| Directory        | Purpose              | Import Path         | Content Type  |
| ---------------- | -------------------- | ------------------- | ------------- |
| `app/`           | Pages & layouts      | Direct route        | `.tsx` files  |
| `components/`    | React components     | `@/components/*`    | `.tsx` files  |
| `components/ui/` | shadcn/ui primitives | `@/components/ui/*` | `.tsx` files  |
| `lib/`           | Utilities & data     | `@/lib/*`           | `.ts` files   |
| `content/`       | JSON data            | Server-side only    | `.json` files |
| `public/`        | Static assets        | `/path/to/file`     | Images, files |
| `tests/`         | Unit tests           | N/A                 | `.test.ts(x)` |
| `docs/`          | Documentation        | N/A                 | `.md` files   |

### File Naming Conventions

| Type       | Convention           | Example                                 |
| ---------- | -------------------- | --------------------------------------- |
| Pages      | `page.tsx`           | `app/page.tsx`                          |
| Layouts    | `layout.tsx`         | `app/layout.tsx`                        |
| Components | PascalCase           | `ProjectCard.tsx` or `project-card.tsx` |
| Utilities  | kebab-case           | `file-download.ts`                      |
| Content    | kebab-case (slug)    | `audionome.json`                        |
| Tests      | `{name}.test.ts(x)`  | `projects.test.ts`                      |
| Types      | PascalCase interface | `export interface Project`              |

See [Conventions](./05-conventions.md) for detailed naming standards.

---

## See Also

Related documentation:

- **[Architecture Overview](./01-overview.md)** - High-level architecture and tech stack
- **[Data Flow](./03-data-flow.md)** - How data moves through directories
- **[Routing & Navigation](./04-routing-navigation.md)** - How `app/` directory maps to routes
- **[Conventions](./05-conventions.md)** - File naming and code standards
- **[Configuration Reference](./06-configuration.md)** - Detailed config file documentation

---

## Next Steps

1. **Understand routing**: Read [Routing & Navigation](./04-routing-navigation.md) to see how `app/` becomes routes
2. **Learn data flow**: Study [Data Flow](./03-data-flow.md) to understand content → component pipeline
3. **Add content**: Follow [Adding New Projects](../02-guides/01-adding-projects.md) to create content
4. **Explore components**: Review [Component Reference](../03-api/02-components.md) for component API

---

[← Back to Architecture Index](./README.md) | [Documentation Home](../README.md)
