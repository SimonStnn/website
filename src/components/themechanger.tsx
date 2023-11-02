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
import { faMoon, faSun, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { ClassValue } from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/public/utils";
import { ThemeProvider, useTheme } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="system"
      themes={["light", "dark", "pink"]}
    >
      {children}
    </ThemeProvider>
  );
}

export default function ThemeChanger({
  className,
}: {
  className?: string | ClassValue[];
}) {
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
          return faWandMagicSparkles
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

  if (!mounted) {
    return <DropdownMenu></DropdownMenu>;
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(className, ``)}>
          <FontAwesomeIcon icon={themeIcon} width={14} height={14} />
          <span className="sr-only">Change theme</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="select-none">
            Change Theme
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
                  className={cn("capitalize", t === theme ? "border-b border-b-primary" : "")}
                >
                  {t}
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
