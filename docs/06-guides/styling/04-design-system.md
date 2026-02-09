# Design System & Design Tokens

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [Styling](./index.md) > Design System

This guide documents the design system tokens and patterns.

## Color System

### Primary Colors

**Light mode:**

- Primary: `oklch(0.48 0.0813 198.19)` - Blue
- Accent: `#ffb900` - Yellow

**Dark mode:**

- Primary: `oklch(0.68 0.13 264.2)` - Purple
- Accent: `#ffd600` - Bright yellow

### Semantic Colors

```css
:root {
  --background: #f8f8f8;
  --foreground: #09090b;
  --muted: oklch(0.63 0.107 198.81);
  --border: oklch(0.92 0.004 286.32);
}
```

## Typography

### Font Families

- **Sans:** Domine (serif for uniqueness)
- **Mono:** Geist Mono

### Font Scales

```typescript
text-xs    // 0.75rem
text-sm    // 0.875rem
text-base  // 1rem
text-lg    // 1.125rem
text-xl    // 1.25rem
text-2xl   // 1.5rem
text-3xl   // 1.875rem
text-4xl   // 2.25rem
```

## Spacing

```typescript
gap - 4; // 1rem (16px)
gap - 6; // 1.5rem (24px)
gap - 8; // 2rem (32px)
p - 4; // 1rem padding
p - 6; // 1.5rem padding
p - 8; // 2rem padding
```

## Border Radius

```css
--radius: 0.65rem;
```

```typescript
rounded - sm; // calc(--radius - 4px)
rounded - md; // calc(--radius - 2px)
rounded - lg; // var(--radius)
```

## Shadows

```typescript
shadow - sm; // Small shadow
shadow; // Medium shadow
shadow - lg; // Large shadow
```

## Component Patterns

### Cards

```typescript
<Card className="p-6">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Buttons

```typescript
<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>
```

## See Also

- [Tailwind Config](./01-tailwind-config.md)
- [shadcn/ui Setup](./02-shadcn-setup.md)

---

**Last Updated:** February 2026
