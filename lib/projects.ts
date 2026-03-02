import fs from "fs";
import path from "path";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  lastModified: Date;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  images: ProjectImage[];
  demoUrl?: string;
  githubUrl?: string;
  order?: number;
}

// Path to the project files
const projectsDirectory = path.join(process.cwd(), "content/projects");

/**
 * Reads all project data from JSON files in the content/projects directory
 * The filename (without .json) is used as the slug
 */
export async function getProjects(): Promise<Project[]> {
  // Read all files from the projects directory
  const fileNames = fs.readdirSync(projectsDirectory);

  // Get project data from each file
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      // Get the slug from the filename (without .json extension)
      const slug = fileName.replace(/\.json$/, "");

      // Read the JSON file content
      const filePath = path.join(projectsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Parse the JSON data with error handling
      let projectData: unknown;
      try {
        projectData = JSON.parse(fileContent);
      } catch (error) {
        console.error(`Error parsing JSON for project ${slug}`, { error, fileName });
        return null; // Skip invalid files
      }

      // Ensure it's an object and not an array
      if (typeof projectData !== "object" || projectData === null || Array.isArray(projectData)) {
        console.error(`Invalid JSON structure for project ${slug}`, { projectData });
        return null;
      }

      // Return the project data with the slug and file modification date
      return {
        slug,
        lastModified: fs.statSync(filePath).mtime,
        ...projectData,
      };
    })
    .filter((project): project is Project => project !== null);

  // Sort projects by order (if specified)
  return projects.sort((a, b) => {
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
