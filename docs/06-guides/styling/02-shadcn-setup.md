# shadcn/ui Setup and Customization

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [Styling](./index.md) > shadcn/ui

This guide explains the shadcn/ui component library configuration and usage.

## Overview

shadcn/ui is a collection of re-usable components built with Radix UI and Tailwind CSS. Components are copied into your project, not installed as a dependency.

**Style:** New York  
**Base color:** Slate  
**CSS Variables:** Enabled

## Configuration

**File:** `components.json`

```json
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

## Adding Components

```bash
# Add single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog

# Update existing component
npx shadcn@latest add button --overwrite
```

## Installed Components

Current components:

- **button** - Interactive buttons with variants
- **card** - Content containers
- **dialog** - Modal dialogs
- **dropdown-menu** - Dropdown menus
- **navigation-menu** - Navigation bars
- **separator** - Visual dividers
- **slot** - Composition utility
- **tabs** - Tabbed interfaces
- **tooltip** - Hover tooltips

## Usage Examples

### Button

```typescript
import { Button } from '@/components/ui/button';

<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Brief description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
</Card>;
```

## Customization

Components are in `components/ui/` - edit directly:

```typescript
// components/ui/button.tsx
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      custom: "bg-brand text-white", // Add custom variant
    },
  },
});
```

## See Also

- [Tailwind Config](./01-tailwind-config.md)
- [Design System](./04-design-system.md)

---

**Last Updated:** February 2026
