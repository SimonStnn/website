# AI Agent Instructions for Simon Stijnen Portfolio

## Architecture Overview

This is a Next.js 15 portfolio website using the app router. Content is stored as JSON files in `content/` and rendered via TypeScript interfaces in `lib/`. Components use shadcn/ui with Tailwind CSS.

- **Data Flow**: JSON (`content/projects/*.json`) → TypeScript interfaces (`lib/projects.ts`) → React components (`components/project-card.tsx`) → Pages (`app/projects/[slug]/page.tsx`)
- **Key Directories**:
  - `content/`: JSON data for projects/achievements
  - `lib/`: Data access functions and type definitions
  - `components/ui/`: shadcn/ui components
  - `public/download/images/projects/{slug}/`: Project images

## Adding New Content

To add a project:

1. Create `{slug}.json` in `content/projects/` with fields: title, shortDescription, description, technologies[], images[], demoUrl?, githubUrl?, order?
2. Add images to `public/download/images/projects/{slug}/`
3. Images array: `[{src: "/download/images/projects/{slug}/image.jpg", alt: "..."}]`

Achievements follow the same pattern in `content/achievements/`.

## Developer Workflows

- **Development**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build` (standalone output for Docker)
- **Linting**: `npm run lint` (ESLint + Prettier)
- **Formatting**: `npm run format` (Prettier with Tailwind sorting)
- **CI Check**: `npm run ci:check` (lint + format check)
- **Docker Prod**: `docker-compose up website-prod -d`

## Code Patterns

- **Component Imports**: Use `@/components/ui/*` for shadcn components
- **Imports**: Always use absolute imports with `@/` prefix, never relative imports like `./` or `../`
- **Project Sorting**: By `order` field (1-6 for featured), then alphabetical
- **Image Handling**: Filter videos with `isVideoFile()` from `lib/utils.ts`
- **Environment Config**: Use `lib/config.ts` for site settings (NEXT*PUBLIC*\* vars)
- **Analytics**: Vercel Analytics/Speed Insights in `app/layout.tsx`

## Conventions

- **File Naming**: Kebab-case for slugs, PascalCase for components
- **TypeScript**: Strict interfaces for data (e.g., `Project` in `lib/projects.ts`)
- **Styling**: Tailwind classes with `cn()` utility for conditional classes
- **Routing**: Dynamic routes like `app/projects/[slug]/page.tsx`
- **Git Hooks**: Husky + lint-staged auto-format on commit</content>
  <parameter name="filePath">/workspaces/website/.github/copilot-instructions.md
