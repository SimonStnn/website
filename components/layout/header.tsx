"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
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

interface HeaderProps {
  className?: string;
}

const navigationItems = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
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
      <NavigationMenu className="hidden md:flex md:w-full md:grow md:justify-end">
        <NavigationMenuList>
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <Button variant="link" asChild>
                  <Link
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground text-lg font-bold capitalize"
                  >
                    {item.label}
                  </Link>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Mobile Menu Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <hr />
            <nav className="flex flex-col">
              {navigationItems.map((item) => (
                <SheetClose key={item.href} asChild>
                  <Button variant="link" className="justify-start" size="lg" asChild>
                    <Link href={item.href} className="justify-start">
                      {item.label}
                    </Link>
                  </Button>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
