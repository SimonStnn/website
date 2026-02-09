# Contributing to the Portfolio

**Breadcrumbs:** [Documentation](../index.md) > [Guides](./index.md) > Contributing

This guide provides comprehensive guidelines for contributing to the Simon Stijnen portfolio website codebase.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Git Workflow](#git-workflow)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Pull Request Process](#pull-request-process)
- [Common Scenarios](#common-scenarios)

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 20+ installed
- Git configured with your credentials
- Familiarity with TypeScript, React, and Next.js 15
- Understanding of the project architecture (see [Architecture Guide](../01-architecture/01-overview.md))

### Initial Setup

1. **Clone the repository:**

```bash
git clone https://github.com/SimonStnn/website.git
cd website
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env
```

Edit `.env` with your local configuration:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_NAME="Simon Stijnen"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Analytics (optional for development)
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_GTM_ID=""

# Webhook (optional)
WEBHOOK_URL=""
WEBHOOK_ENABLED="false"
```

4. **Run the development server:**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site running locally.

### Understanding the Codebase

Key directories to familiarize yourself with:

- `app/` - Next.js 15 app router pages and layouts
- `components/` - React components (UI and business logic)
- `lib/` - Data access functions and utilities
- `content/` - JSON data for projects and achievements
- `public/` - Static assets (images, PDFs, etc.)
- `middleware/` - Next.js middleware (webhook tracking)
- `docs/` - Project documentation

## Development Workflow

### 1. Creating a Development Branch

Always create a feature branch from `main-v2`:

```bash
git checkout main-v2
git pull origin main-v2
git checkout -b feature/your-feature-name
```

Branch naming conventions:

- `feature/` - New features (e.g., `feature/add-dark-mode-toggle`)
- `fix/` - Bug fixes (e.g., `fix/mobile-navigation-bug`)
- `docs/` - Documentation changes (e.g., `docs/update-contributing-guide`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-project-loading`)
- `test/` - Test additions/changes (e.g., `test/add-project-tests`)

### 2. Making Changes

#### Code Changes

When modifying code:

1. **Read existing files first** - Understand the current implementation
2. **Follow existing patterns** - Maintain consistency with the codebase
3. **Use absolute imports** - Always use `@/` prefix, never relative imports

**Example - Adding a new component:**

```typescript
// ❌ BAD: Relative imports
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

// ✅ GOOD: Absolute imports
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

4. **Type everything** - Use TypeScript interfaces and types
5. **Add JSDoc comments** - Document complex functions

```typescript
/**
 * Generates a unique skill ID from a skill name
 * @param skillName - The name of the skill (e.g., "Next.js")
 * @returns A URL-safe slug (e.g., "nextjs")
 */
export function generateSkillId(skillName: string): string {
  return skillName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
```

#### Content Changes

**Adding a new project:**

1. Create JSON file in `content/projects/`:

```json
{
  "title": "My New Project",
  "shortDescription": "A brief one-line description",
  "description": "A longer, detailed description explaining what the project does, the problem it solves, and technical highlights.",
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "images": [
    {
      "src": "/images/projects/my-project/screenshot.jpg",
      "alt": "Screenshot showing the main dashboard"
    }
  ],
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/username/repo",
  "order": 7
}
```

2. Add images to `public/images/projects/my-project/`

3. Test locally:

```bash
# Visit http://localhost:3000/projects
# Your project should appear in the list
```

**Adding an achievement:**

Similar process in `content/achievements/`:

```json
{
  "title": "Best Developer Award",
  "issuer": "Tech Conference 2024",
  "date": "2024-10",
  "type": "award",
  "description": "Recognized for outstanding contributions to open source"
}
```

### 3. Testing Changes

Before committing, test your changes:

```bash
# Run linting
npm run lint

# Run formatting check
npm run format:check

# Run tests
npm test

# Build check (ensures production build works)
npm run build
```

### 4. Git Pre-commit Hooks

The project uses Husky and lint-staged to automatically format code on commit:

- Automatically runs Prettier on staged files
- Runs ESLint --fix on TypeScript/JavaScript files
- Formats JSON, CSS, and Markdown files

If the hook fails, fix the issues and try committing again.

## Code Standards

### TypeScript

- **Use strict types** - No `any` unless absolutely necessary
- **Define interfaces** - For all data structures

```typescript
// ✅ GOOD: Proper interface definition
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

// ❌ BAD: Using any
const projects: any[] = await getProjects();
```

### React Components

- **Use functional components** - No class components
- **Use hooks** - For state and side effects
- **Keep components focused** - Single responsibility principle
- **Extract reusable logic** - Into custom hooks

```typescript
// ✅ GOOD: Focused component
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{project.shortDescription}</p>
      </CardContent>
    </Card>
  );
}
```

### Styling

- **Use Tailwind classes** - No inline styles
- **Use the `cn()` utility** - For conditional classes
- **Follow mobile-first approach** - Start with mobile, scale up

```typescript
import { cn } from '@/lib/utils';

// ✅ GOOD: Using cn() with conditional classes
<div className={cn(
  "rounded-lg border p-4",
  isActive && "bg-primary text-primary-foreground",
  disabled && "opacity-50 cursor-not-allowed"
)}>
```

### File Naming

- **Components** - PascalCase: `ProjectCard.tsx`
- **Utilities** - camelCase: `utils.ts`, `config.ts`
- **Pages** - kebab-case: `[slug]/page.tsx`
- **Content** - kebab-case: `my-project.json`

## Git Workflow

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic changes)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**

```bash
feat(projects): add video support to project images

- Add isVideoFile() utility to detect video formats
- Update ProjectGallery to render video elements
- Support .mp4, .webm, .mov formats

fix(navigation): mobile menu not closing on route change

docs(guides): add contribution guidelines

refactor(skills): simplify skill generation logic

test(projects): add tests for getProjectBySlug

chore(deps): update Next.js to 15.5.9
```

### Pushing Changes

```bash
# Add changes
git add .

# Commit (pre-commit hooks will run automatically)
git commit -m "feat(projects): add video support"

# Push to your feature branch
git push origin feature/your-feature-name
```

## Testing Requirements

### Unit Tests

Write tests for:

- Utility functions
- Data transformation logic
- Complex business logic

**Example test:**

```typescript
// lib/__tests__/utils.test.ts
import { isVideoFile } from "@/lib/utils";

describe("isVideoFile", () => {
  it("should return true for video files", () => {
    expect(isVideoFile("video.mp4")).toBe(true);
    expect(isVideoFile("demo.webm")).toBe(true);
    expect(isVideoFile("recording.mov")).toBe(true);
  });

  it("should return false for non-video files", () => {
    expect(isVideoFile("image.jpg")).toBe(false);
    expect(isVideoFile("document.pdf")).toBe(false);
  });

  it("should be case insensitive", () => {
    expect(isVideoFile("VIDEO.MP4")).toBe(true);
    expect(isVideoFile("Demo.WebM")).toBe(true);
  });
});
```

### Integration Tests

Test component rendering and interactions:

```typescript
// components/__tests__/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/project-card';

const mockProject = {
  slug: 'test-project',
  title: 'Test Project',
  shortDescription: 'A test project',
  description: 'Detailed description',
  technologies: ['React', 'TypeScript'],
  images: [],
};

describe('ProjectCard', () => {
  it('should render project title', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should render project technologies', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Documentation Standards

When adding new features or making significant changes:

### 1. Update Inline Documentation

Add JSDoc comments to functions:

```typescript
/**
 * Fetches all projects and sorts them by order
 * @returns Promise resolving to an array of projects
 * @throws Error if the projects directory cannot be read
 */
export async function getProjects(): Promise<Project[]> {
  // Implementation
}
```

### 2. Update Relevant Guides

If your change affects:

- **Architecture** - Update `docs/01-architecture/`
- **Content** - Update `docs/03-content/`
- **Deployment** - Update `docs/05-deployment/`
- **Guides** - Update `docs/06-guides/`

### 3. Add Examples

Include practical examples in documentation:

```markdown
## Adding a New Project

1. Create `my-project.json` in `content/projects/`:

\`\`\`json
{
"title": "My Project"
}
\`\`\`

2. Add images to `public/images/projects/my-project/`
```

## Pull Request Process

### 1. Create Pull Request

Push your branch and create a PR on GitHub:

```bash
git push origin feature/your-feature-name
```

Navigate to the repository and click "New Pull Request".

### 2. PR Title and Description

Use the same format as commit messages:

**Title:**

```
feat(projects): add video support to project images
```

**Description template:**

```markdown
## Summary

Brief description of what this PR does.

## Changes

- Add isVideoFile() utility
- Update ProjectGallery component
- Add video rendering support

## Testing

- [ ] Local testing completed
- [ ] Tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Linting passes (`npm run lint`)

## Screenshots

[Add screenshots if UI changes]

## Related Issues

Closes #123
```

### 3. Review Process

- **Automated checks** - CI must pass (linting, tests, build)
- **Code review** - At least one approval required
- **Documentation** - Ensure relevant docs are updated
- **Testing** - Verify changes work as expected

### 4. Addressing Feedback

If reviewers request changes:

```bash
# Make changes locally
git add .
git commit -m "fix: address review feedback"
git push origin feature/your-feature-name
```

The PR will automatically update.

### 5. Merging

Once approved:

- **Squash and merge** - For feature branches
- **Update changelog** - If applicable
- **Delete branch** - After merging

## Common Scenarios

### Adding a New UI Component

1. **Check shadcn/ui first** - See if the component exists

```bash
npx shadcn@latest add button
```

2. **Create custom component** - If needed

```typescript
// components/custom/my-component.tsx
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn('my-default-classes', className)}>
      {children}
    </div>
  );
}
```

3. **Use in pages/components** - Import and use

```typescript
import { MyComponent } from '@/components/custom/my-component';

export default function Page() {
  return <MyComponent>Content</MyComponent>;
}
```

### Adding a New Page

1. **Create page file** - In `app/` directory

```typescript
// app/my-page/page.tsx
export default function MyPage() {
  return <div>My Page Content</div>;
}
```

2. **Add metadata** - For SEO

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Description of my page',
};

export default function MyPage() {
  return <div>My Page Content</div>;
}
```

3. **Update navigation** - If needed in header

```typescript
// components/layout/header.tsx
const navItems = [
  { href: "/", label: "Home" },
  { href: "/my-page", label: "My Page" },
];
```

### Adding Environment Variables

1. **Add to `.env`:**

```bash
NEXT_PUBLIC_NEW_FEATURE_ENABLED="true"
```

2. **Add to `lib/config.ts`:**

```typescript
export const featureConfig = {
  newFeatureEnabled: process.env.NEXT_PUBLIC_NEW_FEATURE_ENABLED === "true",
};
```

3. **Use in components:**

```typescript
import { featureConfig } from "@/lib/config";

if (featureConfig.newFeatureEnabled) {
  // Feature code
}
```

4. **Update documentation** - Add to environment variables guide

### Fixing a Bug

1. **Reproduce the bug** - Understand the issue
2. **Write a failing test** - If possible
3. **Fix the issue** - Make the minimal change needed
4. **Verify the fix** - Test manually and with automated tests
5. **Update documentation** - If behavior changed

```bash
git checkout -b fix/navigation-menu-bug
# Make changes
npm test
npm run build
git add .
git commit -m "fix(navigation): prevent menu from overlapping content"
git push origin fix/navigation-menu-bug
```

## See Also

- [Best Practices](./03-best-practices.md) - Code patterns and conventions
- [Troubleshooting](./02-troubleshooting.md) - Common issues and solutions
- [Architecture Overview](../01-architecture/01-overview.md) - Project structure
- [Testing Guide](../04-development/07-testing.md) - Testing strategies

## Next Steps

- Set up your development environment
- Read the [Best Practices](./03-best-practices.md) guide
- Explore the codebase
- Pick an issue to work on
- Create your first pull request!

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
