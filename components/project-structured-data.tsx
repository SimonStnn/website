"use client";

import { ProjectJsonLd, BreadcrumbJsonLd } from "@/components/structured-data";
import { siteConfig } from "@/lib/config";

interface ProjectStructuredDataProps {
  title: string;
  description: string;
  slug: string;
  technologies: string[];
}

export default function ProjectStructuredData({
  title,
  description,
  slug,
  technologies,
}: ProjectStructuredDataProps) {
  const domain = siteConfig.url;

  return (
    <>
      <ProjectJsonLd
        name={title}
        description={description}
        url={`${domain}/projects/${slug}`}
        image={`${domain}/images/projects/${slug}.jpg`}
        author={{
          name: siteConfig.author.name,
          url: domain,
        }}
        technologies={technologies}
      />

      <BreadcrumbJsonLd
        items={[
          {
            position: 1,
            name: "Home",
            item: domain,
          },
          {
            position: 2,
            name: "Projects",
            item: `${domain}/projects`,
          },
          {
            position: 3,
            name: title,
            item: `${domain}/projects/${slug}`,
          },
        ]}
      />
    </>
  );
}
