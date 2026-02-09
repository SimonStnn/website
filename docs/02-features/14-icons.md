# Custom Icon System

**Navigation:** [Home](../README.md) → [Features & Components](./01-components-overview.md) → Custom Icons

## Table of Contents

- [Introduction](#introduction)
- [Icon Components](#icon-components)
- [Implementation Details](#implementation-details)
- [Usage Examples](#usage-examples)
- [Creating Custom Icons](#creating-custom-icons)
- [Best Practices](#best-practices)
- [See Also](#see-also)
- [Next Steps](#next-steps)

## Introduction

The **Custom Icon System** provides SVG icon components for social media platforms and common actions. These custom icons complement Lucide React icons and maintain consistent styling across the application.

### Available Icons

- **GitHubIcon**: GitHub logo
- **LinkedInIcon**: LinkedIn logo
- **FileDownloadIcon**: Download/resume icon

### Why Custom Icons?

1. **Brand Accuracy**: Official logo SVGs match brand guidelines
2. **Performance**: Inline SVGs load faster than images
3. **Styling Control**: Can be styled with CSS/Tailwind
4. **Accessibility**: Proper alt text and ARIA attributes
5. **Tree-Shaking**: Only used icons are included in bundle

## Icon Components

### Export Index

```typescript:1:3:components/icons/index.ts
export { GitHubIcon } from "./github-icon";
export { LinkedInIcon } from "./linkedin-icon";
export { FileDownloadIcon } from "./file-download-icon";
```

Centralized exports allow clean imports:

```typescript
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
```

## Implementation Details

### GitHubIcon Component

```typescript:1:22:components/icons/github-icon.tsx
import { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function GitHubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 98 96"
      className={cn("size-full", className)}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  );
}

export default GitHubIcon;
```

### Icon Pattern

All custom icon components follow this pattern:

```typescript
import { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function IconName({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="..." // Original viewBox
      className={cn("size-full", className)}  // Default + custom classes
      {...props}  // Spread remaining SVG props
    >
      {/* SVG path data */}
    </svg>
  );
}

export default IconName;
```

### Key Features

1. **TypeScript Props**: Accepts all standard SVG props
2. **className Merging**: Uses `cn()` to merge classes
3. **Default Sizing**: `size-full` makes icon fill parent
4. **currentColor**: `fill="currentColor"` inherits text color
5. **Accessible**: Can add `aria-label` and `role` via props

## Usage Examples

### Basic Icon

```typescript
import { GitHubIcon } from "@/components/icons";

<GitHubIcon className="h-6 w-6" />
```

### With Custom Color

```typescript
<GitHubIcon className="h-8 w-8 text-blue-500" />
```

The icon uses `fill="currentColor"`, so `text-*` classes control the color.

### In Social Link

```typescript
import { GitHubIcon } from "@/components/icons";
import SocialLink from "@/components/social-link";

<SocialLink
  href="https://github.com/username"
  ariaLabel="GitHub Profile"
  icon={GitHubIcon}
/>
```

### Hover Effects

```typescript
<GitHubIcon className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
```

### Responsive Sizing

```typescript
<GitHubIcon className="h-5 w-5 md:h-6 md:w-6" />
```

### With ARIA Label

```typescript
<GitHubIcon
  className="h-6 w-6"
  aria-label="GitHub"
  role="img"
/>
```

### Inline with Text

```typescript
<a href="https://github.com/username" className="flex items-center gap-2">
  <GitHubIcon className="h-5 w-5" />
  <span>View on GitHub</span>
</a>
```

## Creating Custom Icons

### Step 1: Obtain SVG

Get official brand SVG from:

- [Simple Icons](https://simpleicons.org/) - Brand logos
- [SVG Repo](https://www.svgrepo.com/) - Open source SVGs
- Official brand press kits

### Step 2: Create Component File

```typescript
// components/icons/twitter-icon.tsx
import { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function TwitterIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("size-full", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
      />
    </svg>
  );
}

export default TwitterIcon;
```

### Step 3: Update Index

```typescript
// components/icons/index.ts
export { GitHubIcon } from "./github-icon";
export { LinkedInIcon } from "./linkedin-icon";
export { FileDownloadIcon } from "./file-download-icon";
export { TwitterIcon } from "./twitter-icon"; // Add new icon
```

### Step 4: Use Icon

```typescript
import { TwitterIcon } from "@/components/icons";

<TwitterIcon className="h-6 w-6" />
```

## Best Practices

### Sizing

{% raw %}

```typescript
// ✅ Good - Use Tailwind size classes
<GitHubIcon className="h-6 w-6" />
<GitHubIcon className="size-8" />

// ❌ Avoid - Inline styles
<GitHubIcon style={{ width: '24px', height: '24px' }} />
```

{% endraw %}

### Coloring

```typescript
// ✅ Good - Use text color (works with currentColor)
<GitHubIcon className="text-primary" />
<GitHubIcon className="text-blue-500 hover:text-blue-600" />

// ❌ Avoid - fill attribute (overrides currentColor)
<GitHubIcon fill="#3b82f6" />
```

### Accessibility

```typescript
// ✅ Good - Decorative icon (in link with text)
<a href="...">
  <GitHubIcon className="h-5 w-5" aria-hidden="true" />
  <span>GitHub</span>
</a>

// ✅ Good - Standalone icon (needs label)
<button>
  <GitHubIcon className="h-5 w-5" aria-label="GitHub" role="img" />
</button>

// ❌ Avoid - No context
<GitHubIcon className="h-5 w-5" />
```

### Performance

```typescript
// ✅ Good - Import only needed icons
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

// ❌ Avoid - Import entire index (larger bundle)
import * as Icons from "@/components/icons";
```

### Naming

```typescript
// ✅ Good - Descriptive, suffixed with "Icon"
GitHubIcon;
LinkedInIcon;
TwitterIcon;

// ❌ Avoid - Vague names
GitHub;
Logo;
Social;
```

## See Also

- [Lucide React](https://lucide.dev/) - Icon library for general icons
- [Simple Icons](https://simpleicons.org/) - Brand SVG source
- [Social Link Component](./12-social-utilities.md#sociallink-component) - Usage with social links
- [SVG Optimization](https://jakearchibald.github.io/svgomg/) - SVGO web tool

## Next Steps

1. **Icon Library Expansion**: Add more social platform icons
2. **Animated Icons**: Add hover animations with CSS/GSAP
3. **Icon Sprite Sheet**: Combine into SVG sprite for better caching
4. **Icon Generator**: Script to automate icon component creation
5. **Duotone Icons**: Support two-color icons
6. **Icon Documentation**: Create visual icon catalog page

---

**Last Updated:** 2024-02-09  
**Related Docs:** [Components](./01-components-overview.md) | [Social Utilities](./12-social-utilities.md) | [Footer](./13-layout-components.md)
