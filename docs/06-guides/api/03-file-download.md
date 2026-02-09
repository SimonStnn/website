# Secure File Download API

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [API](./index.md) > File Download

This guide explains the secure file download system for serving PDFs and other downloadable files.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Implementation](#implementation)
- [Security Features](#security-features)
- [Supported File Types](#supported-file-types)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Overview

The file download API provides secure, validated downloads for portfolio files like resumes, documents, and certificates.

**Features:**

- **Security:** Validates file paths to prevent directory traversal
- **Type checking:** Only allows specified file types
- **Proper headers:** Sets correct Content-Type and Content-Disposition
- **Error handling:** Graceful 404 for missing files
- **SEO friendly:** Included in sitemap

**Current usage:**

- Resume download: `/download/resume.pdf`
- Certificates, portfolios, etc.

## Architecture

### URL Structure

```
/download/[filename]
```

**Examples:**

- `/download/resume.pdf` → `public/downloads/resume.pdf`
- `/download/certificate.pdf` → `public/downloads/certificate.pdf`
- `/download/portfolio.pdf` → `public/downloads/portfolio.pdf`

### File Storage

```
public/
└── downloads/
    ├── resume.pdf
    ├── certificate.pdf
    └── portfolio.pdf
```

**Why `public/downloads/`?**

- Organized structure
- Easy to manage
- Protected by API route (not directly accessible without validation)

### Route Handler

```
app/
└── download/
    └── [filename]/
        └── route.ts
```

## Implementation

### Basic Structure

```typescript
// app/download/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;

  // Validate and serve file
  const filePath = path.join(process.cwd(), "public/downloads", filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
```

### Full Implementation with Security

```typescript
// app/download/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Allowed file extensions
const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc", ".txt"];

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params;

    // Security: Validate filename
    if (!filename || filename.includes("..") || filename.includes("/")) {
      return new NextResponse("Invalid filename", { status: 400 });
    }

    // Check file extension
    const ext = path.extname(filename).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return new NextResponse("File type not allowed", { status: 403 });
    }

    // Build file path
    const downloadsDir = path.join(process.cwd(), "public/downloads");
    const filePath = path.join(downloadsDir, filename);

    // Ensure file is within downloads directory (prevent traversal)
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(downloadsDir)) {
      return new NextResponse("Access denied", { status: 403 });
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Check file size
    const stats = fs.statSync(filePath);
    if (stats.size > MAX_FILE_SIZE) {
      return new NextResponse("File too large", { status: 413 });
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type
    const contentType = getContentType(ext);

    // Return file with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": stats.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

function getContentType(extension: string): string {
  const contentTypes: Record<string, string> = {
    ".pdf": "application/pdf",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".doc": "application/msword",
    ".txt": "text/plain",
  };

  return contentTypes[extension] || "application/octet-stream";
}
```

## Security Features

### 1. Path Traversal Prevention

**Problem:**

```
/download/../../../etc/passwd
```

Attacker tries to access files outside downloads directory.

**Solution:**

```typescript
// Reject filenames with .. or /
if (filename.includes("..") || filename.includes("/")) {
  return new NextResponse("Invalid filename", { status: 400 });
}

// Verify normalized path is within downloads directory
const normalizedPath = path.normalize(filePath);
if (!normalizedPath.startsWith(downloadsDir)) {
  return new NextResponse("Access denied", { status: 403 });
}
```

### 2. File Type Validation

**Problem:**

```
/download/malicious.exe
```

Attacker tries to serve executable files.

**Solution:**

```typescript
const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc", ".txt"];

const ext = path.extname(filename).toLowerCase();
if (!ALLOWED_EXTENSIONS.includes(ext)) {
  return new NextResponse("File type not allowed", { status: 403 });
}
```

### 3. File Size Limits

**Problem:** Serving very large files can cause memory issues.

**Solution:**

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const stats = fs.statSync(filePath);
if (stats.size > MAX_FILE_SIZE) {
  return new NextResponse("File too large", { status: 413 });
}
```

### 4. Proper Error Handling

**Don't expose system information:**

```typescript
// ❌ BAD: Exposes internal paths
catch (error) {
  return new NextResponse(error.message, { status: 500 });
}

// ✅ GOOD: Generic error message
catch (error) {
  console.error('Error serving file:', error);
  return new NextResponse('Internal server error', { status: 500 });
}
```

## Supported File Types

### Current Configuration

```typescript
const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc", ".txt"];
```

### Adding New File Types

**Step 1: Add extension to allow list**

```typescript
const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".docx",
  ".doc",
  ".txt",
  ".zip", // Add new type
];
```

**Step 2: Add content type mapping**

```typescript
function getContentType(extension: string): string {
  const contentTypes: Record<string, string> = {
    ".pdf": "application/pdf",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".doc": "application/msword",
    ".txt": "text/plain",
    ".zip": "application/zip", // Add mapping
  };

  return contentTypes[extension] || "application/octet-stream";
}
```

**Step 3: Update max file size if needed**

```typescript
// For larger files like videos
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
```

### Common Content Types

| Extension | Content-Type                                                                |
| --------- | --------------------------------------------------------------------------- |
| `.pdf`    | `application/pdf`                                                           |
| `.docx`   | `application/vnd.openxmlformats-officedocument.wordprocessingml.document`   |
| `.doc`    | `application/msword`                                                        |
| `.txt`    | `text/plain`                                                                |
| `.zip`    | `application/zip`                                                           |
| `.jpg`    | `image/jpeg`                                                                |
| `.png`    | `image/png`                                                                 |
| `.json`   | `application/json`                                                          |
| `.csv`    | `text/csv`                                                                  |
| `.xlsx`   | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`         |
| `.pptx`   | `application/vnd.openxmlformats-officedocument.presentationml.presentation` |

## Usage Examples

### Example 1: Resume Download Link

```typescript
// components/resume-button.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function ResumeButton() {
  return (
    <Button asChild>
      <Link href="/download/resume.pdf" download>
        <Download className="mr-2 h-4 w-4" />
        Download Resume
      </Link>
    </Button>
  );
}
```

### Example 2: Multiple File Downloads

```typescript
// components/downloads-section.tsx
const downloadableFiles = [
  { name: 'Resume', filename: 'resume.pdf', description: 'My latest resume' },
  { name: 'Portfolio', filename: 'portfolio.pdf', description: 'Full portfolio PDF' },
  { name: 'Certificate', filename: 'certificate.pdf', description: 'AWS Certificate' },
];

export function DownloadsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {downloadableFiles.map((file) => (
        <Card key={file.filename}>
          <CardHeader>
            <CardTitle>{file.name}</CardTitle>
            <CardDescription>{file.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline" size="sm">
              <Link href={`/download/${file.filename}`} download>
                Download
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

### Example 3: Programmatic Download

```typescript
// Client component with download logic
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function DownloadWithTracking() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      // Track download
      await fetch('/api/track', {
        method: 'POST',
        body: JSON.stringify({ event: 'resume_download' }),
      });

      // Trigger download
      const link = document.createElement('a');
      link.href = '/download/resume.pdf';
      link.download = 'resume.pdf';
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={downloading}>
      {downloading ? 'Downloading...' : 'Download Resume'}
    </Button>
  );
}
```

### Example 4: Dynamic Filename

```typescript
// Generate filename with user name
export function PersonalizedDownload() {
  const filename = `${siteConfig.author.name.replace(' ', '_')}_Resume.pdf`;

  return (
    <Button asChild>
      <Link href="/download/resume.pdf" download={filename}>
        Download Resume
      </Link>
    </Button>
  );
}
```

## Error Handling

### Client-Side Error Handling

```typescript
'use client';

export function DownloadButton({ filename }: { filename: string }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/download/${filename}`);

      if (!response.ok) {
        if (response.status === 404) {
          alert('File not found. Please contact the site administrator.');
        } else if (response.status === 403) {
          alert('You do not have permission to download this file.');
        } else {
          alert('An error occurred while downloading the file.');
        }
        return;
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  return <Button onClick={handleDownload}>Download</Button>;
}
```

### Server-Side Error Logging

```typescript
// app/download/[filename]/route.ts
try {
  // File serving logic
} catch (error) {
  // Log detailed error server-side
  console.error("File download error:", {
    filename: params.filename,
    error: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  // Return generic error to client
  return new NextResponse("Internal server error", { status: 500 });
}
```

## Best Practices

### 1. Organize Files

```
public/
└── downloads/
    ├── resumes/
    │   ├── resume-en.pdf
    │   └── resume-nl.pdf
    ├── certificates/
    │   ├── aws-certificate.pdf
    │   └── azure-certificate.pdf
    └── portfolios/
        └── portfolio-2024.pdf
```

**Update route to support subdirectories:**

```typescript
// app/download/[...path]/route.ts
export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const filePath = path.join(process.cwd(), "public/downloads", ...params.path);
  // ... rest of logic
}
```

**Access:**

- `/download/resumes/resume-en.pdf`
- `/download/certificates/aws-certificate.pdf`

### 2. Add to Sitemap

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const downloads = [
    {
      url: `${baseUrl}/download/resume.pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...otherRoutes, ...downloads];
}
```

### 3. Set Proper Cache Headers

```typescript
// For files that change frequently
'Cache-Control': 'public, max-age=3600' // 1 hour

// For files that rarely change
'Cache-Control': 'public, max-age=31536000, immutable' // 1 year
```

### 4. Add Analytics Tracking

```typescript
// Track downloads in middleware or route
await fetch(analyticsEndpoint, {
  method: "POST",
  body: JSON.stringify({
    event: "file_download",
    filename: params.filename,
    timestamp: new Date().toISOString(),
  }),
});
```

### 5. Provide File Metadata

```typescript
// lib/downloads.ts
export const downloadableFiles = [
  {
    filename: 'resume.pdf',
    title: 'Resume',
    description: 'My latest resume in PDF format',
    size: '150 KB',
    lastUpdated: '2024-02-09',
  },
  // ... more files
];

// Use in components
import { downloadableFiles } from '@/lib/downloads';

export function DownloadsList() {
  return (
    <ul>
      {downloadableFiles.map((file) => (
        <li key={file.filename}>
          <Link href={`/download/${file.filename}`}>
            {file.title} ({file.size}) - Updated {file.lastUpdated}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

### 6. Version Files

```typescript
// Use date versioning
resume-2024-02.pdf
portfolio-v2.pdf
certificate-2024.pdf

// Or semantic versioning
resume-1.0.pdf
resume-1.1.pdf
```

### 7. Compress Large Files

```bash
# Compress PDFs
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -sOutputFile=resume-compressed.pdf resume.pdf

# Or use online tools: smallpdf.com, ilovepdf.com
```

## See Also

- [Middleware Documentation](./01-middleware.md) - Request tracking
- [LLMs.txt Documentation](./02-llms-txt.md) - AI agent discovery
- [SEO Guide](../seo/01-seo-guide.md) - SEO implementation
- [Best Practices](../03-best-practices.md) - Code patterns

## Next Steps

- Add downloadable files to `public/downloads/`
- Test download links
- Add to navigation/UI
- Include in sitemap
- Set up analytics tracking
- Monitor download metrics

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
