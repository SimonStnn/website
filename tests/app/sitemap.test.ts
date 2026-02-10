import { getProjects } from "@/lib/projects";
import sitemap from "@/app/sitemap";

// Mock the dependencies
jest.mock("@/lib/projects");
jest.mock("@/lib/config", () => ({
  siteConfig: {
    url: "https://example.com",
  },
}));

const mockGetProjects = getProjects as jest.MockedFunction<typeof getProjects>;

describe("sitemap", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns sitemap with base routes", async () => {
    mockGetProjects.mockResolvedValue([]);

    const result = await sitemap();

    expect(result).toContainEqual({
      url: "https://example.com",
      lastModified: expect.any(Date),
      changeFrequency: "weekly",
      priority: 1,
    });
    expect(result).toContainEqual({
      url: "https://example.com/projects",
      lastModified: expect.any(Date),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  it("includes project routes", async () => {
    const mockProjects = [{ slug: "project1" }, { slug: "project2" }];
    mockGetProjects.mockResolvedValue(mockProjects);

    const result = await sitemap();

    expect(result).toContainEqual({
      url: "https://example.com/projects/project1",
      lastModified: expect.any(Date),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    expect(result).toContainEqual({
      url: "https://example.com/projects/project2",
      lastModified: expect.any(Date),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  it("includes download routes", async () => {
    mockGetProjects.mockResolvedValue([]);

    const result = await sitemap();

    expect(result).toContainEqual({
      url: "https://example.com/download/resume.pdf",
      lastModified: expect.any(Date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  it("returns correct total number of routes without projects", async () => {
    mockGetProjects.mockResolvedValue([]);

    const result = await sitemap();

    // Base routes: home, about, experience, skills, projects, achievements, contact, projects page = 8
    // Download: 1
    // Agent discovery (llms.txt): 1
    // Total: 10
    expect(result).toHaveLength(10);
  });
});
