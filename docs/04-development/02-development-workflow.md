# Development Workflow

**Navigation:** [Home](../../README.md) > [Development](./README.md) > Development Workflow

---

## Overview

This guide covers the day-to-day development workflow for the Simon Stijnen Portfolio project, including best practices, common tasks, and tips for efficient development.

## Starting Development

### Launch the Development Server

The project uses Turbopack for fast development builds:

```bash
npm run dev
```

**Output:**

```
  ▲ Next.js 15.5.9 (turbo)
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1.2s
```

**Turbopack features:**

- Fast refresh (instant updates on save)
- Optimized bundling
- Faster cold starts than webpack
- Hot module replacement (HMR)

### Access Your Local Site

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Pro tip:** Keep your browser's DevTools open (F12) to monitor:

- Console errors/warnings
- Network requests
- React component tree (with React DevTools extension)

## Development Cycle

### 1. Make Changes

Edit files in your preferred editor (VSCode, Cursor, WebStorm, etc.).

**Hot reload works for:**

- React components (`.tsx`, `.jsx`)
- Page files (`app/**/page.tsx`)
- Layouts (`app/**/layout.tsx`)
- CSS/Tailwind changes
- JSON content files (requires manual refresh)

**Example: Editing a component**

```typescript
// components/project-card.tsx
export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-xl font-bold">{project.title}</h3>
      {/* Changes appear instantly on save */}
      <p className="text-muted-foreground">{project.shortDescription}</p>
    </div>
  );
}
```

**Save the file** → Browser updates automatically

### 2. Verify Changes

Check the browser to ensure:

- Changes appear correctly
- No visual regressions
- Console is free of errors
- Mobile responsive (use DevTools device emulation)

**Quick checks:**

```bash
# Terminal shows compilation status
✓ Compiled /projects in 234ms (286 modules)
```

**If errors occur:**

```bash
# Terminal shows detailed error
✗ Failed to compile
./app/page.tsx
Error: Module not found
```

Fix the error, save, and Next.js will automatically retry.

### 3. Test Functionality

For components with interactivity:

```bash
# Write tests (if needed)
npm test

# Watch mode for active development
npm run test:watch
```

See [Testing Guide](./07-testing.md) for comprehensive testing documentation.

### 4. Check Code Quality

Before committing, ensure code meets quality standards:

```bash
# Run linter
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Format code
npm run format

# Check formatting without changing files
npm run format:check

# Run all checks (CI simulation)
npm run ci:check
```

## Common Development Tasks

### Adding a New Project

**Step 1: Create JSON file**

```bash
# Create project JSON
touch content/projects/my-new-project.json
```

**Step 2: Add content**

```json
{
  "title": "My New Project",
  "shortDescription": "A brief description for cards",
  "description": "Detailed project description with **markdown** support",
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "images": [
    {
      "src": "/images/projects/my-new-project/screenshot.png",
      "alt": "Project screenshot"
    }
  ],
  "demoUrl": "https://example.com",
  "githubUrl": "https://github.com/username/repo",
  "order": 7
}
```

**Step 3: Add images**

```bash
mkdir -p public/images/projects/my-new-project
# Copy your images to this directory
```

**Step 4: Verify**

Navigate to `http://localhost:3000/projects/my-new-project` to see your project page.

See [Projects Documentation](../03-content/01-projects.md) for complete details.

### Modifying Components

**Example: Updating the navigation menu**

```typescript
// components/navigation.tsx

export function Navigation() {
  const items = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "New Section", href: "/new-section" }, // Add new item
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav>
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.name}
        </a>
      ))}
    </nav>
  );
}
```

**Create the new page:**

```bash
mkdir -p app/new-section
touch app/new-section/page.tsx
```

### Working with Styles

**Tailwind CSS workflow:**

1. **Use utility classes:**

   ```tsx
   <div className="bg-card flex items-center gap-4 rounded-lg p-6 shadow-md">
     <h2 className="text-foreground text-2xl font-bold">Title</h2>
   </div>
   ```

2. **Use the `cn()` utility for conditional classes:**

   ```tsx
   import { cn } from "@/lib/utils";

   export function Button({ variant = "default", className, ...props }) {
     return (
       <button
         className={cn(
           "rounded-lg px-4 py-2",
           variant === "primary" && "bg-primary text-primary-foreground",
           variant === "secondary" && "bg-secondary text-secondary-foreground",
           className
         )}
         {...props}
       />
     );
   }
   ```

3. **Use CSS variables from theme:**

   ```tsx
   // These map to CSS variables defined in app/globals.css
   <div className="bg-background text-foreground">
     <span className="text-muted-foreground">Muted text</span>
   </div>
   ```

**Auto-sort Tailwind classes:**

The project uses `prettier-plugin-tailwindcss` to automatically sort classes:

```bash
npm run format
```

**Before:**

```tsx
<div className="mb-2 rounded-lg p-4 text-lg font-bold">Content</div>
```

**After:**

```tsx
<div className="mb-2 rounded-lg p-4 text-lg font-bold">Content</div>
```

### Environment Variable Changes

When you modify `.env` variables:

1. **Restart the dev server** (Ctrl + C, then `npm run dev`)
2. Environment variables are loaded on server startup, not hot-reloaded

```bash
# Stop server
# Press Ctrl + C

# Restart with new env vars
npm run dev
```

**Example scenario:**

```env
# Change analytics ID
NEXT_PUBLIC_GA_ID="G-NEW123456"
```

Restart required for changes to take effect.

### Working with TypeScript

**Type checking during development:**

Next.js checks types during build, but for real-time feedback:

```bash
# Check types without building
npx tsc --noEmit

# Watch mode (checks on file changes)
npx tsc --noEmit --watch
```

**IDE integration:**

Most IDEs (VSCode, Cursor) provide real-time TypeScript errors. Ensure your editor's TypeScript version matches the project:

```bash
# Check project TypeScript version
npm list typescript
# Output: typescript@5.x.x
```

**Common type errors:**

```typescript
// Error: Property 'foo' does not exist on type 'Project'
const project: Project = { foo: "bar" }; // ❌

// Solution: Use correct interface
const project: Project = {
  title: "My Project",
  shortDescription: "...",
  description: "...",
  technologies: [],
  images: [],
};
```

### Debugging

**Console logging:**

```typescript
export function MyComponent({ data }) {
  console.log("Data:", data); // Shows in browser console
  console.log("Server data:", data); // Shows in terminal (server components)

  return <div>{/* ... */}</div>;
}
```

**React DevTools:**

Install the [React DevTools browser extension](https://react.dev/learn/react-developer-tools) to:

- Inspect component props and state
- View component hierarchy
- Profile performance

**Next.js debugging:**

```typescript
// app/page.tsx (Server Component)
export default async function HomePage() {
  console.log("This runs on server"); // Terminal output

  return <ClientComponent />;
}

// components/client-component.tsx
"use client";

export function ClientComponent() {
  console.log("This runs in browser"); // Browser console

  return <div>Content</div>;
}
```

## Git Workflow

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit (pre-commit hooks run automatically)
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature
```

### Pre-commit Hooks

Husky automatically runs checks before each commit:

```bash
git commit -m "feat: update homepage"
```

**Husky runs:**

1. **lint-staged** - Formats and lints changed files only
2. **Prettier** - Auto-formats `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, `.md`
3. **ESLint** - Auto-fixes linting issues with `--fix`

**Output:**

```
✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ package.json — 2 files
  ✔ *.{js,jsx,ts,tsx} — 3 files
    ✔ prettier --write
    ✔ eslint --fix
  ✔ *.{json,css,md} — 1 file
    ✔ prettier --write
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
[feature/new-feature abc1234] feat: update homepage
 4 files changed, 42 insertions(+), 12 deletions(-)
```

**If hooks fail:**

```
✖ eslint --fix found problems in 2 files
  app/page.tsx:15:7 - error: 'x' is defined but never used
```

Fix the errors and commit again.

See [Git Hooks](./09-git-hooks.md) for detailed documentation.

### Commit Message Convention

Follow conventional commits format:

```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve mobile navigation bug"
git commit -m "docs: update README with deployment steps"
git commit -m "refactor: simplify project card component"
git commit -m "test: add unit tests for utils"
git commit -m "chore: update dependencies"
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Performance Optimization

### Monitor Bundle Size

```bash
npm run build:analyze
```

Opens a visual bundle analyzer in your browser showing:

- Module sizes
- Dependencies
- Code splitting
- Largest packages

See [Bundle Analysis](./10-bundle-analysis.md) for detailed guide.

### Image Optimization

Use Next.js `<Image>` component for automatic optimization:

```tsx
import Image from "next/image";

export function ProjectImage() {
  return (
    <Image
      src="/images/projects/my-project/screenshot.png"
      alt="Project screenshot"
      width={800}
      height={600}
      // Next.js automatically optimizes
    />
  );
}
```

**Benefits:**

- Automatic format conversion (WebP, AVIF)
- Responsive images
- Lazy loading
- Blur placeholder

### Lighthouse Audits

Run Lighthouse in Chrome DevTools (F12 → Lighthouse tab):

```bash
# Build production version first
npm run build
npm start
```

Open `http://localhost:3000` and run audit to check:

- Performance score
- Accessibility
- Best practices
- SEO

## Troubleshooting Common Issues

### Fast Refresh Not Working

**Symptoms:** Changes don't appear in browser after saving

**Solutions:**

1. Check terminal for errors
2. Ensure file is saved (check editor)
3. Hard refresh browser (Ctrl + Shift + R or Cmd + Shift + R)
4. Restart dev server

### Stale Cache

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart dev server
npm run dev
```

### TypeScript Errors in Editor

```bash
# Restart TypeScript server in VSCode/Cursor
# Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
# Type: "TypeScript: Restart TS Server"
```

### Port Conflicts

```bash
# Use different port
PORT=3001 npm run dev

# Or kill process on port 3000
lsof -i :3000  # Find PID
kill -9 <PID>  # Kill process
```

## Best Practices

### Import Conventions

**Always use absolute imports with `@/` prefix:**

```typescript
// ✅ Correct
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { getProjects } from "@/lib/projects";

// ❌ Avoid
import { Button } from "../../components/ui/button";
import { siteConfig } from "../lib/config";
```

### Component Organization

```tsx
// 1. Imports (external, then internal)
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onSubmit: () => void;
}

// 3. Component
export function MyComponent({ title, onSubmit }: MyComponentProps) {
  // 4. Hooks
  const [isLoading, setIsLoading] = useState(false);

  // 5. Event handlers
  const handleClick = () => {
    setIsLoading(true);
    onSubmit();
  };

  // 6. Render
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick} disabled={isLoading}>
        Submit
      </Button>
    </div>
  );
}
```

### File Naming

- **Components:** PascalCase (`ProjectCard.tsx`, `NavigationMenu.tsx`)
- **Utilities:** kebab-case (`get-projects.ts`, `format-date.ts`)
- **Pages:** kebab-case (`app/about/page.tsx`, `app/projects/[slug]/page.tsx`)
- **Content slugs:** kebab-case (`my-awesome-project.json`)

## See Also

- [Getting Started](./01-getting-started.md) - Initial setup guide
- [NPM Scripts](./04-npm-scripts.md) - All available commands
- [Testing Guide](./07-testing.md) - Writing and running tests
- [Linting and Formatting](./08-linting-formatting.md) - Code quality tools
- [Git Hooks](./09-git-hooks.md) - Pre-commit automation
- [Environment Variables](./03-environment-variables.md) - Configuration reference

## Next Steps

- [Learn about npm scripts](./04-npm-scripts.md) for build and test commands
- [Configure your environment](./03-environment-variables.md) for different deployments
- [Set up testing](./07-testing.md) to ensure code quality
- [Analyze your bundle](./10-bundle-analysis.md) to optimize performance

---

**Last updated:** February 2026
