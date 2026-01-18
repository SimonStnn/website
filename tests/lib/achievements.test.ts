import { getAchievements } from "@/lib/achievements";
import fs from "fs";

// Mock fs
jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("getAchievements", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns empty array if directory does not exist", async () => {
    mockedFs.existsSync.mockReturnValue(false);

    const achievements = await getAchievements();

    expect(achievements).toEqual([]);
  });

  it("reads and parses achievement JSON files", async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(["ach1.json", "ach2.json"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(
        JSON.stringify({
          title: "Achievement 1",
          issuer: "Issuer 1",
          date: "2023-01-01",
          type: "certification",
          description: "Desc 1",
          order: 1,
        })
      )
      .mockReturnValueOnce(
        JSON.stringify({
          title: "Achievement 2",
          issuer: "Issuer 2",
          date: "2023-02-01",
          type: "award",
        })
      );

    const achievements = await getAchievements();

    expect(achievements).toHaveLength(2);
    expect(achievements[0]).toMatchObject({
      slug: "ach1",
      title: "Achievement 1",
      order: 1,
    });
  });

  it("sorts by order, then by date descending", async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(["old.json", "ordered.json", "new.json"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(
        JSON.stringify({ title: "Old", date: "2022-01-01", type: "certification" })
      )
      .mockReturnValueOnce(
        JSON.stringify({ title: "Ordered", date: "2023-01-01", type: "award", order: 1 })
      )
      .mockReturnValueOnce(
        JSON.stringify({ title: "New", date: "2024-01-01", type: "achievement" })
      );

    const achievements = await getAchievements();

    expect(achievements.map((a) => a.title)).toEqual(["Ordered", "New", "Old"]);
  });

  it("skips invalid JSON and logs errors", async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(["valid.json", "invalid.json"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(
        JSON.stringify({ title: "Valid", date: "2023-01-01", type: "certification" })
      )
      .mockReturnValueOnce("invalid");

    const achievements = await getAchievements();

    expect(achievements).toHaveLength(1);
  });
});
