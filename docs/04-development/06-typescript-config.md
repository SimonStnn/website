# TypeScript Configuration

**Navigation:** [Home](../../README.md) > [Development](./README.md) > TypeScript Configuration

---

## Overview

This guide explains the TypeScript configuration (`tsconfig.json`) for the Simon Stijnen Portfolio project, detailing compiler options, path mappings, and how TypeScript integrates with Next.js.

## Configuration File

The project's TypeScript configuration is located at `/workspaces/website/tsconfig.json`.

### Complete Configuration

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Compiler Options

### Target and Output

#### `target: "ES2017"`

**Purpose:** Specifies which ECMAScript version to compile to.

**Why ES2017:**

- Modern async/await syntax support
- Broad browser compatibility (95%+ browsers)
- Good balance between features and compatibility

**Code example:**

```typescript
// ES2017 features available:
async function fetchProjects() {
  const response = await fetch("/api/projects");
  return await response.json();
}

const project = { title: "Test", ...otherProps }; // Object spread
const { title, description } = project; // Destructuring
```

**Alternative targets:**

- `ES5` - Maximum compatibility (IE11+), larger bundle
- `ES2015` - Modern browsers, smaller bundle
- `ES2020` - Latest features, may require polyfills
- `ESNext` - Cutting edge, use with caution

#### `noEmit: true`

**Purpose:** TypeScript only checks types; doesn't output JavaScript files.

**Why:**

- Next.js handles compilation (via SWC or Babel)
- TypeScript used for type checking only
- Faster builds (no double compilation)

**Effect:**

```bash
# TypeScript checks types but doesn't output .js files
npx tsc
# Output: Type checking only, no files written
```

### Module System

#### `module: "esnext"`

**Purpose:** Use the latest ECMAScript module syntax.

**Features:**

- Static `import`/`export` statements
- Dynamic `import()` for code splitting
- Tree shaking support

**Example:**

```typescript
// Static imports
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

// Dynamic imports (code splitting)
const DynamicComponent = dynamic(() => import("@/components/heavy-component"));

// Re-exports
export { Button } from "@/components/ui/button";
export type { Project };
```

#### `moduleResolution: "bundler"`

**Purpose:** Use modern bundler-based module resolution (Next.js, Vite, etc.).

**Why:**

- Optimized for modern bundlers
- Better tree shaking
- Proper package exports handling
- Faster resolution

**Effect:**

```typescript
// Resolves using package.json "exports" field
import { Button } from "@/components/ui/button";

// Handles TypeScript path mappings
import { getProjects } from "@/lib/projects";
```

**Alternatives:**

- `node` - Node.js resolution (CommonJS style)
- `node16` - Node.js 16+ with ESM support
- `bundler` - Modern bundler optimized (recommended)

### JavaScript Interoperability

#### `allowJs: true`

**Purpose:** Allow importing `.js` and `.jsx` files in TypeScript.

**Use cases:**

- Gradually migrate JavaScript to TypeScript
- Import third-party JavaScript files
- Mix JavaScript and TypeScript in project

**Example:**

```typescript
// Can import .js files in .ts files
import { legacyUtil } from "./utils.js"; // Works even if not TypeScript
```

#### `esModuleInterop: true`

**Purpose:** Enable compatibility between CommonJS and ES modules.

**Why:**

- Import CommonJS modules with ES6 syntax
- Better interoperability with npm packages
- Fixes default import issues

**Example:**

```typescript
// Without esModuleInterop:
import * as React from "react"; // Required

// With esModuleInterop:
import React from "react"; // Cleaner, works with CommonJS
```

### Type Checking

#### `strict: true`

**Purpose:** Enable all strict type checking options.

**Includes:**

- `noImplicitAny` - Error on implicit `any` types
- `strictNullChecks` - `null` and `undefined` must be explicitly handled
- `strictFunctionTypes` - Strict function type checking
- `strictBindCallApply` - Strict `bind`, `call`, `apply` checking
- `strictPropertyInitialization` - Class properties must be initialized
- `noImplicitThis` - Error on `this` with implicit `any`
- `alwaysStrict` - Parse in strict mode, emit "use strict"

**Examples:**

```typescript
// noImplicitAny - Error without explicit type
function calculate(value) {
  // ❌ Error: Parameter 'value' implicitly has an 'any' type
  return value * 2;
}

function calculate(value: number) {
  // ✅ Explicit type
  return value * 2;
}

// strictNullChecks - Must handle null/undefined
function getProjectTitle(project?: Project): string {
  return project.title; // ❌ Error: Object is possibly 'undefined'
}

function getProjectTitle(project?: Project): string {
  return project?.title ?? "Untitled"; // ✅ Safe access with nullish coalescing
}

// strictPropertyInitialization - Properties must be initialized
class ProjectManager {
  projects: Project[]; // ❌ Error: Property 'projects' has no initializer

  projects: Project[] = []; // ✅ Initialize in declaration

  // Or initialize in constructor
  constructor() {
    this.projects = [];
  }
}
```

**Benefits:**

- Catch bugs at compile time
- Better code quality
- Safer refactoring
- Self-documenting code

#### `skipLibCheck: true`

**Purpose:** Skip type checking of declaration files (`.d.ts`).

**Why:**

- Faster type checking (don't check `node_modules/@types/`)
- Avoid errors in third-party type definitions
- Focus on your code, not dependencies

**Trade-off:**

- May miss type errors in dependencies
- Generally safe for most projects

### JSX Configuration

#### `jsx: "preserve"`

**Purpose:** Keep JSX as-is; let Next.js handle transformation.

**Why:**

- Next.js uses SWC to transform JSX (faster than TypeScript)
- Allows Next.js to optimize JSX transformation
- Faster builds

**Effect:**

```tsx
// TypeScript output preserves JSX
export function Button({ children }) {
  return <button>{children}</button>;
}
// Next.js transforms to React.createElement()
```

**Alternatives:**

- `react` - Transform to `React.createElement()`
- `react-jsx` - Transform to `jsx()` runtime (React 17+)
- `preserve` - Keep JSX, let bundler handle it (recommended with Next.js)

### Build Performance

#### `incremental: true`

**Purpose:** Enable incremental compilation to speed up rebuilds.

**How it works:**

- TypeScript stores build info in `.tsbuildinfo` files
- On rebuild, only changed files are re-checked
- Much faster subsequent builds

**Effect:**

```bash
# First build
npx tsc --noEmit
# Time: 15 seconds

# Second build (with changes)
npx tsc --noEmit
# Time: 3 seconds (incremental)
```

**Cache location:**

```
.next/
├── cache/              # Next.js build cache
│   └── tsbuildinfo     # TypeScript incremental info
```

#### `isolatedModules: true`

**Purpose:** Ensure each file can be transpiled independently.

**Why:**

- Required for SWC and Babel (which Next.js uses)
- Enables parallel compilation
- Faster builds

**Restrictions:**

```typescript
// ❌ Cannot re-export types without 'type' keyword
export { MyType } from "./types";

// ✅ Must use 'export type'
export type { MyType } from "./types";

// ❌ Cannot use const enums
const enum Colors {
  Red,
  Blue,
}

// ✅ Use regular enums
enum Colors {
  Red = "red",
  Blue = "blue",
}
```

### JSON Support

#### `resolveJsonModule: true`

**Purpose:** Allow importing JSON files with type safety.

**Example:**

```typescript
// Import JSON files directly
import packageJson from "./package.json";
import projectData from "./content/projects/my-project.json";

console.log(packageJson.version); // Type-safe
console.log(projectData.title); // Type-safe

// TypeScript infers types from JSON structure
type ProjectData = typeof projectData;
```

**Use case in project:**

```typescript
// lib/projects.ts
import myProject from "@/content/projects/my-project.json";

// JSON is typed based on content
const title: string = myProject.title; // ✅ Type-safe
const invalid = myProject.nonExistent; // ❌ Error: Property doesn't exist
```

### Type Libraries

#### `lib: ["dom", "dom.iterable", "esnext"]`

**Purpose:** Include type definitions for specific APIs and features.

**Included libraries:**

1. **`dom`** - Browser APIs (DOM, events, etc.)

   ```typescript
   // Available types:
   const element: HTMLElement = document.getElementById("root");
   window.addEventListener("load", () => {});
   const button: HTMLButtonElement = document.createElement("button");
   ```

2. **`dom.iterable`** - Iterable DOM collections

   ```typescript
   // Can iterate over DOM collections
   const elements: NodeListOf<HTMLElement> = document.querySelectorAll("div");

   for (const el of elements) {
     // ✅ Works with for...of
     console.log(el);
   }

   const array = Array.from(elements); // ✅ Iterable
   ```

3. **`esnext`** - Latest ECMAScript features

   ```typescript
   // Latest JavaScript features:
   const promise = Promise.allSettled([...]); // ES2020
   const url = new URL(window.location.href); // URL API
   const result = array.flatMap(x => [x, x * 2]); // Array methods
   ```

## Path Mappings

### `paths` Configuration

**Purpose:** Define module path aliases for cleaner imports.

**Configuration:**

```json
"paths": {
  "@/*": ["./*"]
}
```

**Usage:**

```typescript
// Without path mapping:
import { Button } from "../../components/ui/button";
import { getProjects } from "../../../lib/projects";
import { siteConfig } from "../../../../lib/config";

// With path mapping (@/*):
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";
```

**Mapping explained:**

- `@/*` maps to `./*` (project root)
- `@/components/ui/button` → `/workspaces/website/components/ui/button`
- `@/lib/projects` → `/workspaces/website/lib/projects`

**Adding custom mappings:**

```json
"paths": {
  "@/*": ["./*"],
  "@components/*": ["components/*"],
  "@lib/*": ["lib/*"],
  "@app/*": ["app/*"]
}
```

**Usage with custom mappings:**

```typescript
import { Button } from "@components/ui/button";
import { getProjects } from "@lib/projects";
import HomePage from "@app/page";
```

### IDE Integration

**VSCode/Cursor:**

- Autocompletion works with path mappings
- Click-through to definition
- Refactoring support

**Example:**

```typescript
import { Button } from "@/"; // Autocomplete shows available modules
```

## Next.js Integration

### Next.js Plugin

**Configuration:**

```json
"plugins": [
  {
    "name": "next"
  }
]
```

**What it does:**

- Provides Next.js-specific type definitions
- Types for App Router conventions
- Types for `next/image`, `next/link`, etc.
- Server Component vs Client Component types

**Example types:**

```typescript
// app/page.tsx - Next.js types for page props
export default function HomePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // params and searchParams are type-safe
}

// Metadata types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page",
  description: "Page description",
};
```

### Generated Types

**Location:** `.next/types/**/*.ts`

**Included in:**

```json
"include": [
  "next-env.d.ts",
  "**/*.ts",
  "**/*.tsx",
  ".next/types/**/*.ts"  // Auto-generated Next.js types
]
```

**What's included:**

- Route types for App Router
- Dynamic route types
- API route types
- Middleware types

**Example:**

```typescript
// .next/types/app/projects/[slug]/page.ts (auto-generated)
export type Params = {
  slug: string;
};
```

### `next-env.d.ts`

**Location:** `/workspaces/website/next-env.d.ts` (auto-generated)

**Purpose:** Next.js type declarations reference file.

**Content:**

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

**Don't edit this file** - Next.js regenerates it automatically.

## File Inclusion

### `include` Option

**Configuration:**

```json
"include": [
  "next-env.d.ts",
  "**/*.ts",
  "**/*.tsx",
  ".next/types/**/*.ts"
]
```

**What's included:**

1. **`next-env.d.ts`** - Next.js type declarations
2. **`**/\*.ts`\*\* - All TypeScript files in project
3. **`**/\*.tsx`\*\* - All TSX files (React components)
4. **`.next/types/**/\*.ts`\*\* - Generated Next.js types

**Effect:**

```bash
# These files are type-checked:
app/page.tsx                    ✅
components/button.tsx           ✅
lib/utils.ts                    ✅
.next/types/app/page.ts         ✅
content/projects/data.ts        ✅

# These are ignored (unless imported):
scripts/build.js                ❌ (.js not included)
docs/README.md                  ❌ (.md not included)
```

### `exclude` Option

**Configuration:**

```json
"exclude": ["node_modules"]
```

**What's excluded:**

- `node_modules/` - All dependencies
- Overrides `include` patterns if they match

**Why exclude `node_modules`:**

- Faster type checking
- Avoid errors in dependencies
- Only check your code

**Automatically excluded (even if not listed):**

- `node_modules/`
- Directories in `.gitignore`

## Common Patterns

### Strict Type Safety

**Enable all strict checks:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Example with strict checks:**

```typescript
// noUnusedLocals
const unusedVariable = 5; // ❌ Error: 'unusedVariable' is declared but never used

// noUnusedParameters
function calculate(a: number, b: number) {
  // ❌ Error: 'b' is declared but never used
  return a * 2;
}

// noFallthroughCasesInSwitch
switch (value) {
  case "a":
    console.log("A");
  // ❌ Error: Fallthrough case in switch
  case "b":
    console.log("B");
    break;
}

// noUncheckedIndexedAccess
const array = [1, 2, 3];
const value = array[10]; // Type: number | undefined (not just number)
```

### Project References

**For monorepo setups:**

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  },
  "references": [{ "path": "./packages/shared" }]
}
```

## Type Checking

### During Development

**Automatic in IDE:**

- VSCode/Cursor show type errors in real-time
- Red underlines for errors
- Hover for type information

**Manual check:**

```bash
# Type check without emitting files
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

### During Build

**Next.js automatically type-checks:**

```bash
npm run build
```

**Output includes type checking:**

```
▲ Next.js 15.5.9
Creating an optimized production build ...
✓ Compiled successfully
✓ Linting and checking validity of types  # <-- Type checking
✓ Collecting page data
```

**If type errors exist:**

```
Type error: Property 'title' does not exist on type 'Project'

  app/projects/page.tsx:15:20
  13 | export default function ProjectsPage() {
  14 |   const projects = getProjects();
> 15 |   return projects.map(p => p.title);
     |                           ^
```

### Skipping Type Check in Build

**Not recommended, but possible:**

```json
// next.config.ts
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Skip type checking during build
  },
};
```

**Use only for:**

- Emergency deployments
- Temporarily bypass blocking errors
- CI/CD environments with separate type checking

## Troubleshooting

### Issue: Module Not Found

**Error:**

```
Cannot find module '@/components/button' or its corresponding type declarations
```

**Solution:**

1. Verify path mapping in `tsconfig.json`
2. Restart TypeScript server in IDE
3. Check file exists at expected path

```bash
# Restart TypeScript in VSCode/Cursor
# Command Palette (Ctrl+Shift+P)
# "TypeScript: Restart TS Server"
```

### Issue: Type Errors in node_modules

**Error:**

```
node_modules/@types/react/index.d.ts:123:45
Type error: ...
```

**Solution:**

Enable `skipLibCheck`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### Issue: JSX Element Not Recognized

**Error:**

```
Cannot use JSX unless the '--jsx' flag is provided
```

**Solution:**

Ensure `jsx: "preserve"` is set:

```json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

## Best Practices

### ✅ Do's

- Use `strict: true` for maximum type safety
- Use path mappings (`@/*`) for cleaner imports
- Enable `incremental: true` for faster builds
- Keep `skipLibCheck: true` for build performance
- Use `isolatedModules: true` for Next.js compatibility

### ❌ Don'ts

- Don't edit `next-env.d.ts` (auto-generated)
- Don't use `any` type (defeats purpose of TypeScript)
- Don't disable strict checks unless necessary
- Don't include `node_modules` in type checking
- Don't ignore type errors in production

## See Also

- [Next.js Configuration](./05-nextjs-config.md) - Next.js config that uses TypeScript
- [Development Workflow](./02-development-workflow.md) - TypeScript in daily development
- [Testing](./07-testing.md) - TypeScript in tests
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Next.js TypeScript Documentation](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

## Next Steps

- [Set up testing](./07-testing.md) with TypeScript types
- [Configure linting](./08-linting-formatting.md) with TypeScript rules
- [Optimize bundle](./10-bundle-analysis.md) to check TypeScript output size

---

**Last updated:** February 2026
