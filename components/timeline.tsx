import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  logo?: string;
  projectLink?: string;
  companyUrl?: string;
}

export function TimelineItem({
  year,
  title,
  company,
  companyUrl,
  description,
  logo,
  projectLink,
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
      <div className="text-muted-foreground mb-1 pt-5 text-sm">{year}</div>
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
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div>
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  );
}

export default Timeline;
