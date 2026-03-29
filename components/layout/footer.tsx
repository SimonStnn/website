import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SocialLink from "@/components/social-link";
import Copyright from "@/components/copyright";
import { siteConfig } from "@/lib/config";
import { FileDownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Mail as MailIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { EmailCopyButton } from "@/components/email-copy-button";
interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn("bg-primary/70 dark:bg-primary/30 text-primary-foreground w-full", className)}
    >
      <Separator className="from-accent via-muted to-primary bg-gradient-to-r" />
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-8 py-12 md:grid-cols-5">
        {/* Name and Description */}
        <div className="flex flex-col gap-3 md:col-span-3">
          <Link href="/" className="text-xl font-bold">
            {siteConfig.name}
          </Link>
          <p className="text-primary-foreground/80">
            Software Engineering & AI student building scalable software solutions.
          </p>
          <p className="text-primary-foreground/70 text-sm">
            Currently studying at VIVES University of Applied Sciences, focusing on AI applications
            and modern software development practices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="hidden md:block">
          <h3 className="mb-3 font-semibold">Navigate</h3>
          <ul className="space-y-0 text-sm">
            <li>
              <Button variant="link" asChild>
                <Link
                  href="/#about"
                  className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !p-0 transition-colors"
                >
                  About
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link
                  href="/#experience"
                  className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !p-0 transition-colors"
                >
                  Experience
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link
                  href="/#projects"
                  className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !p-0 transition-colors"
                >
                  Projects
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link
                  href="/#achievements"
                  className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !p-0 transition-colors"
                >
                  Achievements
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link
                  href="https://docs.simon.stijnen.be/"
                  target="_blank"
                  className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !p-0 transition-colors"
                >
                  Documentation
                </Link>
              </Button>
            </li>
            <Separator className="bg-border/30 my-1" />
            <li>
              <Button variant="link" size="sm" asChild>
                <Link
                  href="/sitemap.xml"
                  className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !p-0 transition-colors"
                  target="_blank"
                >
                  Sitemap
                </Link>
              </Button>
            </li>
          </ul>
        </div>

        {/* Contact Links */}
        <div>
          <h3 id="contact" className="mb-3 font-semibold">
            Connect
          </h3>
          <ul>
            <li>
              <Button
                variant="link"
                className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !px-0"
                asChild
              >
                <SocialLink
                  href={siteConfig.social.linkedin}
                  ariaLabel="LinkedIn"
                  label="LinkedIn"
                  icon={LinkedInIcon}
                />
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !px-0"
                asChild
              >
                <SocialLink
                  href={siteConfig.social.github}
                  ariaLabel="Github"
                  label="Github"
                  icon={GitHubIcon}
                />
              </Button>
            </li>
            <li className="flex items-center">
              <Button
                variant="link"
                className="text-primary-foreground/80 hover:text-primary-foreground grow justify-start !px-0"
                asChild
              >
                <SocialLink
                  href={`mailto:${siteConfig.author.email}`}
                  ariaLabel="Email"
                  label="Email"
                  icon={MailIcon}
                />
              </Button>
              <EmailCopyButton className="text-primary-foreground/80 hover:text-primary-foreground" />
            </li>
            <li>
              <Button
                variant="link"
                className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !px-0"
                asChild
              >
                <SocialLink
                  href="/download/resume.pdf"
                  ariaLabel="Download Resume"
                  label="Resume"
                  icon={FileDownloadIcon}
                  download="Stijnen Simon resume.pdf"
                />
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <Separator className="from-accent via-muted to-primary bg-gradient-to-r" />
      <Copyright className="text-primary-foreground/80 mx-auto py-6 text-center text-sm md:text-base" />
    </footer>
  );
}

export default Footer;
