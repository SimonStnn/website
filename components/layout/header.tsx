"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  href?: string;
  items?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

const navigationItems: NavigationItem[] = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  {
    label: "Projects",
    items: [
      {
        label: "Featured Projects",
        href: "/#projects",
        description: "Browse my featured projects.",
      },
      {
        label: "All Projects",
        href: "/projects",
        description: "Browse all my projects.",
      },
    ],
  },
  { href: "/#skills", label: "Skills" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#contact", label: "Contact" },
];

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "bg-primary/95 text-primary-foreground border-primary flex w-full justify-between border-b px-5 py-3",
        "supports-[backdrop-filter]:bg-primary/70 backdrop-blur",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold">
          {siteConfig.name}
        </Link>
      </div>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:flex md:w-full md:grow md:justify-end" viewport={false}>
        <NavigationMenuList>
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.href ? (
                // Simple link
                <NavigationMenuLink asChild>
                  <Button variant="link" asChild>
                    <Link
                      href={item.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground capitalize"
                    >
                      {item.label}
                    </Link>
                  </Button>
                </NavigationMenuLink>
              ) : (
                // Dropdown menu
                <>
                  <NavigationMenuTrigger className="text-primary-foreground/80 hover:text-primary-foreground capitalize">
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-xs">
                      {item.items?.map((subItem) => (
                        <li key={subItem.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className="transition-colors outline-none select-none"
                            >
                              <span className="text-sm leading-none font-medium">
                                {subItem.label}
                              </span>
                              {subItem.description && (
                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                  {subItem.description}
                                </p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Mobile Menu Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              className="text-primary-foreground/80 hover:text-primary-foreground md:hidden"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <Separator />
            <nav className="flex flex-col">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    // Simple link
                    <SheetClose asChild>
                      <Button variant="link" className="justify-start" size="lg" asChild>
                        <Link href={item.href} className="justify-start">
                          {item.label}
                        </Link>
                      </Button>
                    </SheetClose>
                  ) : (
                    // Dropdown items
                    <div className="flex flex-col px-2">
                      <span className="text-muted-foreground px-4 py-2 text-sm font-medium">
                        {item.label}
                      </span>
                      {item.items?.map((subItem) => (
                        <SheetClose key={subItem.href} asChild>
                          <Button variant="link" className="justify-start pl-8" size="lg" asChild>
                            <Link href={subItem.href} className="justify-start">
                              {subItem.label}
                            </Link>
                          </Button>
                        </SheetClose>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
