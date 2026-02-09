# Best Practices & Code Patterns

**Breadcrumbs:** [Documentation](../index.md) > [Guides](./index.md) > Best Practices

This guide outlines recommended code patterns, conventions, and best practices for the portfolio website codebase.

## Table of Contents

- [Project Structure](#project-structure)
- [TypeScript Patterns](#typescript-patterns)
- [React Component Patterns](#react-component-patterns)
- [Data Management](#data-management)
- [Styling Patterns](#styling-patterns)
- [Performance Optimization](#performance-optimization)
- [SEO Best Practices](#seo-best-practices)
- [Security Best Practices](#security-best-practices)
- [Testing Patterns](#testing-patterns)

## Project Structure

### File Organization

Follow these patterns for consistent file organization:

```
app/
├── (pages)/              # Page routes
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   └── projects/
│       ├── page.tsx     # Projects list
│       └── [slug]/
│           └── page.tsx # Project detail
├── api/                 # API routes (if needed)
├── globals.css          # Global styles
├── sitemap.ts          # Dynamic sitemap
└── robots.ts           # Dynamic robots.txt

components/
├── ui/                  # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── layout/              # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   └── navigation.tsx
├── meta/                # SEO/metadata components
│   ├── analytics.tsx
│   └── structured-data.tsx
└── [feature]/           # Feature-specific components
    ├── project-card.tsx
    └── project-gallery.tsx

lib/
├── config.ts           # Configuration
├── utils.ts            # Utility functions
├── projects.ts         # Project data access
├── achievements.ts     # Achievement data access
└── skills.ts           # Skill generation

content/
├── projects/           # Project JSON files
│   ├── project-1.json
│   └── project-2.json
└── achievements/       # Achievement JSON files
    └── achievement-1.json
```

### Import Organization

**Order imports consistently:**

```typescript
// 1. External dependencies
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// 2. Internal components (UI first)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// 3. Internal utilities and data
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";

// 4. Types
import type { Project } from "@/lib/projects";

// 5. Styles (if any)
import styles from "./styles.module.css";
```

**Always use absolute imports:**

```typescript
// ❌ BAD: Relative imports
import { Button } from "../../../components/ui/button";
import { cn } from "../../lib/utils";

// ✅ GOOD: Absolute imports
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## TypeScript Patterns

### Interface Definitions

**Define strict interfaces for all data structures:**

```typescript
// ✅ GOOD: Comprehensive interface
export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  images: ProjectImage[];
  demoUrl?: string; // Optional with ?
  githubUrl?: string;
  order?: number;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

// ❌ BAD: Loose typing
type Project = {
  slug: any;
  title: any;
  // Missing fields
};
```

### Type Guards

**Use type guards for runtime type checking:**

```typescript
// ✅ GOOD: Type guard function
function isProject(data: unknown): data is Project {
  return (
    typeof data === "object" &&
    data !== null &&
    "slug" in data &&
    "title" in data &&
    "description" in data &&
    Array.isArray((data as Project).technologies)
  );
}

// Usage
const data = JSON.parse(fileContent);
if (isProject(data)) {
  // TypeScript knows data is Project here
  console.log(data.title);
}
```

### Utility Types

**Leverage TypeScript utility types:**

```typescript
// Partial - make all properties optional
type PartialProject = Partial<Project>;

// Pick - select specific properties
type ProjectSummary = Pick<Project, "slug" | "title" | "shortDescription">;

// Omit - exclude properties
type ProjectWithoutImages = Omit<Project, "images">;

// Required - make all properties required
type RequiredProject = Required<Project>;

// Example usage
function updateProject(slug: string, updates: Partial<Project>) {
  // updates can have any subset of Project properties
}
```

### Generic Functions

**Use generics for reusable functions:**

```typescript
// ✅ GOOD: Generic filter function
function filterByField<T, K extends keyof T>(items: T[], field: K, value: T[K]): T[] {
  return items.filter((item) => item[field] === value);
}

// Usage
const reactProjects = filterByField(projects, "technologies", "React");
```

## React Component Patterns

### Server Components (Default)

**Use server components by default:**

```typescript
// app/projects/page.tsx (Server Component)
import { getProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/project-card';

export default async function ProjectsPage() {
  // Data fetching in server component
  const projects = await getProjects();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
```

### Client Components

**Use client components only when needed:**

```typescript
// components/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </Button>
  );
}
```

**When to use client components:**

- Using React hooks (`useState`, `useEffect`, etc.)
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `document`, etc.)
- Third-party libraries that require client-side JavaScript

### Component Props

**Define props with interfaces:**

```typescript
// ✅ GOOD: Explicit interface
interface ProjectCardProps {
  project: Project;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
  onSelect?: (project: Project) => void;
}

export function ProjectCard({
  project,
  className,
  variant = 'default',
  onSelect,
}: ProjectCardProps) {
  return (
    <Card className={cn('project-card', className)} onClick={() => onSelect?.(project)}>
      {/* Component content */}
    </Card>
  );
}

// ❌ BAD: Inline props without interface
export function ProjectCard({ project, className }: { project: any; className?: string }) {
  // ...
}
```

### Component Composition

**Favor composition over prop drilling:**

```typescript
// ✅ GOOD: Composition pattern
export function ProjectCard({ children }: { children: React.ReactNode }) {
  return <Card>{children}</Card>;
}

export function ProjectCardHeader({ children }: { children: React.ReactNode }) {
  return <CardHeader>{children}</CardHeader>;
}

export function ProjectCardContent({ children }: { children: React.ReactNode }) {
  return <CardContent>{children}</CardContent>;
}

// Usage
<ProjectCard>
  <ProjectCardHeader>
    <h3>{project.title}</h3>
  </ProjectCardHeader>
  <ProjectCardContent>
    <p>{project.description}</p>
  </ProjectCardContent>
</ProjectCard>

// ❌ BAD: Prop drilling
<ProjectCard
  title={project.title}
  description={project.description}
  headerClassName="..."
  contentClassName="..."
  showBadge={true}
  // Too many props!
/>
```

### Custom Hooks

**Extract reusable logic into hooks:**

```typescript
// hooks/use-projects.ts
import { useState, useEffect } from 'react';
import type { Project } from '@/lib/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { projects, loading, error };
}

// Usage in component
'use client';

export function ProjectList() {
  const { projects, loading, error } = useProjects();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
```

## Data Management

### Data Fetching

**Use server-side data fetching:**

```typescript
// ✅ GOOD: Server-side data fetching
// app/projects/page.tsx
export default async function ProjectsPage() {
  const projects = await getProjects(); // Runs on server
  return <ProjectList projects={projects} />;
}

// ❌ BAD: Client-side data fetching for static data
'use client';
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/api/projects').then(/* ... */); // Unnecessary client-side fetch
  }, []);
}
```

### Caching Strategy

**Implement appropriate caching:**

```typescript
// lib/projects.ts - Cache in memory for repeated calls
let projectsCache: Project[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 60000; // 1 minute

export async function getProjects(): Promise<Project[]> {
  const now = Date.now();

  if (projectsCache && now - cacheTimestamp < CACHE_TTL) {
    return projectsCache;
  }

  const projects = await loadProjectsFromFiles();
  projectsCache = projects;
  cacheTimestamp = now;

  return projects;
}
```

### Error Handling

**Handle errors gracefully:**

```typescript
// ✅ GOOD: Comprehensive error handling
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await getProjects();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
      console.warn(`Project not found: ${slug}`);
      return null;
    }

    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    // Don't throw - return null for graceful degradation
    return null;
  }
}

// Usage in component
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound(); // Next.js 404 page
  }

  return <ProjectDetail project={project} />;
}
```

## Styling Patterns

### Tailwind CSS

**Use utility classes with mobile-first approach:**

```typescript
// ✅ GOOD: Mobile-first, responsive design
<div className="
  flex flex-col gap-4          // Mobile: vertical stack
  md:flex-row md:gap-6         // Tablet: horizontal layout
  lg:gap-8                     // Desktop: larger gaps
  p-4 md:p-6 lg:p-8           // Responsive padding
">
  {/* Content */}
</div>

// ❌ BAD: Desktop-first approach
<div className="
  flex-row gap-8               // Assumes desktop
  md:flex-col md:gap-4         // Has to override for mobile
">
```

### Conditional Styling

**Use `cn()` utility for conditional classes:**

```typescript
import { cn } from '@/lib/utils';

// ✅ GOOD: Using cn() for conditional classes
<Button
  className={cn(
    'rounded-lg px-4 py-2',
    isActive && 'bg-primary text-primary-foreground',
    isDisabled && 'opacity-50 cursor-not-allowed',
    variant === 'outline' && 'border border-primary',
    className // Allow override from props
  )}
>
  Click me
</Button>

// ❌ BAD: Manual string concatenation
<Button
  className={
    'rounded-lg px-4 py-2 ' +
    (isActive ? 'bg-primary text-primary-foreground ' : '') +
    (isDisabled ? 'opacity-50 cursor-not-allowed ' : '')
  }
>
```

### Component Variants

**Use class-variance-authority for variant patterns:**

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
```

### Dark Mode

**Use CSS variables for theme-aware styling:**

```css
/* globals.css */
:root {
  --primary: oklch(0.48 0.0813 198.19);
  --primary-foreground: #ffffff;
}

.dark {
  --primary: oklch(0.68 0.13 264.2);
  --primary-foreground: #f4f4f5;
}
```

```typescript
// Components automatically adapt to theme
<div className="bg-primary text-primary-foreground">
  {/* Works in both light and dark mode */}
</div>
```

## Performance Optimization

### Image Optimization

**Use Next.js Image component:**

```typescript
import Image from 'next/image';

// ✅ GOOD: Optimized images
<Image
  src="/images/projects/project-1/screenshot.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/..." // Or import image for automatic blur
/>

// ❌ BAD: Regular img tag
<img src="/images/projects/project-1/screenshot.jpg" alt="Screenshot" />
```

### Code Splitting

**Use dynamic imports for large components:**

```typescript
import dynamic from 'next/dynamic';

// ✅ GOOD: Lazy load heavy components
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

### Memoization

**Memoize expensive computations:**

```typescript
'use client';
import { useMemo } from 'react';

export function ProjectList({ projects }: { projects: Project[] }) {
  // ✅ GOOD: Memoize filtered results
  const featuredProjects = useMemo(
    () => projects.filter((p) => p.order && p.order <= 6),
    [projects]
  );

  const sortedProjects = useMemo(
    () => projects.sort((a, b) => a.title.localeCompare(b.title)),
    [projects]
  );

  return (
    <div>
      <section>
        <h2>Featured</h2>
        {featuredProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
      <section>
        <h2>All Projects</h2>
        {sortedProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
    </div>
  );
}
```

## SEO Best Practices

### Metadata Generation

**Generate metadata for all pages:**

```typescript
// app/projects/[slug]/page.tsx
import { Metadata } from "next";
import { getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: project.images.map((img) => ({
        url: img.src,
        alt: img.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: [project.images[0]?.src],
    },
  };
}
```

### Structured Data

**Add JSON-LD structured data:**

```typescript
// components/meta/structured-data.tsx
export function ProjectJsonLd({ project }: { project: Project }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    keywords: project.technologies.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

## Security Best Practices

### Environment Variables

**Never expose secrets in client code:**

```typescript
// ✅ GOOD: Server-only secret
// lib/server-only-function.ts
import { headers } from "next/headers";

export async function sendWebhook(data: unknown) {
  const webhookUrl = process.env.WEBHOOK_URL; // Server-only
  await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ❌ BAD: Exposing secret in client
("use client");
export function MyComponent() {
  const webhookUrl = process.env.WEBHOOK_URL; // undefined in client!
}
```

### Input Validation

**Validate all user input:**

```typescript
// ✅ GOOD: Input validation
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  // Validate slug format
  if (!/^[a-z0-9-]+$/.test(slug)) {
    console.warn("Invalid slug format:", slug);
    return null;
  }

  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}
```

### Sanitize Content

**Sanitize dynamic content:**

```typescript
// ✅ GOOD: Safe content rendering
export function ProjectDescription({ description }: { description: string }) {
  // React automatically escapes text content
  return <p>{description}</p>;
}

// ⚠️ CAUTION: Only if you trust the source
export function RichContent({ html }: { html: string }) {
  // Use DOMPurify or similar library
  return <div dangerouslySetInnerHTML={{ __html: sanitize(html) }} />;
}
```

## Testing Patterns

### Unit Tests

**Test utility functions:**

```typescript
// lib/__tests__/utils.test.ts
import { cn, isVideoFile } from "@/lib/utils";

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", false && "hidden", true && "visible")).toBe("base visible");
  });
});

describe("isVideoFile", () => {
  it("should detect video extensions", () => {
    expect(isVideoFile("video.mp4")).toBe(true);
    expect(isVideoFile("video.webm")).toBe(true);
    expect(isVideoFile("image.jpg")).toBe(false);
  });

  it("should be case insensitive", () => {
    expect(isVideoFile("VIDEO.MP4")).toBe(true);
  });
});
```

### Component Tests

**Test component rendering:**

```typescript
// components/__tests__/project-card.test.tsx
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/project-card';

const mockProject: Project = {
  slug: 'test-project',
  title: 'Test Project',
  shortDescription: 'A test project',
  description: 'Full description',
  technologies: ['React', 'TypeScript'],
  images: [],
};

describe('ProjectCard', () => {
  it('should render project title', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should render technologies', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
```

## See Also

- [Contributing Guide](./01-contributing.md) - Development workflow
- [Troubleshooting](./02-troubleshooting.md) - Common issues
- [Tailwind Configuration](./styling/01-tailwind-config.md) - Styling setup
- [Utility Functions](./utilities/01-utility-functions.md) - Helper functions

## Next Steps

- Review the patterns above
- Apply them to new code
- Refactor existing code to follow patterns
- Share knowledge with team members

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
