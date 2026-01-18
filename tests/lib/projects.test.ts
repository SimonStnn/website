import { getProjects, getFeaturedProjects, getProjectBySlug } from "@/lib/projects";
import fs from "fs";

// Mock fs
jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("getProjects", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("reads and parses project JSON files correctly", async () => {
    mockedFs.readdirSync.mockReturnValue(["project1.json", "project2.json"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(
        JSON.stringify({
          title: "Project 1",
          shortDescription: "Desc 1",
          description: "Full desc 1",
          technologies: ["Tech1"],
          images: [{ src: "img1.jpg", alt: "Alt1" }],
          order: 1,
        })
      )
      .mockReturnValueOnce(
        JSON.stringify({
          title: "Project 2",
          shortDescription: "Desc 2",
          description: "Full desc 2",
          technologies: ["Tech2"],
          images: [{ src: "img2.jpg", alt: "Alt2" }],
        })
      );

    const projects = await getProjects();

    expect(projects).toHaveLength(2);
    expect(projects[0]).toMatchObject({
      slug: "project1",
      title: "Project 1",
      order: 1,
    });
    expect(projects[1]).toMatchObject({
      slug: "project2",
      title: "Project 2",
    });
  });

  it("sorts projects by order, then alphabetically", async () => {
    mockedFs.readdirSync.mockReturnValue(["b.json", "a.json", "c.json"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(JSON.stringify({ title: "B", order: 2 }))
      .mockReturnValueOnce(JSON.stringify({ title: "A", order: 1 }))
      .mockReturnValueOnce(JSON.stringify({ title: "C" }));

    const projects = await getProjects();

    expect(projects.map((p) => p.title)).toEqual(["A", "B", "C"]);
  });

  it("skips invalid JSON files and logs errors", async () => {
    mockedFs.readdirSync.mockReturnValue(["valid.json", "invalid.json"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(JSON.stringify({ title: "Valid" }))
      .mockReturnValueOnce("invalid json");

    const projects = await getProjects();

    expect(projects).toHaveLength(1);
    expect(projects[0].title).toBe("Valid");
    // Logger error should be called
  });

  it("handles non-object JSON", async () => {
    mockedFs.readdirSync.mockReturnValue(["array.json"]);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(["array"]));

    const projects = await getProjects();

    expect(projects).toHaveLength(0);
  });
});

describe("getFeaturedProjects", () => {
  it("returns projects with order 1-6", async () => {
    mockedFs.readdirSync.mockReturnValue(["feat1.json", "feat2.json", "nonfeat.json"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(JSON.stringify({ title: "Feat1", order: 1 }))
      .mockReturnValueOnce(JSON.stringify({ title: "Feat2", order: 6 }))
      .mockReturnValueOnce(JSON.stringify({ title: "NonFeat", order: 7 }));

    const featured = await getFeaturedProjects();

    expect(featured).toHaveLength(2);
    expect(featured.map((p) => p.title)).toEqual(["Feat1", "Feat2"]);
  });
});

describe("getProjectBySlug", () => {
  it("returns project by slug", async () => {
    mockedFs.readdirSync.mockReturnValue(["test.json"]);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify({ title: "Test Project" }));

    const project = await getProjectBySlug("test");

    expect(project).toMatchObject({ slug: "test", title: "Test Project" });
  });

  it("returns null for non-existent slug", async () => {
    mockedFs.readdirSync.mockReturnValue(["test.json"]);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify({ title: "Test" }));

    const project = await getProjectBySlug("nonexistent");

    expect(project).toBeNull();
  });
});
