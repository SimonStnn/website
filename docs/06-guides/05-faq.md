# Frequently Asked Questions (FAQ)

**Breadcrumbs:** [Documentation](../README.md) > [Guides](./README.md) > FAQ

Answers to common questions about the portfolio website architecture, development, and deployment.

## Table of Contents

- [General Questions](#general-questions)
- [Development Questions](#development-questions)
- [Content Management](#content-management)
- [Deployment Questions](#deployment-questions)
- [Performance Questions](#performance-questions)
- [SEO Questions](#seo-questions)
- [Customization Questions](#customization-questions)

## General Questions

### What technology stack does this portfolio use?

**Stack:**

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (Radix UI + Tailwind)
- **Content:** JSON files
- **Deployment:** Docker + Docker Compose
- **Testing:** Jest with React Testing Library

**Why these choices?**

- Next.js 15 for modern React with built-in SSR/SSG
- TypeScript for type safety and better DX
- Tailwind CSS for rapid, consistent styling
- shadcn/ui for accessible, customizable components
- JSON for simple, git-friendly content management

### Is this portfolio open source?

Yes! The code is available on GitHub. You can:

- View the source code
- Fork for your own portfolio
- Contribute improvements
- Report issues

**License:** Check the repository for license information.

### Can I use this as a template for my portfolio?

Yes! This is designed as a reusable portfolio template. To use it:

1. Fork the repository
2. Update `lib/config.ts` with your information
3. Replace content in `content/` directories
4. Update images in `public/images/`
5. Customize styling in `tailwind.config.ts` and `app/globals.css`
6. Deploy to your hosting platform

See [Contributing Guide](./01-contributing.md) for setup instructions.

### What's the difference between v1 and v2?

**v1 (Legacy):**

- Next.js 12 with Pages Router
- Single JSON file for projects
- Basic SEO
- Older dependency versions

**v2 (Current):**

- Next.js 15 with App Router
- Individual JSON files per project
- Advanced SEO with metadata API
- Structured data (JSON-LD)
- LLM discovery endpoint (/llms.txt)
- Improved performance
- Modern tooling (Turbopack, Tailwind v4)

See [Migration Guide](./04-migration-guide.md) for upgrading.

## Development Questions

### Why do I need Node.js 20+?

Next.js 15 requires Node.js 20 or higher for:

- Modern JavaScript features (ES2023+)
- Better performance
- Native fetch API support
- Improved module resolution

**Check your version:**

```bash
node --version
# Should output v20.x.x or higher
```

### Do I need to know Next.js to contribute?

Basic knowledge helps, but not required:

**Need to know:**

- React fundamentals (components, props, hooks)
- TypeScript basics (types, interfaces)
- Basic Git workflow

**Nice to have:**

- Next.js App Router concepts
- Server vs Client Components
- Tailwind CSS
- Testing with Jest

**Learning resources:**

- [Next.js Tutorial](https://nextjs.org/learn)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### What's the difference between server and client components?

**Server Components (default):**

```typescript
// app/projects/page.tsx - No 'use client' needed
export default async function ProjectsPage() {
  const projects = await getProjects(); // Runs on server
  return <div>{/* ... */}</div>;
}
```

**Benefits:**

- Fetch data on server
- Reduce JavaScript bundle size
- Better SEO
- Access server-only APIs

**Client Components:**

```typescript
// components/theme-toggle.tsx
'use client'; // Required directive

export function ThemeToggle() {
  const [theme, setTheme] = useState('light'); // Hooks require client
  return <button onClick={() => setTheme('dark')}>Toggle</button>;
}
```

**Use when you need:**

- React hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Browser APIs (window, document, etc.)
- Real-time interactivity

### Why are absolute imports (`@/`) used instead of relative paths?

**Benefits:**

- Cleaner imports
- Easier refactoring
- Avoid `../../..` chains
- Consistent across codebase

```typescript
// ❌ Relative imports - hard to maintain
import { Button } from "../../../components/ui/button";
import { cn } from "../../lib/utils";

// ✅ Absolute imports - clean and clear
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

**Configuration:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### How do I add a new page?

**Steps:**

1. Create page file in `app/` directory:

```typescript
// app/my-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Description of my page',
};

export default function MyPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold">My Page</h1>
      <p>Page content goes here</p>
    </div>
  );
}
```

2. Add to navigation (if needed):

```typescript
// components/layout/header.tsx
const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/my-page", label: "My Page" }, // Add here
];
```

3. Test locally:

```bash
npm run dev
# Visit http://localhost:3000/my-page
```

### How do I run tests?

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- project-card.test.tsx
```

**Test file location:**

- Place tests next to components: `components/__tests__/`
- Or in a separate `__tests__` directory
- Name: `*.test.ts` or `*.test.tsx`

## Content Management

### How do I add a new project?

**Step-by-step:**

1. Create JSON file in `content/projects/`:

```bash
# Use kebab-case for slug
touch content/projects/my-new-project.json
```

2. Add project data:

```json
{
  "title": "My New Project",
  "shortDescription": "Brief one-line description",
  "description": "Detailed description explaining what the project does, technologies used, and key features.",
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "images": [
    {
      "src": "/images/projects/my-new-project/screenshot.jpg",
      "alt": "Main dashboard screenshot"
    }
  ],
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/username/repo",
  "order": 7
}
```

3. Add images:

```bash
mkdir -p public/images/projects/my-new-project
# Copy your images to this directory
```

4. Test:

```bash
npm run dev
# Visit http://localhost:3000/projects
# Your project should appear
```

See [Content Guide](../03-content/01-projects.md) for details.

### What image formats are supported?

**Supported formats:**

- **Images:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- **Videos:** `.mp4`, `.webm`, `.mov`

**Recommendations:**

- Use WebP for best compression
- Max width: 1920px
- Optimize before adding (use tools like [TinyPNG](https://tinypng.com/))
- Use descriptive alt text

**Detecting videos:**

```typescript
import { isVideoFile } from "@/lib/utils";

const media = project.images.filter((img) => !isVideoFile(img.src));
const videos = project.images.filter((img) => isVideoFile(img.src));
```

### Can I use Markdown instead of JSON?

Currently, content is JSON-based for simplicity. To add Markdown support:

1. Install dependencies:

```bash
npm install gray-matter remark remark-html
```

2. Create MDX loader:

```typescript
// lib/markdown.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getProjectFromMarkdown(slug: string) {
  const filePath = path.join(process.cwd(), "content/projects", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    ...data,
    content,
  };
}
```

3. Update project loader to support both JSON and Markdown.

**Note:** This requires additional implementation. Open an issue if you need this feature.

### How do I delete a project?

1. Delete JSON file:

```bash
rm content/projects/old-project.json
```

2. Delete images:

```bash
rm -rf public/images/projects/old-project
```

3. Restart dev server:

```bash
# Stop (Ctrl+C)
npm run dev
```

Project will no longer appear on the site.

### What is the `order` field for?

The `order` field controls:

- **Featured projects** - Projects with `order: 1-6` appear on the homepage
- **Sort order** - Lower numbers appear first

```json
{
  "order": 1 // Highest priority, appears first
}

{
  "order": 6 // Still featured, appears sixth
}

{
  // No order field = not featured, sorted alphabetically
}
```

**Featured projects section:**

```typescript
// lib/projects.ts
export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((p) => p.order && p.order >= 1 && p.order <= 6);
}
```

## Deployment Questions

### How do I deploy this portfolio?

**Options:**

1. **Vercel (Recommended):**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

2. **Docker:**

```bash
docker-compose up -d website-prod
```

3. **Other platforms:** Netlify, AWS, Railway, etc.

See [Deployment Guide](../05-deployment/01-overview.md) for details.

### Why use Docker?

**Benefits:**

- Consistent environment (dev = prod)
- Easy deployment
- Isolated dependencies
- Portable across systems
- Simple scaling

**When to use Docker:**

- Self-hosted deployments
- VPS hosting
- Multiple environments

**When not needed:**

- Deploying to Vercel/Netlify (they handle builds)
- Simple static hosting

### What environment variables are required?

**Minimum required:**

```bash
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

**Recommended:**

```bash
# Site info
NEXT_PUBLIC_SITE_NAME="Your Name"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NEXT_PUBLIC_SITE_DESCRIPTION="Your description"

# Author
NEXT_PUBLIC_AUTHOR_NAME="Your Name"
NEXT_PUBLIC_AUTHOR_EMAIL="your-email@example.com"

# Social links
NEXT_PUBLIC_GITHUB_URL="https://github.com/username"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/in/username"
```

**Optional:**

```bash
# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"

# Webhook
WEBHOOK_URL="https://your-webhook.com"
WEBHOOK_ENABLED="true"
```

See [Configuration Guide](./utilities/02-config-library.md) for all variables.

### How do I set up a custom domain?

**For Vercel:**

1. Go to project settings → Domains
2. Add your domain (e.g., `your-domain.com`)
3. Update DNS records (provided by Vercel)
4. Wait for DNS propagation (5-60 minutes)

**For Docker/VPS:**

1. Point domain A record to server IP
2. Set up reverse proxy (Nginx, Caddy, or Traefik)
3. Configure SSL/TLS (Let's Encrypt)
4. Update environment variables

```bash
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

## Performance Questions

### How can I improve page load speed?

**Checklist:**

1. **Optimize images:**

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  width={800}
  height={600}
  priority // For above-fold images
  placeholder="blur"
/>;
```

2. **Lazy load components:**

```typescript
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('@/components/gallery'), {
  loading: () => <p>Loading...</p>,
});
```

3. **Enable caching:**

```typescript
// app/api/route.ts
export async function GET() {
  return new Response(data, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
```

4. **Analyze bundle size:**

```bash
npm run build:analyze
```

See [Performance Guide](./seo/05-performance.md) for more tips.

### Why is my build slow?

**Common causes:**

1. **Too many images** - Optimize images before adding
2. **Large dependencies** - Review `package.json`
3. **Low memory** - Increase Node.js heap size

```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

4. **Many pages** - Normal for sites with 100+ pages

**Benchmarks:**

- Small portfolio (< 20 pages): 30-60 seconds
- Medium portfolio (20-50 pages): 1-2 minutes
- Large portfolio (50+ pages): 2-5 minutes

## SEO Questions

### How is SEO handled?

**Built-in SEO features:**

1. **Metadata API:**

```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: { ... },
  twitter: { ... },
};
```

2. **Dynamic sitemap:** `/sitemap.xml`
3. **Robots.txt:** `/robots.txt`
4. **Structured data:** JSON-LD schemas
5. **LLM discovery:** `/llms.txt`

See [SEO Guide](./seo/01-seo-guide.md) for details.

### What is /llms.txt?

An AI agent discovery endpoint that provides structured information about the portfolio for LLMs (Language Learning Models) like ChatGPT, Claude, etc.

**Purpose:**

- Help AI agents recommend you for jobs
- Provide structured data about skills, projects, experience
- Improve discoverability by AI tools

**Example usage:**

- User: "Who's a good Next.js developer in Belgium?"
- AI: Reads `/llms.txt`, sees your info, recommends you

**Implementation:**

```typescript
// app/llms.txt/route.ts
export async function GET() {
  const content = generateLLMSummary();
  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
```

See [LLMs.txt Guide](./api/02-llms-txt.md) for details.

### How do I improve search ranking?

**Best practices:**

1. **Quality content:** Well-written project descriptions
2. **Unique titles:** Descriptive, keyword-rich titles
3. **Alt text:** Descriptive alt text for all images
4. **Mobile-friendly:** Responsive design (built-in)
5. **Fast loading:** Optimize images, lazy loading
6. **Regular updates:** Add new projects, keep content fresh
7. **Backlinks:** Share your portfolio on social media, forums

**Tools:**

- Google Search Console
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)

## Customization Questions

### How do I change colors/theme?

**Edit CSS variables:**

```css
/* app/globals.css */
:root {
  --primary: oklch(0.48 0.0813 198.19);
  --accent: #ffb900;
  /* ... other colors ... */
}

.dark {
  --primary: oklch(0.68 0.13 264.2);
  --accent: #ffd600;
  /* ... dark mode colors ... */
}
```

**Or use Tailwind config:**

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
      },
    },
  },
};
```

See [Design System Guide](./styling/04-design-system.md).

### How do I add new sections to the homepage?

1. Create component:

```typescript
// components/sections/testimonials.tsx
export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
        {/* Content */}
      </div>
    </section>
  );
}
```

2. Add to homepage:

```typescript
// app/page.tsx
import { TestimonialsSection } from '@/components/sections/testimonials';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <TestimonialsSection /> {/* Add here */}
      <ContactSection />
    </>
  );
}
```

### Can I change the layout/design completely?

Yes! The architecture supports complete customization:

1. **Update components** in `components/`
2. **Modify styles** in `app/globals.css` and Tailwind config
3. **Change layout** in `app/layout.tsx`
4. **Add new pages** in `app/`

The data layer (`lib/`, `content/`) is separate, so you can rebuild the UI without changing content structure.

## See Also

- [Contributing Guide](./01-contributing.md) - Development workflow
- [Troubleshooting](./02-troubleshooting.md) - Common issues
- [Best Practices](./03-best-practices.md) - Code patterns
- [Architecture Overview](../02-architecture/01-overview.md) - Project structure

## Still Have Questions?

- Check [GitHub Discussions](https://github.com/SimonStnn/website/discussions)
- Open an [issue](https://github.com/SimonStnn/website/issues)
- Review the [documentation](../README.md)

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
