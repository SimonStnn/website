import { render } from "@testing-library/react";
import { ProjectJsonLd, BreadcrumbJsonLd, PersonJsonLd } from "@/components/meta/structured-data";

describe("StructuredData", () => {
  describe("ProjectJsonLd", () => {
    it("renders JSON-LD script for project", () => {
      const props = {
        name: "Test Project",
        description: "Test desc",
        url: "https://example.com/project",
        image: "https://example.com/image.jpg",
        author: { name: "Author", url: "https://example.com" },
        technologies: ["React", "TS"],
      };

      const { container } = render(<ProjectJsonLd {...props} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();

      const data = JSON.parse(script!.innerHTML);
      expect(data["@type"]).toBe("SoftwareApplication");
      expect(data.name).toBe("Test Project");
      expect(data.keywords).toBe("React, TS");
    });
  });

  describe("BreadcrumbJsonLd", () => {
    it("renders JSON-LD script for breadcrumbs", () => {
      const items = [
        { position: 1, name: "Home", item: "https://example.com" },
        { position: 2, name: "Projects", item: "https://example.com/projects" },
      ];

      const { container } = render(<BreadcrumbJsonLd items={items} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();

      const data = JSON.parse(script!.innerHTML);
      expect(data["@type"]).toBe("BreadcrumbList");
      expect(data.itemListElement).toHaveLength(2);
    });
  });

  describe("PersonJsonLd", () => {
    it("renders JSON-LD script for person", () => {
      const props = {
        name: "Simon Stijnen",
        url: "https://example.com",
        sameAs: ["https://github.com/simon"],
        jobTitle: "Developer",
        homeCountry: "Belgium",
      };

      const { container } = render(<PersonJsonLd {...props} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();

      const data = JSON.parse(script!.innerHTML);
      expect(data["@type"]).toBe("Person");
      expect(data.name).toBe("Simon Stijnen");
      expect(data.jobTitle).toBe("Developer");
      expect(data.homeLocation.address.addressCountry).toBe("Belgium");
    });

    it("renders without optional fields", () => {
      const props = {
        name: "Simon Stijnen",
        url: "https://example.com",
        sameAs: ["https://github.com/simon"],
      };

      const { container } = render(<PersonJsonLd {...props} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const data = JSON.parse(script!.innerHTML);
      expect(data.jobTitle).toBeUndefined();
      expect(data.homeLocation).toBeUndefined();
    });
  });
});
