import { getProjects } from "./projects";

export interface Skill {
  id: string;
  name: string;
  projects: string[];
}

function generateSkillId(skillName: string): string {
  return skillName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters except hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

export async function getSkills(): Promise<Skill[]> {
  const projects = await getProjects();

  // Create a map to collect unique skills and their projects
  const skillsMap = new Map<string, Skill>();

  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      const skillId = generateSkillId(tech);

      if (skillsMap.has(skillId)) {
        // Add project to existing skill
        const existingSkill = skillsMap.get(skillId)!;
        if (!existingSkill.projects.includes(project.title)) {
          existingSkill.projects.push(project.title);
        }
      } else {
        // Create new skill
        skillsMap.set(skillId, {
          id: skillId,
          name: tech,
          projects: [project.title],
        });
      }
    });
  });

  // Convert to array and sort by name
  return Array.from(skillsMap.values()).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

// export async function getSkillsForProject(projectName: string): Promise<Skill[]> {
//   const skills = await getSkills();
//   return skills.filter((skill) => skill.projects.includes(projectName));
// }

// export async function getAllProjects(): Promise<string[]> {
//   const skills = await getSkills();
//   const allProjects = skills.flatMap((skill) => skill.projects);
//   return Array.from(new Set(allProjects));
// }
