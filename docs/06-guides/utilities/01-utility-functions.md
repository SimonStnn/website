# Utility Functions

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [Utilities](./index.md) > Utility Functions

This guide documents the utility functions in `lib/utils.ts`.

## Available Utilities

### cn()

**Purpose:** Merge Tailwind CSS classes with conflict resolution.

**Signature:**

```typescript
function cn(...inputs: ClassValue[]): string;
```

**Usage:**

```typescript
import { cn } from '@/lib/utils';

// Basic usage
cn('px-4 py-2', 'rounded-lg'); // "px-4 py-2 rounded-lg"

// Conditional classes
cn('base-class', isActive && 'active-class', isDisabled && 'disabled-class');

// Override classes (last wins)
cn('px-4', 'px-6'); // "px-6"

// In components
<div className={cn('default-classes', className)}>
```

**How it works:**

1. Uses `clsx` for conditional classes
2. Uses `tailwind-merge` to resolve conflicts
3. Returns single class string

**Example in component:**

```typescript
interface ButtonProps {
  variant?: 'default' | 'outline';
  className?: string;
}

export function Button({ variant = 'default', className }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 font-medium transition-colors',
        variant === 'default' && 'bg-primary text-primary-foreground',
        variant === 'outline' && 'border border-primary',
        className // Allow override from props
      )}
    >
      {children}
    </button>
  );
}
```

### isVideoFile()

**Purpose:** Check if a file path is a video file.

**Signature:**

```typescript
function isVideoFile(src: string): boolean;
```

**Supported formats:**

- `.mp4`
- `.webm`
- `.mov`

**Usage:**

```typescript
import { isVideoFile } from '@/lib/utils';

// Filter videos from project images
const images = project.images.filter((img) => !isVideoFile(img.src));
const videos = project.images.filter((img) => isVideoFile(img.src));

// Conditional rendering
{
  isVideoFile(src) ? (
    <video src={src} controls />
  ) : (
    <Image src={src} alt={alt} width={800} height={600} />
  );
}
```

**Implementation:**

```typescript
export function isVideoFile(src: string): boolean {
  return (
    src.toLowerCase().endsWith(".mp4") ||
    src.toLowerCase().endsWith(".webm") ||
    src.toLowerCase().endsWith(".mov")
  );
}
```

## Implementation

**File:** `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isVideoFile(src: string): boolean {
  return (
    src.toLowerCase().endsWith(".mp4") ||
    src.toLowerCase().endsWith(".webm") ||
    src.toLowerCase().endsWith(".mov")
  );
}
```

## Adding Custom Utilities

**Example: Format date:**

```typescript
// lib/utils.ts
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Usage
formatDate("2024-02-09"); // "February 9, 2024"
```

**Example: Truncate text:**

```typescript
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

// Usage
truncate("Long description here", 50);
```

## Testing Utilities

```typescript
// lib/__tests__/utils.test.ts
import { cn, isVideoFile } from "@/lib/utils";

describe("cn", () => {
  it("should merge classes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("should handle conflicts", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("isVideoFile", () => {
  it("should detect video files", () => {
    expect(isVideoFile("video.mp4")).toBe(true);
    expect(isVideoFile("image.jpg")).toBe(false);
  });
});
```

## See Also

- [Config Library](./02-config-library.md)
- [Helper Functions](./03-helper-functions.md)
- [Best Practices](../03-best-practices.md)

---

**Last Updated:** February 2026
