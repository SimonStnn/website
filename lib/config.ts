/**
 * Application configuration with environment variables
 *
 * Environment variables are loaded from the .env file
 *
 * Variables prefixed with NEXT_PUBLIC_ are exposed to the browser
 */

// Site configuration
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Simon Stijnen",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://simon.stijnen.be",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "AI & Software Engineering student at VIVES University crafting scalable, maintainable solutions integrating AI, IoT, and automation for real-world impact.",
  recruiterSummary:
    process.env.NEXT_PUBLIC_RECRUITER_SUMMARY ||
    "Software engineer and AI student focused on scalable web apps, LLM automation, and data-driven systems. Available for internships and junior roles.",
  author: {
    name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Simon Stijnen",
    email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || "simon.stijnen.23+portfolio@gmail.com",
    phone: process.env.NEXT_PUBLIC_AUTHOR_PHONE || "",
  },
  location: {
    city: process.env.NEXT_PUBLIC_AUTHOR_CITY || "Oostkamp",
    country: process.env.NEXT_PUBLIC_AUTHOR_COUNTRY || "Belgium",
  },
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/SimonStnn",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/simon-stijnen/",
  },
  person: {
    jobTitle: process.env.NEXT_PUBLIC_AUTHOR_JOB_TITLE || "Software Engineer & AI student",
    worksFor: [
      {
        name: process.env.NEXT_PUBLIC_AUTHOR_WORKS_FOR || "Cerm",
        url: process.env.NEXT_PUBLIC_AUTHOR_WORKS_FOR_URL || "https://www.cerm.be/",
      },
    ],
    alumniOf: [
      {
        name: process.env.NEXT_PUBLIC_AUTHOR_ALUMNI_OF || "VIVES University of Applied Sciences",
        url: process.env.NEXT_PUBLIC_AUTHOR_ALUMNI_OF_URL || "https://www.vives.be/en",
      },
    ],
    hasCredential: [
      {
        name:
          process.env.NEXT_PUBLIC_AUTHOR_CREDENTIAL ||
          "Computer Science - Software Engineering & AI (in progress)",
      },
    ],
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "AI",
      "LLMs",
      "Machine Learning",
      "APIs",
      "PostgreSQL",
      "Docker",
    ],
  },
};

// Analytics configuration
export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
};

// Application configuration
export const appConfig = {
  environment: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
};
