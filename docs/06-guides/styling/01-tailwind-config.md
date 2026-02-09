# Tailwind CSS Configuration

**Breadcrumbs:** [Documentation](../../README.md) > [Guides](../README.md) > [Styling](./README.md) > Tailwind Config

This guide explains the Tailwind CSS 4 configuration and customization in the portfolio.

## Table of Contents

- [Overview](#overview)
- [Configuration File](#configuration-file)
- [Theme Customization](#theme-customization)
- [Dark Mode](#dark-mode)
- [Custom Utilities](#custom-utilities)
- [Best Practices](#best-practices)

## Overview

The portfolio uses **Tailwind CSS v4** with custom theme extensions for design consistency.

**Key features:**

- Dark mode support (`class` strategy)
- Custom color palette
- Extended spacing and border radius
- Custom animations
- CSS variables integration

## Configuration File

**Location:** `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
```

## Theme Customization

### Colors

**Using CSS variables:**

```css
/* app/globals.css */
:root {
  --primary: oklch(0.48 0.0813 198.19);
  --primary-foreground: #ffffff;
  --accent: #ffb900;
}

.dark {
  --primary: oklch(0.68 0.13 264.2);
  --primary-foreground: #f4f4f5;
  --accent: #ffd600;
}
```

**Usage in components:**

```typescript
// Uses CSS variable
<div className="bg-primary text-primary-foreground">
  Primary button
</div>

// Tailwind resolves to: hsl(var(--primary))
```

### Custom Colors

**Add new color:**

```typescript
// tailwind.config.ts
extend: {
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      // ... more shades
      900: '#0c4a6e',
    },
  },
}
```

**Usage:**

```typescript
<div className="bg-brand-500 text-brand-50">Custom color</div>
```

### Spacing

**Custom spacing values:**

```typescript
extend: {
  spacing: {
    '72': '18rem',
    '84': '21rem',
    '96': '24rem',
  },
}
```

**Usage:**

```typescript
<div className="mt-72 px-84">Large spacing</div>
```

### Typography

**Custom font sizes:**

```typescript
extend: {
  fontSize: {
    '2xs': '0.625rem',
    '3xl': '2rem',
  },
}
```

### Border Radius

**Using CSS variable:**

```css
:root {
  --radius: 0.65rem;
}
```

**Configuration:**

```typescript
extend: {
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
  },
}
```

**Usage:**

```typescript
<div className="rounded-lg">
  {/* Uses --radius */}
</div>
```

## Dark Mode

### Class Strategy

**Configuration:**

```typescript
// tailwind.config.ts
darkMode: 'class',
```

**Requires `dark` class on `<html>`:**

```typescript
<html className="dark">
  {/* Dark mode styles active */}
</html>
```

### Theme Toggle Implementation

```typescript
// components/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### Dark Mode Styles

**Using variant prefix:**

```typescript
<div className="
  bg-white text-black       // Light mode
  dark:bg-black dark:text-white  // Dark mode
">
  Content
</div>
```

**Best practice - use CSS variables:**

```typescript
// ✅ GOOD: Automatic dark mode
<div className="bg-background text-foreground">
  {/* Adapts to theme automatically */}
</div>

// ❌ BAD: Manual dark mode classes
<div className="bg-white text-black dark:bg-black dark:text-white">
  {/* More verbose */}
</div>
```

## Custom Utilities

### Adding Custom Utilities

**Via plugin:**

```typescript
// tailwind.config.ts
import plugin from "tailwindcss/plugin";

const config: Config = {
  // ... other config
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
```

**Usage:**

```typescript
<div className="scrollbar-hide overflow-auto">
  {/* Scrollable without scrollbar */}
</div>
```

### Custom Animations

**Define keyframes:**

```typescript
extend: {
  keyframes: {
    'fade-in': {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    'slide-in': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' },
    },
  },
  animation: {
    'fade-in': 'fade-in 0.5s ease-out',
    'slide-in': 'slide-in 0.3s ease-out',
  },
}
```

**Usage:**

```typescript
<div className="animate-fade-in">Fades in</div>
<div className="animate-slide-in">Slides in from left</div>
```

## Best Practices

### 1. Use CSS Variables

```typescript
// ✅ GOOD: CSS variables
extend: {
  colors: {
    primary: 'hsl(var(--primary))',
  },
}

// ❌ BAD: Hardcoded colors
extend: {
  colors: {
    primary: '#3b82f6',
  },
}
```

### 2. Extend, Don't Override

```typescript
// ✅ GOOD: Extend existing theme
extend: {
  colors: {
    brand: '#ff0000',
  },
}

// ❌ BAD: Override entire color palette
colors: {
  brand: '#ff0000',
  // Lost all default colors!
}
```

### 3. Use Semantic Names

```typescript
// ✅ GOOD: Semantic names
colors: {
  primary: 'hsl(var(--primary))',
  danger: 'hsl(var(--destructive))',
}

// ❌ BAD: Color-based names
colors: {
  blue: '#3b82f6',
  red: '#ef4444',
}
```

### 4. Content Configuration

**Include all files with classes:**

```typescript
content: [
  './app/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './lib/**/*.{ts,tsx}', // If classes in lib
],
```

### 5. Organize Extensions

```typescript
extend: {
  // Colors first
  colors: { /* ... */ },

  // Spacing
  spacing: { /* ... */ },

  // Typography
  fontSize: { /* ... */ },

  // Effects
  boxShadow: { /* ... */ },

  // Animations last
  keyframes: { /* ... */ },
  animation: { /* ... */ },
}
```

## See Also

- [shadcn/ui Setup](./02-shadcn-setup.md) - Component library
- [Responsive Design](./03-responsive-design.md) - Mobile-first patterns
- [Design System](./04-design-system.md) - Design tokens
- [Best Practices](../03-best-practices.md) - Code patterns

## Next Steps

- Review Tailwind configuration
- Customize theme colors
- Add custom utilities if needed
- Test dark mode
- Optimize for production

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
