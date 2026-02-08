# AI Agent Instructions for Simon Stijnen Portfolio

## Architecture Overview

This is a Next.js 15 portfolio website using the app router. Content is stored as JSON files in `content/` and rendered via TypeScript interfaces in `lib/`. Components use shadcn/ui with Tailwind CSS.

- **Data Flow**: JSON (`content/projects/*.json`, `content/achievements/*.json`) → TypeScript interfaces (`lib/projects.ts`, `lib/achievements.ts`) → React components (`components/project-card.tsx`, `components/achievement-card.tsx`) → Pages (`app/projects/[slug]/page.tsx`)
- **Skills Generation**: Skills are dynamically generated from project technologies in `lib/skills.ts`, creating a skills table with associated projects
- **Key Directories**:
  - `content/`: JSON data for projects/achievements
  - `lib/`: Data access functions and type definitions
  - `components/ui/`: shadcn/ui components (new-york style, slate base color)
  - `public/images/projects/{slug}/`: Project images
  - `middleware/`: Webhook middleware for analytics tracking

## Adding New Content

To add a project:

1. Create `{slug}.json` in `content/projects/` with fields: title, shortDescription, description, technologies[], images[], demoUrl?, githubUrl?, order?
2. Add images to `public/images/projects/{slug}/`
3. Images array: `[{src: "/images/projects/{slug}/image.jpg", alt: "..."}]`

Achievements follow the same pattern in `content/achievements/`.

## Developer Workflows

- **Development**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build` (standalone output for Docker)
- **Linting**: `npm run lint` (ESLint with next/core-web-vitals, next/typescript, prettier)
- **Formatting**: `npm run format` (Prettier with Tailwind class sorting plugin)
- **CI Check**: `npm run ci:check` (lint + format check)
- **Testing**: `npm test` (Jest with jsdom, coverage collection)
- **Docker Prod**: `docker-compose up website-prod -d`
- **Build Analysis**: `npm run build:analyze` (bundle analyzer)

## Code Patterns

- **Component Imports**: Use `@/components/ui/*` for shadcn components
- **Imports**: Always use absolute imports with `@/` prefix, never relative imports like `./` or `../`
- **Project Sorting**: By `order` field (1-6 for featured), then alphabetical
- **Image Handling**: Filter videos with `isVideoFile()` from `lib/utils.ts`
- **Environment Config**: Use `lib/config.ts` for site settings (NEXT*PUBLIC*\* vars)
- **Analytics**: Custom analytics component + Vercel Analytics/Speed Insights in `app/layout.tsx`
- **Skills Table**: Uses @tanstack/react-table for sortable, filterable skills display
- **Related Projects**: Determined by shared technologies

## Conventions

- **File Naming**: Kebab-case for slugs, PascalCase for components
- **TypeScript**: Strict interfaces for data (e.g., `Project` in `lib/projects.ts`)
- **Styling**: Tailwind classes with `cn()` utility for conditional classes
- **Routing**: Dynamic routes like `app/projects/[slug]/page.tsx`
- **Git Hooks**: Husky + lint-staged auto-format on commit
- **Testing**: Jest setup with `jest.setup.js`, coverage from source files excluding types
- **CI/CD**: GitHub Actions on push/PR, builds Docker image on main-v2 branch</content>
  <parameter name="filePath">/workspaces/website/.github/copilot-instructions.md
