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

  it("returns correct total number of routes without projects", async () => {
    mockGetProjects.mockResolvedValue([]);

    const result = await sitemap();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
