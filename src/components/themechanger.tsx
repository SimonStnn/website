"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  faMoon,
  faSun,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { ClassValue } from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/public/utils";
import { ThemeProvider, useTheme } from "next-themes";
import { Locale, getDictionary } from "@/dictionary";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="system"
      themes={["light", "dark", "pink"]}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export default function ThemeChanger({
  className,
  locale,
}: {
  className?: string | ClassValue[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme, themes } = useTheme();
  const [themeIcon, setThemeIcon] = useState(faSun);

  const getThemeIcon = useCallback(
    (theme?: string) => {
      if (theme === "system") theme = systemTheme;
      switch (theme) {
        case "dark":
          return faMoon;
        case "light":
          return faSun;
        case "pink":
          return faWandMagicSparkles;
        default:
          return faSun;
      }
    },
    [systemTheme]
  );

  useEffect(() => {
    setThemeIcon(getThemeIcon(theme));
  }, [theme, getThemeIcon]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dropdownMenuTrigger = (
    <DropdownMenuTrigger className={cn(className, "capitalize")}>
      <FontAwesomeIcon icon={themeIcon} width={14} height={14} />
      <span>{dict.navbar.changeTheme.title}</span>
    </DropdownMenuTrigger>
  );

  if (!mounted) {
    return <DropdownMenu>{dropdownMenuTrigger}</DropdownMenu>;
  }
  return (
    <>
      <DropdownMenu>
        {dropdownMenuTrigger}
        <DropdownMenuContent>
          <DropdownMenuLabel className="select-none capitalize">
            {dict.navbar.changeTheme.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {themes.map((t, i) => {
            return (
              <DropdownMenuItem
                key={i}
                className="flex gap-2 items-center"
                onClick={() => {
                  setTheme(t);
                }}
              >
                <span
                  className={cn(
                    "capitalize",
                    t === theme ? "border-b border-b-primary" : ""
                  )}
                >
                  {
                    dict.navbar.changeTheme[
                      t as keyof typeof dict.navbar.changeTheme
                    ]
                  }
                </span>
                <FontAwesomeIcon
                  icon={getThemeIcon(t)}
                  width={14}
                  height={14}
                />
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
