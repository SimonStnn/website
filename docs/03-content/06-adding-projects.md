# Adding Projects Guide

**Navigation**: [Documentation Home](../README.md) > [Content Management](./README.md) > Adding Projects

---

## Table of Contents

- [Quick Start](#quick-start)
- [Step-by-Step Guide](#step-by-step-guide)
- [Complete Example](#complete-example)
- [Featured vs Regular Projects](#featured-vs-regular-projects)
- [Working with Images](#working-with-images)
- [Adding Videos](#adding-videos)
- [Setting URLs](#setting-urls)
- [Choosing Technologies](#choosing-technologies)
- [Writing Descriptions](#writing-descriptions)
- [Testing Your Project](#testing-your-project)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)
- [Next Steps](#next-steps)

---

## Quick Start

**TL;DR**: Create a JSON file, add images, test locally.

```bash
# 1. Create JSON file
echo '{}' > content/projects/my-project.json

# 2. Create images directory
mkdir -p public/images/projects/my-project

# 3. Add images to directory
cp ~/my-screenshot.webp public/images/projects/my-project/

# 4. Edit JSON file with complete project data

# 5. Start dev server and verify
npm run dev
# Visit http://localhost:3000/projects/my-project
```

---

## Step-by-Step Guide

### Step 1: Choose a Slug

The slug is derived from the filename and becomes the URL path.

**Rules**:

- Use kebab-case (lowercase with hyphens)
- No spaces or special characters
- Descriptive but concise
- Unique across all projects

**Examples**:

```bash
# ✅ Good slugs
my-awesome-app.json          → /projects/my-awesome-app
task-manager-pro.json        → /projects/task-manager-pro
ai-image-generator.json      → /projects/ai-image-generator

# ❌ Bad slugs
My Project.json              → Invalid (spaces)
my_project.json              → Works but inconsistent (use hyphens)
project1.json                → Not descriptive
verylongnamethatistoohardtoread.json → Too long
```

### Step 2: Create JSON File

Create the file in `content/projects/`:

```bash
# Create empty file
touch content/projects/my-project.json

# Or with initial structure
cat > content/projects/my-project.json << 'EOF'
{
  "title": "",
  "shortDescription": "",
  "description": "",
  "technologies": [],
  "images": []
}
EOF
```

### Step 3: Create Images Directory

Create a directory matching your slug:

```bash
# Create directory
mkdir -p public/images/projects/my-project

# Verify structure
ls -la public/images/projects/my-project/
```

**Directory Structure**:

```
public/images/projects/
└── my-project/              ← Must match slug
    ├── screenshot-1.webp
    ├── screenshot-2.webp
    ├── demo-video.mp4
    └── architecture.webp
```

### Step 4: Add Images

Add your project images to the directory:

```bash
# Copy images
cp ~/screenshots/main.png public/images/projects/my-project/screenshot-1.png

# Convert to WebP (recommended)
cwebp -q 80 public/images/projects/my-project/screenshot-1.png \
  -o public/images/projects/my-project/screenshot-1.webp

# Remove original PNG
rm public/images/projects/my-project/screenshot-1.png
```

**Image Guidelines**:

- Use WebP format for best compression
- Recommended max width: 2000px
- Optimize before committing
- Use descriptive filenames

### Step 5: Fill in Required Fields

Edit your JSON file with required data:

```json
{
  "title": "My Awesome Project",
  "shortDescription": "A brief one-sentence description of what this project does.",
  "description": "A longer, more detailed description...",
  "technologies": ["React", "TypeScript", "Next.js"],
  "images": [
    {
      "src": "/images/projects/my-project/screenshot-1.webp",
      "alt": "Main dashboard showing user analytics"
    }
  ]
}
```

### Step 6: Add Optional Fields

Add optional fields as needed:

```json
{
  "title": "My Awesome Project",
  "shortDescription": "A brief description.",
  "description": "Detailed description...",
  "technologies": ["React", "TypeScript", "Next.js"],
  "images": [
    {
      "src": "/images/projects/my-project/screenshot-1.webp",
      "alt": "Main dashboard"
    }
  ],
  "demoUrl": "https://my-project.com",
  "githubUrl": "https://github.com/username/my-project",
  "order": 7
}
```

### Step 7: Validate JSON

Validate your JSON syntax:

```bash
# Using jq
jq empty content/projects/my-project.json
# No output = valid JSON

# Or use online validator
# Visit: https://jsonlint.com/
```

### Step 8: Test Locally

Start the dev server and test:

```bash
# Start dev server
npm run dev

# Visit in browser
open http://localhost:3000/projects
open http://localhost:3000/projects/my-project

# Check skills page
open http://localhost:3000/skills
```

### Step 9: Check Build

Verify the project builds correctly:

```bash
# Run production build
npm run build

# Check for errors
# Look for: "✓ Generating static pages"

# Test production build
npm start
```

### Step 10: Commit Changes

Commit your new project:

```bash
# Add files
git add content/projects/my-project.json
git add public/images/projects/my-project/

# Commit
git commit -m "Add My Awesome Project to portfolio"

# Push
git push
```

---

## Complete Example

Let's create a complete project from scratch: **"Task Manager Pro"**

### 1. Create Directory Structure

```bash
# Create JSON file
touch content/projects/task-manager-pro.json

# Create images directory
mkdir -p public/images/projects/task-manager-pro
```

### 2. Add Images

```bash
# Copy images (assuming you have them)
cp ~/projects/task-manager/screenshots/dashboard.png \
   public/images/projects/task-manager-pro/dashboard.webp

cp ~/projects/task-manager/screenshots/kanban.png \
   public/images/projects/task-manager-pro/kanban.webp

cp ~/projects/task-manager/demo.mp4 \
   public/images/projects/task-manager-pro/demo.mp4
```

### 3. Create JSON Content

**File**: `content/projects/task-manager-pro.json`

```json
{
  "title": "Task Manager Pro",
  "shortDescription": "A collaborative task management application with real-time updates and team analytics.",
  "description": "Task Manager Pro is a full-stack web application designed for teams to organize and track their work efficiently. Built with modern technologies, it features real-time collaboration, customizable workflows, and detailed analytics.\n\nThe application uses React and TypeScript for a type-safe frontend, Next.js for server-side rendering and API routes, and PostgreSQL for reliable data storage. Real-time updates are powered by WebSocket connections, and the entire stack is containerized with Docker for easy deployment.\n\nKey features include drag-and-drop task management, team member assignment, time tracking, progress visualization, and custom workflow states. The analytics dashboard provides insights into team productivity and project timelines.",
  "technologies": [
    "React",
    "TypeScript",
    "Next.js",
    "PostgreSQL",
    "WebSocket",
    "Docker",
    "Tailwind CSS",
    "Prisma"
  ],
  "images": [
    {
      "src": "/images/projects/task-manager-pro/dashboard.webp",
      "alt": "Task Manager Pro dashboard showing active tasks and team progress"
    },
    {
      "src": "/images/projects/task-manager-pro/kanban.webp",
      "alt": "Kanban board view with drag-and-drop functionality"
    },
    {
      "src": "/images/projects/task-manager-pro/demo.mp4",
      "alt": "Video demonstration of real-time collaboration features"
    }
  ],
  "demoUrl": "https://taskmanager-demo.com",
  "githubUrl": "https://github.com/username/task-manager-pro",
  "order": 3
}
```

### 4. Verify Structure

```bash
# Check file exists
ls -la content/projects/task-manager-pro.json

# Check images exist
ls -la public/images/projects/task-manager-pro/

# Output should show:
# dashboard.webp
# kanban.webp
# demo.mp4
```

### 5. Validate JSON

```bash
# Validate JSON syntax
jq empty content/projects/task-manager-pro.json

# Pretty print to verify
jq . content/projects/task-manager-pro.json
```

### 6. Test in Development

```bash
# Start dev server
npm run dev

# Open in browser
open http://localhost:3000/projects/task-manager-pro

# Verify:
# - Title displays correctly
# - Short description appears on cards
# - Images load
# - Video plays
# - Demo and GitHub buttons work
# - Technologies are listed
# - Appears on /projects page
# - Appears on /skills page under each technology
```

### 7. Check Skills Generation

Visit `/skills` and verify:

- All 8 technologies appear as skills
- "Task Manager Pro" is listed under each technology
- Clicking a skill shows the project

### 8. Commit

```bash
git add content/projects/task-manager-pro.json
git add public/images/projects/task-manager-pro/
git commit -m "Add Task Manager Pro project"
git push
```

---

## Featured vs Regular Projects

### Featured Projects (order 1-6)

Featured projects appear on the homepage.

```json
{
  "order": 1 // Featured (homepage + projects page)
}
```

**Characteristics**:

- Displayed prominently on homepage
- Order determines position (1 = first, 6 = last)
- Should be your best/most important work
- Limited to 6 projects maximum

**Example**:

```json
{
  "title": "Signapse",
  "order": 1 // First featured project on homepage
  // ...
}
```

### Regular Projects (no order or order > 6)

Regular projects appear only on the projects page.

```json
{
  // No "order" field - appears on /projects only, sorted alphabetically
}

// Or

{
  "order": 7  // Ordered but not featured
}
```

**Characteristics**:

- Not on homepage
- Listed on `/projects` page
- Sorted alphabetically by title (if no order)
- Sorted by order then alphabetically (if order > 6)

### Choosing Order Values

```json
// Homepage featured projects (most important)
{"order": 1}  // Your #1 project
{"order": 2}  // Your #2 project
{"order": 3}  // Your #3 project
{"order": 4}  // Your #4 project
{"order": 5}  // Your #5 project
{"order": 6}  // Your #6 project (last on homepage)

// Ordered but not featured
{"order": 7}  // Still ordered, appears after featured on /projects

// Regular projects (alphabetical)
// No "order" field - sorted by title
```

### Example Organization

```json
// content/projects/signapse.json
{
  "title": "Signapse",
  "order": 1  // Most important, homepage position 1
}

// content/projects/pop-a-loon.json
{
  "title": "Pop-a-loon",
  "order": 2  // Homepage position 2
}

// content/projects/old-project.json
{
  "title": "Old Project"
  // No order - appears alphabetically after featured projects
}
```

---

## Working with Images

### Image Format Recommendations

**Preferred Format**: WebP

- Best compression
- Good quality
- Wide browser support

**Acceptable Formats**:

- PNG (for screenshots with transparency)
- JPEG (for photos)
- WebP (best choice)

**Avoid**:

- GIF (use WebP or video instead)
- BMP (too large)
- SVG (not suitable for screenshots)

### Image Optimization

```bash
# Convert to WebP
cwebp -q 80 input.png -o output.webp

# Batch convert
for file in *.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done

# Resize large images
convert input.webp -resize 2000x output.webp

# Using ImageMagick
mogrify -format webp -quality 80 -resize 2000x *.png
```

### Image Paths

Always use absolute paths starting with `/images/`:

```json
{
  "images": [
    // ✅ Correct - absolute path
    {
      "src": "/images/projects/my-project/screenshot.webp",
      "alt": "Screenshot description"
    },

    // ❌ Wrong - relative path
    {
      "src": "screenshot.webp",
      "alt": "Screenshot"
    },

    // ❌ Wrong - includes 'public'
    {
      "src": "/public/images/projects/my-project/screenshot.webp",
      "alt": "Screenshot"
    }
  ]
}
```

### Multiple Images

Add multiple images for a gallery:

```json
{
  "images": [
    {
      "src": "/images/projects/my-project/hero.webp",
      "alt": "Application hero image showing main interface"
    },
    {
      "src": "/images/projects/my-project/features.webp",
      "alt": "Features overview page with key functionality"
    },
    {
      "src": "/images/projects/my-project/mobile.webp",
      "alt": "Mobile responsive view on various devices"
    },
    {
      "src": "/images/projects/my-project/dashboard.webp",
      "alt": "Admin dashboard with analytics and metrics"
    }
  ]
}
```

### Alt Text Best Practices

Write descriptive, specific alt text:

```json
// ✅ Good - descriptive and specific
{
  "alt": "User dashboard showing real-time analytics with visitor metrics, conversion rates, and revenue charts"
}

// ✅ Good - describes what's visible
{
  "alt": "Mobile app login screen with email and password fields and social authentication options"
}

// ❌ Bad - too generic
{
  "alt": "Screenshot"
}

// ❌ Bad - redundant
{
  "alt": "Image of the application interface"
}

// ❌ Bad - not descriptive
{
  "alt": "Screen 1"
}
```

---

## Adding Videos

### Video Formats

Supported video formats:

- `.mp4` (recommended)
- `.webm`
- `.mov`

```json
{
  "images": [
    {
      "src": "/images/projects/my-project/demo.mp4",
      "alt": "Video demonstration of key features and user workflow"
    }
  ]
}
```

### Mixing Images and Videos

You can mix images and videos in the same array:

```json
{
  "images": [
    {
      "src": "/images/projects/my-project/screenshot-1.webp",
      "alt": "Main interface screenshot"
    },
    {
      "src": "/images/projects/my-project/demo-video.mp4",
      "alt": "Video demonstration of core functionality"
    },
    {
      "src": "/images/projects/my-project/screenshot-2.webp",
      "alt": "Settings page screenshot"
    }
  ]
}
```

### Video Guidelines

- **Size**: Keep under 50MB for web performance
- **Length**: 30-60 seconds recommended
- **Format**: MP4 with H.264 codec for best compatibility
- **Aspect Ratio**: 16:9 recommended
- **Quality**: 1080p or 720p

### Converting Videos

```bash
# Convert to MP4 with good compression
ffmpeg -i input.mov -vcodec h264 -acodec aac output.mp4

# Reduce file size
ffmpeg -i input.mp4 -vcodec h264 -crf 28 output.mp4

# Resize video
ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4

# Trim video (first 60 seconds)
ffmpeg -i input.mp4 -t 60 -c copy output.mp4
```

---

## Setting URLs

### Demo URL

Link to live deployment or demo:

```json
{
  "demoUrl": "https://my-project.com"
}
```

**Examples**:

```json
"demoUrl": "https://taskmanager.vercel.app"           // Vercel deployment
"demoUrl": "https://my-project.netlify.app"           // Netlify deployment
"demoUrl": "https://chromewebstore.google.com/..."   // Chrome extension
"demoUrl": "https://apps.apple.com/..."               // iOS app
"demoUrl": "https://play.google.com/..."              // Android app
```

### GitHub URL

Link to source code repository:

```json
{
  "githubUrl": "https://github.com/username/my-project"
}
```

**Examples**:

```json
"githubUrl": "https://github.com/username/project"                    // Personal repo
"githubUrl": "https://github.com/organization/project"                // Organization repo
"githubUrl": "https://github.com/username/monorepo/tree/main/apps/web" // Monorepo subdirectory
```

### Both URLs

Include both if available:

```json
{
  "demoUrl": "https://my-project.com",
  "githubUrl": "https://github.com/username/my-project"
}
```

### Neither URL

If project is private or not deployed, omit both fields:

```json
{
  "title": "Private Client Project"
  // No demoUrl or githubUrl
}
```

---

## Choosing Technologies

### Technology Selection

Choose technologies that are:

1. **Significant**: Core to the project
2. **Visible**: User-facing or critical backend
3. **Demonstrable**: Show your skills

### Good Examples

```json
// ✅ Full-stack web app
{
  "technologies": [
    "React",           // Frontend framework
    "TypeScript",      // Language
    "Next.js",         // Meta-framework
    "PostgreSQL",      // Database
    "Prisma",          // ORM
    "Docker",          // Deployment
    "Tailwind CSS"     // Styling
  ]
}

// ✅ Mobile app
{
  "technologies": [
    "React Native",    // Framework
    "TypeScript",      // Language
    "Firebase",        // Backend
    "Redux",           // State management
    "Jest"             // Testing
  ]
}

// ✅ ML project
{
  "technologies": [
    "Python",          // Language
    "PyTorch",         // ML framework
    "FastAPI",         // API framework
    "Docker",          // Containerization
    "Kubernetes"       // Orchestration
  ]
}
```

### What to Include

✅ **Include**:

- Primary programming languages
- Main frameworks/libraries
- Databases
- Key tools (Docker, Kubernetes, etc.)
- Significant services (AWS, Firebase, etc.)

❌ **Don't Include**:

- Package managers (npm, pip, yarn)
- Version control (Git)
- Text editors (VS Code)
- Operating systems (Linux, Windows)
- Build tools (Webpack, Vite) - unless custom configuration is a selling point

### Consistent Naming

Use the exact same capitalization across all projects:

```json
// ✅ Consistent
// Project 1
{"technologies": ["React", "TypeScript"]}

// Project 2
{"technologies": ["React", "Node.js"]}

// ❌ Inconsistent (creates separate skills!)
// Project 1
{"technologies": ["React", "TypeScript"]}

// Project 2
{"technologies": ["react", "typescript"]}  // Different capitalization!
```

**Standard Names to Use**:

- `React` (not `react`, `React.js`, `ReactJS`)
- `TypeScript` (not `typescript`, `TS`)
- `Next.js` (not `NextJS`, `Nextjs`)
- `Node.js` (not `NodeJS`, `Node`)
- `PostgreSQL` (not `Postgres`, `postgres`)
- `MongoDB` (not `Mongo`, `mongo`)

---

## Writing Descriptions

### Title

Keep it concise and clear:

```json
// ✅ Good titles
"title": "Task Manager Pro"
"title": "Signapse"
"title": "Pop-a-loon"

// ❌ Bad titles
"title": "My Really Amazing Task Management Application"  // Too long
"title": "Project 1"                                       // Not descriptive
"title": "task-manager-pro"                                // Use proper capitalization
```

### Short Description

One sentence (50-150 characters) for cards and previews:

```json
// ✅ Good - concise and informative
"shortDescription": "A collaborative task management application with real-time updates and team analytics."

// ✅ Good - highlights key feature
"shortDescription": "Using computer vision and machine learning to translate sign language gestures into text."

// ❌ Too short
"shortDescription": "A task manager."

// ❌ Too long (should be in description)
"shortDescription": "This is an amazing task management application that I built using React, TypeScript, Next.js, and many other modern technologies to help teams collaborate effectively..."
```

### Description

Multiple paragraphs (200-800 characters) with details:

```json
{
  "description": "Opening paragraph: What is it and why does it exist? Brief overview of the problem it solves.\n\nSecond paragraph: Technical details. What technologies were used and why? What are the key features?\n\nThird paragraph: Additional context. Deployment, scale, impact, or unique challenges solved."
}
```

**Example**:

```json
{
  "description": "Task Manager Pro is a full-stack web application designed for teams to organize and track their work efficiently. Built with modern technologies, it features real-time collaboration, customizable workflows, and detailed analytics.\n\nThe application uses React and TypeScript for a type-safe frontend, Next.js for server-side rendering and API routes, and PostgreSQL for reliable data storage. Real-time updates are powered by WebSocket connections, and the entire stack is containerized with Docker for easy deployment.\n\nKey features include drag-and-drop task management, team member assignment, time tracking, progress visualization, and custom workflow states. The analytics dashboard provides insights into team productivity and project timelines."
}
```

### Writing Tips

1. **Start with Impact**: What problem does it solve?
2. **Highlight Tech**: Mention key technologies and why
3. **Show Results**: User count, performance metrics, awards
4. **Be Specific**: Use concrete details, not vague claims
5. **Use Active Voice**: "The app features..." not "Features are included..."
6. **Proofread**: Check spelling and grammar

---

## Testing Your Project

### Local Testing Checklist

```bash
# 1. Start dev server
npm run dev

# 2. Check projects list page
open http://localhost:3000/projects
# ✓ Project appears in list
# ✓ Title displays correctly
# ✓ Short description visible
# ✓ Image thumbnail loads

# 3. Check project detail page
open http://localhost:3000/projects/my-project
# ✓ Full description displays with paragraphs
# ✓ All images load in gallery
# ✓ Videos play correctly
# ✓ Technologies listed
# ✓ Demo button works (if applicable)
# ✓ GitHub button works (if applicable)
# ✓ Related projects shown

# 4. Check skills page
open http://localhost:3000/skills
# ✓ All technologies appear as skills
# ✓ Project listed under each skill
# ✓ Project count is correct

# 5. Check homepage (if featured)
open http://localhost:3000
# ✓ Project appears in featured section
# ✓ Correct position based on order
```

### Build Testing

```bash
# Run production build
npm run build

# Check output for errors
# Look for: ✓ Generating static pages

# Test production server
npm start
open http://localhost:3000/projects/my-project
```

### JSON Validation

```bash
# Validate JSON syntax
jq empty content/projects/my-project.json

# Check required fields
jq 'has("title") and has("shortDescription") and has("description") and has("technologies") and has("images")' content/projects/my-project.json
# Should output: true

# Check technologies array not empty
jq '.technologies | length > 0' content/projects/my-project.json
# Should output: true

# Check images array not empty
jq '.images | length > 0' content/projects/my-project.json
# Should output: true
```

---

## Troubleshooting

### Project Doesn't Appear

**Symptoms**: Project not showing on `/projects` page

**Possible Causes**:

1. JSON syntax error
2. File not in `content/projects/` directory
3. File doesn't end with `.json`
4. Dev server needs restart

**Solutions**:

```bash
# Validate JSON
jq empty content/projects/my-project.json

# Check file location
ls -la content/projects/my-project.json

# Restart dev server
# Ctrl+C to stop, then:
npm run dev
```

### Images Not Loading

**Symptoms**: Broken image icons or missing images

**Possible Causes**:

1. Incorrect image path
2. Images not in correct directory
3. File permissions issue

**Solutions**:

```bash
# Check images exist
ls -la public/images/projects/my-project/

# Verify path format (must start with /images/)
jq '.images[].src' content/projects/my-project.json

# Check file permissions
chmod 644 public/images/projects/my-project/*.webp
```

### Skills Not Generated

**Symptoms**: Project doesn't appear under skill on `/skills` page

**Possible Causes**:

1. Technology name typo
2. Inconsistent capitalization
3. Cache issue

**Solutions**:

```bash
# Check technologies array
jq '.technologies' content/projects/my-project.json

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Build Fails

**Symptoms**: `npm run build` fails with error

**Possible Causes**:

1. Invalid JSON syntax
2. Missing required fields
3. Type mismatch

**Solutions**:

```bash
# Validate all project JSON files
for file in content/projects/*.json; do
  echo "Checking $file"
  jq empty "$file" || echo "ERROR in $file"
done

# Check build output for specific error
npm run build 2>&1 | grep -A5 "error"
```

---

## See Also

- [JSON Schema Reference](./02-json-schema.md) - Complete field definitions
- [Image Handling Guide](./08-image-handling.md) - Detailed image guidelines
- [Video Support Guide](./09-video-support.md) - Video integration details
- [Skills Generation](./05-skills-generation.md) - How technologies become skills
- [Data Fetching API](./04-data-fetching.md) - How projects are loaded

---

## Next Steps

1. **Plan Your Project**: Gather all information and assets
2. **Create Structure**: Set up JSON file and images directory
3. **Write Content**: Fill in all fields with accurate information
4. **Add Media**: Optimize and add images/videos
5. **Test Thoroughly**: Verify everything works locally
6. **Deploy**: Commit changes and push to repository

---

**Last Updated**: February 2026  
**Maintainer**: Development Team  
**Related Files**: `content/projects/`, `public/images/projects/`, `lib/projects.ts`
