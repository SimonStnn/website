# Linting and Formatting

**Navigation:** [Home](../index.md) > [Development](./README.md) > Linting and Formatting

---

## Overview

This guide covers the code quality tools used in the Simon Stijnen Portfolio project: ESLint for linting and Prettier for formatting. These tools ensure consistent code style and catch potential bugs before they reach production.

## Tools Overview

### ESLint

**Purpose:** Static code analysis to find and fix problems in JavaScript/TypeScript code.

**What it catches:**

- Syntax errors
- Potential bugs
- Code style violations
- React best practices violations
- TypeScript type issues
- Accessibility problems

**Configuration:** `eslint.config.mjs`

### Prettier

**Purpose:** Opinionated code formatter that enforces consistent style.

**What it formats:**

- JavaScript/TypeScript
- JSX/TSX
- JSON
- CSS/SCSS
- Markdown
- And more...

**Configuration:** `.prettierrc.json`

### Integration

ESLint and Prettier work together:

- ESLint checks code quality and logic
- Prettier handles code formatting
- `eslint-config-prettier` disables conflicting ESLint rules
- Both run automatically on commit via Husky

## ESLint Configuration

### Configuration File

**File:** `/workspaces/website/eslint.config.mjs`

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("prettier"),
];

export default eslintConfig;
```

### Extends Configuration

The project uses ESLint's flat config format with compatibility layer for plugins.

**Extended configs:**

1. **`next/core-web-vitals`**
   - Next.js recommended rules
   - React rules
   - Core Web Vitals rules
   - Performance best practices

2. **`next/typescript`**
   - TypeScript-specific rules
   - Type safety checks
   - Import/export validation

3. **`prettier`** (eslint-config-prettier)
   - Disables ESLint formatting rules
   - Prevents conflicts with Prettier
   - Lets Prettier handle all formatting

### Rules from Next.js Config

**`next/core-web-vitals` includes:**

```javascript
// React Rules
"react/react-in-jsx-scope": "off"        // React 19 doesn't need import React
"react/prop-types": "off"                // Use TypeScript instead
"react-hooks/rules-of-hooks": "error"    // Enforce hooks rules
"react-hooks/exhaustive-deps": "warn"    // Warn on missing dependencies

// Next.js Rules
"@next/next/no-html-link-for-pages": "error"    // Use next/link
"@next/next/no-img-element": "warn"             // Use next/image
"@next/next/no-sync-scripts": "error"           // Async scripts only

// Core Web Vitals
"@next/next/no-before-interactive-script-outside-document": "error"
"@next/next/inline-script-id": "error"
```

**`next/typescript` includes:**

```javascript
"@typescript-eslint/no-unused-vars": "warn"     // Warn on unused variables
"@typescript-eslint/no-explicit-any": "warn"    // Warn on 'any' type
"@typescript-eslint/no-non-null-assertion": "warn"  // Warn on '!' operator
```

### Running ESLint

**Basic usage:**

```bash
# Lint all files
npm run lint

# Output (no errors):
✔ No ESLint warnings or errors

# Output (with errors):
./app/page.tsx
15:7  Error: 'x' is defined but never used  @typescript-eslint/no-unused-vars
23:14 Warning: Missing 'key' prop for element in iterator  react/jsx-key

✖ 2 problems (1 error, 1 warning)
```

**Auto-fix issues:**

```bash
# Fix all auto-fixable issues
npm run lint -- --fix

# Fixed issues:
✔ Fixed 3 linting errors
```

**Lint specific files:**

```bash
# Lint single file
npm run lint -- app/page.tsx

# Lint directory
npm run lint -- app/projects/

# Lint pattern
npm run lint -- "app/**/*.tsx"
```

**Advanced options:**

```bash
# Show detailed errors
npm run lint -- --format=verbose

# Lint and cache results (faster subsequent runs)
npm run lint -- --cache

# Ignore warnings, only show errors
npm run lint -- --quiet

# Maximum warnings before exit with error
npm run lint -- --max-warnings=0
```

### Common ESLint Errors

#### Unused Variables

**Error:**

```typescript
const unusedVar = 5;
// Error: 'unusedVar' is defined but never used
```

**Solutions:**

```typescript
// Option 1: Remove unused variable
// (delete the line)

// Option 2: Use the variable
const usedVar = 5;
console.log(usedVar);

// Option 3: Prefix with underscore to indicate intentional
const _intentionallyUnused = 5;
```

#### Missing Key Prop

**Error:**

```tsx
items.map((item) => <div>{item.name}</div>);
// Error: Missing 'key' prop for element in iterator
```

**Solution:**

```tsx
items.map((item) => <div key={item.id}>{item.name}</div>);
```

#### Using <img> Instead of <Image>

**Warning:**

```tsx
<img src="/image.png" alt="Description" />
// Warning: Do not use <img>. Use Image from 'next/image' instead.
```

**Solution:**

```tsx
import Image from "next/image";

<Image src="/image.png" alt="Description" width={500} height={300} />;
```

#### Using <a> Instead of <Link>

**Error:**

```tsx
<a href="/about">About</a>
// Error: Do not use an `<a>` element to navigate to `/about`. Use `<Link />` from `next/link` instead.
```

**Solution:**

```tsx
import Link from "next/link";

<Link href="/about">About</Link>;
```

## Prettier Configuration

### Configuration File

**File:** `/workspaces/website/.prettierrc.json`

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

### Configuration Options

#### `semi: true`

**Add semicolons at end of statements.**

```typescript
// Formatted:
const x = 5;
const y = 10;
```

#### `singleQuote: false`

**Use double quotes for strings.**

```typescript
// Formatted:
const name = "Simon";
const message = "Hello, world!";
```

#### `tabWidth: 2`

**Use 2 spaces for indentation.**

```typescript
// Formatted:
function example() {
  if (true) {
    console.log("Indented with 2 spaces");
  }
}
```

#### `trailingComma: "es5"`

**Add trailing commas where valid in ES5 (objects, arrays).**

```typescript
// Formatted:
const obj = {
  name: "Simon",
  age: 25, // Trailing comma
};

const arr = [
  "item1",
  "item2", // Trailing comma
];

// No trailing comma in function parameters (not ES5):
function example(a, b) {}
```

#### `printWidth: 100`

**Wrap lines longer than 100 characters.**

```typescript
// Formatted (wraps at 100 characters):
const longString =
  "This is a very long string that exceeds the print width and will be wrapped to the next line";
```

#### `plugins: ["prettier-plugin-tailwindcss"]`

**Automatically sort Tailwind CSS classes.**

**Before:**

```tsx
<div className="bg-card hover:bg-accent mb-2 rounded-lg p-4 text-lg font-bold">Content</div>
```

**After:**

```tsx
<div className="bg-card hover:bg-accent mb-2 rounded-lg p-4 text-lg font-bold">Content</div>
```

**Sort order:**

1. Layout (display, position, etc.)
2. Box model (margin, padding, etc.)
3. Typography (font, text, etc.)
4. Visual (color, background, etc.)
5. Misc (transitions, animations, etc.)

### Running Prettier

**Format all files:**

```bash
npm run format

# Output:
app/page.tsx 142ms
app/layout.tsx 89ms
components/project-card.tsx 67ms
lib/config.ts 45ms
```

**Check formatting without changes:**

```bash
npm run format:check

# Output (formatted):
Checking formatting...
All matched files use Prettier code style!

# Output (not formatted):
Checking formatting...
[warn] app/page.tsx
[warn] components/project-card.tsx
[error] Code style issues found in 2 files. Run Prettier to fix.
```

**Format specific files:**

```bash
# Format single file
npx prettier --write app/page.tsx

# Format directory
npx prettier --write app/projects/

# Format pattern
npx prettier --write "app/**/*.tsx"
```

**Check single file:**

```bash
npx prettier --check app/page.tsx

# Exit code:
# 0 = formatted correctly
# 1 = needs formatting
```

### Prettier vs ESLint

**What each tool does:**

| Concern         | Tool     | Example                        |
| --------------- | -------- | ------------------------------ |
| Formatting      | Prettier | Semicolons, quotes, spacing    |
| Code quality    | ESLint   | Unused variables, missing keys |
| Best practices  | ESLint   | Use Link instead of <a>        |
| Style conflicts | Prettier | Disables ESLint formatting     |

**Workflow:**

1. Prettier formats code (spacing, semicolons, etc.)
2. ESLint checks code quality (logic, bugs, etc.)
3. Both run automatically on commit

## Tailwind CSS Class Sorting

### How It Works

The `prettier-plugin-tailwindcss` plugin automatically sorts Tailwind classes in a consistent order.

**Benefits:**

- Consistent class order across codebase
- Easier to scan and read classes
- Automatic on save (with IDE integration)

### Sort Order Examples

**Layout first:**

```tsx
// Before:
<div className="flex text-lg items-center">

// After:
<div className="flex items-center text-lg">
```

**Box model before typography:**

```tsx
// Before:
<div className="text-xl p-4 m-2 font-bold">

// After:
<div className="m-2 p-4 text-xl font-bold">
```

**States and variants last:**

```tsx
// Before:
<button className="hover:bg-blue-600 bg-blue-500 p-2 text-white">

// After:
<button className="bg-blue-500 p-2 text-white hover:bg-blue-600">
```

**Complex example:**

```tsx
// Before:
<div className="hover:shadow-lg transition-shadow duration-200 text-lg font-semibold bg-card dark:bg-card-dark p-6 rounded-lg shadow-md mb-4">

// After:
<div className="mb-4 rounded-lg bg-card p-6 text-lg font-semibold shadow-md transition-shadow duration-200 hover:shadow-lg dark:bg-card-dark">
```

### Custom Class Names

**Non-Tailwind classes are preserved:**

```tsx
// Before:
<div className="custom-class flex items-center another-class">

// After (Tailwind sorted, custom classes preserved):
<div className="custom-class flex items-center another-class">
```

## IDE Integration

### VSCode / Cursor

**Install extensions:**

1. ESLint (`dbaeumer.vscode-eslint`)
2. Prettier (`esbenp.prettier-vscode`)

**Settings:**

```json
{
  // Format on save
  "editor.formatOnSave": true,

  // Use Prettier as default formatter
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // Auto-fix ESLint on save
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  // ESLint validation
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

**Workflow:**

1. Edit file
2. Save (Cmd/Ctrl + S)
3. Prettier formats automatically
4. ESLint fixes auto-fixable issues
5. Remaining ESLint errors shown as warnings

### Other Editors

**WebStorm / IntelliJ:**

- Prettier: Settings → Prettier → Run on save
- ESLint: Settings → ESLint → Automatic ESLint configuration

**Vim / Neovim:**

```vim
" .vimrc / init.vim
Plug 'prettier/vim-prettier'
Plug 'dense-analysis/ale'
let g:ale_fixers = {'javascript': ['prettier', 'eslint']}
let g:ale_fix_on_save = 1
```

## Git Integration

### Pre-commit Hook

**File:** `.husky/pre-commit`

```bash
#!/usr/bin/env sh

npx lint-staged
```

**What happens on commit:**

1. Husky triggers pre-commit hook
2. lint-staged runs on staged files only
3. Prettier formats changed files
4. ESLint lints and auto-fixes
5. If errors remain, commit is blocked

### lint-staged Configuration

**File:** `package.json`

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

**What it does:**

- **JavaScript/TypeScript files:**
  1. Format with Prettier
  2. Lint with ESLint (with auto-fix)
- **Other files (JSON, CSS, Markdown):**
  1. Format with Prettier only

**Example commit:**

```bash
git add app/page.tsx components/button.tsx
git commit -m "feat: update homepage"

# Output:
✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ package.json — 2 files
  ✔ *.{js,jsx,ts,tsx} — 2 files
    ✔ prettier --write
    ✔ eslint --fix
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...

[main abc1234] feat: update homepage
 2 files changed, 42 insertions(+), 12 deletions(-)
```

**If errors exist:**

```bash
git commit -m "feat: broken code"

# Output:
✖ Running tasks for staged files...
  ✖ *.{js,jsx,ts,tsx} — 1 file
    ✖ eslint --fix
      app/page.tsx
        15:7  error  'x' is defined but never used  @typescript-eslint/no-unused-vars

✖ lint-staged failed. Fix errors and try again.
```

Fix errors and commit again:

```bash
# Fix the error in app/page.tsx
git add app/page.tsx
git commit -m "feat: update homepage"
# ✅ Succeeds
```

### Bypassing Hooks

**Not recommended, but sometimes necessary:**

```bash
# Skip all git hooks
git commit --no-verify -m "Emergency fix"

# Or
git commit -n -m "Emergency fix"
```

**When to bypass:**

- Emergency production fixes
- Work in progress commits (feature branch)
- Known issues being fixed in follow-up commit

**Best practice:** Fix the issues instead of bypassing.

## CI/CD Integration

### GitHub Actions

**Example workflow:**

```yaml
# .github/workflows/lint.yml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check Prettier formatting
        run: npm run format:check
```

**What it does:**

1. Runs on every push and PR
2. Installs dependencies
3. Runs ESLint (fails if errors)
4. Checks Prettier formatting (fails if not formatted)

### CI Check Command

**Run all checks locally:**

```bash
npm run ci:check

# Equivalent to:
npm run lint && npm run format:check
```

**Use before pushing:**

```bash
# Check everything before pushing
npm run ci:check
git push

# Or combine:
npm run ci:check && git push
```

## Ignoring Files

### .eslintignore

**File:** `.eslintignore` (optional, not in project by default)

```
# Dependencies
node_modules/

# Build output
.next/
out/
build/

# Cache
.cache/
coverage/

# Environment
.env
.env.local
```

**Default ignored (even without file):**

- `node_modules/`
- `.next/`
- `out/`

### .prettierignore

**File:** `.prettierignore` (optional, not in project by default)

```
# Dependencies
node_modules/

# Build output
.next/
out/
build/

# Logs
*.log

# Lock files
package-lock.json
yarn.lock
pnpm-lock.yaml
```

## Custom Rules

### Adding ESLint Rules

**Edit `eslint.config.mjs`:**

```javascript
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("prettier"),
  {
    rules: {
      // Custom rules
      "no-console": ["warn", { allow: ["warn", "error"] }], // Warn on console.log
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore _vars
      "react/self-closing-comp": "error", // Enforce <Component />
    },
  },
];
```

**Example custom rules:**

```javascript
{
  rules: {
    // Disallow console.log in production
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",

    // Enforce consistent import order
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      },
    ],

    // Enforce button type attribute
    "react/button-has-type": "error",

    // Prevent missing props validation (if not using TypeScript)
    "react/prop-types": "off", // We use TypeScript

    // Maximum line length (handled by Prettier)
    "max-len": "off",
  }
}
```

### Disabling Rules

**Disable for entire file:**

```typescript
/* eslint-disable no-console */
console.log("This is allowed");
console.log("This too");
```

**Disable for single line:**

```typescript
// eslint-disable-next-line no-console
console.log("Only this line is allowed");
```

**Disable specific rules:**

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();
```

**Best practice:** Use sparingly, prefer fixing the issue.

## Troubleshooting

### Issue: ESLint Not Running

**Check:**

```bash
# Verify ESLint is installed
npm list eslint

# Reinstall if missing
npm install
```

**Restart IDE** (VSCode/Cursor) to reload ESLint extension.

### Issue: Prettier Not Formatting

**Check:**

```bash
# Verify Prettier is installed
npm list prettier

# Test manually
npx prettier --write app/page.tsx
```

**Check IDE settings:**

- Format on save enabled
- Prettier set as default formatter

### Issue: Conflicting Rules

**Error:**

```
Delete `␍` (prettier/prettier)
```

**Cause:** Line ending conflicts (Windows vs Unix)

**Solution:**

```bash
# Convert line endings
git config core.autocrlf false
```

**Or add to `.prettierrc.json`:**

```json
{
  "endOfLine": "auto"
}
```

### Issue: Husky Hooks Not Running

**Check:**

```bash
# Verify Husky is installed
npm list husky

# Reinstall hooks
npm run prepare
chmod +x .husky/pre-commit
```

## Best Practices

### ✅ Do's

- Run `npm run ci:check` before pushing
- Fix ESLint errors, don't disable them
- Use auto-fix (`--fix`) for quick fixes
- Configure IDE to format on save
- Commit frequently with pre-commit hooks enabled

### ❌ Don'ts

- Don't disable ESLint rules without good reason
- Don't commit without running checks
- Don't bypass git hooks regularly
- Don't ignore warnings (they often indicate problems)
- Don't mix formatting styles (let Prettier handle it)

## See Also

- [Development Workflow](./02-development-workflow.md) - Using linting in daily workflow
- [NPM Scripts](./04-npm-scripts.md) - Lint and format commands
- [Git Hooks](./09-git-hooks.md) - Automated linting on commit
- [Testing](./07-testing.md) - Linting test files
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)

## Next Steps

- [Set up Git hooks](./09-git-hooks.md) for automatic linting
- [Configure your IDE](./01-getting-started.md) with linting extensions
- [Run tests](./07-testing.md) to ensure code quality

---

**Last updated:** February 2026
