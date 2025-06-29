import fs from "fs";
import path from "path";

export interface Achievement {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  type: "certification" | "award" | "achievement";
  description?: string;
  link?: string;
  image?: string;
  order?: number;
}

// Path to the achievement files
const achievementsDirectory = path.join(process.cwd(), "content/achievements");

/**
 * Reads all achievement data from JSON files in the content/achievements directory
 * The filename (without .json) is used as the slug
 */
export async function getAchievements(): Promise<Achievement[]> {
  // Check if directory exists
  if (!fs.existsSync(achievementsDirectory)) {
    return [];
  }

  // Read all files from the achievements directory
  const fileNames = fs.readdirSync(achievementsDirectory);

  // Get achievement data from each file
  const achievements = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      // Get the slug from the filename (without .json extension)
      const slug = fileName.replace(/\.json$/, "");

      // Read the JSON file content
      const filePath = path.join(achievementsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Parse the JSON data
      const achievementData = JSON.parse(fileContent);

      // Return the achievement data with the slug
      return {
        slug,
        ...achievementData,
      };
    });

  // Sort achievements by order (if specified), then by date (newest first)
  return achievements.sort((a, b) => {
    // If both have order specified, sort by order (lower numbers first)
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }

    // If only one has order specified, prioritize it
    if (a.order !== undefined && b.order === undefined) {
      return -1;
    }
    if (a.order === undefined && b.order !== undefined) {
      return 1;
    }

    // If neither has order, sort by date (newest first)
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}
