"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Hamburger } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/#home" className="text-lg font-bold capitalize">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/#about" className="text-lg font-bold capitalize">
                About
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/#projects" className="text-lg font-bold capitalize">
                Projects
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/#contact" className="text-lg font-bold capitalize">
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Hamburger className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-background absolute top-16 right-0 left-0 z-50 border-b md:hidden">
          <nav className="flex flex-col p-4">
            <Link
              href="/#home"
              className="hover:bg-muted rounded-md px-4 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="hover:bg-muted rounded-md px-4 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#projects"
              className="hover:bg-muted rounded-md px-4 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/#contact"
              className="hover:bg-muted rounded-md px-4 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
