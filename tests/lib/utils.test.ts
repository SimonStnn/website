import { cn, isVideoFile } from "@/lib/utils";

describe("cn", () => {
  it("merges class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conflicting Tailwind classes", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("handles undefined and null", () => {
    expect(cn("class1", undefined, null, "class2")).toBe("class1 class2");
  });
});

describe("isVideoFile", () => {
  it("returns true for .mp4", () => {
    expect(isVideoFile("video.mp4")).toBe(true);
  });

  it("returns true for .webm", () => {
    expect(isVideoFile("video.webm")).toBe(true);
  });

  it("returns true for .mov", () => {
    expect(isVideoFile("video.mov")).toBe(true);
  });

  it("returns false for non-video files", () => {
    expect(isVideoFile("image.jpg")).toBe(false);
    expect(isVideoFile("document.pdf")).toBe(false);
  });

  it("is case insensitive", () => {
    expect(isVideoFile("video.MP4")).toBe(true);
  });
});
