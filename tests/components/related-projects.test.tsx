import { render, screen } from "@testing-library/react";
import RelatedProjects from "@/components/related-projects";
import { Project } from "@/lib/projects";

/* eslint-disable react/display-name */

// Mock Next.js components
jest.mock("next/link", () => {
  return ({ children, href }: Record<string, unknown>) => <a href={href}>{children}</a>;
});

// Mock UI components
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, className, asChild }: Record<string, unknown>) =>
    asChild ? children : <button className={className}>{children}</button>,
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: Record<string, unknown>) => (
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
  CardFooter: ({ children }: Record<string, unknown>) => <div>{children}</div>,
  CardTitle: ({ children, className }: Record<string, unknown>) => (
    <h3 className={className}>{children}</h3>
  ),
}));

const mockCurrentProject: Project = {
  slug: "current",
  title: "Current Project",
  shortDescription: "Current desc",
  content: "Full desc",
  contentHtml: "<p>Full desc</p>",
  technologies: ["React", "TypeScript"],
  images: [],
};

const mockProjects: Project[] = [
  {
    slug: "related1",
    title: "Related 1",
    shortDescription: "Related desc 1",
    content: "Full desc",
    contentHtml: "<p>Full desc</p>",
    technologies: ["React", "Node.js"],
    images: [],
  },
  {
    slug: "related2",
    title: "Related 2",
    shortDescription: "Related desc 2",
    content: "Full desc",
    contentHtml: "<p>Full desc</p>",
    technologies: ["TypeScript", "Vue"],
    images: [],
  },
  {
    slug: "unrelated",
    title: "Unrelated",
    shortDescription: "Unrelated desc",
    content: "Full desc",
    contentHtml: "<p>Full desc</p>",
    technologies: ["Python", "Django"],
    images: [],
  },
  {
    slug: "another-related",
    title: "Another Related",
    shortDescription: "Another desc",
    content: "Full desc",
    contentHtml: "<p>Full desc</p>",
    technologies: ["React", "Express"],
    images: [],
  },
];

describe("RelatedProjects", () => {
  it("renders related projects title", () => {
    render(<RelatedProjects currentProject={mockCurrentProject} allProjects={mockProjects} />);
    expect(screen.getByText("Related Projects")).toBeInTheDocument();
  });

  it("renders related projects that share technologies", () => {
    render(<RelatedProjects currentProject={mockCurrentProject} allProjects={mockProjects} />);
    expect(screen.getByText("Related 1")).toBeInTheDocument();
    expect(screen.getByText("Related 2")).toBeInTheDocument();
    expect(screen.getByText("Another Related")).toBeInTheDocument();
  });

  it("does not render unrelated projects", () => {
    render(<RelatedProjects currentProject={mockCurrentProject} allProjects={mockProjects} />);
    expect(screen.queryByText("Unrelated")).not.toBeInTheDocument();
  });

  it("does not render current project", () => {
    const projectsWithCurrent = [...mockProjects, mockCurrentProject];
    render(
      <RelatedProjects currentProject={mockCurrentProject} allProjects={projectsWithCurrent} />
    );
    expect(screen.queryByText("Current Project")).not.toBeInTheDocument();
  });

  it("limits to maxProjects", () => {
    render(
      <RelatedProjects
        currentProject={mockCurrentProject}
        allProjects={mockProjects}
        maxProjects={2}
      />
    );
    expect(screen.getByText("Related 1")).toBeInTheDocument();
    expect(screen.getByText("Related 2")).toBeInTheDocument();
    expect(screen.queryByText("Another Related")).not.toBeInTheDocument();
  });

  it("renders view project links", () => {
    render(<RelatedProjects currentProject={mockCurrentProject} allProjects={mockProjects} />);
    const links = screen.getAllByText("View Project");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/projects/related1");
  });

  it("returns null when no related projects", () => {
    const noRelated = [mockCurrentProject];
    const { container } = render(
      <RelatedProjects currentProject={mockCurrentProject} allProjects={noRelated} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("applies custom className", () => {
    render(
      <RelatedProjects
        currentProject={mockCurrentProject}
        allProjects={mockProjects}
        className="custom-class"
      />
    );
    const div = screen.getByText("Related Projects").closest("div");
    expect(div).toHaveClass("custom-class");
  });
});
