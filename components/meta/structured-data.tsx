interface JsonLdProps {
  data: Record<string, unknown>;
}

// Helper component to render JSON-LD as a script tag
function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

interface ProjectJsonLdProps {
  name: string;
  description: string;
  url: string;
  image: string;
  author: {
    name: string;
    url: string;
  };
  technologies: string[];
}

export function ProjectJsonLd({
  name,
  description,
  url,
  image,
  author,
  technologies,
}: ProjectJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: "0",
    },
    keywords: technologies.join(", "),
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item,
    })),
  };

  return <JsonLd data={data} />;
}

interface PersonJsonLdProps {
  name: string;
  url: string;
  sameAs: string[];
  jobTitle?: string;
  homeCountry?: string; // e.g., "Belgium"
}

export function PersonJsonLd({ name, url, sameAs, jobTitle, homeCountry }: PersonJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    sameAs,
  };

  if (jobTitle) {
    data.jobTitle = jobTitle;
  }
  if (homeCountry) {
    data.homeLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: homeCountry,
      },
    };
  }

  return <JsonLd data={data} />;
}
