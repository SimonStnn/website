"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClassValue } from "clsx";
import { cn } from "@/lib/public/utils";
import { locales, Locale, getDictionary } from "@/dictionary";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageChanger({
  className,
  locale,
}: {
  className?: string | ClassValue[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const path = usePathname()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(className, "capitalize")}>
          <FontAwesomeIcon icon={faLanguage} width={14} height={14} />
          <span>{dict.navbar.changeLanguage.title}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="select-none capitalize">
            {dict.navbar.changeLanguage.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {locales.map((loc, i) => {
            return (
              <DropdownMenuItem key={i} className="flex gap-2 items-center">
                <Link
                  className={cn(
                    "capitalize",
                    loc === locale ? "border-b border-b-primary" : ""
                  )}
                  href={`/${loc}${path.slice(3)}`}
                  locale={loc}
                >
                  {
                    dict.navbar.changeLanguage[
                      loc as keyof typeof dict.navbar.changeLanguage
                    ]
                  }
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
