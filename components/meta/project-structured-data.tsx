import { ProjectJsonLd, BreadcrumbJsonLd } from "@/components/meta/structured-data";
import { siteConfig } from "@/lib/config";
import type { ProjectImage } from "@/lib/projects";

interface ProjectStructuredDataProps {
  title: string;
  description: string;
  slug: string;
  technologies: string[];
  images?: ProjectImage[];
}

export default function ProjectStructuredData({
  title,
  description,
  slug,
  technologies,
  images,
}: ProjectStructuredDataProps) {
  const domain = siteConfig.url;
  const firstImage = images && images.length > 0 ? images[0] : null;
  const imageSrc = firstImage
    ? typeof firstImage === "string"
      ? firstImage
      : firstImage.src
    : `/images/projects/${slug}.jpg`;
  const imagePath = `${domain}${imageSrc}`;

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
