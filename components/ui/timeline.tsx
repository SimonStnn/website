"use client";

import React from "react";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
}

export function TimelineItem({ year, title, company, description }: TimelineItemProps) {
  return (
    <div className="relative ml-2 pb-12 pl-8 last:pb-0">
      {/* Vertical line */}
      <div className="bg-border absolute top-0 bottom-0 left-0 w-px"></div>

      {/* Circle marker */}
      <div className="bg-primary absolute top-[6px] left-[-4px] h-2 w-2 rounded-full"></div>

      <div className="text-muted-foreground mb-1 text-sm">{year}</div>
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
    <div className="mt-4">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          year={item.year}
          title={item.title}
          company={item.company}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default Timeline;
