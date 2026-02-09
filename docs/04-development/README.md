# Development Documentation

**Navigation:** [Home](../index.md) > Development

---

## Overview

This section contains comprehensive documentation for developing the Simon Stijnen Portfolio website. Whether you're a new contributor or an experienced developer, these guides cover everything from initial setup to advanced optimization techniques.

## Quick Start

New to the project? Start here:

1. **[Getting Started](./01-getting-started.md)** - Install dependencies and run your first build
2. **[Development Workflow](./02-development-workflow.md)** - Learn the day-to-day development process
3. **[Environment Variables](./03-environment-variables.md)** - Configure your local environment

## Documentation Index

### Setup and Configuration

#### [01. Getting Started](./01-getting-started.md)

Complete installation guide covering:

- Prerequisites (Node.js 20+, Git)
- Repository cloning
- Dependency installation
- Environment configuration
- First build and common issues

**When to read:** First time setting up the project

---

#### [02. Development Workflow](./02-development-workflow.md)

Day-to-day development guide covering:

- Starting the dev server with Turbopack
- Hot reload and fast refresh
- Adding projects and components
- Working with styles and TypeScript
- Debugging techniques
- Git workflow and commit conventions

**When to read:** After initial setup, as your daily reference

---

#### [03. Environment Variables](./03-environment-variables.md)

Complete environment variable reference covering:

- Public vs server-side variables
- All 20+ environment variables explained
- Configuration for different environments
- Security best practices
- Troubleshooting variable issues

**When to read:** When configuring site settings or deploying

---

### Build Tools and Scripts

#### [04. NPM Scripts](./04-npm-scripts.md)

All available npm commands explained:

- Development scripts (`dev`, `build`, `start`)
- Code quality scripts (`lint`, `format`, `ci:check`)
- Testing scripts (`test`, `test:watch`)
- Analysis scripts (`build:analyze`)
- Usage examples and troubleshooting

**When to read:** When running builds, tests, or checking code quality

---

#### [05. Next.js Configuration](./05-nextjs-config.md)

Next.js config breakdown (`next.config.ts`):

- Image optimization and remote patterns
- Output modes (standalone for Docker)
- Bundle analyzer integration
- Custom headers, redirects, rewrites
- Environment-based configuration

**When to read:** When customizing build behavior or adding image domains

---

#### [06. TypeScript Configuration](./06-typescript-config.md)

TypeScript setup explanation (`tsconfig.json`):

- Compiler options explained
- Path mappings (`@/` imports)
- Strict mode and type checking
- Next.js integration
- JSX and module configuration

**When to read:** When encountering TypeScript errors or customizing type checking

---

### Code Quality

#### [07. Testing Guide](./07-testing.md)

Jest and Testing Library guide:

- Jest configuration breakdown
- Writing component tests
- Testing utilities and functions
- Mocking strategies
- Running tests and coverage reports
- Best practices and common patterns

**When to read:** When writing tests or debugging test failures

---

#### [08. Linting and Formatting](./08-linting-formatting.md)

ESLint and Prettier setup:

- ESLint configuration (Next.js rules)
- Prettier configuration (with Tailwind sorting)
- Running linters and formatters
- IDE integration
- Common errors and fixes
- Custom rules

**When to read:** When fixing linting errors or configuring your editor

---

#### [09. Git Hooks](./09-git-hooks.md)

Husky and lint-staged automation:

- Pre-commit hooks explained
- How lint-staged works
- Commit workflow
- Bypassing hooks (when necessary)
- Adding custom hooks
- Troubleshooting hook issues

**When to read:** When commits fail or you need to customize hooks

---

### Performance

#### [10. Bundle Analysis](./10-bundle-analysis.md)

Bundle size optimization guide:

- Running bundle analyzer
- Understanding the report
- Optimization strategies (code splitting, tree shaking)
- Replacing large dependencies
- Monitoring bundle size
- Real-world optimization examples

**When to read:** When optimizing performance or investigating bundle size

---

## Documentation by Task

### I want to...

#### Get started with the project

1. [Getting Started](./01-getting-started.md) - Install and run
2. [Development Workflow](./02-development-workflow.md) - Learn the basics
3. [Environment Variables](./03-environment-variables.md) - Configure settings

#### Work on features

1. [Development Workflow](./02-development-workflow.md) - Daily workflow guide
2. [TypeScript Configuration](./06-typescript-config.md) - Type checking
3. [Testing Guide](./07-testing.md) - Write tests
4. [Linting and Formatting](./08-linting-formatting.md) - Code quality

#### Fix issues

1. [NPM Scripts](./04-npm-scripts.md) - Run diagnostics
2. [Testing Guide](./07-testing.md) - Debug test failures
3. [Linting and Formatting](./08-linting-formatting.md) - Fix linting errors
4. [Git Hooks](./09-git-hooks.md) - Resolve commit issues

#### Optimize performance

1. [Bundle Analysis](./10-bundle-analysis.md) - Analyze bundle size
2. [Next.js Configuration](./05-nextjs-config.md) - Configure optimizations
3. [TypeScript Configuration](./06-typescript-config.md) - Build performance

#### Configure the project

1. [Environment Variables](./03-environment-variables.md) - Site configuration
2. [Next.js Configuration](./05-nextjs-config.md) - Build configuration
3. [TypeScript Configuration](./06-typescript-config.md) - Type system
4. [NPM Scripts](./04-npm-scripts.md) - Custom scripts

#### Maintain code quality

1. [Linting and Formatting](./08-linting-formatting.md) - ESLint and Prettier
2. [Testing Guide](./07-testing.md) - Write tests
3. [Git Hooks](./09-git-hooks.md) - Automate quality checks
4. [NPM Scripts](./04-npm-scripts.md) - CI/CD commands

## Technology Stack

The project uses:

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **UI:** React 19 with shadcn/ui components
- **Styling:** Tailwind CSS 4
- **Build Tool:** Turbopack (Next.js built-in)
- **Testing:** Jest + Testing Library
- **Linting:** ESLint with Next.js config
- **Formatting:** Prettier with Tailwind plugin
- **Git Hooks:** Husky + lint-staged

## Key Features

### Development Experience

- **Fast Refresh:** Instant updates with Turbopack
- **Type Safety:** Strict TypeScript configuration
- **Auto-formatting:** Prettier on save
- **Auto-linting:** ESLint with auto-fix
- **Pre-commit hooks:** Automatic code quality checks
- **Path aliases:** Clean imports with `@/` prefix

### Code Quality

- **Strict TypeScript:** Catch errors at compile time
- **ESLint:** Next.js recommended rules + TypeScript
- **Prettier:** Consistent formatting + Tailwind class sorting
- **Jest:** Comprehensive test coverage
- **Git hooks:** Automated quality checks on commit

### Performance

- **Code splitting:** Automatic by route
- **Bundle analysis:** Visual bundle size reports
- **Image optimization:** Next.js Image component
- **Static generation:** Pre-rendered pages where possible
- **Standalone output:** Optimized for Docker deployment

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run ci:check         # All quality checks

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode

# Analysis
npm run build:analyze    # Bundle size analysis
```

## Project Structure

```
/workspaces/website/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── projects/          # Project pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...
├── lib/                  # Utilities and data
│   ├── config.ts        # Environment config
│   ├── projects.ts      # Project data
│   └── utils.ts         # Helper functions
├── content/             # JSON content
│   ├── projects/        # Project files
│   └── achievements/    # Achievement files
├── public/              # Static assets
│   └── images/         # Image files
├── docs/               # Documentation (you are here)
│   └── 04-development/ # Development guides
├── .husky/            # Git hooks
├── .next/             # Build output
├── next.config.ts     # Next.js config
├── tsconfig.json      # TypeScript config
├── tailwind.config.ts # Tailwind config
├── jest.config.js     # Jest config
├── eslint.config.mjs  # ESLint config
├── .prettierrc.json   # Prettier config
└── package.json       # Dependencies
```

## Getting Help

### Documentation

- Read through the relevant guide in this section
- Check the "See Also" sections for related topics
- Review "Troubleshooting" sections for common issues

### Project Files

- Check `AGENTS.md` for AI agent instructions
- Review `README.md` for project overview
- Read [Docker Guide](../05-deployment/01-docker-guide.md) for deployment information

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## Contributing

When contributing to the project:

1. **Read the relevant guides** in this section
2. **Follow code quality standards** (ESLint, Prettier, TypeScript)
3. **Write tests** for new features
4. **Run checks** before committing (`npm run ci:check`)
5. **Let git hooks run** (don't bypass without reason)
6. **Follow commit conventions** (conventional commits)

## Quick Reference

### File Locations

- Environment variables: `.env`
- Next.js config: `next.config.ts`
- TypeScript config: `tsconfig.json`
- ESLint config: `eslint.config.mjs`
- Prettier config: `.prettierrc.json`
- Jest config: `jest.config.js`
- Tailwind config: `tailwind.config.ts`
- Git hooks: `.husky/`

### Important Scripts

| Command                 | Purpose             |
| ----------------------- | ------------------- |
| `npm run dev`           | Development server  |
| `npm run build`         | Production build    |
| `npm test`              | Run tests           |
| `npm run lint`          | Check code quality  |
| `npm run format`        | Format code         |
| `npm run ci:check`      | All quality checks  |
| `npm run build:analyze` | Analyze bundle size |

### Key Concepts

- **Public env vars:** `NEXT_PUBLIC_*` (exposed to browser)
- **Server env vars:** No prefix (server-side only)
- **Path aliases:** `@/` maps to project root
- **Code splitting:** Automatic by route
- **Git hooks:** Auto-run on commit (format + lint)
- **Strict TypeScript:** All strict checks enabled

## Next Steps

After reading the development documentation:

1. **Explore content documentation** - Learn how to add projects and achievements
2. **Review deployment documentation** - Understand Docker and production deployment
3. **Check architecture documentation** - Deep dive into project structure
4. **Read optimization guides** - Advanced performance techniques

---

**Last updated:** February 2026

**Documentation maintained by:** Simon Stijnen

**Questions or issues?** Check the troubleshooting sections in each guide or review existing project code for examples.
