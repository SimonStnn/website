import { createFileDownloadResponse } from "@/lib/file-download";

/**
 * File download mapping configuration
 * Maps route parameters to actual files in public directory
 */
const FILE_MAPPINGS: Record<
  string,
  { filePath: string; downloadFilename?: string; forceDownload?: boolean }
> = {
  // Resume/CV mappings
  "resume.pdf": {
    filePath: "cv_Simon-Stijnen.pdf",
    downloadFilename: "cv_Simon_Stijnen.pdf",
  },
  "cv.pdf": {
    filePath: "cv_Simon-Stijnen.pdf",
    downloadFilename: "cv_Simon_Stijnen.pdf",
  },

  // Add more file mappings as needed
  // 'project-report.pdf': {
  //   filePath: 'reports/project-x-2025.pdf',
  //   downloadFilename: 'Simon_Stijnen_Project_Report.pdf',
  // },
};

/**
 * Dynamic route handler for file downloads
 * Accesses files based on the filename parameter
 */
export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;

  // Check if we have a mapping for this file
  const fileConfig = FILE_MAPPINGS[filename];

  if (!fileConfig) {
    return new Response("File not found", { status: 404 });
  }

  // Use the download utility to serve the file
  return createFileDownloadResponse({
    filePath: fileConfig.filePath,
    downloadFilename: fileConfig.downloadFilename,
    forceDownload: fileConfig.forceDownload !== false, // Default to true if not specified
  });
}
