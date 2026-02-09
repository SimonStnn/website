# NPM Scripts

**Navigation:** [Home](../index.md) > [Development](./README.md) > NPM Scripts

---

## Overview

This guide documents all npm scripts available in the Simon Stijnen Portfolio project, explaining what each script does, when to use it, and providing practical examples.

## Quick Reference

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Create production build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes
npm run ci:check         # Run all CI checks (lint + format)

# Testing
npm test                 # Run Jest tests
npm run test:watch       # Run tests in watch mode

# Analysis & Tools
npm run build:analyze    # Build with bundle analyzer
npm run prepare          # Install Husky hooks (auto-run)
```

## Development Scripts

### `npm run dev`

**Command:** `next dev --turbopack`

**Description:** Starts the Next.js development server with Turbopack for fast compilation.

**When to use:**

- Daily development work
- Testing changes locally
- Debugging components

**Output:**

```
  ▲ Next.js 15.5.9 (turbo)
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1.2s
```

**Features:**

- **Turbopack:** Faster compilation than webpack
- **Fast Refresh:** Instant updates on file changes
- **Hot Module Replacement (HMR):** Preserves component state
- **Error overlay:** Shows build errors in browser

**Example usage:**

```bash
# Start server on default port (3000)
npm run dev

# Use custom port
PORT=3001 npm run dev

# With specific hostname
HOST=0.0.0.0 npm run dev
```

**Access:**

- Local: [http://localhost:3000](http://localhost:3000)
- Network: `http://<your-ip>:3000` (if using `HOST=0.0.0.0`)

**Stop server:** Press `Ctrl + C`

**See also:** [Development Workflow](./02-development-workflow.md)

---

### `npm run build`

**Command:** `next build`

**Description:** Creates an optimized production build of the application.

**When to use:**

- Before deploying to production
- Testing production performance
- Checking bundle size
- Verifying build passes with no errors

**Output:**

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

Build output saved to: .next
Standalone build prepared for Docker deployment
```

**What it does:**

1. Compiles TypeScript to JavaScript
2. Bundles and minifies code
3. Optimizes images and assets
4. Generates static pages
5. Creates standalone output (for Docker)
6. Type-checks entire project

**Build artifacts:**

```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
├── static/             # Static assets
└── standalone/         # Docker-ready build
```

**Example usage:**

```bash
# Standard production build
npm run build

# With custom configuration
NODE_ENV=production npm run build

# For Docker deployment (output: 'standalone' already configured)
npm run build
```

**Common issues:**

```bash
# Build fails with type errors
# Fix TypeScript errors and rebuild
npm run build

# Clear cache and rebuild
rm -rf .next
npm run build
```

**See also:** [Getting Started](./01-getting-started.md#first-build)

---

### `npm start`

**Command:** `next start`

**Description:** Starts the production server using the build from `npm run build`.

**When to use:**

- Testing production build locally
- Verifying performance optimizations
- Checking for production-only bugs

**Prerequisites:**

```bash
# Must build first
npm run build

# Then start
npm start
```

**Output:**

```
  ▲ Next.js 15.5.9
  - Local:        http://localhost:3000

 ✓ Ready in 245ms
```

**Features:**

- Serves optimized production build
- Server-side rendering for dynamic routes
- Static file serving for pre-rendered pages
- API routes enabled

**Example usage:**

```bash
# Start on default port (3000)
npm start

# Use custom port
PORT=8080 npm start
```

**Differences from `npm run dev`:**

| Feature            | `npm run dev`  | `npm start`        |
| ------------------ | -------------- | ------------------ |
| Build              | Development    | Production         |
| Speed              | Faster startup | Optimized runtime  |
| Hot reload         | ✅ Yes         | ❌ No              |
| Source maps        | ✅ Yes         | ❌ No              |
| Code minification  | ❌ No          | ✅ Yes             |
| Build optimization | ❌ No          | ✅ Yes             |
| Environment        | `NODE_ENV=dev` | `NODE_ENV=prod`    |
| Use case           | Development    | Testing production |

**Stop server:** Press `Ctrl + C`

---

## Code Quality Scripts

### `npm run lint`

**Command:** `next lint`

**Description:** Runs ESLint to check code quality and catch common errors.

**When to use:**

- Before committing code
- Fixing linting errors
- Checking code style consistency

**Output (no errors):**

```
✔ No ESLint warnings or errors
```

**Output (with errors):**

```
./app/page.tsx
15:7  Error: 'x' is defined but never used  @typescript-eslint/no-unused-vars
23:14 Warning: Missing 'key' prop for element in iterator  react/jsx-key

✖ 2 problems (1 error, 1 warning)
```

**ESLint configuration:**

The project uses:

- `next/core-web-vitals` - Next.js recommended rules + web vitals
- `next/typescript` - TypeScript-specific rules
- `prettier` - Disables conflicting Prettier rules

**Example usage:**

```bash
# Check all files
npm run lint

# Auto-fix fixable issues
npm run lint -- --fix

# Check specific file
npm run lint -- app/page.tsx

# Check specific directory
npm run lint -- app/projects/
```

**Common fixes:**

```typescript
// Error: 'React' must be in scope when using JSX
// Fix: React 19 doesn't require this import anymore, remove it or update ESLint config

// Error: 'x' is defined but never used
const x = 5; // ❌
// Fix: Remove unused variable or use it

// Error: Missing 'key' prop
<div>{items.map((item) => <span>{item}</span>)}</div>
// Fix: Add key prop
<div>
  {items.map((item) => (
    <span key={item.id}>{item}</span>
  ))}
</div>
```

**See also:** [Linting and Formatting](./08-linting-formatting.md)

---

### `npm run format`

**Command:** `prettier --write .`

**Description:** Formats all files using Prettier with Tailwind CSS class sorting.

**When to use:**

- Before committing
- After refactoring
- Standardizing code style across the project

**Output:**

```
app/page.tsx 142ms
app/layout.tsx 89ms
components/project-card.tsx 67ms
lib/config.ts 45ms
```

**What it formats:**

- **Code files:** `.js`, `.jsx`, `.ts`, `.tsx`
- **Style files:** `.css`, `.scss`
- **Data files:** `.json`
- **Documentation:** `.md`

**Prettier configuration:**

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Example usage:**

```bash
# Format all files
npm run format

# Format specific file
npx prettier --write app/page.tsx

# Format specific directory
npx prettier --write app/projects/
```

**Before and after:**

```tsx
// Before
const example = {
  name: "Simon",
  skills: ["TypeScript", "React", "Next.js"],
  location: { city: "Bruges", country: "Belgium" },
};

// After
const example = {
  name: "Simon",
  skills: ["TypeScript", "React", "Next.js"],
  location: { city: "Bruges", country: "Belgium" },
};
```

**Tailwind class sorting:**

```tsx
// Before
<div className="text-lg font-bold p-4 mb-2 rounded-lg bg-card">

// After (sorted by importance)
<div className="mb-2 rounded-lg bg-card p-4 text-lg font-bold">
```

**See also:** [Linting and Formatting](./08-linting-formatting.md)

---

### `npm run format:check`

**Command:** `prettier --check .`

**Description:** Checks if files are formatted correctly without modifying them.

**When to use:**

- CI/CD pipelines
- Pre-push hooks
- Verifying formatting without changes

**Output (all formatted):**

```
Checking formatting...
All matched files use Prettier code style!
```

**Output (needs formatting):**

```
Checking formatting...
[warn] app/page.tsx
[warn] components/project-card.tsx
[error] Code style issues found in 2 files. Run Prettier to fix.
```

**Example usage:**

```bash
# Check all files
npm run format:check

# Check specific files
npx prettier --check app/page.tsx components/

# Exit code
npm run format:check
echo $?  # 0 if formatted, 1 if not
```

**CI integration:**

```yaml
# .github/workflows/ci.yml
- name: Check formatting
  run: npm run format:check
```

**See also:** [CI Check](#npm-run-cicheck)

---

### `npm run ci:check`

**Command:** `npm run lint && npm run format:check`

**Description:** Runs all code quality checks (linting + formatting). Simulates CI pipeline locally.

**When to use:**

- Before pushing to remote
- Testing CI locally
- Pre-pull request verification

**Output:**

```
> portfolio-stijnen-simon@2.2.0 ci:check
> npm run lint && npm run format:check

✔ No ESLint warnings or errors

Checking formatting...
All matched files use Prettier code style!
```

**What it checks:**

1. **ESLint:** Code quality, potential bugs
2. **Prettier:** Code formatting consistency

**Example usage:**

```bash
# Run all checks
npm run ci:check

# If it fails, fix issues
npm run lint -- --fix
npm run format
npm run ci:check  # Run again
```

**Use in pre-push hook:**

```bash
# .husky/pre-push
#!/usr/bin/env sh

npm run ci:check
```

**See also:**

- [Linting and Formatting](./08-linting-formatting.md)
- [Git Hooks](./09-git-hooks.md)

---

## Testing Scripts

### `npm test`

**Command:** `jest`

**Description:** Runs all Jest tests once.

**When to use:**

- Before committing
- CI/CD pipelines
- Verifying functionality after changes

**Output:**

```
 PASS  __tests__/lib/utils.test.ts
 PASS  __tests__/components/project-card.test.tsx
 PASS  __tests__/lib/projects.test.ts

Test Suites: 3 passed, 3 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        2.847 s
Ran all test suites.
```

**Example usage:**

```bash
# Run all tests
npm test

# Run specific test file
npm test -- utils.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should load projects"

# Generate coverage report
npm test -- --coverage

# Run in verbose mode
npm test -- --verbose
```

**Coverage report:**

```bash
npm test -- --coverage
```

**Output:**

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |   87.5  |   82.14  |   88.88 |   87.5  |
 lib/projects.ts |   95.23 |   87.5   |   100   |   95.23 | 45-47
 lib/utils.ts    |   82.35 |   76.92  |   80    |   82.35 | 12,34,67
-----------------|---------|----------|---------|---------|-------------------
```

**See also:** [Testing Guide](./07-testing.md)

---

### `npm run test:watch`

**Command:** `jest --watch`

**Description:** Runs Jest in watch mode, re-running tests on file changes.

**When to use:**

- TDD (Test-Driven Development)
- Active test writing
- Debugging failing tests

**Output:**

```
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

**Interactive commands:**

- `a` - Run all tests
- `f` - Run only failed tests
- `p` - Filter by filename
- `t` - Filter by test name
- `u` - Update snapshots
- `q` - Quit watch mode

**Example workflow:**

```bash
# Start watch mode
npm run test:watch

# Edit test file
# Tests run automatically

# Press 'f' to focus on failed tests
# Fix code
# Tests re-run automatically
```

**See also:** [Testing Guide](./07-testing.md)

---

## Analysis & Tools

### `npm run build:analyze`

**Command:** `ANALYZE=true next build`

**Description:** Creates a production build with bundle analyzer enabled, showing visualized bundle sizes.

**When to use:**

- Optimizing bundle size
- Identifying large dependencies
- Debugging code splitting

**Output:**

Opens browser with interactive bundle visualization showing:

- Module sizes
- Dependencies
- Largest packages
- Code splitting chunks

**Example usage:**

```bash
# Build and analyze
npm run build:analyze

# Browser opens automatically at http://127.0.0.1:8888
```

**What you see:**

- Tree map of all modules
- Size comparisons
- Gzipped sizes
- Dependency relationships

**Configuration:**

```typescript
// next.config.ts
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
```

**Optimization tips:**

```bash
# Find large dependencies
# Look for:
# - Unused packages
# - Duplicate dependencies
# - Large UI libraries

# Consider:
# - Dynamic imports
# - Tree shaking
# - Smaller alternatives
```

**See also:** [Bundle Analysis](./10-bundle-analysis.md)

---

### `npm run prepare`

**Command:** `husky`

**Description:** Installs Husky git hooks. Automatically runs after `npm install`.

**When to use:**

- After cloning the repository (runs automatically)
- Reinstalling Husky hooks
- Fixing hook issues

**What it does:**

1. Creates `.husky/` directory
2. Installs git hooks
3. Makes hooks executable

**Hooks installed:**

- **pre-commit:** Runs lint-staged (format & lint changed files)

**Example usage:**

```bash
# Manual installation (rarely needed)
npm run prepare

# Verify hooks
ls -la .husky/
# Output:
# -rwxr-xr-x  1 user  staff   pre-commit
```

**Troubleshooting:**

```bash
# Hooks not working?
npm run prepare
chmod +x .husky/pre-commit

# Disable hooks temporarily
git commit --no-verify -m "Skip hooks"
```

**See also:** [Git Hooks](./09-git-hooks.md)

---

## Script Chaining

### Running Multiple Scripts

**Sequential (one after another):**

```bash
npm run lint && npm run format && npm run build
```

Stops if any script fails.

**Parallel (at the same time):**

```bash
npm run lint & npm run format & wait
```

Runs all scripts concurrently.

### Custom Script Combinations

**Create custom commands in `package.json`:**

```json
{
  "scripts": {
    "precommit": "npm run lint && npm run format && npm test",
    "validate": "npm run ci:check && npm run build",
    "quick-test": "npm test -- --maxWorkers=2"
  }
}
```

**Use with:**

```bash
npm run precommit
npm run validate
```

## Environment-Specific Scripts

### Development

```bash
# Development server
NODE_ENV=development npm run dev

# With custom port
PORT=3001 npm run dev
```

### Production

```bash
# Production build
NODE_ENV=production npm run build

# Start production server
NODE_ENV=production npm start
```

### Testing

```bash
# Test environment
NODE_ENV=test npm test

# With coverage
NODE_ENV=test npm test -- --coverage
```

## Common Workflows

### Before Committing

```bash
npm run ci:check    # Lint + format check
npm test            # Run tests
```

Alternatively, let Husky handle it:

```bash
git add .
git commit -m "feat: new feature"
# Husky runs checks automatically
```

### Before Pushing

```bash
npm run ci:check    # All quality checks
npm run build       # Ensure production build works
npm test            # All tests pass
git push
```

### Before Deploying

```bash
npm run ci:check    # Quality checks
npm test            # Tests
npm run build       # Production build
npm start           # Test production locally
# Deploy
```

### Debugging Performance

```bash
npm run build:analyze   # Visualize bundle
npm run build           # Check build size
npm start               # Test production performance
# Run Lighthouse audit in browser
```

## Troubleshooting

### Script Not Found

**Error:**

```
npm ERR! missing script: dev
```

**Solution:**

```bash
# Verify script exists
cat package.json | grep scripts -A 10

# Reinstall dependencies
npm install
```

### Permission Denied

**Error:**

```
sh: ./husky/pre-commit: Permission denied
```

**Solution:**

```bash
chmod +x .husky/pre-commit
npm run prepare
```

### Port Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

```bash
# Use different port
PORT=3001 npm run dev

# Or kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

## See Also

- [Getting Started](./01-getting-started.md) - First time setup
- [Development Workflow](./02-development-workflow.md) - Daily usage
- [Testing Guide](./07-testing.md) - Test scripts in depth
- [Linting and Formatting](./08-linting-formatting.md) - Code quality scripts
- [Git Hooks](./09-git-hooks.md) - Automated script running
- [Bundle Analysis](./10-bundle-analysis.md) - Analyzing build output

## Next Steps

- [Configure Next.js](./05-nextjs-config.md) to customize build behavior
- [Set up testing](./07-testing.md) to write comprehensive tests
- [Configure linting](./08-linting-formatting.md) to enforce code standards

---

**Last updated:** February 2026
