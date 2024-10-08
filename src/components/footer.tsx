import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import RedirectLink from "./redirect-link";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-6 p-10 py-14 mt-6 border-t bg-background text-sm text-secondary-foreground">
      <span>&copy; 2023 &minus; {new Date().getFullYear()}</span>
      <Separator orientation="vertical" className="hidden sm:inline-block" />
      <span>
        <RedirectLink
          href={"https://github.com/SimonStnn"}
          className="flex gap-2 text-sm"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
          Github
        </RedirectLink>
      </span>
      <Separator orientation="vertical" className="hidden sm:inline-block" />
      <span>
        <RedirectLink
          href={"https://www.linkedin.com/in/simon-stijnen/"}
          className="flex gap-2 text-sm"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
          LinkedIn
        </RedirectLink>
      </span>
      <Separator orientation="vertical" className="hidden sm:inline-block" />
      <span>
        <RedirectLink
          href={"mailto:simon@stijnen.be"}
          className="flex gap-2 text-sm"
        >
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
          simon@stijnen.be
        </RedirectLink>
      </span>
    </footer>
  );
}
