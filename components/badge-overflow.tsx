"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface BadgeOverflowProps {
  technologies: string[];
  className?: string;
}

export default function BadgeOverflow({ technologies, className }: BadgeOverflowProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const countRef = useRef<HTMLLIElement>(null);
  const [hiddenTechs, setHiddenTechs] = useState<string[]>([]);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !countRef.current) return;

      // Reset badge visibility
      const badges = containerRef.current.querySelectorAll("li[data-tech]");
      badges.forEach((badge) => ((badge as HTMLElement).style.display = "inline-block"));

      // Hide count badge initially
      countRef.current.style.display = "none";

      // Measure container
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const hidden: string[] = [];

      // Calculate which badges fit
      let currentWidth = 0;
      badges.forEach((badge, i) => {
        const badgeWidth = badge.getBoundingClientRect().width + 8; // 8px for gap
        const tech = technologies[i];

        // Check if this badge would overflow (reserve 60px for count badge)
        if (currentWidth + badgeWidth > containerWidth - 60) {
          (badge as HTMLElement).style.display = "none";
          hidden.push(tech);
        } else {
          currentWidth += badgeWidth;
        }
      });

      // Update hidden techs and count badge
      setHiddenTechs(hidden);

      if (hidden.length > 0) {
        countRef.current.textContent = `+${hidden.length} more`;
        countRef.current.style.display = "inline";
      }
    };

    // Run after DOM update
    requestAnimationFrame(checkOverflow);
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [technologies]);

  return (
    <ul
      className={cn("flex items-baseline gap-2 overflow-hidden whitespace-nowrap", className)}
      ref={containerRef}
    >
      {technologies.map((tech) => (
        <Badge variant="secondary" key={tech} asChild>
          <li data-tech={tech}>{tech}</li>
        </Badge>
      ))}

      {/* "+x more" badge with tooltip */}
      <Tooltip>
        <TooltipTrigger asChild>
          <li
            className="text-muted-foreground cursor-help text-xs text-nowrap"
            style={{ display: "none" }}
            ref={countRef}
            role="tooltip"
            aria-label="Additional technologies"
            data-count
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>{hiddenTechs.length > 0 ? hiddenTechs.join(", ") : "Additional technologies"}</span>
        </TooltipContent>
      </Tooltip>
    </ul>
  );
}
