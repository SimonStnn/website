import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import RedirectLink from "./redirect-link";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-28 border-t bg-background text-sm text-secondary-foreground">
      <div className="flex gap-6">
        <span>&copy; 2023</span>
          <Separator orientation="vertical" />
        <span>
          <RedirectLink
            href={"https://github.com/SimonStnn"}
            className="flex gap-2 text-sm"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
            Github
          </RedirectLink>
        </span>
        <Separator orientation="vertical" />
        <span>
          <RedirectLink
            href={"https://www.linkedin.com/in/simon-stijnen/"}
            className="flex gap-2 text-sm"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
            LinkedIn
          </RedirectLink>
        </span>
        <Separator orientation="vertical" />
        <span>
          <RedirectLink href={"mailto:simon@stijnen.be"} className="flex gap-2 text-sm">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            simon@stijnen.be
          </RedirectLink>
        </span>
      </div>
    </footer>
  );
}
