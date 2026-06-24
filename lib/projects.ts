import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import remarkSmartypants from "remark-smartypants";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  lastModified: Date;
  title: string;
  shortDescription: string;
  /** Raw markdown body */
  content: string;
  /** Rendered HTML of the markdown body */
  contentHtml: string;
  technologies: string[];
  images: ProjectImage[];
  demoUrl?: string;
  githubUrl?: string;
  order?: number;
}

// Path to the project files
const projectsDirectory = path.join(process.cwd(), "content/projects");

/** Converts a markdown string to an HTML string */
async function markdownToHtml(md: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkEmoji)
    .use(remarkSmartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      // theme: { dark: "github-dark", light: "github-light" },
    })
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

/**
 * Reads all project data from Markdown files in the content/projects directory.
 * The filename (without .md) is used as the slug.
 * YAML frontmatter holds metadata; the body is the project description in Markdown.
 */
export async function getProjects(): Promise<Project[]> {
  // Read all files from the projects directory
  const fileNames = fs.readdirSync(projectsDirectory);

  // Get project data from each file
  const projects = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        // Get the slug from the filename (without .md extension)
        const slug = fileName.replace(/\.md$/, "");

        const filePath = path.join(projectsDirectory, fileName);

        // Read and parse frontmatter + body with error handling
        let data: Record<string, unknown>;
        let content: string;
        try {
          const fileContent = fs.readFileSync(filePath, "utf8");
          const parsed = matter(fileContent);
          data = parsed.data as Record<string, unknown>;
          content = parsed.content;
        } catch (error) {
          console.error(`Error reading or parsing markdown for project ${slug}`, {
            error,
            fileName,
          });
          return null; // Skip invalid files
        }

        // Ensure frontmatter is an object
        if (typeof data !== "object" || data === null || Array.isArray(data)) {
          console.error(`Invalid frontmatter structure for project ${slug}`, { data });
          return null;
        }

        // Render the markdown body to HTML
        const contentHtml = await markdownToHtml(content);

        // Return the project data with the slug, rendered content, and file modification date
        return {
          slug,
          lastModified: fs.statSync(filePath).mtime,
          ...data,
          content,
          contentHtml,
        } as Project;
      })
  );

  // Filter out null entries (invalid files)
  const validProjects = projects.filter((project): project is Project => project !== null);

  // Sort projects by order (if specified)
  return validProjects.sort((a, b) => {
    // If both have order, sort by order
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }

    // If only one has order, it comes first
    if (a.order !== undefined && b.order === undefined) return -1;
    if (a.order === undefined && b.order !== undefined) return 1;

    // If neither has order, sort alphabetically
    return a.title.localeCompare(b.title);
  });
}

/**
 * Gets featured projects for the home page (projects with order 1-6)
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => {
    // Include projects with order 1-6
    return project.order !== undefined && project.order >= 1 && project.order <= 6;
  });
}

/**
 * Gets a specific project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) || null;
}
