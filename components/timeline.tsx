import { cn } from "@/lib/utils";
import Image from "next/image";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  logo?: string;
}

export function TimelineItem({ year, title, company, description, logo }: TimelineItemProps) {
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
        <div className="bg-primary absolute top-[6px] left-[-3.5px] mt-5 h-2 w-2 rounded-full"></div>
      )}

      {/* Content */}
      <div className="text-muted-foreground mb-1 pt-5 text-sm">{year}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-2">{company}</p>
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
