# Custom Components Deep Dive

**Navigation:** [Home](../README.md) → [Features & Components](./01-components-overview.md) → Custom Components

## Table of Contents

- [Introduction](#introduction)
- [Project Card Component](#project-card-component)
- [Achievement Card Component](#achievement-card-component)
- [Skills Data Table Component](#skills-data-table-component)
- [Badge Overflow Component](#badge-overflow-component)
- [Related Projects Component](#related-projects-component)
- [Timeline Component](#timeline-component)
- [Theme Toggle Component](#theme-toggle-component)
- [Social Link Component](#social-link-component)
- [Email Copy Button Component](#email-copy-button-component)
- [Copyright Component](#copyright-component)
- [Component Patterns](#component-patterns)
- [See Also](#see-also)
- [Next Steps](#next-steps)

## Introduction

Custom components are purpose-built for this portfolio website, handling domain-specific business logic, data presentation, and user interactions. Each component is designed with reusability, type safety, and accessibility in mind.

## Project Card Component

**File:** `components/project-card.tsx`  
**Type:** Server Component  
**Purpose:** Display project summaries on the homepage and projects listing page

### Features

- Responsive image display with Next.js Image optimization
- Automatic video filtering from images
- Technology badge overflow handling
- Hover effects with gradient backgrounds
- Direct navigation to project detail pages

### Implementation

```typescript:1:65:components/project-card.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/projects";
import BadgeOverflow from "@/components/badge-overflow";
import { isVideoFile } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Get first image that isn't a video
  const heroimg = project.images.filter((p) => !isVideoFile(p.src))[0];

  return (
    <Card className="group overflow-hidden pt-0">
      <CardHeader
        className={cn(
          "from-accent via-muted to-primary bg-gradient-to-br",
          "flex h-48 items-center justify-center px-1 pt-1",
          "text-muted-foreground",
          "transition-all group-hover:p-0"
        )}
      >
        {project.images && project.images.length > 0 && heroimg ? (
          <Image
            src={heroimg.src}
            alt={heroimg.alt}
            width={400}
            height={225}
            className="bg-muted/60 h-full w-full rounded-t-md object-cover transition-all group-hover:rounded-t-lg"
          />
        ) : (
          <div className="bg-muted/60 flex h-full w-full items-center justify-center rounded-t-md transition-all group-hover:rounded-t-lg">
            [Project Image]
          </div>
        )}
      </CardHeader>
      <CardContent className="grow">
        <CardTitle className="mb-1 text-lg">{project.title}</CardTitle>
        <CardDescription title={project.shortDescription}>
          {project.shortDescription}
        </CardDescription>
      </CardContent>
      <CardContent className="-my-2">
        <BadgeOverflow technologies={project.technologies} />
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm" className="w-full" asChild>
          <Link href={`/projects/${project.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Key Design Decisions

1. **Video Filtering**: Uses `isVideoFile()` utility to exclude videos from card hero images
2. **Gradient Background**: Three-color gradient (`accent → muted → primary`) for visual appeal
3. **Hover Effects**: Padding and border radius transitions on group hover
4. **Badge Integration**: Delegates technology display to `BadgeOverflow` component
5. **Image Optimization**: Next.js `Image` component with explicit dimensions

### Usage Example

```typescript
import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/project-card";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
```

**See:** [Badge Overflow](./08-badge-overflow.md) for technology badge handling

---

## Achievement Card Component

**File:** `components/achievement-card.tsx`  
**Type:** Client Component  
**Purpose:** Display achievements, certifications, and awards with expandable details

### Features

- Modal dialog for detailed views
- Type-based color coding (certification, award, achievement)
- Issuer logo display
- External certificate links
- Smart date formatting

### Implementation

```typescript:1:66:components/achievement-card.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Award, Trophy, Calendar, ExternalLink, FileBadge, Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Achievement } from "@/lib/achievements";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  achievement: Achievement;
}

const getTypeColor = (type: Achievement["type"]) => {
  switch (type) {
    case "certification":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "award":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "achievement":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getTypeIcon = (type: Achievement["type"]) => {
  switch (type) {
    case "certification":
      return <FileBadge className="h-4 w-4" />;
    case "award":
      return <Award className="h-4 w-4" />;
    case "achievement":
      return <Trophy className="h-4 w-4" />;
    default:
      return <Award className="h-4 w-4" />;
  }
};

export function AchievementBadge({ achievement }: AchievementCardProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(getTypeColor(achievement.type), "capitalize select-none")}
    >
      {getTypeIcon(achievement.type)}
      {achievement.type}
    </Badge>
  );
}
```

### Type-Based Styling

The component uses helper functions to dynamically style badges based on achievement type:

| Type            | Icon      | Colors (Light) | Colors (Dark)  |
| --------------- | --------- | -------------- | -------------- |
| `certification` | FileBadge | Blue 100/800   | Blue 900/200   |
| `award`         | Award     | Yellow 100/800 | Yellow 900/200 |
| `achievement`   | Trophy    | Green 100/800  | Green 900/200  |

### Dialog Integration

```typescript:70:120:components/achievement-card.tsx
export default function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative cursor-pointer gap-2.5 transition-all hover:shadow-lg">
          <CardHeader className="grid-rows-1 gap-0">
            <CardAction className="text-muted-foreground flex flex-row-reverse justify-baseline gap-2 text-sm select-none">
              <span className="flex flex-nowrap items-center gap-1">
                <Calendar className="size-4" />
                {achievement.date}
              </span>
              {achievement.link && (
                <Button variant="link" asChild>
                  <Link
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary h-auto justify-start !gap-1 !p-0 text-sm leading-tight transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="size-4" />
                    Cert
                  </Link>
                </Button>
              )}
            </CardAction>
            <AchievementBadge achievement={achievement} />
          </CardHeader>
          <CardContent className="flex gap-2">
            {achievement.image && (
              <Image
                src={achievement.image.src}
                alt={achievement.image.alt}
                width={40}
                height={40}
                className="border-secondary size-10 rounded-full border object-contain p-0.5"
              />
            )}
            <div>
              <CardTitle className="line-clamp-1 text-lg leading-tight text-pretty">
                {achievement.title}
              </CardTitle>
              <CardDescription className="text-primary line-clamp-1 font-medium">
                {achievement.issuer}
              </CardDescription>
            </div>
          </CardContent>
          <Button variant="ghost" className="absolute right-1 bottom-1 opacity-30 dark:opacity-70">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {/* Dialog content with full details */}
      </DialogContent>
    </Dialog>
  );
}
```

### Accessibility Features

- Semantic HTML with proper heading hierarchy
- Screen reader-friendly icon labels
- Keyboard navigation support (dialog)
- Focus management (dialog trap)
- ARIA attributes for expandable content

**See:** [Achievement Cards & Dialogs](./06-achievements.md) for full documentation

---

## Skills Data Table Component

**File:** `components/skills-data-table.tsx`  
**Type:** Client Component  
**Purpose:** Interactive table displaying skills with associated projects

### Features

- Sortable columns (skill name, project count)
- Search/filter functionality
- Pagination (10 rows per page)
- Column visibility toggles
- Dropdown menu for project links
- Featured vs. non-featured project grouping

### Implementation Overview

```typescript:1:40:components/skills-data-table.tsx
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ExternalLink, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skill } from "@/lib/skills";
import Link from "next/link";
import { Project } from "@/lib/projects";
```

### Column Definitions

The table uses TanStack React Table with custom column definitions:

```typescript:42:87:components/skills-data-table.tsx
export const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-card-foreground !px-0"
        >
          Skill
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "projects",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-card-foreground !px-0"
        >
          Projects
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const projects = row.getValue("projects") as Project[];

      return (
        <Badge variant="outline">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </Badge>
      );
    },
    sortingFn: (rowA, rowB) => {
      const projectsA = rowA.getValue("projects") as Project[];
      const projectsB = rowB.getValue("projects") as Project[];
      return projectsA.length - projectsB.length;
    },
  },
  // ... actions column
];
```

### Table State Management

```typescript:161:189:components/skills-data-table.tsx
export function SkillsDataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "projects", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10, // Show 10 skills per page
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  // ... render table
}
```

**See:** [Skills Table Documentation](./04-skills-table.md) for complete implementation details

---

## Badge Overflow Component

**File:** `components/badge-overflow.tsx`  
**Type:** Client Component  
**Purpose:** Dynamically display technology badges with overflow detection

### Features

- Automatic overflow calculation
- Responsive design (adjusts on window resize)
- Tooltip showing hidden badges
- Performance-optimized with `requestAnimationFrame`
- Graceful degradation

### Core Algorithm

```typescript:18:62:components/badge-overflow.tsx
  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !countRef.current) return;

      // Reset badge visibility
      const badges = containerRef.current.querySelectorAll("li[data-tech]");
      badges.forEach((badge) => ((badge as HTMLElement).style.display = "inline-block"));

      // Hide count badge initially
      countRef.current.style.display = "none";

      // Measure container
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const hidden: string[] = [];

      // Calculate which badges fit
      let currentWidth = 0;
      badges.forEach((badge, i) => {
        const badgeWidth = badge.getBoundingClientRect().width + 8; // 8px for gap
        const tech = technologies[i];

        // Check if this badge would overflow (reserve 60px for count badge)
        if (currentWidth + badgeWidth > containerWidth - 60) {
          (badge as HTMLElement).style.display = "none";
          hidden.push(tech);
        } else {
          currentWidth += badgeWidth;
        }
      });

      // Update hidden techs and count badge
      setHiddenTechs(hidden);

      if (hidden.length > 0) {
        countRef.current.textContent = `+${hidden.length} more`;
        countRef.current.style.display = "inline";
      }
    };

    // Run after DOM update
    requestAnimationFrame(checkOverflow);
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [technologies]);
```

**See:** [Badge Overflow Detection](./08-badge-overflow.md) for algorithm deep dive

---

## Related Projects Component

**File:** `components/related-projects.tsx`  
**Type:** Server Component  
**Purpose:** Suggest related projects based on shared technologies

### Algorithm

```typescript:21:28:components/related-projects.tsx
  // Find projects that share at least one technology with the current project
  const relatedProjects = allProjects
    .filter(
      (project) =>
        project.slug !== currentProject.slug && // Exclude current project
        project.technologies.some((tech) => currentProject.technologies.includes(tech))
    )
    .slice(0, maxProjects);
```

The algorithm:

1. Excludes the current project
2. Filters projects sharing at least one technology
3. Limits results to `maxProjects` (default: 3)
4. Returns `null` if no matches found

**See:** [Related Projects Algorithm](./07-related-projects.md) with flowchart

---

## Timeline Component

**File:** `components/timeline.tsx`  
**Type:** Client Component  
**Purpose:** Display professional experience timeline with smart date formatting

### Smart Date Feature

```typescript:24:47:components/timeline.tsx
function formatDateRange(year: string): string {
  // Handle date ranges like "Jan. 2026 - Jun. 2026"
  if (year.includes(" - ")) {
    const [start, end] = year.split(" - ").map((s) => s.trim());

    // Parse end date to check if it's in the future
    // Create a proper date from "Mon. YYYY" format for cross-browser compatibility
    const monthYearRegex = /([A-Za-z]+)\.\s(\d{4})/;
    const match = end.match(monthYearRegex);

    if (match) {
      const [, monthStr, yearStr] = match;
      // Create date with the first day of the month to ensure it's valid
      const endDate = new Date(`${monthStr} 1, ${yearStr}`);
      const today = new Date();

      // If end date is in the future, replace with "Present"
      if (endDate > today) {
        return `${start} - Present`;
      }
    }
  }
  return year;
}
```

This feature automatically replaces future end dates with "Present" for ongoing positions.

**See:** [Timeline Component](./10-timeline.md) for complete documentation

---

## Theme Toggle Component

**File:** `components/theme-toggle.tsx`  
**Type:** Client Component  
**Purpose:** Switch between light, dark, and system themes

### Theme Management

Uses `next-themes` for theme persistence:

```typescript:15:54:components/theme-toggle.tsx
export function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder button until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                className="text-primary-foreground/80 hover:text-primary-foreground"
              >
                <Monitor className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change theme</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="flex-1">System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  // ... mounted UI
}
```

**See:** [Theme System](./09-theme-system.md) for dark mode implementation

---

## Social Link Component

**File:** `components/social-link.tsx`  
**Type:** Server Component  
**Purpose:** Flexible social media link component

### Flexibility

Supports multiple rendering modes:

1. **Icon Component**: Pass a React component
2. **Image Source**: Pass an image path
3. **Text Label**: Display text only
4. **Children**: Fully custom content

```typescript:22:66:components/social-link.tsx
export default function SocialLink({
  href,
  ariaLabel,
  className,
  children,
  icon: Icon,
  imgSrc,
  imgAlt,
  imgWidth = 32,
  imgHeight = 32,
  label,
}: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn("hover:text-primary transition-colors", className)}
    >
      {/* If children are provided, render them directly */}
      {children || (
        <>
          {/* Render icon if provided */}
          {Icon && <Icon className="size-6" />}

          {/* Render image if provided and no icon */}
          {!Icon && imgSrc && (
            <Image
              src={imgSrc}
              alt={imgAlt || ariaLabel}
              width={imgWidth}
              height={imgHeight}
              className="size-6"
            />
          )}

          {label && <span>{label}</span>}

          {!Icon && !imgSrc && !label && ariaLabel}
        </>
      )}
    </Link>
  );
}
```

**See:** [Social Utilities](./12-social-utilities.md)

---

## Email Copy Button Component

**File:** `components/email-copy-button.tsx`  
**Type:** Client Component  
**Purpose:** Copy email to clipboard with visual feedback

### Implementation

```typescript:14:37:components/email-copy-button.tsx
export function EmailCopyButton({ className }: EmailCopyButtonProps) {
  const [tooltipContent, setTooltipContent] = React.useState("Copy Email");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.author.email);
    setTooltipContent("Email Copied!");
    setTimeout(() => {
      setTooltipContent("Copy Email");
    }, 2000); // Reset tooltip after 2 seconds
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" onClick={handleCopyEmail} className={cn("", className)}>
          <Copy className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
}
```

---

## Copyright Component

**File:** `components/copyright.tsx`  
**Type:** Client Component  
**Purpose:** Display dynamic copyright notice

### Auto-Updating Year

```typescript:9:19:components/copyright.tsx
export default function Copyright({ className }: CopyrightProps) {
  return (
    <p
      className={
        className ?? "text-primary-foreground/80 mx-auto py-6 text-center text-sm md:text-base"
      }
    >
      &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
    </p>
  );
}
```

Uses `new Date().getFullYear()` to always display the current year.

---

## Component Patterns

### Common Patterns Across Components

1. **Type Safety**: All props use TypeScript interfaces
2. **Utility Classes**: `cn()` utility for conditional Tailwind classes
3. **Configuration**: `siteConfig` for centralized settings
4. **Client Directives**: Explicit `"use client"` when needed
5. **Accessibility**: ARIA labels, semantic HTML, keyboard support

### Styling Patterns

```typescript
// Conditional classes with cn()
className={cn(
  "base-classes",
  condition && "conditional-classes",
  className  // Allow prop overrides
)}

// Gradient patterns
className="from-accent via-muted to-primary bg-gradient-to-br"

// Responsive utilities
className="flex flex-col md:flex-row lg:grid-cols-3"
```

## See Also

- [Components Overview](./01-components-overview.md) - Architecture overview
- [Skills Table](./04-skills-table.md) - Detailed table documentation
- [Badge Overflow](./08-badge-overflow.md) - Overflow algorithm
- [Theme System](./09-theme-system.md) - Dark mode details

## Next Steps

1. **Implement Similar Components**: Use these patterns for new components
2. **Customize Styling**: Modify Tailwind classes for your design
3. **Add Features**: Extend components with additional functionality
4. **Write Tests**: See test files in `tests/components/` for examples

---

**Last Updated:** 2024-02-09  
**Related Docs:** [Component Overview](./01-components-overview.md) | [UI Components](./03-shadcn-ui.md) | [Testing](../03-testing/01-overview.md)
