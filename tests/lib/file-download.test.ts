import { createFileDownloadResponse, getContentType } from "@/lib/file-download";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

// Mock fs
jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: jest.fn(),
}));

const MockedNextResponse = NextResponse as jest.MockedClass<typeof NextResponse>;

describe("getContentType", () => {
  it("returns correct MIME type for known extensions", () => {
    expect(getContentType("file.pdf")).toBe("application/pdf");
    expect(getContentType("file.jpg")).toBe("image/jpeg");
    expect(getContentType("file.txt")).toBe("text/plain");
  });

  it("returns octet-stream for unknown extensions", () => {
    expect(getContentType("file.unknown")).toBe("application/octet-stream");
  });

  it("handles case insensitivity", () => {
    expect(getContentType("file.PDF")).toBe("application/pdf");
  });
});

describe("createFileDownloadResponse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    MockedNextResponse.mockClear();
  });

  it("returns 400 for invalid filePath", () => {
    createFileDownloadResponse({ filePath: "" });
    expect(MockedNextResponse).toHaveBeenCalledWith("Invalid file path", { status: 400 });
  });

  it("returns 400 for directory traversal", () => {
    createFileDownloadResponse({ filePath: "../outside" });
    expect(MockedNextResponse).toHaveBeenCalledWith("Invalid file path", { status: 400 });
  });

  it("returns 403 for path outside public", () => {
    const resolveMock = jest.spyOn(path, "resolve");
    resolveMock.mockImplementationOnce(() => "/workspaces/website/public"); // publicDir
    resolveMock.mockImplementationOnce(() => "/outside/public/file.pdf"); // resolvedPath

    createFileDownloadResponse({ filePath: "file.pdf" });

    expect(MockedNextResponse).toHaveBeenCalledWith("Access denied", { status: 403 });
  });

  it("returns 404 for non-existent file", () => {
    mockedFs.existsSync.mockReturnValue(false);

    createFileDownloadResponse({ filePath: "nonexistent.pdf" });

    expect(MockedNextResponse).toHaveBeenCalledWith("File not found", { status: 404 });
  });

  it("creates download response for valid file", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(Buffer.from("file content"));
    MockedNextResponse.mockImplementation((body, options) => ({ body, options }) as any);

    const response = createFileDownloadResponse({ filePath: "test.pdf" });

    expect(MockedNextResponse).toHaveBeenCalledWith(Buffer.from("file content"), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="test.pdf"',
      },
    });
  });

  it("uses custom filename", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(Buffer.from("content"));
    MockedNextResponse.mockImplementation((body, options) => ({ body, options }) as any);

    createFileDownloadResponse({ filePath: "test.pdf", downloadFilename: "custom.pdf" });

    expect(MockedNextResponse).toHaveBeenCalledWith(Buffer.from("content"), {
      status: 200,
      headers: expect.objectContaining({
        "Content-Disposition": 'attachment; filename="custom.pdf"',
      }),
    });
  });

  it("sets inline disposition when forceDownload is false", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(Buffer.from("content"));
    MockedNextResponse.mockImplementation((body, options) => ({ body, options }) as any);

    createFileDownloadResponse({ filePath: "test.pdf", forceDownload: false });

    expect(MockedNextResponse).toHaveBeenCalledWith(Buffer.from("content"), {
      status: 200,
      headers: expect.objectContaining({
        "Content-Disposition": 'inline; filename="test.pdf"',
      }),
    });
  });

  it("uses custom contentType", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(Buffer.from("content"));
    MockedNextResponse.mockImplementation((body, options) => ({ body, options }) as any);

    createFileDownloadResponse({ filePath: "test.unknown", contentType: "custom/type" });

    expect(MockedNextResponse).toHaveBeenCalledWith(Buffer.from("content"), {
      status: 200,
      headers: expect.objectContaining({
        "Content-Type": "custom/type",
      }),
    });
  });

  it("returns 500 on read error", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error("Read error");
    });

    createFileDownloadResponse({ filePath: "test.pdf" });

    expect(MockedNextResponse).toHaveBeenCalledWith("Error serving file", { status: 500 });
    expect(consoleSpy).toHaveBeenCalledWith("Error serving file:", expect.any(Error));
    consoleSpy.mockRestore();
  });
});
