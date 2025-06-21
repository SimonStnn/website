import fs from "fs";
import path from "path";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
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
  const projects = fileNames.map((fileName) => {
    // Get the slug from the filename (without .json extension)
    const slug = fileName.replace(/\.json$/, "");

    // Read the JSON file content
    const filePath = path.join(projectsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Parse the JSON data
    const projectData = JSON.parse(fileContent);

    // Return the project data with the slug
    return {
      slug,
      ...projectData,
    };
  });

  // Sort projects by featured status (featured first) and then by title
  return projects.sort((a, b) => {
    // Featured projects come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // If both have same featured status, sort alphabetically
    return a.title.localeCompare(b.title);
  });
}

/**
 * Gets a specific project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) || null;
}
