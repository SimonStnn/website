import { render, screen } from "@testing-library/react";
import React from "react";
import ProjectCard from "@/components/project-card";
import { Project } from "@/lib/projects";

// Mock Next.js components
jest.mock("next/link", () => {
  const Link = ({ children, href }: Record<string, unknown>) => <a href={href}>{children}</a>;
  Link.displayName = "Link";
  return Link;
});

jest.mock("next/image", () => {
  const Image = ({ src, alt, className }: Record<string, unknown>) =>
    React.createElement("img", { src, alt, className });
  Image.displayName = "Image";
  return Image;
});

// Mock child components
jest.mock("@/components/ui/button", () => ({
  Button: function ButtonMock({ children, className }: Record<string, unknown>) {
    return <button className={className}>{children}</button>;
  },
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: Record<string, unknown>) => (
    <div className={className}>{children}</div>
  ),
  CardHeader: ({ children, className }: Record<string, unknown>) => (
    <div className={className}>{children}</div>
  ),
  CardContent: ({ children, className }: Record<string, unknown>) => (
    <div className={className}>{children}</div>
  ),
  CardDescription: ({ children, title, className }: Record<string, unknown>) => (
    <p title={title} className={className}>
      {children}
    </p>
  ),
  CardFooter: ({ children, className }: Record<string, unknown>) => (
    <div className={className}>{children}</div>
  ),
  CardTitle: ({ children, className }: Record<string, unknown>) => (
    <h3 className={className}>{children}</h3>
  ),
}));

jest.mock("@/components/badge-overflow", () => {
  return function BadgeOverflow({ technologies }: Record<string, unknown>) {
    return <div>{(technologies as string[]).join(", ")}</div>;
  };
});

const mockProject: Project = {
  slug: "test-project",
  title: "Test Project",
  shortDescription: "A test project",
  content: "Full description",
  contentHtml: "<p>Full description</p>",
  technologies: ["React", "TypeScript"],
  images: [{ src: "/image.jpg", alt: "Test image" }],
};

describe("ProjectCard", () => {
  it("renders project title", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders project description", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("A test project")).toBeInTheDocument();
  });

  it("renders technologies", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("React, TypeScript")).toBeInTheDocument();
  });

  it("renders image when available", () => {
    render(<ProjectCard project={mockProject} />);
    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("src", "/image.jpg");
  });

  it("renders placeholder when no images", () => {
    const projectNoImage = { ...mockProject, images: [] };
    render(<ProjectCard project={projectNoImage} />);
    expect(screen.getByText("[Project Image]")).toBeInTheDocument();
  });

  it("filters out video files for hero image", () => {
    const projectWithVideo = {
      ...mockProject,
      images: [
        { src: "/video.mp4", alt: "Video" },
        { src: "/image.jpg", alt: "Image" },
      ],
    };
    render(<ProjectCard project={projectWithVideo} />);
    expect(screen.getByAltText("Image")).toBeInTheDocument();
    expect(screen.queryByAltText("Video")).not.toBeInTheDocument();
  });

  it("renders placeholder when all images are videos", () => {
    const projectAllVideos = {
      ...mockProject,
      images: [
        { src: "/video1.mp4", alt: "Video1" },
        { src: "/video2.webm", alt: "Video2" },
      ],
    };
    render(<ProjectCard project={projectAllVideos} />);
    expect(screen.getByText("[Project Image]")).toBeInTheDocument();
  });

  it("handles missing title gracefully", () => {
    const projectNoTitle = { ...mockProject, title: "" };
    render(<ProjectCard project={projectNoTitle} />);
    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toHaveTextContent("");
  });

  it("handles empty technologies", () => {
    const projectNoTech = { ...mockProject, technologies: [] };
    render(<ProjectCard project={projectNoTech} />);
    // BadgeOverflow renders empty div
    expect(screen.queryByText("React, TypeScript")).not.toBeInTheDocument();
  });
});
