# Testing Guide

**Navigation:** [Home](../index.md) > [Development](./README.md) > Testing

---

## Overview

This guide covers the Jest testing framework setup for the Simon Stijnen Portfolio project, including configuration, writing tests, running tests, and best practices for testing React components and utilities.

## Testing Stack

The project uses:

- **Jest 30** - Test runner and assertion library
- **Testing Library** - React component testing utilities
- **jsdom** - Browser environment simulation
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom Jest matchers for DOM

## Jest Configuration

### Main Configuration

**File:** `/workspaces/website/jest.config.js`

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Load next.config.js and .env files
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!jest.config.js",
    "!jest.setup.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};

module.exports = createJestConfig(customJestConfig);
```

#### Configuration Breakdown

**`dir: "./"`**

- Loads Next.js configuration
- Reads environment variables from `.env`
- Configures path aliases from `tsconfig.json`

**`setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]`**

- Runs setup file before each test suite
- Used for global test configuration
- Imports `@testing-library/jest-dom` matchers

**`moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" }`**

- Maps `@/` imports to project root
- Mirrors TypeScript path aliases
- Enables `import { X } from "@/lib/utils"` in tests

**`testEnvironment: "jest-environment-jsdom"`**

- Simulates browser environment
- Provides DOM APIs (`document`, `window`, etc.)
- Required for React component testing

**`collectCoverageFrom`**

- Specifies which files to include in coverage reports
- Excludes type definitions, config files, dependencies

**`coverageDirectory: "coverage"`**

- Output directory for coverage reports
- Creates HTML reports, LCOV data, and text summaries

**`coverageReporters: ["text", "lcov", "html"]`**

- Text: Terminal output
- LCOV: Machine-readable format (for CI)
- HTML: Interactive browser report

### Setup File

**File:** `/workspaces/website/jest.setup.js`

```javascript
import "@testing-library/jest-dom";

// Mock Next.js Image globally
jest.mock("next/image", () => ({
  __esModule: true,
  default: () => "mocked image",
}));

// Suppress expected console errors/warnings and fail on unexpected ones
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    const message = args.join(" ");
    if (
      !message.includes("Error parsing JSON for") &&
      !message.includes("Invalid JSON structure for") &&
      !message.includes("Middleware error:") &&
      !message.includes("Invalid webhook URL:") &&
      !message.includes("In HTML, <div> cannot be a descendant of <p>")
    ) {
      throw new Error(`Unexpected console.error: ${message}`);
    }
    // Suppress expected errors by not calling original
  });

  jest.spyOn(console, "warn").mockImplementation((...args) => {
    const message = args.join(" ");
    if (!message.includes("Webhook URL must use HTTPS protocol for security")) {
      throw new Error(`Unexpected console.warn: ${message}`);
    }
    // Suppress expected warnings by not calling original
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
```

#### Setup File Breakdown

**`import "@testing-library/jest-dom"`**

- Adds custom matchers: `toBeInTheDocument()`, `toHaveTextContent()`, etc.
- Makes assertions more readable

**Next.js Image Mock**

```javascript
jest.mock("next/image", () => ({
  __esModule: true,
  default: () => "mocked image",
}));
```

- Prevents errors from Next.js Image component
- Image optimization not needed in tests
- Returns simple string instead of complex component

**Console Error/Warning Handling**

- Suppresses expected errors (e.g., intentional test errors)
- Fails tests on unexpected console output
- Keeps test output clean

## Writing Tests

### Test File Structure

**Naming convention:**

- Component tests: `ComponentName.test.tsx` or `ComponentName.test.ts`
- Utility tests: `utils.test.ts`
- Location: Co-locate with source or use `__tests__/` directory

**Example structure:**

```
/workspaces/website/
├── components/
│   ├── project-card.tsx
│   └── project-card.test.tsx       # Co-located test
├── lib/
│   ├── utils.ts
│   └── utils.test.ts               # Co-located test
└── __tests__/                       # Alternative: central test directory
    ├── components/
    │   └── project-card.test.tsx
    └── lib/
        └── utils.test.ts
```

### Testing Components

**Basic component test:**

```typescript
// components/project-card.test.tsx
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./project-card";

describe("ProjectCard", () => {
  const mockProject = {
    title: "Test Project",
    shortDescription: "A test project",
    description: "Detailed description",
    technologies: ["React", "TypeScript"],
    images: [],
    slug: "test-project",
  };

  it("renders project title", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders project description", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("A test project")).toBeInTheDocument();
  });

  it("renders technologies", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
```

**Testing user interactions:**

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  it("toggles theme on click", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });

    // Initial state
    expect(button).toHaveAttribute("aria-pressed", "false");

    // Click button
    await user.click(button);

    // State changed
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
```

**Testing async components:**

```typescript
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectsList } from "./projects-list";

describe("ProjectsList", () => {
  it("loads and displays projects", async () => {
    render(<ProjectsList />);

    // Show loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for projects to load
    await waitFor(() => {
      expect(screen.getByText("Project 1")).toBeInTheDocument();
    });

    // Verify all projects loaded
    expect(screen.getByText("Project 2")).toBeInTheDocument();
    expect(screen.getByText("Project 3")).toBeInTheDocument();
  });
});
```

### Testing Utilities

**Pure function tests:**

```typescript
// lib/utils.test.ts
import { cn, formatDate, isVideoFile } from "./utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});

describe("formatDate", () => {
  it("formats date string", () => {
    const date = "2024-01-15";
    expect(formatDate(date)).toBe("January 15, 2024");
  });

  it("handles Date objects", () => {
    const date = new Date("2024-01-15");
    expect(formatDate(date)).toBe("January 15, 2024");
  });
});

describe("isVideoFile", () => {
  it("returns true for video files", () => {
    expect(isVideoFile("/videos/demo.mp4")).toBe(true);
    expect(isVideoFile("/videos/demo.webm")).toBe(true);
  });

  it("returns false for image files", () => {
    expect(isVideoFile("/images/screenshot.png")).toBe(false);
    expect(isVideoFile("/images/photo.jpg")).toBe(false);
  });
});
```

**Data loading tests:**

```typescript
// lib/projects.test.ts
import { getProjects, getProjectBySlug } from "./projects";

describe("getProjects", () => {
  it("returns all projects", () => {
    const projects = getProjects();

    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty("title");
    expect(projects[0]).toHaveProperty("slug");
  });

  it("filters by technology", () => {
    const reactProjects = getProjects({ technology: "React" });

    reactProjects.forEach((project) => {
      expect(project.technologies).toContain("React");
    });
  });

  it("sorts projects by order field", () => {
    const projects = getProjects();
    const orders = projects.map((p) => p.order ?? 999);

    // Verify sorted ascending
    for (let i = 1; i < orders.length; i++) {
      expect(orders[i]).toBeGreaterThanOrEqual(orders[i - 1]);
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns project with matching slug", () => {
    const project = getProjectBySlug("test-project");

    expect(project).toBeDefined();
    expect(project?.slug).toBe("test-project");
  });

  it("returns undefined for non-existent slug", () => {
    const project = getProjectBySlug("non-existent");

    expect(project).toBeUndefined();
  });
});
```

### Mocking

**Mocking modules:**

```typescript
// Mock external dependencies
jest.mock("@/lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

import { trackEvent } from "@/lib/analytics";

describe("ContactForm", () => {
  it("tracks form submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(trackEvent).toHaveBeenCalledWith("form_submit", {
      form: "contact",
    });
  });
});
```

**Mocking fetch:**

```typescript
describe("API calls", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches projects from API", async () => {
    const mockProjects = [{ id: 1, title: "Project 1" }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });

    const projects = await fetchProjects();

    expect(global.fetch).toHaveBeenCalledWith("/api/projects");
    expect(projects).toEqual(mockProjects);
  });

  it("handles fetch errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchProjects()).rejects.toThrow("Network error");
  });
});
```

**Mocking Next.js router:**

```typescript
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

import { useRouter } from "next/navigation";

describe("Navigation", () => {
  it("navigates to project page", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const user = userEvent.setup();
    render(<ProjectCard project={mockProject} />);

    await user.click(screen.getByRole("link", { name: /view project/i }));

    expect(mockPush).toHaveBeenCalledWith("/projects/test-project");
  });
});
```

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- project-card.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders title"

# Run with coverage
npm test -- --coverage

# Verbose output
npm test -- --verbose

# Update snapshots
npm test -- --updateSnapshot
```

### Watch Mode

```bash
npm run test:watch
```

**Interactive commands:**

```
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

**Example workflow:**

1. Start watch mode: `npm run test:watch`
2. Edit test file → Tests run automatically
3. Press `f` to focus on failed tests
4. Fix code → Tests re-run
5. Press `a` to run all tests
6. Press `q` to quit

### Coverage Reports

**Generate coverage:**

```bash
npm test -- --coverage
```

**Terminal output:**

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |   87.5  |   82.14  |   88.88 |   87.5  |
 components/     |   90.2  |   85.7   |   92.3  |   90.2  |
  button.tsx     |   100   |   100    |   100   |   100   |
  card.tsx       |   85.7  |   75     |   90    |   85.7  | 34-36
 lib/            |   82.5  |   78.6   |   83.3  |   82.5  |
  projects.ts    |   95.2  |   87.5   |   100   |   95.2  | 45-47
  utils.ts       |   76.3  |   71.4   |   80    |   76.3  | 12,34,67
-----------------|---------|----------|---------|---------|-------------------
```

**HTML report:**

```bash
npm test -- --coverage
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

**Coverage files:**

```
coverage/
├── lcov-report/         # HTML report
│   └── index.html      # Open this in browser
├── lcov.info           # LCOV format (for CI tools)
└── coverage-final.json # JSON format
```

### CI Integration

**GitHub Actions example:**

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

## Testing Best Practices

### Test Organization

**Use describe blocks:**

```typescript
describe("ProjectCard", () => {
  describe("rendering", () => {
    it("renders title", () => {
      /* ... */
    });
    it("renders description", () => {
      /* ... */
    });
  });

  describe("interactions", () => {
    it("handles click", () => {
      /* ... */
    });
  });
});
```

**Use beforeEach for setup:**

```typescript
describe("ProjectCard", () => {
  let mockProject;

  beforeEach(() => {
    mockProject = {
      title: "Test",
      description: "Test description",
      technologies: ["React"],
    };
  });

  it("renders project", () => {
    render(<ProjectCard project={mockProject} />);
    // Test implementation
  });
});
```

### Naming Conventions

**Good test names:**

```typescript
it("renders project title");
it("displays error message when email is invalid");
it("navigates to project page on click");
it("filters projects by technology");
```

**Bad test names:**

```typescript
it("works"); // Too vague
it("test 1"); // Not descriptive
it("should render"); // "should" is implied
```

### Arrange-Act-Assert Pattern

```typescript
it("increments counter on button click", async () => {
  // Arrange: Set up test data and render
  const user = userEvent.setup();
  render(<Counter initialCount={0} />);

  // Act: Perform action
  const button = screen.getByRole("button", { name: /increment/i });
  await user.click(button);

  // Assert: Verify result
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

### Query Priorities

**Use in order of preference:**

1. **getByRole** - Most accessible

   ```typescript
   screen.getByRole("button", { name: /submit/i });
   screen.getByRole("heading", { level: 1 });
   ```

2. **getByLabelText** - Forms

   ```typescript
   screen.getByLabelText("Email");
   ```

3. **getByText** - Non-interactive content

   ```typescript
   screen.getByText("Welcome");
   ```

4. **getByTestId** - Last resort
   ```typescript
   screen.getByTestId("custom-element");
   ```

**Avoid:**

- **getByClassName** - Implementation detail
- **querySelector** - Not accessible

### Async Testing

**Use waitFor for async operations:**

```typescript
import { waitFor } from "@testing-library/react";

it("loads projects", async () => {
  render(<ProjectsList />);

  await waitFor(() => {
    expect(screen.getByText("Project 1")).toBeInTheDocument();
  });
});
```

**Use findBy for single async queries:**

```typescript
it("displays success message", async () => {
  render(<Form />);

  await user.click(screen.getByRole("button", { name: /submit/i }));

  // findBy = getBy + waitFor
  const message = await screen.findByText("Success!");
  expect(message).toBeInTheDocument();
});
```

## Common Testing Patterns

### Testing Forms

```typescript
describe("ContactForm", () => {
  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello!");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello!",
    });
  });

  it("shows validation errors", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Submit without filling fields
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });
});
```

### Testing Lists

```typescript
describe("ProjectsList", () => {
  const mockProjects = [
    { id: 1, title: "Project 1" },
    { id: 2, title: "Project 2" },
    { id: 3, title: "Project 3" },
  ];

  it("renders all projects", () => {
    render(<ProjectsList projects={mockProjects} />);

    mockProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it("renders empty state when no projects", () => {
    render(<ProjectsList projects={[]} />);

    expect(screen.getByText("No projects found")).toBeInTheDocument();
  });
});
```

### Testing Conditional Rendering

```typescript
describe("ProjectCard", () => {
  it("shows demo link when demoUrl exists", () => {
    const project = { ...mockProject, demoUrl: "https://example.com" };

    render(<ProjectCard project={project} />);

    expect(screen.getByRole("link", { name: /demo/i })).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  it("hides demo link when demoUrl is missing", () => {
    const project = { ...mockProject, demoUrl: undefined };

    render(<ProjectCard project={project} />);

    expect(screen.queryByRole("link", { name: /demo/i })).not.toBeInTheDocument();
  });
});
```

## Troubleshooting

### Issue: Tests Fail with Import Errors

**Error:**

```
Cannot find module '@/components/button'
```

**Solution:**

Ensure `moduleNameMapper` is configured in `jest.config.js`:

```javascript
moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/$1",
}
```

### Issue: Act Warning

**Warning:**

```
Warning: An update to Component inside a test was not wrapped in act(...)
```

**Solution:**

Use `waitFor` or `findBy` for async updates:

```typescript
// ❌ Wrong
it("updates state", () => {
  render(<Component />);
  // State updates not awaited
});

// ✅ Correct
it("updates state", async () => {
  render(<Component />);
  await waitFor(() => {
    expect(screen.getByText("Updated")).toBeInTheDocument();
  });
});
```

### Issue: Unable to Find Element

**Error:**

```
TestingLibraryElementError: Unable to find an element with the text: Project
```

**Solution:**

Use `screen.debug()` to see rendered output:

```typescript
it("renders project", () => {
  render(<ProjectCard project={mockProject} />);

  screen.debug(); // Prints HTML to console

  expect(screen.getByText("Project")).toBeInTheDocument();
});
```

## See Also

- [Development Workflow](./02-development-workflow.md) - Testing in daily workflow
- [NPM Scripts](./04-npm-scripts.md) - Test commands reference
- [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## Next Steps

- [Set up linting](./08-linting-formatting.md) to maintain code quality
- [Configure Git hooks](./09-git-hooks.md) to run tests before commits
- [Analyze test coverage](./10-bundle-analysis.md) to identify untested code

---

**Last updated:** February 2026
