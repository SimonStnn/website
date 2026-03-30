import { siteConfig } from "@/lib/config";

export const phone = siteConfig.author.phone;

export const references: {
  name: string;
  title: string;
  company: { name: string; url: string };
  email: string;
}[] = [
  {
    name: "Peter Heyse",
    title: "Head of Product Management",
    company: { name: "CERM nv", url: "https://www.cerm.be/" },
    email: "peter.heyse@cerm.net",
  },
];

export const other: string[] = ["Driver license B", "Ice hockey"];

export const bio = {
  summary:
    // "Software engineer and AI student with over 5 years of hands-on experience crafting scalable, maintainable solutions. I integrate AI, IoT, and automation to solve real-world problems\u2014from LLM-powered workflow tools to thermal monitoring systems. Passionate about turning ideas into efficient code that performs under pressure.",
    "Software Engineering student at VIVES University of Applied Sciences. I build scalable, maintainable software that performs well under heavy load. I quickly learn and apply new technologies in practice, with a focus on AI and efficient software development.",
};

export const softSkills: string[] = [
  "Problem solving",
  "Ownership",
  "Teamwork",
  "Analytical thinking",
  "Curiosity",
];

/** Number of top skills shown on the CV */
export const topSkillsCount = 5;

/**
 * Skills to pin at the top of the CV skills list, in this order.
 * Remaining slots (up to `topSkillsCount`) are filled by project count.
 */
export const suggestedSkills: string[] = ["Python", "TypeScript", "AI", "LLMs", "Docker"];
