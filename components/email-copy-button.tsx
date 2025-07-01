"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface EmailCopyButtonProps {
  className?: string;
}

export function EmailCopyButton({ className }: EmailCopyButtonProps) {
  const [tooltipContent, setTooltipContent] = React.useState("Copy Email");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.author.email);
    setTooltipContent("Email Copied!");
    setTimeout(() => {
      setTooltipContent("Copy Email");
    }, 2000); // Reset tooltip after 2 seconds
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" onClick={handleCopyEmail} className={cn("", className)}>
          <Copy className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
}
