import { render, screen } from "@testing-library/react";
import { Timeline, TimelineItem } from "@/components/timeline";

/* eslint-disable react/display-name, @next/next/no-img-element */

// Mock Next.js components
jest.mock("next/link", () => {
  return ({ children, href, target, rel, className }: Record<string, unknown>) => (
    <a href={href} target={target} rel={rel} className={className}>
      {children}
    </a>
  );
});

jest.mock("next/image", () => {
  return ({ src, alt, width, height, className }: Record<string, unknown>) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
  );
});

// Mock lucide icons
jest.mock("lucide-react", () => ({
  ExternalLink: () => <span data-testid="external-link" />,
}));

// Mock UI components
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, className, asChild }: Record<string, unknown>) =>
    asChild ? children : <button className={className}>{children}</button>,
}));

const mockItem = {
  year: "2023",
  title: "Software Engineer",
  company: "Example Corp",
  description: "Developed web apps",
  logo: "/logo.png",
  projectLink: "https://project.com",
  companyUrl: "https://company.com",
};

describe("TimelineItem", () => {
  it("renders title, company, and description", () => {
    render(<TimelineItem {...mockItem} />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Example Corp")).toBeInTheDocument();
    expect(screen.getByText("Developed web apps")).toBeInTheDocument();
  });

  it("renders year", () => {
    render(<TimelineItem {...mockItem} />);
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("renders logo when provided", () => {
    render(<TimelineItem {...mockItem} />);
    const img = screen.getByAltText("Example Corp logo");
    expect(img).toHaveAttribute("src", "/logo.png");
  });

  it("renders marker when no logo", () => {
    const itemNoLogo = { ...mockItem, logo: undefined };
    render(<TimelineItem {...itemNoLogo} />);
    // The marker is a div, hard to test specifically, but ensure no img
    expect(screen.queryByAltText("Example Corp logo")).not.toBeInTheDocument();
  });

  it("renders project link", () => {
    render(<TimelineItem {...mockItem} />);
    expect(screen.getByText("View Project")).toBeInTheDocument();
  });

  it("renders company as link when companyUrl provided", () => {
    render(<TimelineItem {...mockItem} />);
    const link = screen.getByText("Example Corp");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://company.com");
  });

  it("renders company as text when no companyUrl", () => {
    const itemNoUrl = { ...mockItem, companyUrl: undefined };
    render(<TimelineItem {...itemNoUrl} />);
    expect(screen.getByText("Example Corp")).toBeInTheDocument();
    // Should not be a link
    expect(screen.getByText("Example Corp").tagName).not.toBe("A");
  });

  it("formats future dates to Present with smartDates", () => {
    const futureItem = { ...mockItem, year: "Jan. 2023 - Dec. 2030", smartDates: true };
    render(<TimelineItem {...futureItem} />);
    expect(screen.getByText("Jan. 2023 - Present")).toBeInTheDocument();
  });
});

describe("Timeline", () => {
  it("renders multiple items", () => {
    const items = [mockItem, { ...mockItem, title: "Another Role" }];
    render(<Timeline items={items} />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Another Role")).toBeInTheDocument();
  });
});
