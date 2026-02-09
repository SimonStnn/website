# Getting Started

**Navigation:** [Home](../index.md) > [Development](./README.md) > Getting Started

---

## Overview

This guide will help you set up the Simon Stijnen Portfolio website for local development. The project is built with Next.js 15, uses the app router, and features Turbopack for fast development builds.

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

### Required Software

#### Node.js (v20 or higher)

The project requires Node.js 20 or higher with npm package manager.

**Check your Node.js version:**

```bash
node --version
# Expected output: v20.x.x or higher
```

**Check npm version:**

```bash
npm --version
# Expected output: 10.x.x or higher
```

**Installation options:**

- **Using nvm (recommended):**

  ```bash
  # Install nvm from https://github.com/nvm-sh/nvm
  # Then install Node.js 20
  nvm install 20
  nvm use 20
  ```

- **Direct installation:**
  - Download from [nodejs.org](https://nodejs.org/)
  - Use your package manager (apt, brew, choco, etc.)

#### Git

**Check if Git is installed:**

```bash
git --version
# Expected output: git version 2.x.x
```

**Installation:**

- Linux: `sudo apt-get install git`
- macOS: `brew install git` or use Xcode Command Line Tools
- Windows: Download from [git-scm.com](https://git-scm.com/)

### Optional Software

#### Docker (for containerized deployment)

If you plan to test Docker deployments locally:

```bash
docker --version
# Expected output: Docker version 24.x.x or higher

docker-compose --version
# Expected output: Docker Compose version v2.x.x or higher
```

See [Docker documentation](https://docs.docker.com/get-docker/) for installation.

## Installation

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/SimonStnn/website.git

# Or using SSH (if configured)
git clone git@github.com:SimonStnn/website.git

# Navigate to the project directory
cd website
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

**What gets installed:**

- **Production dependencies** (~46 packages):
  - Next.js 15.5.9 with React 19
  - shadcn/ui components (@radix-ui/\*)
  - Tailwind CSS utilities
  - Analytics packages (@vercel/analytics, @vercel/speed-insights)
- **Development dependencies** (~70 packages):
  - TypeScript 5.x
  - Testing libraries (Jest, Testing Library)
  - Linting tools (ESLint, Prettier)
  - Build tools (Husky, lint-staged)

**Installation output:**

```
added 116 packages, and audited 117 packages in 15s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Step 3: Configure Environment Variables

Create a local environment file from the example:

```bash
cp .env.example .env
```

**Edit `.env` with your values:**

```bash
# Open in your editor
nano .env
# or
code .env
# or
vim .env
```

**Minimal configuration for development:**

```env
# Public variables (exposed to browser)
NEXT_PUBLIC_SITE_NAME="Your Name"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_DESCRIPTION="Your portfolio description"
NEXT_PUBLIC_AUTHOR_NAME="Your Name"
NEXT_PUBLIC_AUTHOR_EMAIL="your.email@example.com"
NEXT_PUBLIC_GITHUB_URL="https://github.com/yourusername"
NEXT_PUBLIC_LINKEDIN_URL="https://www.linkedin.com/in/yourprofile/"

# Optional analytics (can be left empty for development)
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_GTM_ID=""

# Server-side only (optional)
WEBHOOK_URL=""
WEBHOOK_ENABLED="false"
```

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Server-side only variables (like `WEBHOOK_URL`) are never sent to the client.

See [Environment Variables](./03-environment-variables.md) for complete documentation.

### Step 4: Verify Installation

Run the development server to ensure everything is set up correctly:

```bash
npm run dev
```

**Expected output:**

```
  ▲ Next.js 15.5.9 (turbo)
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1.2s
```

### Step 5: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

**You should see:**

- The portfolio homepage
- Navigation menu with Projects, Skills, Achievements, About, Contact
- Responsive design that works on mobile and desktop
- Dark/light theme toggle

**If you see errors:**

1. Check the terminal for error messages
2. Verify all dependencies installed correctly: `npm install`
3. Ensure Node.js version is 20+: `node --version`
4. Check that port 3000 is not in use: `lsof -i :3000` (Unix) or `netstat -ano | findstr :3000` (Windows)

## First Build

Test that the production build works:

```bash
# Create production build
npm run build

# Start production server
npm start
```

**Expected build output:**

```
  ▲ Next.js 15.5.9

   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (7/7)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.2 kB
├ ○ /_not-found                          871 B          81.9 kB
├ ○ /about                               142 B          87.2 kB
├ ○ /achievements                        142 B          87.2 kB
├ ○ /contact                             142 B          87.2 kB
├ ƒ /projects/[slug]                     142 B          87.2 kB
└ ○ /skills                              142 B          87.2 kB

○  (Static)  prerendered as static content
ƒ  (Dynamic) server-rendered on demand
```

**Access the production build:**

Open [http://localhost:3000](http://localhost:3000) to view the optimized production version.

**Stop the server:**

Press `Ctrl + C` in the terminal.

## Project Structure Overview

```
/workspaces/website/
├── app/                    # Next.js 15 app router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── projects/          # Projects pages
│   ├── skills/            # Skills page
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── project-card.tsx  # Project card component
│   └── ...
├── content/              # JSON data files
│   ├── projects/         # Project content
│   └── achievements/     # Achievement content
├── lib/                  # Utilities and data access
│   ├── config.ts        # Environment configuration
│   ├── projects.ts      # Project data functions
│   └── utils.ts         # Utility functions
├── public/              # Static assets
│   └── images/         # Image files
├── docs/               # Documentation
├── .env                # Environment variables (create from .env.example)
├── .env.example        # Environment template
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies and scripts
└── README.md          # Project readme
```

## Common Issues and Solutions

### Issue: Port 3000 Already in Use

**Error message:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

```bash
# Find process using port 3000
lsof -i :3000  # Unix/macOS
netstat -ano | findstr :3000  # Windows

# Kill the process or use a different port
PORT=3001 npm run dev
```

### Issue: Module Not Found

**Error message:**

```
Error: Cannot find module 'next'
```

**Solution:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Errors

**Error message:**

```
Type error: Cannot find module '@/components/ui/button'
```

**Solution:**

```bash
# Restart TypeScript server in your editor
# Or rebuild
npm run build
```

### Issue: Husky Hooks Not Working

**Error message:**

```
hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
```

**Solution:**

```bash
# Make hooks executable
chmod +x .husky/pre-commit

# Or reinstall Husky
npm run prepare
```

## Quick Reference

**Essential commands:**

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Building
npm run build           # Create production build
npm start               # Start production server

# Testing
npm test                # Run Jest tests
npm run test:watch      # Run tests in watch mode

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format with Prettier
npm run format:check    # Check formatting
npm run ci:check        # Run all checks (lint + format)

# Analysis
npm run build:analyze   # Build with bundle analyzer
```

## Next Steps

Now that you have the project running, you can:

1. **Learn the development workflow:** [Development Workflow](./02-development-workflow.md)
2. **Explore available npm scripts:** [NPM Scripts](./04-npm-scripts.md)
3. **Add your first project:** [Projects Documentation](../03-content/06-adding-projects.md)
4. **Configure environment variables:** [Environment Variables](./03-environment-variables.md)
5. **Set up your IDE:** Configure VSCode/Cursor with recommended extensions

## See Also

- [Development Workflow](./02-development-workflow.md) - Day-to-day development guide
- [Environment Variables](./03-environment-variables.md) - Complete .env reference
- [NPM Scripts](./04-npm-scripts.md) - All available commands
- [Testing Guide](./07-testing.md) - How to write and run tests
- [Next.js 15 Documentation](https://nextjs.org/docs) - Official Next.js docs
- [Documentation Home](../index.md) - Documentation index

---

**Last updated:** February 2026
