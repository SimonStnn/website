# shadcn/ui Integration

**Navigation:** [Home](../index.md) → [Features & Components](./01-components-overview.md) → shadcn/ui Integration

## Table of Contents

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Style System](#style-system)
- [Component Catalog](#component-catalog)
- [Customization](#customization)
- [Theme Integration](#theme-integration)
- [Best Practices](#best-practices)
- [Component Usage Examples](#component-usage-examples)
- [See Also](#see-also)
- [Next Steps](#next-steps)

## Introduction

This project uses [shadcn/ui](https://ui.shadcn.com/), a collection of re-usable components built with **Radix UI** and **Tailwind CSS**. Unlike traditional component libraries, shadcn/ui components are copied directly into your project, giving you full ownership and customization control.

### Why shadcn/ui?

- ✅ **Full Control**: Components live in your codebase
- ✅ **TypeScript First**: Strongly typed components
- ✅ **Accessible**: Built on Radix UI primitives
- ✅ **Customizable**: Modify any component as needed
- ✅ **Modern**: Uses latest React patterns (Server Components, Suspense)
- ✅ **Framework Agnostic**: Works with Next.js, Remix, Vite, etc.

## Configuration

### components.json

The project configuration defines the shadcn/ui setup:

```json:1:21:components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### Key Configuration Options

| Option         | Value        | Description                                                           |
| -------------- | ------------ | --------------------------------------------------------------------- |
| `style`        | `"new-york"` | Component style variant (alternatives: `default`)                     |
| `rsc`          | `true`       | React Server Components support                                       |
| `baseColor`    | `"slate"`    | Base color palette (alternatives: `gray`, `zinc`, `neutral`, `stone`) |
| `cssVariables` | `true`       | Use CSS variables for theming                                         |
| `iconLibrary`  | `"lucide"`   | Icon library for components                                           |

### Installing Components

Add new shadcn/ui components using the CLI:

```bash
# Install a single component
npx shadcn@latest add button

# Install multiple components
npx shadcn@latest add card dialog table

# Install all components (not recommended)
npx shadcn@latest add --all
```

Components are added to `components/ui/` directory.

## Style System

### New York Style

The **New York** style variant provides:

- Rounded corners with subtle shadows
- Refined spacing and padding
- Modern, professional aesthetic
- Optimized for dashboard and portfolio layouts

### Slate Color Scheme

The **Slate** base color provides neutral gray tones that:

- Work well with both light and dark themes
- Provide excellent contrast ratios for accessibility
- Pair nicely with accent colors
- Create a professional, polished look

### CSS Variables

Theme colors are defined as CSS variables in `app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    /* ... more variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark theme variables */
  }
}
```

This approach enables seamless theme switching without component modifications.

## Component Catalog

### Installed Components

The project includes these shadcn/ui components:

#### Layout & Structure

| Component     | File               | Purpose                               | Documentation                                           |
| ------------- | ------------------ | ------------------------------------- | ------------------------------------------------------- |
| **Card**      | `ui/card.tsx`      | Content containers with header/footer | [Docs](https://ui.shadcn.com/docs/components/card)      |
| **Separator** | `ui/separator.tsx` | Visual dividers                       | [Docs](https://ui.shadcn.com/docs/components/separator) |
| **Tabs**      | `ui/tabs.tsx`      | Tabbed interfaces                     | [Docs](https://ui.shadcn.com/docs/components/tabs)      |

#### Interactive Elements

| Component         | File                   | Purpose                   | Documentation                                               |
| ----------------- | ---------------------- | ------------------------- | ----------------------------------------------------------- |
| **Button**        | `ui/button.tsx`        | Buttons with variants     | [Docs](https://ui.shadcn.com/docs/components/button)        |
| **Dialog**        | `ui/dialog.tsx`        | Modal dialogs             | [Docs](https://ui.shadcn.com/docs/components/dialog)        |
| **Sheet**         | `ui/sheet.tsx`         | Side panels (mobile menu) | [Docs](https://ui.shadcn.com/docs/components/sheet)         |
| **Dropdown Menu** | `ui/dropdown-menu.tsx` | Dropdown menus            | [Docs](https://ui.shadcn.com/docs/components/dropdown-menu) |
| **Tooltip**       | `ui/tooltip.tsx`       | Hover tooltips            | [Docs](https://ui.shadcn.com/docs/components/tooltip)       |

#### Forms & Input

| Component | File           | Purpose           | Documentation                                       |
| --------- | -------------- | ----------------- | --------------------------------------------------- |
| **Input** | `ui/input.tsx` | Text input fields | [Docs](https://ui.shadcn.com/docs/components/input) |

#### Data Display

| Component    | File              | Purpose                 | Documentation                                          |
| ------------ | ----------------- | ----------------------- | ------------------------------------------------------ |
| **Table**    | `ui/table.tsx`    | Data tables             | [Docs](https://ui.shadcn.com/docs/components/table)    |
| **Badge**    | `ui/badge.tsx`    | Tag badges              | [Docs](https://ui.shadcn.com/docs/components/badge)    |
| **Carousel** | `ui/carousel.tsx` | Image carousels (Embla) | [Docs](https://ui.shadcn.com/docs/components/carousel) |

#### Navigation

| Component           | File                     | Purpose                  | Documentation                                                 |
| ------------------- | ------------------------ | ------------------------ | ------------------------------------------------------------- |
| **Navigation Menu** | `ui/navigation-menu.tsx` | Complex navigation menus | [Docs](https://ui.shadcn.com/docs/components/navigation-menu) |

## Customization

### Modifying Components

Since components live in your codebase, you can customize them directly:

```typescript
// components/ui/button.tsx - Add custom variants
const buttonVariants = cva("inline-flex items-center justify-center...", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      // Add custom variant
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    },
    // ... other variants
  },
});
```

### Adding Custom Styles

Extend component styles using `className` prop:

```typescript
<Button
  variant="secondary"
  className="custom-gradient shadow-xl hover:scale-105 transition-transform"
>
  Enhanced Button
</Button>
```

### Creating Composed Components

Build higher-level components from shadcn/ui primitives:

```typescript
// components/project-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {project.technologies.map(tech => (
          <Badge key={tech} variant="secondary">{tech}</Badge>
        ))}
      </CardContent>
    </Card>
  );
}
```

## Theme Integration

### Dark Mode Support

All shadcn/ui components automatically support dark mode through CSS variables:

```typescript
// No component changes needed!
<Button variant="default">
  Works in both themes
</Button>
```

The `ThemeProvider` from `next-themes` manages theme state:

```typescript
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**See:** [Theme System](./09-theme-system.md) for complete theme documentation

## Best Practices

### Import Patterns

```typescript
// ✅ Import multiple components from same file
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ✅ Use absolute imports
import { Button } from "@/components/ui/button";

// ❌ Avoid relative imports
import { Button } from "../../components/ui/button";
```

### Component Composition

```typescript
// ✅ Compose components logically
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>

// ❌ Don't skip semantic structure
<Card>
  <div>Title</div>
  <div>Content</div>
</Card>
```

### Accessibility

```typescript
// ✅ Include proper ARIA labels
<Button
  variant="ghost"
  size="icon"
  aria-label="Close menu"
>
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</Button>

// ✅ Use semantic variants
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Success</Badge>
```

### Performance

```typescript
// ✅ Use server components when possible
export default function ProjectList({ projects }) {
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

// ⚠️ Only use "use client" when necessary
"use client";
import { useState } from "react";
```

## Component Usage Examples

### Button Variants

```typescript
import { Button } from "@/components/ui/button";

<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔔</Button>
```

### Card Structure

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>A brief description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

### Dialog Pattern

```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Description text here
      </DialogDescription>
    </DialogHeader>
    <div>Modal content</div>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dropdown Menu

```typescript
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Table Structure

```typescript
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Project A</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## See Also

- [Components Overview](./01-components-overview.md) - Component architecture
- [Theme System](./09-theme-system.md) - Dark mode implementation
- [Styling Guide](../06-guides/styling/04-design-system.md) - Tailwind CSS patterns
- [Official shadcn/ui Docs](https://ui.shadcn.com/docs) - Complete component reference

## Next Steps

1. **Browse Examples**: Review component usage in `components/` directory
2. **Add Components**: Install additional shadcn/ui components as needed
3. **Customize Themes**: Modify CSS variables in `app/globals.css`
4. **Build Composed Components**: Create domain-specific components using UI primitives

---

**Last Updated:** 2024-02-09  
**Related Docs:** [Components](./01-components-overview.md) | [Theming](./09-theme-system.md) | [Architecture](../01-architecture/01-overview.md)
