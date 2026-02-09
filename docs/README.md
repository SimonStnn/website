# Portfolio Website Documentation

> Comprehensive documentation for Simon Stijnen's portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 📚 Table of Contents

- [Quick Start](#-quick-start)
- [Documentation Sections](#-documentation-sections)
- [Getting Help](#-getting-help)
- [How to Read the Docs](#-how-to-read-the-docs)

---

## 🚀 Quick Start

New to the project? Start here:

1. **[Getting Started](./04-development/01-getting-started.md)** - Installation and setup
2. **[Development Workflow](./04-development/02-development-workflow.md)** - Day-to-day development
3. **[Project Overview](./01-architecture/01-overview.md)** - High-level architecture

### Common Tasks

- **Adding a new project?** → [Adding Projects Guide](./03-content/06-adding-projects.md)
- **Adding an achievement?** → [Adding Achievements Guide](./03-content/07-adding-achievements.md)
- **Need to deploy?** → [Docker Guide](./05-deployment/01-docker-guide.md)
- **Troubleshooting?** → [Troubleshooting Guide](./06-guides/02-troubleshooting.md)
- **Questions?** → [FAQ](./06-guides/05-faq.md)

---

## 📖 Documentation Sections

### 1. Architecture & Structure

> Understanding the system design, project structure, and core patterns.

**Location:** [`01-architecture/`](./01-architecture/)

| Document                                                           | Description                                           |
| ------------------------------------------------------------------ | ----------------------------------------------------- |
| [Overview](./01-architecture/01-overview.md)                       | Tech stack, key features, and high-level architecture |
| [Directory Structure](./01-architecture/02-directory-structure.md) | Complete breakdown of every directory                 |
| [Data Flow](./01-architecture/03-data-flow.md)                     | JSON → TypeScript → React component flow              |
| [Routing & Navigation](./01-architecture/04-routing-navigation.md) | App Router, dynamic routes, static generation         |
| [Conventions](./01-architecture/05-conventions.md)                 | File naming, coding standards, patterns               |
| [Configuration](./01-architecture/06-configuration.md)             | All config files reference                            |

**Start with:** [Architecture Overview](./01-architecture/01-overview.md)

---

### 2. Features & Components

> Deep dive into all UI components, features, and interactive elements.

**Location:** [`02-features/`](./02-features/)

#### Component Documentation

| Document                                                       | Description                                |
| -------------------------------------------------------------- | ------------------------------------------ |
| [Components Overview](./02-features/01-components-overview.md) | Index of all components with architecture  |
| [Custom Components](./02-features/02-custom-components.md)     | Project cards, achievement cards, and more |
| [shadcn/ui Integration](./02-features/03-shadcn-ui.md)         | UI component library (New York, Slate)     |

#### Feature Guides

| Document                                                   | Description                                |
| ---------------------------------------------------------- | ------------------------------------------ |
| [Skills Table](./02-features/04-skills-table.md)           | Interactive table with sorting & filtering |
| [Project Gallery](./02-features/05-project-gallery.md)     | Carousel and image galleries               |
| [Achievements](./02-features/06-achievements.md)           | Achievement cards and dialogs              |
| [Related Projects](./02-features/07-related-projects.md)   | Related projects algorithm                 |
| [Badge Overflow](./02-features/08-badge-overflow.md)       | Dynamic badge overflow detection           |
| [Theme System](./02-features/09-theme-system.md)           | Dark mode with next-themes                 |
| [Timeline](./02-features/10-timeline.md)                   | Company/experience timeline                |
| [Navigation](./02-features/11-navigation.md)               | Desktop and mobile navigation              |
| [Social Utilities](./02-features/12-social-utilities.md)   | Social links and email copy                |
| [Layout Components](./02-features/13-layout-components.md) | Header, footer, and layouts                |
| [Icons](./02-features/14-icons.md)                         | Custom icon system                         |
| [Meta Components](./02-features/15-meta-components.md)     | SEO, structured data, analytics            |

**Start with:** [Components Overview](./02-features/01-components-overview.md)

---

### 3. Content Management

> Managing projects, achievements, and media using the file-based CMS.

**Location:** [`03-content/`](./03-content/)

#### System Documentation

| Document                                                          | Description                       |
| ----------------------------------------------------------------- | --------------------------------- |
| [CMS Overview](./03-content/01-cms-overview.md)                   | File-based CMS architecture       |
| [JSON Schema](./03-content/02-json-schema.md)                     | Complete JSON structure reference |
| [TypeScript Interfaces](./03-content/03-typescript-interfaces.md) | All data type definitions         |
| [Data Fetching](./03-content/04-data-fetching.md)                 | Data access functions API         |
| [Skills Generation](./03-content/05-skills-generation.md)         | Auto-generated skills system      |

#### Content Guides

| Document                                                      | Description                         |
| ------------------------------------------------------------- | ----------------------------------- |
| [Adding Projects](./03-content/06-adding-projects.md)         | Step-by-step project creation       |
| [Adding Achievements](./03-content/07-adding-achievements.md) | Achievement creation guide          |
| [Image Handling](./03-content/08-image-handling.md)           | Image organization and optimization |
| [Video Support](./03-content/09-video-support.md)             | Video detection and rendering       |

**Start with:** [CMS Overview](./03-content/01-cms-overview.md) or [Adding Projects](./03-content/06-adding-projects.md)

---

### 4. Development

> Tools, workflows, and configuration for daily development.

**Location:** [`04-development/`](./04-development/)

#### Getting Started

| Document                                                              | Description                  |
| --------------------------------------------------------------------- | ---------------------------- |
| [Getting Started](./04-development/01-getting-started.md)             | Installation and first run   |
| [Development Workflow](./04-development/02-development-workflow.md)   | Day-to-day development guide |
| [Environment Variables](./04-development/03-environment-variables.md) | Complete .env reference      |

#### Build System

| Document                                                      | Description                          |
| ------------------------------------------------------------- | ------------------------------------ |
| [npm Scripts](./04-development/04-npm-scripts.md)             | All package.json scripts             |
| [Next.js Config](./04-development/05-nextjs-config.md)        | next.config.ts breakdown             |
| [TypeScript Config](./04-development/06-typescript-config.md) | tsconfig.json explanation            |
| [Bundle Analysis](./04-development/10-bundle-analysis.md)     | Analyzing and optimizing bundle size |

#### Quality & Testing

| Document                                                          | Description                   |
| ----------------------------------------------------------------- | ----------------------------- |
| [Testing](./04-development/07-testing.md)                         | Jest setup and testing guide  |
| [Linting & Formatting](./04-development/08-linting-formatting.md) | ESLint, Prettier, lint-staged |
| [Git Hooks](./04-development/09-git-hooks.md)                     | Husky and pre-commit workflow |

**Start with:** [Getting Started](./04-development/01-getting-started.md)

---

### 5. Deployment

> Docker, CI/CD, and production deployment strategies.

**Location:** [`05-deployment/`](./05-deployment/)

| Document                                                             | Description                    |
| -------------------------------------------------------------------- | ------------------------------ |
| [Docker Guide](./05-deployment/01-docker-guide.md)                   | Complete Docker reference      |
| [Dockerfile](./05-deployment/02-dockerfile.md)                       | Multi-stage build explanation  |
| [docker-compose](./05-deployment/03-docker-compose.md)               | docker-compose.yml guide       |
| [CI/CD](./05-deployment/04-ci-cd.md)                                 | GitHub Actions pipeline        |
| [Deployment Strategies](./05-deployment/05-deployment-strategies.md) | Platform comparison and guides |
| [Production Config](./05-deployment/06-production-config.md)         | Production setup and security  |

**Start with:** [Docker Guide](./05-deployment/01-docker-guide.md)

---

### 6. Guides & References

> Additional guides, API documentation, SEO, styling, and utilities.

**Location:** [`06-guides/`](./06-guides/)

#### General Guides

| Document                                             | Description                   |
| ---------------------------------------------------- | ----------------------------- |
| [Contributing](./06-guides/01-contributing.md)       | Contribution guidelines       |
| [Troubleshooting](./06-guides/02-troubleshooting.md) | Common issues and solutions   |
| [Best Practices](./06-guides/03-best-practices.md)   | Code patterns and conventions |
| [Migration Guide](./06-guides/04-migration-guide.md) | Version upgrade guides        |
| [FAQ](./06-guides/05-faq.md)                         | Frequently asked questions    |

#### API Documentation

**Location:** [`06-guides/api/`](./06-guides/api/)

| Document                                              | Description                    |
| ----------------------------------------------------- | ------------------------------ |
| [Middleware](./06-guides/api/01-middleware.md)        | Middleware system and webhooks |
| [llms.txt](./06-guides/api/02-llms-txt.md)            | AI agent discovery endpoint    |
| [File Downloads](./06-guides/api/03-file-download.md) | Secure file download system    |

#### SEO & Performance

**Location:** [`06-guides/seo/`](./06-guides/seo/)

| Document                                                 | Description                 |
| -------------------------------------------------------- | --------------------------- |
| [SEO Guide](./06-guides/seo/01-seo-guide.md)             | Complete SEO implementation |
| [Structured Data](./06-guides/seo/02-structured-data.md) | JSON-LD schemas             |
| [Sitemap & Robots](./06-guides/seo/03-sitemap-robots.md) | Dynamic generation          |
| [Analytics](./06-guides/seo/04-analytics.md)             | Google Analytics and GTM    |
| [Performance](./06-guides/seo/05-performance.md)         | Performance optimization    |

#### Styling & Design

**Location:** [`06-guides/styling/`](./06-guides/styling/)

| Document                                                         | Description                     |
| ---------------------------------------------------------------- | ------------------------------- |
| [Tailwind Config](./06-guides/styling/01-tailwind-config.md)     | Tailwind CSS setup              |
| [shadcn/ui Setup](./06-guides/styling/02-shadcn-setup.md)        | Component library customization |
| [Responsive Design](./06-guides/styling/03-responsive-design.md) | Mobile-first patterns           |
| [Design System](./06-guides/styling/04-design-system.md)         | Design tokens and patterns      |

#### Utilities & Helpers

**Location:** [`06-guides/utilities/`](./06-guides/utilities/)

| Document                                                           | Description                     |
| ------------------------------------------------------------------ | ------------------------------- |
| [Utility Functions](./06-guides/utilities/01-utility-functions.md) | cn(), isVideoFile(), etc.       |
| [Config Library](./06-guides/utilities/02-config-library.md)       | lib/config.ts documentation     |
| [Helper Functions](./06-guides/utilities/03-helper-functions.md)   | Additional helper documentation |

**Start with:** [FAQ](./06-guides/05-faq.md) or [Troubleshooting](./06-guides/02-troubleshooting.md)

---

## 🆘 Getting Help

### Quick Links

- **[FAQ](./06-guides/05-faq.md)** - Frequently asked questions
- **[Troubleshooting](./06-guides/02-troubleshooting.md)** - Common issues and solutions
- **[Contributing](./06-guides/01-contributing.md)** - How to contribute

### Documentation Search Tips

1. **Use your editor's search** - Press `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac) to search across all docs
2. **Follow cross-references** - Each document links to related topics
3. **Check "See Also" sections** - Found at the bottom of most documents
4. **Browse by category** - Use the sections above to find relevant areas

### Common Search Terms

| Looking for...     | Go to...                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| How to add content | [Adding Projects](./03-content/06-adding-projects.md) or [Adding Achievements](./03-content/07-adding-achievements.md) |
| Component usage    | [Components Overview](./02-features/01-components-overview.md)                                                         |
| Configuration      | [Configuration Reference](./01-architecture/06-configuration.md)                                                       |
| Deployment         | [Docker Guide](./05-deployment/01-docker-guide.md)                                                                     |
| Environment setup  | [Environment Variables](./04-development/03-environment-variables.md)                                                  |
| Error messages     | [Troubleshooting](./06-guides/02-troubleshooting.md)                                                                   |
| Performance        | [Performance Guide](./06-guides/seo/05-performance.md)                                                                 |
| SEO                | [SEO Guide](./06-guides/seo/01-seo-guide.md)                                                                           |
| Styling            | [Design System](./06-guides/styling/04-design-system.md)                                                               |
| Testing            | [Testing Guide](./04-development/07-testing.md)                                                                        |

---

## 📖 How to Read the Docs

### Documentation Structure

Each document follows a consistent structure:

1. **Navigation Breadcrumbs** - Shows where you are in the docs
2. **Table of Contents** - Quick navigation within the document
3. **Main Content** - Detailed explanations with code examples
4. **See Also Section** - Links to related documentation
5. **Next Steps Section** - Suggested reading to continue learning

### Code Examples

Code examples include:

- **Syntax highlighting** for multiple languages (TypeScript, JavaScript, Bash, JSON, etc.)
- **File references** showing the source location
- **Line numbers** for reference in large code blocks
- **Comments** explaining key concepts

### Diagrams

The documentation includes **Mermaid diagrams** for:

- Architecture overviews
- Data flow sequences
- Component relationships
- Process flowcharts
- Decision trees

### Cross-References

Documents are extensively cross-referenced:

- **Inline links** connect related concepts
- **"See Also" sections** suggest related reading
- **"Next Steps" sections** guide your learning path
- **Breadcrumbs** help you navigate back

### Reading Paths

Choose a reading path based on your goal:

#### 🆕 New Developer Path

1. [Getting Started](./04-development/01-getting-started.md)
2. [Project Overview](./01-architecture/01-overview.md)
3. [Directory Structure](./01-architecture/02-directory-structure.md)
4. [Development Workflow](./04-development/02-development-workflow.md)
5. [CMS Overview](./03-content/01-cms-overview.md)

#### 🎨 Content Creator Path

1. [CMS Overview](./03-content/01-cms-overview.md)
2. [JSON Schema](./03-content/02-json-schema.md)
3. [Adding Projects](./03-content/06-adding-projects.md)
4. [Adding Achievements](./03-content/07-adding-achievements.md)
5. [Image Handling](./03-content/08-image-handling.md)

#### 🚀 Deployment Path

1. [Docker Guide](./05-deployment/01-docker-guide.md)
2. [Environment Variables](./04-development/03-environment-variables.md)
3. [Production Config](./05-deployment/06-production-config.md)
4. [CI/CD](./05-deployment/04-ci-cd.md)
5. [Deployment Strategies](./05-deployment/05-deployment-strategies.md)

#### 🎨 UI Developer Path

1. [Components Overview](./02-features/01-components-overview.md)
2. [shadcn/ui Integration](./02-features/03-shadcn-ui.md)
3. [Design System](./06-guides/styling/04-design-system.md)
4. [Theme System](./02-features/09-theme-system.md)
5. [Responsive Design](./06-guides/styling/03-responsive-design.md)

#### 🔍 SEO Specialist Path

1. [SEO Guide](./06-guides/seo/01-seo-guide.md)
2. [Structured Data](./06-guides/seo/02-structured-data.md)
3. [Sitemap & Robots](./06-guides/seo/03-sitemap-robots.md)
4. [Analytics](./06-guides/seo/04-analytics.md)
5. [Performance](./06-guides/seo/05-performance.md)

---

## 📊 Documentation Statistics

- **Total Documents:** 67 files
- **Total Sections:** 6 major sections
- **Code Examples:** 400+ throughout
- **Mermaid Diagrams:** 50+ visualizations
- **Cross-References:** 1000+ internal links

---

## 🎯 Key Features Documented

### Architecture

- Next.js 15 App Router
- TypeScript strict mode
- File-based content management
- Dynamic skills generation

### Components

- shadcn/ui (New York style, Slate colors)
- Custom project and achievement cards
- Interactive skills table
- Image carousels with video support

### Development

- Turbopack development
- Jest testing with coverage
- ESLint + Prettier + Tailwind class sorting
- Husky git hooks

### Deployment

- Multi-stage Docker builds
- GitHub Actions CI/CD
- Multiple platform guides
- Production security hardening

### SEO & Performance

- JSON-LD structured data
- Dynamic sitemap generation
- Google Analytics & GTM
- Core Web Vitals optimization

---

## 🔄 Documentation Updates

This documentation is maintained alongside the codebase. When making changes:

1. **Update relevant docs** when changing features
2. **Add examples** for new functionality
3. **Update cross-references** if structure changes
4. **Follow the style guide** in [Contributing](./06-guides/01-contributing.md)

---

## 📝 Contributing to Docs

Found an issue or want to improve the documentation?

1. Read the [Contributing Guide](./06-guides/01-contributing.md)
2. Follow the [Best Practices](./06-guides/03-best-practices.md)
3. Submit a pull request with your changes

---

## 📄 License

This documentation is part of the Simon Stijnen Portfolio project.

---

**Last Updated:** February 2026

**Need help?** Check the [FAQ](./06-guides/05-faq.md) or [Troubleshooting](./06-guides/02-troubleshooting.md) guide.
