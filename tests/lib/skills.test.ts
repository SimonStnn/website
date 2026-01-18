import { getSkills, generateSkillId } from "@/lib/skills";
import { getProjects } from "@/lib/projects";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Mock getProjects
jest.mock("@/lib/projects", () => ({
  getProjects: jest.fn(),
}));

const mockedGetProjects = getProjects as jest.MockedFunction<typeof getProjects>;

describe("generateSkillId", () => {
  it("converts skill name to lowercase id", () => {
    expect(generateSkillId("JavaScript")).toBe("javascript");
  });

  it("removes special characters", () => {
    expect(generateSkillId("C++")).toBe("c");
    expect(generateSkillId("C#")).toBe("c");
  });

  it("replaces spaces with hyphens", () => {
    expect(generateSkillId("Node.js")).toBe("nodejs");
  });

  it("handles multiple hyphens", () => {
    expect(generateSkillId("a--b")).toBe("a-b");
  });

  it("removes leading/trailing hyphens", () => {
    expect(generateSkillId("-test-")).toBe("test");
  });

  it("handles empty string", () => {
    expect(generateSkillId("")).toBe("");
  });
});

describe("getSkills", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("aggregates skills from projects", async () => {
    const mockProjects = [
      {
        slug: "proj1",
        technologies: ["React", "TypeScript"],
      },
      {
        slug: "proj2",
        technologies: ["React", "Node.js"],
      },
    ] as any;

    mockedGetProjects.mockResolvedValue(mockProjects);

    const skills = await getSkills();

    expect(skills).toHaveLength(3);
    const reactSkill = skills.find((s) => s.name === "React");
    expect(reactSkill?.projects).toHaveLength(2);
    expect(reactSkill?.id).toBe("react");
  });

  it("deduplicates projects for same skill", async () => {
    const mockProjects = [
      {
        slug: "proj1",
        technologies: ["React", "React"],
      },
    ] as any;

    mockedGetProjects.mockResolvedValue(mockProjects);

    const skills = await getSkills();

    const reactSkill = skills.find((s) => s.name === "React");
    expect(reactSkill?.projects).toHaveLength(1);
  });

  it("sorts skills alphabetically", async () => {
    const mockProjects = [
      {
        slug: "proj1",
        technologies: ["Z", "A"],
      },
    ] as any;

    mockedGetProjects.mockResolvedValue(mockProjects);

    const skills = await getSkills();

    expect(skills.map((s) => s.name)).toEqual(["A", "Z"]);
  });
});
