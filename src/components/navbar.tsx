import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faContactBook,
  faProjectDiagram,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { buttonVariants } from "@components/ui/button";
import ThemeChanger from "@components/themechanger";

const navbarItemClassName = buttonVariants({
  className: "gap-2",
  variant: "outline",
});

const navItems = [
  {
    text: "Home",
    href: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    text: "About",
    href: "/about",
    icon: <FontAwesomeIcon icon={faContactBook} />,
  },
  {
    text: "Projects",
    href: "/projects",
    icon: <FontAwesomeIcon icon={faProjectDiagram} />,
  },
];

const NavItem = ({
  text,
  href,
  icon,
}: {
  text: string | React.JSX.Element;
  href: string;
  icon?: React.JSX.Element;
}) => {
  return (
    <li className="flex justify-center items-center">
      <Link href={href} className={navbarItemClassName} title={text.toString()}>
        <span className="flex items-center">{icon}</span>
        {!text ? (
          <></>
        ) : (
          <span className="hidden sm:flex sm:items-center sm:visible">
            {text}
          </span>
        )}
      </Link>
    </li>
  );
};

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14 w-full z-50 sticky top-0 select-none overflow-hidden border-b shadow-md">
      <Link
        href="/"
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
          <NavItem key={i} text={item.text} href={item.href} icon={item.icon} />
        ))}

        <li>
          <ThemeChanger className={navbarItemClassName}></ThemeChanger>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
