import { render, screen } from "@testing-library/react";
import ProjectsPage from "@/app/projects/page";
import { getProjects } from "@/lib/projects";

// Mock the data fetching function
jest.mock("@/lib/projects");

const mockGetProjects = getProjects as jest.MockedFunction<typeof getProjects>;

describe("Projects Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page title and description", async () => {
    mockGetProjects.mockResolvedValue([]);

    const Component = await ProjectsPage();
    render(Component);

    expect(screen.getByText("All Projects")).toBeInTheDocument();
    expect(
      screen.getByText("Explore all of my projects, from featured work to experimental builds.")
    ).toBeInTheDocument();
  });

  it("renders featured projects section", async () => {
    const mockProjects = [
      {
        slug: "featured-project",
        title: "Featured Project",
        shortDescription: "A featured project",
        content: "Full description",
        contentHtml: "<p>Full description</p>",
        technologies: ["React"],
        images: [{ src: "/img.jpg", alt: "Alt" }],
        order: 1,
      },
      {
        slug: "other-project",
        title: "Other Project",
        shortDescription: "An other project",
        content: "Full description",
        contentHtml: "<p>Full description</p>",
        technologies: ["Node"],
        images: [{ src: "/img2.jpg", alt: "Alt" }],
        order: undefined,
      },
    ];
    mockGetProjects.mockResolvedValue(mockProjects);

    const Component = await ProjectsPage();
    render(Component);

    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
    expect(screen.getByText("Other Projects")).toBeInTheDocument();
    expect(screen.getByText("Featured Project")).toBeInTheDocument();
    expect(screen.getByText("Other Project")).toBeInTheDocument();
  });

  it("does not render sections when no projects", async () => {
    mockGetProjects.mockResolvedValue([]);

    const Component = await ProjectsPage();
    render(Component);

    expect(screen.queryByText("Featured Projects")).not.toBeInTheDocument();
    expect(screen.queryByText("Other Projects")).not.toBeInTheDocument();
  });
});
