import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faContactBook,
  faProjectDiagram,
  faCode,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { buttonVariants, Button } from "@components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import ThemeChanger from "@components/themechanger";
import { Locale, getDictionary } from "@/dictionary";
import { ClassValue } from "clsx";
import { cn } from "@/lib/public/utils";
import LanguageChanger from "./languagechanger";

const navbarItemClassName = buttonVariants({
  className: "gap-2",
  variant: "outline",
});

const sheetButtonClassName = buttonVariants({
  className: "w-full justify-start border-none gap-5",
  variant: "ghost",
});

const NavItem = ({
  text,
  href,
  icon,
  className,
}: {
  text: string | React.JSX.Element;
  href: string;
  icon?: React.JSX.Element;
  className?: ClassValue;
}) => {
  return (
    <Link
      href={href}
      className={cn(navbarItemClassName, className)}
      title={text.toString()}
    >
      <span className="flex items-center">{icon}</span>
      <span className="flex items-center capitalize">{text}</span>
    </Link>
  );
};

const Navbar = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);
  const navItems = [
    {
      text: <>{dict.navbar.home}</>,
      href: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      text: <>{dict.navbar.about}</>,
      href: "/about",
      icon: <FontAwesomeIcon icon={faContactBook} />,
    },
    {
      text: <>{dict.navbar.projects}</>,
      href: "/projects",
      icon: <FontAwesomeIcon icon={faProjectDiagram} />,
    },
  ];

  return (
    <nav className="flex flex-row justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14 w-full z-50 sticky top-0 select-none overflow-hidden border-b shadow-md">
      <Link
        href={"/"}
        className="flex justify-center gap-1 items-center font-bold text-xl"
      >
        <FontAwesomeIcon
          icon={faCode}
          className="p-4 transition-transform hover:rotate-180"
          size="xl"
        />
        <span id="logotext" className="transition-transform">
          Simon
        </span>
      </Link>

      <ul className="flex flex-row justify-end items-center gap-1 px-5 py-1">
        {navItems.map((item, i) => (
          <li key={i} className="justify-center items-center hidden sm:block">
            <NavItem text={item.text} href={item.href} icon={item.icon} />
          </li>
        ))}

        <li>
          <Sheet>
            <SheetTrigger className={navbarItemClassName}>
              <FontAwesomeIcon icon={faBars} size="lg" />
              <span className="sr-only">Open Navigation</span>
            </SheetTrigger>
            <SheetContent>
              <ul className="flex flex-col w-11/12">
                {navItems.map((item, i) => (
                  <li key={i} className="block w-full sm:hidden">
                    <SheetClose key={i} asChild>
                      <NavItem
                        text={item.text}
                        href={item.href}
                        icon={item.icon}
                        className={sheetButtonClassName}
                      />
                    </SheetClose>
                  </li>
                ))}
                <hr className="my-3 block w-full sm:hidden" />
                <li>
                  <ThemeChanger className={sheetButtonClassName} locale={locale} />
                </li>
                <li>
                  <LanguageChanger className={sheetButtonClassName} locale={locale} />
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
