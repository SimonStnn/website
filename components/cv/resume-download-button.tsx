"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESUME_URL = "/download/resume.pdf";
const RESUME_FILENAME = "Stijnen Simon resume.pdf";

export function handleResumeDownloadClick() {
  // Trigger download with suggested filename
  const a = document.createElement("a");
  a.href = RESUME_URL;
  a.download = RESUME_FILENAME;
  a.click();

  // Open in new tab so the user can view it immediately
  window.open(RESUME_URL, "_blank", "noopener,noreferrer");
}

export default function ResumeDownloadButton() {
  return (
    <Button variant="secondary" size="lg" onClick={handleResumeDownloadClick}>
      Resume
      <Download />
    </Button>
  );
}
