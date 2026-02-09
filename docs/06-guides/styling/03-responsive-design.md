# Responsive Design Patterns

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [Styling](./index.md) > Responsive Design

This guide covers mobile-first responsive design patterns used in the portfolio.

## Breakpoints

Tailwind CSS breakpoints:

| Prefix | Min Width | Target         |
| ------ | --------- | -------------- |
| `sm:`  | 640px     | Small tablets  |
| `md:`  | 768px     | Tablets        |
| `lg:`  | 1024px    | Laptops        |
| `xl:`  | 1280px    | Desktops       |
| `2xl:` | 1536px    | Large desktops |

## Mobile-First Approach

```typescript
// ✅ GOOD: Mobile-first
<div className="
  flex flex-col gap-4      // Mobile: vertical
  md:flex-row md:gap-6     // Tablet: horizontal
  lg:gap-8                 // Desktop: larger gaps
">

// ❌ BAD: Desktop-first
<div className="
  flex-row gap-8           // Assumes desktop
  md:flex-col md:gap-4     // Has to override for mobile
">
```

## Common Patterns

### Grid Layouts

```typescript
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

### Responsive Padding

```typescript
<div className="p-4 md:p-6 lg:p-8">
  {/* Increases padding on larger screens */}
</div>
```

### Responsive Text

```typescript
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  {/* Scales with screen size */}
</h1>
```

### Hide/Show Elements

```typescript
// Show only on mobile
<div className="block md:hidden">Mobile only</div>

// Hide on mobile
<div className="hidden md:block">Desktop only</div>
```

## Testing

**Chrome DevTools:**

1. Press F12
2. Click device toggle icon
3. Test different screen sizes

## See Also

- [Tailwind Config](./01-tailwind-config.md)
- [Best Practices](../03-best-practices.md)

---

**Last Updated:** February 2026
