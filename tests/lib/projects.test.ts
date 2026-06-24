import { getProjects, getFeaturedProjects, getProjectBySlug } from "@/lib/projects";
import fs from "fs";

// Mock fs
jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

const mockMtime = new Date("2024-01-01");

// Helpers to build markdown frontmatter strings for test data
function mkMd(fields: Record<string, unknown>, body = "") {
  const lines = ["---"];
  for (const [k, v] of Object.entries(fields)) {
    if (Array.isArray(v)) {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    } else {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    }
  }
  lines.push("---");
  if (body) lines.push("", body);
  return lines.join("\n");
}

describe("getProjects", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFs.statSync.mockReturnValue({ mtime: mockMtime } as fs.Stats);
  });

  it("reads and parses project markdown files correctly", async () => {
    mockedFs.readdirSync.mockReturnValue(["project1.md", "project2.md"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(
        mkMd(
          {
            title: "Project 1",
            shortDescription: "Desc 1",
            technologies: ["Tech1"],
            images: [{ src: "img1.jpg", alt: "Alt1" }],
            order: 1,
          },
          "Full desc 1"
        )
      )
      .mockReturnValueOnce(
        mkMd(
          {
            title: "Project 2",
            shortDescription: "Desc 2",
            technologies: ["Tech2"],
            images: [{ src: "img2.jpg", alt: "Alt2" }],
          },
          "Full desc 2"
        )
      );

    const projects = await getProjects();

    expect(projects).toHaveLength(2);
    expect(projects[0]).toMatchObject({
      slug: "project1",
      title: "Project 1",
      order: 1,
    });
    expect(projects[0].contentHtml).toContain("Full desc 1");
    expect(projects[1]).toMatchObject({
      slug: "project2",
      title: "Project 2",
    });
  });

  it("sorts projects by order, then alphabetically", async () => {
    mockedFs.readdirSync.mockReturnValue(["b.md", "a.md", "c.md"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(mkMd({ title: "B", order: 2 }))
      .mockReturnValueOnce(mkMd({ title: "A", order: 1 }))
      .mockReturnValueOnce(mkMd({ title: "C" }));

    const projects = await getProjects();

    expect(projects.map((p) => p.title)).toEqual(["A", "B", "C"]);
  });

  it("skips invalid markdown files and logs errors", async () => {
    mockedFs.readdirSync.mockReturnValue(["valid.md", "invalid.md"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(mkMd({ title: "Valid" }, "Body"))
      // Simulate a readFileSync that throws on the second call
      .mockImplementationOnce(() => {
        throw new Error("Read error");
      });

    const projects = await getProjects();

    expect(projects).toHaveLength(1);
    expect(projects[0].title).toBe("Valid");
  });

  it("only reads .md files, ignores others", async () => {
    mockedFs.readdirSync.mockReturnValue(["project1.md", "readme.txt", "data.json"]);
    mockedFs.readFileSync.mockReturnValueOnce(mkMd({ title: "Project 1" }));

    const projects = await getProjects();

    expect(projects).toHaveLength(1);
    expect(mockedFs.readFileSync).toHaveBeenCalledTimes(1);
  });
});

describe("getFeaturedProjects", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFs.statSync.mockReturnValue({ mtime: mockMtime } as fs.Stats);
  });

  it("returns projects with order 1-6", async () => {
    mockedFs.readdirSync.mockReturnValue(["feat1.md", "feat2.md", "nonfeat.md"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(mkMd({ title: "Feat1", order: 1 }))
      .mockReturnValueOnce(mkMd({ title: "Feat2", order: 6 }))
      .mockReturnValueOnce(mkMd({ title: "NonFeat", order: 7 }));

    const featured = await getFeaturedProjects();

    expect(featured).toHaveLength(2);
    expect(featured.map((p) => p.title)).toEqual(["Feat1", "Feat2"]);
  });
});

describe("getProjectBySlug", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFs.statSync.mockReturnValue({ mtime: mockMtime } as fs.Stats);
  });

  it("returns project by slug", async () => {
    mockedFs.readdirSync.mockReturnValue(["test.md"]);
    mockedFs.readFileSync.mockReturnValue(mkMd({ title: "Test Project" }, "Body"));

    const project = await getProjectBySlug("test");

    expect(project).toMatchObject({ slug: "test", title: "Test Project" });
    expect(project?.contentHtml).toBeTruthy();
  });

  it("returns null for non-existent slug", async () => {
    mockedFs.readdirSync.mockReturnValue(["test.md"]);
    mockedFs.readFileSync.mockReturnValue(mkMd({ title: "Test" }));

    const project = await getProjectBySlug("nonexistent");

    expect(project).toBeNull();
  });
});
