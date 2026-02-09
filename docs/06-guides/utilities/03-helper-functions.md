# Helper Functions

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [Utilities](./index.md) > Helper Functions

This guide documents additional helper functions throughout the codebase.

## Project Helpers

### generateSkillId()

**Location:** `lib/skills.ts`

**Purpose:** Generate URL-safe slug from skill name.

**Signature:**

```typescript
function generateSkillId(skillName: string): string;
```

**Usage:**

```typescript
import { generateSkillId } from "@/lib/skills";

generateSkillId("Next.js"); // "nextjs"
generateSkillId("C++"); // "c"
generateSkillId("React Native"); // "react-native"
```

**Implementation:**

```typescript
export function generateSkillId(skillName: string): string {
  return skillName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}
```

## Data Access Helpers

### getProjects()

**Location:** `lib/projects.ts`

**Purpose:** Fetch all projects, sorted by order.

```typescript
const projects = await getProjects();
```

### getProjectBySlug()

**Location:** `lib/projects.ts`

**Purpose:** Fetch single project by slug.

```typescript
const project = await getProjectBySlug("my-project");
```

### getFeaturedProjects()

**Location:** `lib/projects.ts`

**Purpose:** Get projects with order 1-6.

```typescript
const featured = await getFeaturedProjects();
```

### getSkills()

**Location:** `lib/skills.ts`

**Purpose:** Generate skills from project technologies.

```typescript
const skills = await getSkills();
// Returns: Skill[] with { id, name, projects: Project[] }
```

### getAchievements()

**Location:** `lib/achievements.ts`

**Purpose:** Fetch all achievements.

```typescript
const achievements = await getAchievements();
```

## Custom Helpers

Add your own helpers as needed:

```typescript
// lib/helpers.ts

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const group = String(item[key]);
      result[group] = result[group] || [];
      result[group].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}
```

## See Also

- [Utility Functions](./01-utility-functions.md)
- [Config Library](./02-config-library.md)
- [Best Practices](../03-best-practices.md)

---

**Last Updated:** February 2026
