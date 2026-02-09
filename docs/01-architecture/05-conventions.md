# Coding Conventions & Standards

**Navigation:** [Documentation Home](../README.md) → [Architecture](./README.md) → Conventions

---

## Table of Contents

- [Overview](#overview)
- [File Naming Conventions](#file-naming-conventions)
- [Import Standards](#import-standards)
- [TypeScript Guidelines](#typescript-guidelines)
- [React Patterns](#react-patterns)
- [Styling Conventions](#styling-conventions)
- [Git Workflow](#git-workflow)
- [Testing Standards](#testing-standards)
- [See Also](#see-also)
- [Next Steps](#next-steps)

---

## Overview

This project follows strict conventions for consistency, maintainability, and developer experience. All code is automatically validated through ESLint, Prettier, and TypeScript checks.

### Enforcement

Conventions are enforced through:

- **Pre-commit hooks** (Husky + lint-staged)
- **CI/CD pipeline** (GitHub Actions)
- **Editor integration** (ESLint + Prettier extensions)

**Pre-commit Hook:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

---

## File Naming Conventions

### Directory Names

Use **kebab-case** for all directories:

```
✅ Good
components/layout/
app/projects/
content/projects/

❌ Bad
components/Layout/
app/Projects/
content/project_files/
```

### Component Files

**Option 1: kebab-case** (recommended for new files)

```typescript
components / project - card.tsx;
components / achievement - card.tsx;
components / email - copy - button.tsx;
```

**Option 2: PascalCase** (acceptable, used in some existing files)

```typescript
components / ProjectCard.tsx;
components / AchievementCard.tsx;
```

**Rule:** Be consistent within the same directory.

### Utility Files

Use **kebab-case** for utilities and libraries:

```typescript
lib / projects.ts; // Data access
lib / file - download.ts; // Utility
lib / utils.ts; // Helpers
```

### Special Next.js Files

Next.js requires specific names (lowercase):

```typescript
app / page.tsx; // Route page
app / layout.tsx; // Layout wrapper
app / error.tsx; // Error boundary
app / not - found.tsx; // 404 page
app / loading.tsx; // Loading UI
```

### Content Files

Content files use **kebab-case** matching the slug:

```
content/projects/audionome.json            → slug: "audionome"
content/projects/cerm-mcp-poc.json         → slug: "cerm-mcp-poc"
content/achievements/rotary-award.json     → slug: "rotary-award"
```

**Slug Rules:**

- Lowercase only
- Use hyphens for spaces
- No special characters except hyphens
- Should be URL-safe

### Test Files

Mirror source file naming with `.test.ts(x)` suffix:

```
lib/projects.ts          → tests/lib/projects.test.ts
components/button.tsx    → tests/components/button.test.tsx
app/page.tsx            → tests/app/page.test.tsx
```

---

## Import Standards

### Absolute Imports

**Always use absolute imports** with the `@/` prefix:

```typescript
✅ Good
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/projects"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

❌ Bad
import { Button } from "../../components/ui/button"
import { getProjects } from "../../../lib/projects"
```

**Configuration:**

```20:24:/workspaces/website/tsconfig.json
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
```

### Import Order

Organize imports in this order:

1. **React and Next.js**
2. **Third-party libraries**
3. **Internal utilities and types**
4. **Internal components**
5. **Styles and assets**

**Example:**

```typescript
// 1. React/Next.js
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// 2. Third-party
import { ArrowLeft } from "lucide-react";

// 3. Internal utilities/types
import { getProjects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

// 4. Internal components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectCard from "@/components/project-card";

// 5. Styles (if needed)
import "./globals.css";
```

### Named vs Default Exports

**Prefer named exports** for utilities and data:

```typescript
✅ Good
// lib/projects.ts
export async function getProjects() { ... }
export async function getProjectBySlug(slug: string) { ... }

// Usage
import { getProjects, getProjectBySlug } from "@/lib/projects"
```

**Use default exports for components** (Next.js pages require it):

```typescript
// app/page.tsx
export default async function Home() {
  return <div>...</div>
}

// components/project-card.tsx
export default function ProjectCard({ project }: { project: Project }) {
  return <Card>...</Card>
}
```

---

## TypeScript Guidelines

### Type Everything

All functions, parameters, and return values must be typed:

```typescript
✅ Good
export async function getProjects(): Promise<Project[]> {
  const fileNames = fs.readdirSync(projectsDirectory);
  return projects;
}

export interface Project {
  slug: string;
  title: string;
  technologies: string[];
}

❌ Bad
export async function getProjects() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return projects;
}
```

### Interface vs Type

**Use `interface` for object shapes** (preferred):

```typescript
export interface Project {
  slug: string;
  title: string;
  description: string;
}
```

**Use `type` for unions, intersections, or primitives:**

```typescript
export type AchievementType = "certification" | "award" | "achievement";

export type ClassValue = string | number | boolean | undefined | null;
```

### Avoid `any`

Use proper types instead of `any`:

```typescript
✅ Good
export async function getProjects(): Promise<Project[]>
const projectData: unknown = JSON.parse(fileContent)

❌ Bad
export async function getProjects(): Promise<any>
const projectData: any = JSON.parse(fileContent)
```

Use `unknown` for JSON parsing, then validate:

```44:56:/workspaces/website/lib/projects.ts
      // Parse the JSON data with error handling
      let projectData: unknown;
      try {
        projectData = JSON.parse(fileContent);
      } catch (error) {
        console.error(`Error parsing JSON for project ${slug}`, { error, fileName });
        return null; // Skip invalid files
      }

      // Ensure it's an object and not an array
      if (typeof projectData !== "object" || projectData === null || Array.isArray(projectData)) {
        console.error(`Invalid JSON structure for project ${slug}`, { projectData });
        return null;
```

### TypeScript Configuration

Strict mode is enabled:

```1:27:/workspaces/website/tsconfig.json
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

**Key Settings:**

- `strict: true` - All strict checks enabled
- `noEmit: true` - TypeScript for checking only (Next.js handles compilation)
- `isolatedModules: true` - Required for Next.js
- `resolveJsonModule: true` - Import JSON files

---

## React Patterns

### Server Components (Default)

**Use Server Components by default** for optimal performance:

```typescript
// app/page.tsx
export default async function Home() {
  // Data fetching on server
  const projects = await getFeaturedProjects()
  const achievements = await getAchievements()

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
```

**Benefits:**

- No JavaScript sent to client
- Can use server-only APIs (fs, database)
- SEO-friendly
- Better performance

### Client Components (When Needed)

Use `'use client'` directive when you need:

- Event handlers (`onClick`, `onChange`)
- State (`useState`, `useReducer`)
- Effects (`useEffect`)
- Browser APIs
- React hooks

```typescript
'use client'

import { useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  )
}
```

### Component Props

**Always type component props:**

```typescript
✅ Good
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return <Card>...</Card>
}

// Or inline
export default function ProjectCard({ project }: { project: Project }) {
  return <Card>...</Card>
}

❌ Bad
export default function ProjectCard({ project, featured }) {
  return <Card>...</Card>
}
```

### Async Server Components

Fetch data directly in components:

```30:34:/workspaces/website/app/page.tsx
export default async function Home() {
  const projects = await getFeaturedProjects();
  const achievements = await getAchievements();
  const skills = await getSkills();

```

**No need for:**

- `getServerSideProps`
- `getStaticProps`
- `useEffect` for data fetching

### Component Composition

Break down complex components:

```typescript
// Instead of one large component
export default function ProjectPage() {
  return (
    <div>
      {/* 200 lines of JSX */}
    </div>
  )
}

// Split into smaller components
export default function ProjectPage({ project }: { project: Project }) {
  return (
    <div>
      <ProjectHeader project={project} />
      <ProjectImages images={project.images} />
      <ProjectContent description={project.description} />
      <ProjectTechnologies technologies={project.technologies} />
      <ProjectActions demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
    </div>
  )
}
```

Example from codebase:

```155:181:/workspaces/website/app/projects/[slug]/page.tsx
function ProjectContent({
  description,
  technologies,
}: {
  description: string;
  technologies: string[];
}) {
  return (
    <div className="prose max-w-none">
      <h2 className="mt-8 mb-4 text-2xl font-bold">Project Overview</h2>
      {description.split("\n").map((line, index) => (
        <p key={index} className="mb-4 text-justify">
          {line}
        </p>
      ))}

      <h2 className="mt-8 mb-4 text-2xl font-bold">Technologies Used</h2>
      <ul className="mb-8 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge key={tech} variant="secondary" asChild>
            <li>{tech}</li>
          </Badge>
        ))}
      </ul>
    </div>
  );
}
```

---

## Styling Conventions

### Tailwind CSS

**Use utility classes** directly in JSX:

```typescript
<div className="flex min-h-screen flex-col">
  <h1 className="text-4xl font-extrabold md:text-6xl">
    Title
  </h1>
</div>
```

### Class Merging with `cn()`

Use the `cn()` utility for conditional classes:

```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-class",
  isActive && "active-class",
  isPrimary ? "primary-class" : "secondary-class"
)}>
  Content
</div>
```

**The `cn()` utility:**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Benefits:**

- Merges class lists
- Resolves Tailwind conflicts (later wins)
- Handles conditional classes

### Responsive Design

Use Tailwind breakpoints:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

**Breakpoints:**

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Dark Mode

Use Tailwind's dark mode classes:

```typescript
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-gray-100">
    Content adapts to theme
  </p>
</div>
```

Configuration:

```3:10:/workspaces/website/tailwind.config.ts
const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
```

### Avoid Inline Styles

```typescript
❌ Bad
<div style={{ color: 'red', fontSize: '24px' }}>

✅ Good
<div className="text-red-500 text-2xl">
```

---

## Git Workflow

### Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]
```

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting (no code change)
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Build/config changes

**Examples:**

```bash
git commit -m "feat(projects): add video support for project images"
git commit -m "fix(skills): correct skill ID generation for special characters"
git commit -m "docs(architecture): add data flow diagrams"
git commit -m "refactor(components): extract ProjectActions component"
```

### Branch Strategy

- **main-v2** - Production branch
- **feature/\*** - Feature branches
- **fix/\*** - Bug fix branches
- **docs/\*** - Documentation branches

### Pre-commit Hooks

Husky runs checks before commit:

```bash
# .husky/pre-commit
npx lint-staged
```

**What gets checked:**

- TypeScript compilation
- ESLint rules
- Prettier formatting
- Import order

**If checks fail, commit is blocked** until fixed.

### Pull Requests

Before submitting a PR:

```bash
npm run lint          # Check linting
npm run format:check  # Check formatting
npm test             # Run tests
npm run build        # Ensure build succeeds
```

CI will run the same checks on push.

---

## Testing Standards

### Test File Location

Mirror source structure:

```
lib/projects.ts              → tests/lib/projects.test.ts
components/button.tsx        → tests/components/button.test.tsx
app/page.tsx                → tests/app/page.test.tsx
```

### Test Naming

Use `describe` and `it` blocks:

```typescript
import { getProjects } from "@/lib/projects";

describe("getProjects", () => {
  it("should return all projects", async () => {
    const projects = await getProjects();
    expect(projects).toBeDefined();
    expect(Array.isArray(projects)).toBe(true);
  });

  it("should sort projects by order field", async () => {
    const projects = await getProjects();
    const orderedProjects = projects.filter((p) => p.order !== undefined);

    for (let i = 0; i < orderedProjects.length - 1; i++) {
      expect(orderedProjects[i].order!).toBeLessThanOrEqual(orderedProjects[i + 1].order!);
    }
  });
});
```

### Component Testing

Use React Testing Library:

```typescript
import { render, screen } from "@testing-library/react"
import ProjectCard from "@/components/project-card"

describe("ProjectCard", () => {
  const mockProject = {
    slug: "test-project",
    title: "Test Project",
    shortDescription: "A test project",
    // ... other fields
  }

  it("renders project title", () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText("Test Project")).toBeInTheDocument()
  })
})
```

### Running Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- --coverage # Coverage report
```

### Test Coverage

Jest is configured to collect coverage:

```17:28:/workspaces/website/jest.config.js
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
```

View coverage report: `open coverage/index.html`

---

## See Also

Related documentation:

- **[Architecture Overview](./01-overview.md)** - Understanding the system
- **[Directory Structure](./02-directory-structure.md)** - Where files belong
- **[Configuration Reference](./06-configuration.md)** - Tool configurations
- **[Development Workflow](../02-guides/03-development-workflow.md)** - Day-to-day development
- **[Testing Guide](../02-guides/05-testing.md)** - Writing and running tests

---

## Next Steps

1. **Configure editor**: Install ESLint and Prettier extensions
2. **Review code**: Study existing components for patterns
3. **Run checks**: Execute `npm run lint` and `npm test`
4. **Start coding**: Follow these conventions in your work

---

[← Back to Architecture Index](./README.md) | [Documentation Home](../README.md)
