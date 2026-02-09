# Git Hooks

**Navigation:** [Home](../../README.md) > [Development](./README.md) > Git Hooks

---

## Overview

Git hooks are scripts that automatically run at specific points in the Git workflow. This guide covers the Husky and lint-staged setup for the Simon Stijnen Portfolio project, which automatically formats and lints code before commits.

## What Are Git Hooks?

Git hooks are custom scripts that Git executes before or after events such as:

- **pre-commit** - Before creating a commit
- **commit-msg** - After writing commit message
- **pre-push** - Before pushing to remote
- **post-merge** - After merging branches

**Benefits:**

- Enforce code quality standards
- Prevent bad code from being committed
- Automate repetitive tasks
- Catch errors early in development

## Project Setup

The project uses:

- **Husky** - Manages Git hooks in `.husky/` directory
- **lint-staged** - Runs linters on staged files only

### Why Husky?

**Traditional Git hooks:**

```bash
# Located in .git/hooks/ (not committed to repo)
.git/hooks/pre-commit  # Not shared with team
```

**Problems:**

- Not version controlled (in `.git/` directory)
- Each developer must set up manually
- Difficult to maintain consistency across team

**Husky solution:**

```bash
# Located in .husky/ (committed to repo)
.husky/pre-commit  # Shared with team via Git
```

**Benefits:**

- Version controlled
- Automatically installed for all developers
- Easy to update and maintain
- Consistent across team

## Installation and Setup

### Initial Setup

**Install Husky:**

```bash
npm install --save-dev husky
```

**Initialize Husky:**

```bash
npm run prepare
```

**What `prepare` does:**

1. Initializes Husky in `.husky/` directory
2. Configures Git hooks path: `git config core.hooksPath .husky`
3. Makes hook scripts executable

**Verify installation:**

```bash
ls -la .husky/
# Output:
# -rwxr-xr-x  1 user  staff   pre-commit
```

### Automatic Setup on Clone

When someone clones the repository:

```bash
git clone https://github.com/SimonStnn/website.git
cd website
npm install  # Automatically runs 'npm run prepare'
```

**The `prepare` script runs automatically after `npm install`:**

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

No manual setup required for new developers!

## Pre-commit Hook

### Hook Script

**File:** `.husky/pre-commit`

```bash
#!/usr/bin/env sh

npx lint-staged
```

**What it does:**

1. Runs before every `git commit`
2. Executes `lint-staged` on staged files
3. Blocks commit if errors exist

**Made executable:**

```bash
chmod +x .husky/pre-commit
```

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

**How it works:**

1. Detects files staged for commit
2. Filters by file pattern
3. Runs commands in order
4. Re-stages modified files
5. Blocks commit if any command fails

**File patterns:**

- `*.{js,jsx,ts,tsx}` - JavaScript and TypeScript files
- `*.{json,css,md}` - Data, style, and documentation files

**Commands for JS/TS files:**

1. **`prettier --write`** - Format code
2. **`eslint --fix`** - Lint and auto-fix issues

**Commands for other files:**

1. **`prettier --write`** - Format only

## Workflow

### Normal Commit

**Scenario:** Clean code with no issues

```bash
# Make changes
echo 'export const greeting = "Hello";' > lib/greet.ts

# Stage files
git add lib/greet.ts

# Commit
git commit -m "feat: add greeting function"
```

**Output:**

```
✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ package.json — 1 file
  ✔ *.{js,jsx,ts,tsx} — 1 file
    ✔ prettier --write
    ✔ eslint --fix
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...

[main abc1234] feat: add greeting function
 1 file changed, 1 insertion(+)
```

**What happened:**

1. Prettier formatted the file
2. ESLint checked for errors (none found)
3. File was re-staged with formatting changes
4. Commit succeeded

### Commit with Auto-fixable Issues

**Scenario:** Code has formatting issues that can be auto-fixed

```bash
# Poorly formatted code
echo 'const x=5;const y=10;console.log(x+y)' > lib/calc.ts

# Stage and commit
git add lib/calc.ts
git commit -m "feat: add calculator"
```

**Output:**

```
✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ *.{js,jsx,ts,tsx} — 1 file
    ✔ prettier --write
      lib/calc.ts (formatted)
    ✔ eslint --fix
      lib/calc.ts (fixed 2 issues)
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...

[main def5678] feat: add calculator
 1 file changed, 3 insertions(+)
```

**File after auto-fix:**

```typescript
const x = 5;
const y = 10;
console.log(x + y);
```

**What happened:**

1. Prettier formatted code (added spaces, newlines)
2. ESLint auto-fixed issues
3. Fixed file was re-staged
4. Commit succeeded with fixed code

### Commit with Unfixable Errors

**Scenario:** Code has errors that cannot be auto-fixed

```bash
# Code with unused variable
echo 'const unused = 5; export const x = 10;' > lib/vars.ts

# Stage and commit
git add lib/vars.ts
git commit -m "feat: add variables"
```

**Output:**

```
✖ Running tasks for staged files...
  ✖ *.{js,jsx,ts,tsx} — 1 file
    ✔ prettier --write
    ✖ eslint --fix
      lib/vars.ts
        1:7  error  'unused' is defined but never used  @typescript-eslint/no-unused-vars

✖ lint-staged failed due to a linting error.
```

**Commit blocked!**

**Fix the error:**

```typescript
// Remove unused variable
export const x = 10;
```

**Try again:**

```bash
git add lib/vars.ts
git commit -m "feat: add variables"
# ✅ Succeeds
```

### Committing Multiple Files

**Scenario:** Multiple files with different issues

```bash
# Stage multiple files
git add app/page.tsx components/button.tsx lib/utils.ts README.md

# Commit
git commit -m "refactor: update components"
```

**Output:**

```
✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ *.{js,jsx,ts,tsx} — 3 files
    ✔ prettier --write
      app/page.tsx
      components/button.tsx
      lib/utils.ts
    ✔ eslint --fix
      components/button.tsx (fixed 1 issue)
  ✔ *.{json,css,md} — 1 file
    ✔ prettier --write
      README.md
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...

[main ghi9012] refactor: update components
 4 files changed, 47 insertions(+), 23 deletions(-)
```

**What happened:**

1. Prettier formatted all 4 files
2. ESLint checked 3 TypeScript files
3. ESLint auto-fixed 1 issue in `button.tsx`
4. All files re-staged with fixes
5. Commit succeeded

## Bypassing Hooks

### When to Bypass

**Use `--no-verify` (or `-n`) to skip hooks:**

```bash
git commit --no-verify -m "WIP: incomplete feature"
# or
git commit -n -m "WIP: incomplete feature"
```

**Valid reasons to bypass:**

- Emergency production hotfix
- Work-in-progress commits on feature branch
- Known issues being fixed in subsequent commit
- Temporary experimental code

**⚠️ Warning:** Bypassing hooks should be rare. Most of the time, it's better to fix the issues.

### Best Practices

**Don't bypass to avoid fixing issues:**

```bash
# ❌ Bad: Bypassing to avoid fixing
git commit --no-verify -m "feat: new feature"
# (commits code with linting errors)

# ✅ Good: Fix issues first
npm run lint -- --fix
git add .
git commit -m "feat: new feature"
```

**Use feature branches for WIP:**

```bash
# Create feature branch for work in progress
git checkout -b feature/new-feature

# Commit without hooks (feature branch only)
git commit --no-verify -m "WIP: initial setup"

# Before merging to main, fix all issues
npm run ci:check
git commit -m "feat: complete new feature"
git checkout main
git merge feature/new-feature
```

## Advanced Configuration

### Adding More Hooks

**Create pre-push hook:**

```bash
touch .husky/pre-push
chmod +x .husky/pre-push
```

**File:** `.husky/pre-push`

```bash
#!/usr/bin/env sh

# Run tests before pushing
npm test

# Run full CI checks
npm run ci:check
```

**Create commit-msg hook:**

```bash
touch .husky/commit-msg
chmod +x .husky/commit-msg
```

**File:** `.husky/commit-msg`

```bash
#!/usr/bin/env sh

# Validate commit message format
# Example: Enforce conventional commits

commit_msg=$(cat "$1")

if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
  echo "Error: Commit message must follow Conventional Commits format"
  echo "Example: feat: add new feature"
  echo "Types: feat, fix, docs, style, refactor, test, chore"
  exit 1
fi
```

**Usage:**

```bash
git commit -m "added feature"
# ❌ Error: Commit message must follow Conventional Commits format

git commit -m "feat: add new feature"
# ✅ Success
```

### Custom lint-staged Commands

**Run tests on staged files:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix", "jest --bail --findRelatedTests"]
  }
}
```

**Type check staged files:**

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["prettier --write", "eslint --fix", "bash -c 'tsc --noEmit'"]
  }
}
```

**Run custom scripts:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix", "npm run custom-check"]
  },
  "scripts": {
    "custom-check": "echo 'Running custom checks...'"
  }
}
```

### Conditional Hook Execution

**Only run hooks on main branch:**

```bash
#!/usr/bin/env sh

current_branch=$(git branch --show-current)

if [ "$current_branch" = "main" ]; then
  npx lint-staged
else
  echo "Skipping lint-staged (not on main branch)"
fi
```

**Run different checks per branch:**

```bash
#!/usr/bin/env sh

current_branch=$(git branch --show-current)

if [ "$current_branch" = "main" ]; then
  # Strict checks on main
  npm run ci:check
  npm test
elif [[ "$current_branch" == feature/* ]]; then
  # Lighter checks on feature branches
  npx lint-staged
else
  # No checks on other branches
  echo "Skipping checks"
fi
```

## Troubleshooting

### Issue: Hooks Not Running

**Symptoms:** Commits succeed without running lint-staged

**Diagnosis:**

```bash
# Check if Husky is configured
git config core.hooksPath
# Expected: .husky

# Check if hooks exist
ls -la .husky/
# Expected: pre-commit file

# Check if pre-commit is executable
ls -l .husky/pre-commit
# Expected: -rwxr-xr-x (x = executable)
```

**Solutions:**

```bash
# Reinstall Husky
npm run prepare

# Make hook executable
chmod +x .husky/pre-commit

# Verify Git hooks path
git config core.hooksPath .husky
```

### Issue: Hook Permission Denied

**Error:**

```
.husky/pre-commit: Permission denied
```

**Solution:**

```bash
# Make all hooks executable
chmod +x .husky/*

# Or specific hook
chmod +x .husky/pre-commit
```

### Issue: lint-staged Not Found

**Error:**

```
npx: could not determine executable to run
```

**Solution:**

```bash
# Install lint-staged
npm install --save-dev lint-staged

# Verify installation
npm list lint-staged
```

### Issue: Hooks Too Slow

**Problem:** Pre-commit hook takes too long (> 10 seconds)

**Solutions:**

```json
{
  "lint-staged": {
    // Only lint, don't run tests
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"]
    // Removed: "jest --bail --findRelatedTests"
  }
}
```

**Or run tests in pre-push instead:**

```bash
# .husky/pre-commit - Fast
npx lint-staged

# .husky/pre-push - Slower
npm test
```

### Issue: Hooks Fail in CI

**Problem:** CI runs hooks again, causing duplication

**Solution:**

Skip hooks in CI:

```yaml
# .github/workflows/ci.yml
- name: Install dependencies
  run: npm ci

- name: Bypass hooks (CI runs checks separately)
  run: git config core.hooksPath /dev/null

- name: Run checks
  run: npm run ci:check
```

Or set environment variable:

```bash
# .husky/pre-commit
#!/usr/bin/env sh

if [ "$CI" = "true" ]; then
  echo "Skipping hooks in CI"
  exit 0
fi

npx lint-staged
```

## Performance Optimization

### Caching

**Enable ESLint caching:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix --cache"]
  }
}
```

**Cache file:** `.eslintcache`

**Add to `.gitignore`:**

```
.eslintcache
```

### Parallel Execution

**Run commands in parallel (if independent):**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix --cache"
      // These can't run in parallel (need to run in order)
    ]
  }
}
```

**Note:** Commands in array run sequentially by default. For parallel execution, use shell commands:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": "bash -c 'prettier --write \"$@\" & eslint --fix --cache \"$@\" & wait' --"
  }
}
```

### Limiting Concurrency

**Limit concurrent processes:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix --cache --max-warnings=0"]
  }
}
```

**Environment variable:**

```bash
# .husky/pre-commit
#!/usr/bin/env sh

FORCE_COLOR=1 npx lint-staged --concurrent 2
```

## Best Practices

### ✅ Do's

- Keep hooks fast (< 10 seconds)
- Only check staged files (use lint-staged)
- Auto-fix issues when possible
- Provide clear error messages
- Make hooks easy to bypass (for emergencies)
- Document hook behavior in README

### ❌ Don'ts

- Don't run full test suite in pre-commit (use pre-push)
- Don't check entire codebase (only staged files)
- Don't make hooks mandatory for local development
- Don't hide error messages
- Don't bypass hooks regularly
- Don't commit with `--no-verify` without good reason

## Common Use Cases

### Preventing Secrets

**Add hook to check for secrets:**

```bash
# .husky/pre-commit
#!/usr/bin/env sh

# Check for secrets in staged files
if git diff --cached --name-only | xargs grep -E "API_KEY|SECRET|PASSWORD"; then
  echo "Error: Potential secrets detected in commit"
  exit 1
fi

npx lint-staged
```

### Enforcing Conventional Commits

**Validate commit message format:**

```bash
# .husky/commit-msg
#!/usr/bin/env sh

commit_msg=$(cat "$1")

if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore): .+"; then
  echo "❌ Invalid commit message format"
  echo "Format: <type>: <description>"
  echo "Types: feat, fix, docs, style, refactor, test, chore"
  echo ""
  echo "Examples:"
  echo "  feat: add user authentication"
  echo "  fix: resolve login bug"
  echo "  docs: update README"
  exit 1
fi
```

### Branch Protection

**Prevent commits to main:**

```bash
# .husky/pre-commit
#!/usr/bin/env sh

branch=$(git branch --show-current)

if [ "$branch" = "main" ]; then
  echo "❌ Direct commits to main are not allowed"
  echo "Create a feature branch instead:"
  echo "  git checkout -b feature/your-feature"
  exit 1
fi

npx lint-staged
```

## Maintenance

### Updating Husky

```bash
# Check current version
npm list husky

# Update to latest
npm install --save-dev husky@latest

# Reinstall hooks
npm run prepare
```

### Updating lint-staged

```bash
# Update lint-staged
npm install --save-dev lint-staged@latest

# Test configuration
npx lint-staged --debug
```

### Testing Hooks

**Manually test pre-commit:**

```bash
# Stage test files
git add test.ts

# Run hook manually
.husky/pre-commit

# Check exit code
echo $?  # 0 = success, 1 = failure
```

**Test with sample commit:**

```bash
# Create test commit (will be aborted)
git commit -m "test: verify hooks" --dry-run
```

## See Also

- [Development Workflow](./02-development-workflow.md) - How hooks fit into daily workflow
- [Linting and Formatting](./08-linting-formatting.md) - Tools used by hooks
- [NPM Scripts](./04-npm-scripts.md) - Commands run by hooks
- [Testing](./07-testing.md) - Running tests in hooks
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)

## Next Steps

- [Analyze bundle size](./10-bundle-analysis.md) to optimize performance
- [Configure CI/CD](../05-deployment/) with similar checks
- [Set up testing](./07-testing.md) in pre-push hooks

---

**Last updated:** February 2026
