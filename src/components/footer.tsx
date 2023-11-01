import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-28 border-t bg-background text-sm text-secondary-foreground">
      <div className="flex gap-10">
        <span><span className="sr-only">&copy;</span><FontAwesomeIcon icon={faCopyright}/> Simon 2023</span>
        <span>
          <Link
            href={"https://github.com/SimonStnn"}
            target="_blank"
            className={buttonVariants({
              variant: "link",
              size: "0",
              className: "flex gap-2",
            })}
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
            Github
          </Link>
        </span>
      </div>
    </footer>
  );
}
