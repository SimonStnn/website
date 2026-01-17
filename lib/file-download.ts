import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export interface DownloadOptions {
  /**
   * Path to the file relative to the public directory
   * Example: 'cv_Simon-Stijnen.pdf'
   */
  filePath: string;

  /**
   * The filename to use for the downloaded file (defaults to the original filename)
   * Example: 'simon_stijnen_resume.pdf'
   */
  downloadFilename?: string;

  /**
   * Whether to force download as an attachment (true) or allow browser to display inline (false)
   * Default is true (force download)
   */
  forceDownload?: boolean;

  /**
   * MIME type of the file (defaults to auto-detection based on file extension)
   */
  contentType?: string;
}

/**
 * Map of common file extensions to MIME types
 */
const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".txt": "text/plain",
  ".csv": "text/csv",
  ".zip": "application/zip",
};

/**
 * Gets the content type based on the file extension
 */
export function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

/**
 * Creates a response to download a file from the public directory
 */
export function createFileDownloadResponse({
  filePath,
  downloadFilename,
  forceDownload = true,
  contentType,
}: DownloadOptions) {
  // Validate filePath to prevent directory traversal
  if (!filePath || typeof filePath !== "string") {
    return new NextResponse("Invalid file path", { status: 400 });
  }

  // Prevent directory traversal attacks
  if (filePath.includes("..") || filePath.startsWith("/")) {
    return new NextResponse("Invalid file path", { status: 400 });
  }

  // Resolve full path - ensure path is within public directory for security
  const fullPath = path.join(process.cwd(), "public", filePath);

  // Ensure the resolved path is within the public directory
  const publicDir = path.resolve(process.cwd(), "public");
  const resolvedPath = path.resolve(fullPath);
  if (!resolvedPath.startsWith(publicDir)) {
    return new NextResponse("Access denied", { status: 403 });
  }

  // Ensure file exists
  if (!fs.existsSync(fullPath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  try {
    // Read the file
    const fileBuffer = fs.readFileSync(fullPath);

    // Determine content type
    const fileContentType = contentType || getContentType(filePath);

    // Set filename for download - fallback to original filename if not provided
    const finalFilename = downloadFilename || path.basename(filePath);

    // Create response headers
    const headers: Record<string, string> = {
      "Content-Type": fileContentType,
    };

    // Add download header based on preference
    if (forceDownload) {
      headers["Content-Disposition"] = `attachment; filename="${finalFilename}"`;
    } else {
      headers["Content-Disposition"] = `inline; filename="${finalFilename}"`;
    }

    // Return response with file
    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return new NextResponse("Error serving file", { status: 500 });
  }
}
