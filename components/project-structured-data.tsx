import { ProjectJsonLd, BreadcrumbJsonLd } from "@/components/structured-data";
import { siteConfig } from "@/lib/config";

interface ProjectStructuredDataProps {
  title: string;
  description: string;
  slug: string;
  technologies: string[];
  images?: string[];
}

export default function ProjectStructuredData({
  title,
  description,
  slug,
  technologies,
  images,
}: ProjectStructuredDataProps) {
  const domain = siteConfig.url;
  const imagePath =
    images && images.length > 0 ? `${domain}${images[0]}` : `${domain}/images/projects/${slug}.jpg`;

  return (
    <>
      <ProjectJsonLd
        name={title}
        description={description}
        url={`${domain}/projects/${slug}`}
        image={imagePath}
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
