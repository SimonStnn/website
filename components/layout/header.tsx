"use client";

import React, { useState } from "react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Star,
  LayoutGrid,
  Zap,
  Trophy,
  Mail,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Separator } from "@/components/ui/separator";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { useContactDialog } from "@/components/contact-dialog";

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  label: string;
  href?: string;
  action?: "contact";
  icon?: React.ElementType;
  items?: {
    label: string;
    href: string;
    description?: string;
    icon?: React.ElementType;
  }[];
}

const navigationItems: NavigationItem[] = [
  { href: "/#home", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: User },
  { href: "/#experience", label: "Experience", icon: Briefcase },
  {
    label: "Projects",
    icon: FolderOpen,
    items: [
      {
        label: "Featured Projects",
        href: "/#projects",
        icon: Star,
        description: "Browse my featured projects.",
      },
      {
        label: "All Projects",
        href: "/projects",
        icon: LayoutGrid,
        description: "Browse all my projects.",
      },
    ],
  },
  { href: "/#skills", label: "Skills", icon: Zap },
  { href: "/#achievements", label: "Achievements", icon: Trophy },
  { action: "contact", label: "Contact", icon: Mail },
];

export function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openContact } = useContactDialog();

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    openContact();
  };

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
              ) : item.action === "contact" ? (
                // Contact action — opens dialog
                <NavigationMenuLink asChild>
                  <Button
                    variant="link"
                    onClick={handleContactClick}
                    className="text-primary-foreground/80 hover:text-primary-foreground capitalize"
                  >
                    {item.label}
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
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
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
          <SheetContent side="right" className="flex flex-col gap-0 p-0">
            <SheetHeader className="px-6 pt-6 pb-4">
              <SheetTitle className="text-xl font-bold">{siteConfig.name}</SheetTitle>
              <p className="text-muted-foreground text-sm">{siteConfig.person.jobTitle}</p>
            </SheetHeader>
            <Separator />
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="flex flex-col gap-0.5">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium",
                          "text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                        )}
                      >
                        {item.icon &&
                          React.createElement(item.icon, {
                            className: "text-muted-foreground size-5 shrink-0",
                          })}
                        {item.label}
                      </Link>
                    ) : item.action === "contact" ? (
                      <button
                        onClick={handleContactClick}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium",
                          "text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                        )}
                      >
                        {item.icon &&
                          React.createElement(item.icon, {
                            className: "text-muted-foreground size-5 shrink-0",
                          })}
                        {item.label}
                      </button>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 px-3 py-2.5">
                          {item.icon &&
                            React.createElement(item.icon, {
                              className: "text-muted-foreground size-5 shrink-0",
                            })}
                          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                            {item.label}
                          </span>
                        </div>
                        <div className="ml-[1.1rem] flex flex-col gap-0.5 border-l pl-4">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                                "text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                              )}
                            >
                              {subItem.icon &&
                                React.createElement(subItem.icon, {
                                  className: "text-muted-foreground size-4 shrink-0",
                                })}
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
            <Separator />
            <div className="flex items-center gap-1 px-4 py-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-2 transition-colors"
              >
                <GitHubIcon className="size-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-2 transition-colors"
              >
                <LinkedInIcon className="size-5" />
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                aria-label="Email"
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-2 transition-colors"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
