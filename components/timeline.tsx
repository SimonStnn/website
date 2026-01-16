"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  logo?: string;
  projectLink?: string;
  companyUrl?: string;
  /**
   * If true, formats date ranges to replace future end dates with "Present".
   */
  smartDates?: boolean;
}

function formatDateRange(year: string): string {
  // Handle date ranges like "Jan. 2026 - Jun. 2026"
  if (year.includes(" - ")) {
    const [start, end] = year.split(" - ").map((s) => s.trim());

    // Parse end date to check if it's in the future
    // Create a proper date from "Mon. YYYY" format for cross-browser compatibility
    const monthYearRegex = /([A-Za-z]+)\.\s(\d{4})/;
    const match = end.match(monthYearRegex);

    if (match) {
      const [, monthStr, yearStr] = match;
      // Create date with the first day of the month to ensure it's valid
      const endDate = new Date(`${monthStr} 1, ${yearStr}`);
      const today = new Date();

      // If end date is in the future, replace with "Present"
      if (endDate > today) {
        return `${start} - Present`;
      }
    }
  }
  return year;
}

function DateDisplay({ year, smartDates = false }: { year: string; smartDates?: boolean }) {
  const [displayYear, setDisplayYear] = useState(year);

  useEffect(() => {
    if (smartDates) {
      setDisplayYear(formatDateRange(year));
    }
  }, [year, smartDates]);

  return <div className="text-muted-foreground mb-1 pt-5 text-sm">{displayYear}</div>;
}

export function TimelineItem({
  year,
  title,
  company,
  companyUrl,
  description,
  logo,
  projectLink,
  smartDates = false,
}: TimelineItemProps) {
  return (
    <div className="relative ml-5 pl-10 last:pb-5">
      {/* Vertical line */}
      <div className="bg-border absolute top-0 bottom-0 left-0 w-px"></div>

      {/* Company logo or circle marker */}
      {logo ? (
        <div
          className={cn(
            "bg-card absolute top-12 -left-6 h-12 w-12 rounded-full border-[1.5px] p-0.5"
            // ,"from-accent via-secondary to-primary bg-gradient-to-br"
          )}
        >
          <Image
            src={logo}
            alt={`${company} logo`}
            width={48}
            height={48}
            className="h-full w-full rounded-full object-contain text-xs"
          />
        </div>
      ) : (
        <div className="bg-primary absolute top-12 left-[-3.5px] mt-5 h-2 w-2 rounded-full"></div>
      )}

      {/* Content */}
      <DateDisplay year={year} smartDates={smartDates} />
      <div className="flex items-baseline gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {projectLink && (
          <Button variant="link" size="sm" className="h-full" asChild>
            <Link
              href={projectLink}
              target={projectLink.startsWith("http") ? "_blank" : undefined}
              rel={projectLink.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              View Project
              <ExternalLink className="size-4" />
            </Link>
          </Button>
        )}
      </div>
      <p className="text-muted-foreground mb-2">
        {companyUrl ? (
          <Link
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            {company}
            <ExternalLink className="ml-1 inline size-3 align-baseline" />
          </Link>
        ) : (
          company
        )}
      </p>
      <p>{description}</p>
    </div>
  );
}

interface TimelineProps {
  items: TimelineItemProps[];
  /**
   * If true, formats date ranges to replace future end dates with "Present".
   */
  smartDates?: boolean;
}

export function Timeline({ items, smartDates = false }: TimelineProps) {
  return (
    <div>
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} smartDates={smartDates} />
      ))}
    </div>
  );
}

export default Timeline;
