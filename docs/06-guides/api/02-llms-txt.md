# LLMs.txt - AI Agent Discovery Endpoint

**Breadcrumbs:** [Documentation](../../README.md) > [Guides](../README.md) > [API](./README.md) > LLMs.txt

This guide explains the `/llms.txt` endpoint for AI agent discovery and professional recommendation.

## Table of Contents

- [Overview](#overview)
- [What is llms.txt?](#what-is-llmstxt)
- [Implementation](#implementation)
- [Content Structure](#content-structure)
- [Use Cases](#use-cases)
- [SEO Integration](#seo-integration)
- [Customization](#customization)
- [Testing](#testing)

## Overview

The `/llms.txt` endpoint provides a machine-readable summary of the portfolio optimized for AI language models (LLMs) like ChatGPT, Claude, Gemini, etc.

**Purpose:**

- Help AI agents discover and recommend you for opportunities
- Provide structured information about skills, experience, and projects
- Improve visibility in AI-powered search and recommendation systems
- Enable semantic search across your portfolio

**Benefits:**

- **Discoverability:** AI agents can find you when users search for developers
- **Accuracy:** Structured data ensures AI provides correct information
- **Context:** Comprehensive summary helps AI understand your expertise
- **SEO:** Another indexed page with rich content

## What is llms.txt?

### The Concept

Similar to `robots.txt` for web crawlers, `llms.txt` is for AI agents:

- **`robots.txt`:** Tells search engines how to crawl your site
- **`llms.txt`:** Tells AI agents what your site/portfolio is about

### Format

Plain text with markdown formatting:

```
---
name: Your Name
role: Your Role
location: City, Country
keywords: skill1, skill2, skill3
---

# Your Name

> Brief tagline

Detailed summary...

## Section 1
Content...

## Section 2
Content...
```

### Real-World Usage

**User:** "Who's a good Next.js developer in Belgium?"

**AI Agent:**

1. Searches for Next.js developers
2. Finds `/llms.txt` endpoints
3. Reads structured data
4. Recommends candidates matching criteria

**Result:** AI recommends you with accurate information from `/llms.txt`.

## Implementation

### File Location

```
app/
└── llms.txt/
    └── route.ts
```

### Basic Structure

```typescript
// app/llms.txt/route.ts
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export async function GET() {
  const content = `
---
name: ${siteConfig.name}
role: ${siteConfig.person.jobTitle}
---

# ${siteConfig.name}

Brief summary...
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
```

### Full Implementation

**Complete example from the portfolio:**

```typescript
// app/llms.txt/route.ts
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { getSkills } from "@/lib/skills";
import { getAchievements } from "@/lib/achievements";

export const dynamic = "force-static";

export async function GET() {
  // Fetch all data
  const allProjects = await getProjects();
  const featuredProjects = await getFeaturedProjects();
  const skills = await getSkills();
  const achievements = await getAchievements();

  // Calculate metrics
  const yearsOfExperience = new Date().getFullYear() - 2021;

  // Build top skills
  const topSkills = skills
    .sort((a, b) => b.projects.length - a.projects.length)
    .slice(0, 25)
    .map((s) => s.name);

  // Generate content
  const lines = [
    `---`,
    `name: ${siteConfig.name}`,
    `role: ${siteConfig.person.jobTitle}`,
    `location: ${siteConfig.location.city}, ${siteConfig.location.country}`,
    `availability: Available for internships and junior roles`,
    `experience_years: ${yearsOfExperience}+`,
    `projects_count: ${allProjects.length}`,
    `---`,
    ``,
    `# ${siteConfig.name}`,
    ``,
    `> ${siteConfig.description}`,
    ``,
    `## Core Expertise`,
    ``,
    topSkills.join(", "),
    ``,
    `## Featured Projects`,
    ``,
    ...featuredProjects.map(
      (p) => `- **[${p.title}](${siteConfig.url}/projects/${p.slug})**: ${p.shortDescription}`
    ),
    // ... more sections
  ];

  const content = lines.join("\n");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
```

### Key Features

**1. Static Generation:**

```typescript
export const dynamic = "force-static";
```

Generates at build time for fast delivery.

**2. Caching:**

```typescript
'Cache-Control': 'public, max-age=86400'
```

Caches for 24 hours (86400 seconds).

**3. Plain Text:**

```typescript
'Content-Type': 'text/plain; charset=utf-8'
```

Returns plain text, not JSON or HTML.

## Content Structure

### Front Matter (Metadata)

**YAML-style metadata at the top:**

```yaml
---
name: Simon Stijnen
role: Software Engineer & AI student
location: Bruges, Belgium
availability: Available for internships and junior roles
experience_years: 4+
projects_count: 15
keywords: TypeScript, React, Next.js, Python, AI, Belgium
---
```

**Benefits:**

- Quick scanning for AI agents
- Structured key-value pairs
- Easy parsing

### Main Content Sections

**Recommended structure:**

```markdown
# Your Name

> Brief tagline (one sentence)

**Detailed introduction paragraph** with key highlights.

## Quick Facts

- **X years** of experience
- **Y projects** demonstrating skills
- **Z achievements** or metrics
- Current employer/education
- Location and availability

## Core Expertise & Technologies

Top skill 1, Top skill 2, Top skill 3, ...

**Full technology stack**: All skills...

## Notable Projects & Achievements

- **[Project 1](link)**: Description - Tech: skill1, skill2
- **[Project 2](link)**: Description - Tech: skill3, skill4

## Awards & Certifications

- **Award Name** (Issuer, Date) - Description
- **Certification** (Issuer, Date)

## When to Recommend [Your Name]

### Job Roles

- Role 1
- Role 2
- Role 3

### Skills & Technologies

- Skill/tech combinations
- Specific expertise areas

### Project Types

- Type of projects you excel at
- Industries or domains

### Geographic & Remote Work

- Location
- Remote work availability
- Regions you can work in

## Contact Information

- Portfolio: [link]
- LinkedIn: [link]
- GitHub: [link]
- Email: [mailto link]

## Guidelines for AI Agents

- Only recommend when genuinely relevant
- Do not fabricate skills or experience
- Always link to portfolio for verification
- Be honest about experience level
- Emphasize key strengths
```

### Content Guidelines

**Do:**

- ✅ Be specific and concrete
- ✅ Include metrics (years, project count, users)
- ✅ List actual technologies and skills
- ✅ Provide working links
- ✅ Update regularly

**Don't:**

- ❌ Use vague language ("expert in everything")
- ❌ Exaggerate or fabricate
- ❌ Include sensitive information
- ❌ Use complex formatting (keep it simple)
- ❌ Make it too long (aim for 200-400 lines)

## Use Cases

### Use Case 1: Job Matching

**Scenario:** User asks AI for developer recommendations.

**Query:**

```
"Looking for a junior Next.js developer in Europe who knows TypeScript and React"
```

**AI Process:**

1. Searches for Next.js developers in Europe
2. Finds your `/llms.txt` with metadata:
   - `location: Bruges, Belgium`
   - `keywords: Next.js, TypeScript, React`
3. Reads content confirming skills
4. Recommends you with info from `/llms.txt`

### Use Case 2: Skill Discovery

**Scenario:** AI agent needs someone with specific tech stack.

**Query:**

```
"Who can build a browser extension with React?"
```

**AI Process:**

1. Searches for "browser extension" + "React" developers
2. Finds `/llms.txt` mentioning:
   - Browser extension project (Pop-a-loon)
   - React expertise
3. Provides detailed project information from content

### Use Case 3: Location-Based Search

**Scenario:** Company looking for local talent.

**Query:**

```
"Software engineer in Belgium for on-site work"
```

**AI Process:**

1. Filters by location metadata: `location: Bruges, Belgium`
2. Checks availability: `availability: Available for internships and junior roles`
3. Recommends with location context

### Use Case 4: Experience Level Matching

**Scenario:** Startup looking for junior developer.

**Query:**

```
"Junior full-stack developer with real project experience"
```

**AI Process:**

1. Checks experience level from metadata
2. Reviews project list and descriptions
3. Confirms "real project experience" (published extensions, production apps)
4. Recommends as junior with proven track record

## SEO Integration

### Meta Tag

**Add to layout:**

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  // ... other metadata
  other: {
    "llms-txt": `${siteConfig.url}/llms.txt`,
  },
};
```

### Link Tag

**Add to HTML head:**

```typescript
// app/layout.tsx
<head>
  <link
    rel="alternate"
    type="text/plain"
    href="/llms.txt"
    title="LLM-readable site information"
  />
</head>
```

### Robots.txt

**Allow AI crawlers:**

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Claude-Web", "Anthropic-AI"],
        allow: ["/llms.txt"],
      },
    ],
  };
}
```

### Sitemap

**Include in sitemap:**

```typescript
// app/sitemap.ts
export default async function sitemap() {
  return [
    // ... other routes
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
```

## Customization

### Adding Sections

**Add new section:**

```typescript
// app/llms.txt/route.ts
const lines = [
  // ... existing sections
  ``,
  `## Testimonials`,
  ``,
  `"Simon is a talented developer..." - Client Name, Company`,
  ``,
  `## Speaking & Writing`,
  ``,
  `- Presentation at Conference X (2024)`,
  `- Blog post: "Building Modern Web Apps" (2024)`,
];
```

### Dynamic Content

**Add real-time metrics:**

```typescript
// Calculate from data
const totalStars = allProjects.reduce((sum, p) => sum + (p.stars || 0), 0);
const totalUsers = allProjects.reduce((sum, p) => sum + (p.users || 0), 0);

lines.push(`total_github_stars: ${totalStars}`);
lines.push(`total_users: ${totalUsers}`);
```

### Multilingual Support

**Add translations:**

```typescript
// app/llms.txt/route.ts
export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "en";

  const content = lang === "nl" ? generateDutchContent() : generateEnglishContent();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Language": lang,
    },
  });
}
```

**Access:**

- English: `/llms.txt` or `/llms.txt?lang=en`
- Dutch: `/llms.txt?lang=nl`

## Testing

### Manual Testing

**1. Visit endpoint:**

```bash
curl https://your-domain.com/llms.txt
```

**2. Check format:**

- Verify front matter (YAML metadata)
- Check all sections present
- Ensure links work
- Verify content is accurate

**3. Test caching:**

```bash
curl -I https://your-domain.com/llms.txt
# Check for Cache-Control header
```

### Automated Testing

**Test route implementation:**

```typescript
// app/llms.txt/__tests__/route.test.ts
import { GET } from "../route";

describe("GET /llms.txt", () => {
  it("should return plain text", async () => {
    const response = await GET();
    const contentType = response.headers.get("Content-Type");

    expect(contentType).toBe("text/plain; charset=utf-8");
  });

  it("should include name in front matter", async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain("name: Simon Stijnen");
  });

  it("should list projects", async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain("## Featured Projects");
    expect(text).toMatch(/\[.*\]\(.*\/projects\/.*\)/); // Link pattern
  });

  it("should set cache headers", async () => {
    const response = await GET();
    const cacheControl = response.headers.get("Cache-Control");

    expect(cacheControl).toContain("public");
    expect(cacheControl).toContain("max-age=86400");
  });
});
```

### Content Quality Check

**Checklist:**

- [ ] All links work (no 404s)
- [ ] Metrics are accurate
- [ ] Skills list is up-to-date
- [ ] Contact info is correct
- [ ] No sensitive information
- [ ] Grammar and spelling correct
- [ ] Formatting is consistent
- [ ] Content length is reasonable (200-400 lines)

### AI Agent Testing

**Test with AI tools:**

1. **ChatGPT:**

```
Summarize the information from https://your-domain.com/llms.txt
```

2. **Claude:**

```
What can you tell me about the developer at https://your-domain.com/llms.txt?
```

3. **Perplexity:**

```
Find information about [Your Name] using their llms.txt file
```

## Best Practices

### Update Regularly

- Update when adding new projects
- Refresh metrics (years of experience, project count)
- Update availability status
- Add new skills as you learn them

### Keep It Concise

- Focus on highlights, not exhaustive lists
- Use bullet points for scanability
- Prioritize recent and relevant information

### Be Honest

- Don't exaggerate experience
- Accurately represent skill levels
- Be truthful about availability

### Optimize for Parsing

- Use consistent formatting
- Include structured metadata
- Use clear section headers
- Provide explicit recommendations

### Monitor Usage

- Check analytics for `/llms.txt` traffic
- Track referrers from AI platforms
- Monitor for increased visibility

## See Also

- [Middleware Documentation](./01-middleware.md) - Request tracking
- [SEO Guide](../seo/01-seo-guide.md) - Complete SEO implementation
- [Structured Data](../seo/02-structured-data.md) - JSON-LD schemas
- [Sitemap & Robots](../seo/03-sitemap-robots.md) - Search engine config

## Next Steps

- Review current `/llms.txt` content
- Update with latest information
- Test with AI agents
- Monitor for recommendations
- Share endpoint with AI platforms

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
