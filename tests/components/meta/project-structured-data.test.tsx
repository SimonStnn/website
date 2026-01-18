import { render } from "@testing-library/react";
import ProjectStructuredData from "@/components/meta/project-structured-data";

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

describe("ProjectStructuredData", () => {
  it("renders ProjectJsonLd and BreadcrumbJsonLd with correct data", () => {
    const props = {
      title: "Test Project",
      description: "Test description",
      slug: "test-project",
      technologies: ["React", "TypeScript"],
      images: [{ src: "/image.jpg", alt: "Test" }],
    };

    const { container } = render(<ProjectStructuredData {...props} />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(2);

    const projectData = JSON.parse(scripts[0].innerHTML);
    expect(projectData.name).toBe("Test Project");
    expect(projectData.url).toBe("https://example.com/projects/test-project");
    expect(projectData.image).toBe("https://example.com/image.jpg");

    const breadcrumbData = JSON.parse(scripts[1].innerHTML);
    expect(breadcrumbData.itemListElement).toHaveLength(3);
    expect(breadcrumbData.itemListElement[2].name).toBe("Test Project");
  });

  it("uses default image when no images provided", () => {
    const props = {
      title: "Test Project",
      description: "Test description",
      slug: "test-project",
      technologies: ["React"],
    };

    const { container } = render(<ProjectStructuredData {...props} />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const projectData = JSON.parse(scripts[0].innerHTML);
    expect(projectData.image).toBe("https://example.com/images/projects/test-project.jpg");
  });
});
