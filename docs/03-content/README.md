# Content Management Documentation

**Navigation**: [Documentation Home](../README.md) > Content Management

---

## Overview

This section covers the file-based Content Management System (CMS) that powers the portfolio. Learn how to add, manage, and optimize content including projects, achievements, images, and videos.

---

## Documentation Index

### 1. [CMS Overview](./01-cms-overview.md)

**File-based CMS with content flow diagram**

Learn about the architecture, data flow, and core principles of the content management system.

**Topics**:

- File-based architecture
- Content flow diagram
- Directory structure
- Content types (projects, achievements, skills)
- Key features and benefits
- Data pipeline

**Start here if**: You're new to the CMS or want to understand how it works.

---

### 2. [JSON Schema Reference](./02-json-schema.md)

**Complete JSON structure reference with schema diagrams**

Comprehensive reference for all JSON field definitions, validation rules, and examples.

**Topics**:

- Project schema (all fields explained)
- Achievement schema (all fields explained)
- Field validation rules
- Schema diagrams
- Complete examples
- Common patterns
- Troubleshooting

**Start here if**: You need to know what fields are required or how to structure your JSON.

---

### 3. [TypeScript Interfaces](./03-typescript-interfaces.md)

**All data type definitions**

Complete guide to TypeScript interfaces that define content structure.

**Topics**:

- Project interfaces (`Project`, `ProjectImage`)
- Achievement interfaces (`Achievement`, `AchievementImage`)
- Skill interfaces (`Skill`)
- Type relationships
- Type guards and utilities
- Usage examples

**Start here if**: You're working with TypeScript code or need to understand type definitions.

---

### 4. [Data Fetching API](./04-data-fetching.md)

**Data access functions API**

Complete reference for all data fetching functions.

**Topics**:

- `getProjects()` - Get all projects
- `getFeaturedProjects()` - Get homepage projects
- `getProjectBySlug()` - Get single project
- `getAchievements()` - Get all achievements
- `getSkills()` - Get auto-generated skills
- Error handling
- Caching strategy
- Usage in components and pages

**Start here if**: You need to fetch content data in your code.

---

### 5. [Skills Generation](./05-skills-generation.md)

**Auto-generated skills with flowchart**

Deep dive into how skills are automatically generated from project technologies.

**Topics**:

- Generation algorithm with flowchart
- Skill ID generation
- Deduplication strategy
- Project association
- Sorting and ordering
- Best practices
- Common issues

**Start here if**: You want to understand how skills work or troubleshoot skill issues.

---

### 6. [Adding Projects](./06-adding-projects.md)

**Step-by-step guide with complete example**

Comprehensive guide to adding new projects to your portfolio.

**Topics**:

- Quick start guide
- Step-by-step walkthrough
- Complete project example
- Featured vs regular projects
- Working with images
- Adding videos
- Setting URLs
- Choosing technologies
- Writing descriptions
- Testing and troubleshooting

**Start here if**: You want to add a new project to your portfolio.

---

### 7. [Adding Achievements](./07-adding-achievements.md)

**Step-by-step guide with examples**

Complete guide to adding certifications, awards, and achievements.

**Topics**:

- Quick start guide
- Achievement types (certification, award, achievement)
- Complete examples for each type
- Working with logos
- Setting dates
- Order and sorting
- Adding verification links
- Writing descriptions
- Testing and troubleshooting

**Start here if**: You want to add certifications, awards, or achievements.

---

### 8. [Image Handling](./08-image-handling.md)

**Image organization and optimization**

Comprehensive guide to managing, optimizing, and organizing images.

**Topics**:

- Directory structure
- Image formats (WebP, PNG, JPEG)
- Image optimization tools and techniques
- Naming conventions
- Path formats
- Alt text guidelines
- Responsive images
- Performance optimization
- Best practices

**Start here if**: You need to add or optimize images.

---

### 9. [Video Support](./09-video-support.md)

**Video detection and rendering**

Complete guide to adding and optimizing videos in your portfolio.

**Topics**:

- Video detection mechanism
- Adding videos to projects
- Video formats (MP4, WebM, MOV)
- Video optimization with FFmpeg
- Rendering videos
- Mixing images and videos
- Best practices
- Performance considerations
- Advanced techniques

**Start here if**: You want to add demo videos or understand video support.

---

## Quick Reference

### Adding Content

| Task            | Documentation                                      | Time      |
| --------------- | -------------------------------------------------- | --------- |
| Add new project | [Adding Projects](./06-adding-projects.md)         | 15-30 min |
| Add achievement | [Adding Achievements](./07-adding-achievements.md) | 5-10 min  |
| Optimize images | [Image Handling](./08-image-handling.md)           | 5-15 min  |
| Add demo video  | [Video Support](./09-video-support.md)             | 15-30 min |

### Understanding System

| Topic            | Documentation                                          | Complexity   |
| ---------------- | ------------------------------------------------------ | ------------ |
| How CMS works    | [CMS Overview](./01-cms-overview.md)                   | Basic        |
| JSON structure   | [JSON Schema](./02-json-schema.md)                     | Intermediate |
| Type definitions | [TypeScript Interfaces](./03-typescript-interfaces.md) | Advanced     |
| Data fetching    | [Data Fetching API](./04-data-fetching.md)             | Advanced     |
| Skills system    | [Skills Generation](./05-skills-generation.md)         | Advanced     |

---

## Content Types

### Projects

**Location**: `content/projects/*.json`

Projects are your portfolio work including web apps, mobile apps, ML projects, and more.

**Key Files**:

- JSON: `content/projects/{slug}.json`
- Images: `public/images/projects/{slug}/`

**Documentation**:

- [Adding Projects Guide](./06-adding-projects.md)
- [JSON Schema - Project](./02-json-schema.md#project-schema)
- [TypeScript - Project Interface](./03-typescript-interfaces.md#project-interfaces)

### Achievements

**Location**: `content/achievements/*.json`

Achievements include certifications, awards, and notable accomplishments.

**Key Files**:

- JSON: `content/achievements/{slug}.json`
- Logos: `public/images/logos/`

**Documentation**:

- [Adding Achievements Guide](./07-adding-achievements.md)
- [JSON Schema - Achievement](./02-json-schema.md#achievement-schema)
- [TypeScript - Achievement Interface](./03-typescript-interfaces.md#achievement-interfaces)

### Skills

**Generated from**: Project technologies

Skills are automatically created by analyzing all project `technologies` arrays.

**Documentation**:

- [Skills Generation](./05-skills-generation.md)
- [TypeScript - Skill Interface](./03-typescript-interfaces.md#skill-interfaces)
- [Data Fetching - getSkills()](./04-data-fetching.md#skill-functions)

---

## Common Workflows

### Adding a New Project

```bash
# 1. Create JSON file
touch content/projects/my-project.json

# 2. Create images directory
mkdir -p public/images/projects/my-project

# 3. Add images
cp ~/screenshots/*.webp public/images/projects/my-project/

# 4. Edit JSON with project details
# (Use your favorite editor)

# 5. Test
npm run dev

# 6. Commit
git add content/projects/my-project.json
git add public/images/projects/my-project/
git commit -m "Add My Project"
```

**Detailed Guide**: [Adding Projects](./06-adding-projects.md)

### Adding an Achievement

```bash
# 1. Create JSON file
touch content/achievements/my-certification.json

# 2. (Optional) Add logo
cp ~/logo.webp public/images/logos/organization.webp

# 3. Edit JSON with achievement details

# 4. Test and commit
npm run dev
git add content/achievements/my-certification.json
git commit -m "Add certification"
```

**Detailed Guide**: [Adding Achievements](./07-adding-achievements.md)

### Optimizing Images

```bash
# 1. Convert to WebP
cwebp -q 80 input.png -o output.webp

# 2. Resize if needed
convert output.webp -resize 2000x final.webp

# 3. Verify size
ls -lh final.webp  # Should be < 500KB

# 4. Add to project
mv final.webp public/images/projects/my-project/
```

**Detailed Guide**: [Image Handling](./08-image-handling.md)

---

## Key Concepts

### Slug

The slug is the URL-friendly identifier derived from the filename.

```
File: content/projects/my-awesome-project.json
Slug: my-awesome-project
URL: /projects/my-awesome-project
```

**Rules**:

- Lowercase
- Use hyphens (not spaces or underscores)
- Descriptive
- Unique

### Order

The `order` field controls display position and featured status.

```json
{"order": 1}    // Featured (homepage + projects page)
{"order": 7}    // Ordered but not featured
// No order     // Alphabetical sorting
```

**Featured Projects**: Only projects with `order` 1-6 appear on homepage.

### Technologies

Technologies array in projects automatically generates skills.

```json
{
  "technologies": ["React", "TypeScript", "Docker"]
}
```

**Important**: Use consistent capitalization across all projects!

---

## Best Practices

### Content

1. ✅ **Write Clear Descriptions**: Be specific and concrete
2. ✅ **Use Keywords**: Include relevant technologies and skills
3. ✅ **Show Impact**: Mention results, users, or achievements
4. ✅ **Be Concise**: Respect user's time
5. ✅ **Proofread**: Check spelling and grammar

### Images

1. ✅ **Optimize First**: Always optimize before committing
2. ✅ **Use WebP**: Best format for web
3. ✅ **Descriptive Alt Text**: For accessibility and SEO
4. ✅ **Reasonable Sizes**: Target < 500KB per image
5. ✅ **Consistent Quality**: Maintain similar quality across portfolio

### Videos

1. ✅ **Keep Short**: 30-60 seconds recommended
2. ✅ **Optimize Size**: Target < 20MB
3. ✅ **Use MP4**: Best compatibility
4. ✅ **Provide Context**: Good alt text describing video
5. ✅ **Test Playback**: Verify on multiple devices

### Technologies

1. ✅ **Consistent Naming**: Same capitalization everywhere
2. ✅ **Standard Names**: Use widely recognized names
3. ✅ **Be Selective**: Focus on significant technologies
4. ✅ **Order by Importance**: Most important first
5. ✅ **Avoid Redundancy**: Don't list obvious dependencies

---

## Troubleshooting

### Common Issues

| Issue                  | Cause                       | Solution                                                        |
| ---------------------- | --------------------------- | --------------------------------------------------------------- |
| Project doesn't appear | JSON syntax error           | [Validate JSON](./06-adding-projects.md#troubleshooting)        |
| Images not loading     | Wrong path                  | [Check image paths](./08-image-handling.md#common-issues)       |
| Video not playing      | Unsupported codec           | [Convert to MP4](./09-video-support.md#common-issues)           |
| Skills not grouping    | Inconsistent capitalization | [Fix technology names](./05-skills-generation.md#common-issues) |
| Build fails            | Invalid structure           | [Check schema](./02-json-schema.md#troubleshooting)             |

### Getting Help

1. Check relevant documentation section
2. Validate JSON syntax with `jq`
3. Check browser console for errors
4. Review git commit history for recent changes
5. Ask team members or create an issue

---

## Related Documentation

- [Architecture Overview](../01-overview/01-introduction.md) - System architecture
- [Development Guide](../02-development/01-getting-started.md) - Development setup
- [Component Library](../04-components/README.md) - UI components
- [Deployment Guide](../05-deployment/README.md) - Production deployment

---

## Tools and Resources

### Required Tools

- **jq**: JSON validation and parsing
- **cwebp**: WebP conversion
- **FFmpeg**: Video processing (optional)
- **ImageMagick**: Image manipulation (optional)

### Installation

```bash
# macOS
brew install jq webp ffmpeg imagemagick

# Ubuntu/Debian
sudo apt install jq webp ffmpeg imagemagick

# Verify installation
jq --version
cwebp -version
ffmpeg -version
```

### Useful Commands

```bash
# Validate JSON
jq empty content/projects/my-project.json

# Convert image to WebP
cwebp -q 80 input.png -o output.webp

# Optimize video
ffmpeg -i input.mp4 -crf 23 -vf scale=1280:-1 output.mp4

# Check image size
ls -lh public/images/projects/*/
```

---

## Summary

This content management system provides:

- ✅ **File-Based**: No database required
- ✅ **Type-Safe**: TypeScript interfaces
- ✅ **Auto-Generated**: Skills from technologies
- ✅ **Version Controlled**: Git tracks all changes
- ✅ **Developer-Friendly**: JSON editing with immediate preview
- ✅ **Performance**: Static generation at build time
- ✅ **Flexible**: Easy to extend and customize

Start by reading the [CMS Overview](./01-cms-overview.md) to understand the system, then follow the [Adding Projects](./06-adding-projects.md) guide to add your first project!

---

**Last Updated**: February 2026  
**Section**: Content Management (03)  
**Total Documents**: 9 + index
