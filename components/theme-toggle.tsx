"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const getThemeIcon = (themeName: string, size = "size-4") => {
  if (themeName === "light") return <Sun className={size} />;
  if (themeName === "dark") return <Moon className={size} />;
  return <Monitor className={size} />;
};

export function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a skeleton until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <>
        <Skeleton className="mr-1 size-5 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          aria-label="Toggle theme"
          className="text-primary-foreground/80 hover:text-primary-foreground"
        >
          {getThemeIcon(theme ?? "system", "size-5")}
          <span>Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((themeName) => (
          <DropdownMenuItem
            key={themeName}
            onClick={() => setTheme(themeName)}
            className="flex cursor-pointer items-center gap-2"
          >
            {getThemeIcon(themeName)}
            <span className="flex-1">{themeName.charAt(0).toUpperCase() + themeName.slice(1)}</span>
            {theme === themeName && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
