import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import RedirectLink from "./redirect=link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-28 border-t bg-background text-sm text-secondary-foreground">
      <div className="flex gap-10">
        <span>
          <span className="sr-only">&copy;</span>
          <FontAwesomeIcon icon={faCopyright} /> Simon 2023
        </span>
        <span>
          <RedirectLink href={"https://github.com/SimonStnn"} className="text-sm">
            <FontAwesomeIcon icon={faGithub} size="lg" />
            Github
          </RedirectLink>
        </span>
      </div>
    </footer>
  );
}
