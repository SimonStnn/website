import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SocialLink from "@/components/social-link";
import { siteConfig } from "@/lib/config";
import { FileDownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Mail as MailIcon } from "lucide-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-background w-full border-t p-6", className)}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand and Description */}
          <div className="md:col-span-3">
            <Link href="/" className="text-xl font-bold">
              {siteConfig.name}
            </Link>
            <p className="text-muted-foreground mt-2">
              Web Developer specializing in creating beautiful, functional, and responsive websites.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-3 font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="[>svg]:px-0 h-auto !px-0" asChild>
                  <SocialLink
                    href={siteConfig.social.linkedin}
                    ariaLabel="LinkedIn"
                    label="LinkedIn"
                    icon={LinkedInIcon}
                  />
                </Button>
              </li>
              <li>
                <Button variant="link" className="[>svg]:px-0 h-auto !px-0" asChild>
                  <SocialLink
                    href={siteConfig.social.github}
                    ariaLabel="GitHub"
                    label="GitHub"
                    icon={GitHubIcon}
                  />
                </Button>
              </li>
              <li>
                <Button variant="link" className="[>svg]:px-0 h-auto !px-0" asChild>
                  <SocialLink
                    href={`mailto:${siteConfig.author.email}`}
                    ariaLabel="Email"
                    label="Email"
                    icon={MailIcon}
                  />
                </Button>
              </li>
              <li>
                <Button variant="link" className="[>svg]:px-0 h-auto !px-0" asChild>
                  <SocialLink
                    href="/download/resume.pdf"
                    ariaLabel="Download Resume"
                    label="Resume"
                    icon={FileDownloadIcon}
                  />
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 border-t pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
