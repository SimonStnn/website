import fs from "fs";
import path from "path";

import { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";
import { getProjects } from "@/lib/projects";

// Stable date for the homepage — update manually when you make significant content changes.
const HOMEPAGE_LAST_MODIFIED = new Date("2026-02-28");

function getFileMtime(relativePath: string): Date {
  try {
    return fs.statSync(path.join(process.cwd(), relativePath)).mtime;
  } catch {
    return HOMEPAGE_LAST_MODIFIED;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Get all projects dynamically
  const projects = await getProjects();

  // Most recent project file modification — used for the /projects listing page
  const projectsListLastModified = projects.reduce(
    (latest, p) => (p.lastModified > latest ? p.lastModified : latest),
    new Date(0)
  );

  // Base routes — fragment URLs (/#about etc.) intentionally omitted:
  // search engines strip fragments before processing, producing duplicate homepage entries.
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: HOMEPAGE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: projectsListLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Individual project pages
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Resume PDF (Google can index PDFs)
  const downloadRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/download/resume.pdf`,
      lastModified: getFileMtime("public/download/resume.pdf"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Intentionally omitted:
  // - /llms.txt: not a webpage; discovery is handled via <link rel="alternate"> in layout.tsx
  // - https://docs.simon.stijnen.be/sitemap.xml: cross-domain URLs are prohibited by the
  //   Sitemaps Protocol. Submit that sitemap separately in Google Search Console.

  return [...routes, ...projectRoutes, ...downloadRoutes];
}
