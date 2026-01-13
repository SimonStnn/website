"use client";
import React from "react";
import { siteConfig } from "@/lib/config";

interface CopyrightProps {
  className?: string;
}

export default function Copyright({ className }: CopyrightProps) {
  return (
    <p
      className={
        className ?? "text-primary-foreground/80 mx-auto py-6 text-center text-sm md:text-base"
      }
    >
      &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
    </p>
  );
}
