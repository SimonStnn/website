// Mock config
jest.mock("@/lib/config", () => ({
  siteConfig: {
    url: "https://example.com",
    author: {
      name: "Simon Stijnen",
    },
  },
}));

// Mock structured data components
jest.mock("@/components/meta/structured-data", () => ({
  ProjectJsonLd: ({
    name,
    description,
    url,
    image,
    author,
    technologies,
  }: Record<string, unknown>) => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@type": "Project",
          name,
          description,
          url,
          image,
          author,
          technologies,
        }),
      }}
    />
  ),
  BreadcrumbJsonLd: ({ items }: Record<string, unknown>) => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@type": "BreadcrumbList",
          itemListElement: items,
        }),
      }}
    />
  ),
}));
