import "./cv.css";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  FolderOpen,
  Mail,
  Globe,
  MapPin,
  Phone,
  ArrowLeft,
  Wrench,
  BookOpen,
  User,
  ExternalLink,
  Info,
  Users,
  Link as ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { workExperience, education } from "@/lib/data/experience";
import {
  softSkills,
  bio,
  topSkillsCount,
  suggestedSkills,
  phone,
  references,
  other,
} from "@/lib/data/resume";
import { getSkills, generateSkillId } from "@/lib/skills";
import { getAchievements } from "@/lib/achievements";
import { getFeaturedProjects } from "@/lib/projects";
import { PrintButton } from "@/components/cv/print-button";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import type { ClassValue } from "clsx";

// variable used for sections that are at the top of the second page. This gives them spacing from the page break when printed, improving readability.
const topOfSecondPageClass: ClassValue = "pt-8";

export const metadata: Metadata = {
  title: { absolute: "Stijnen Simon resume" },
  description: `Curriculum Vitae of ${siteConfig.author.name} \u2013 ${siteConfig.person.jobTitle}`,
};

function RightSectionHeader({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="mb-4 -ml-1">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="text-primary h-5 w-5" />
        <h2 className="text-xl font-bold print:break-after-avoid">{title}</h2>
      </div>
      <hr className="border-primary/30" />
    </div>
  );
}

function SidebarSectionHeader({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="size-4" />
        <h2 className="text-sm font-bold tracking-wider uppercase">{title}</h2>
      </div>
      <hr className="border-primary-foreground/30" />
    </div>
  );
}

function EntryDot() {
  return (
    <div className="bg-primary print:bg-primary relative z-10 mt-1.5 size-2.5 flex-shrink-0 rounded-full [print-color-adjust:exact]" />
  );
}

function CVPageFooter() {
  const date = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      className={cn(
        "border-primary-foreground/40 text-primary-foreground/80 mt-auto flex flex-col gap-0.5 border-t pt-3 text-xs",
        "[print-color-adjust:exact] print:fixed print:bottom-6 print:left-6 print:w-[calc(33%-3rem)] print:pt-2 print:text-[8pt]"
      )}
    >
      <span>Generated on {date}</span>
      <span>
        Latest version at{" "}
        <Link href={siteConfig.url}>
          <strong>{new URL(siteConfig.url).hostname}</strong>
        </Link>
      </span>
    </div>
  );
}

export default async function CVPage() {
  const skills = await getSkills();
  const achievements = await getAchievements();
  const featuredProjects = await getFeaturedProjects();

  const suggestedIds = suggestedSkills.map(generateSkillId);
  const topSkills = [...skills]
    .sort((a, b) => {
      const aIdx = suggestedIds.indexOf(a.id);
      const bIdx = suggestedIds.indexOf(b.id);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return b.projects.length - a.projects.length;
    })
    .slice(0, topSkillsCount)
    .map((skill) => {
      switch (skill.name.toLowerCase()) {
        case "typescript":
          return { ...skill, name: "Javascript / TypeScript" };
        default:
          return skill;
      }
    });

  const awards = achievements.filter((a) => a.type === "award");
  const certifications = achievements.filter(
    (a) => a.type === "certification" || a.type === "achievement"
  );

  return (
    <div>
      {/* Action bar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 print:hidden">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft />
            Back to portfolio
          </Link>
        </Button>
        <PrintButton />
      </div>

      {/* Sidebar background repeated on every print page */}
      <div className="print:bg-primary -z-10 hidden [print-color-adjust:exact] print:fixed print:inset-y-0 print:left-0 print:block print:w-[33%]" />

      {/* CV Layout */}
      <div className="cv-layout mx-auto flex max-w-5xl shadow-lg print:max-w-none print:shadow-none">
        {/* Left Sidebar */}
        <aside className="cv-sidebar bg-primary text-primary-foreground print:bg-primary flex w-[33%] flex-col gap-4 p-6 [print-color-adjust:exact] print:text-white">
          {/* Profile */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative size-36">
              <div className="from-accent via-muted to-primary absolute inset-0 rounded-full bg-gradient-to-br" />
              <div className="absolute inset-[3px] overflow-hidden rounded-full">
                <Image
                  src="/images/hero.jpg"
                  alt={siteConfig.author.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl leading-tight font-bold">{siteConfig.author.name}</h1>
              <p className="text-primary-foreground/80 mt-1 text-sm">
                {siteConfig.person.jobTitle}
              </p>
              <div className="text-primary-foreground/80 mt-1 text-xs">
                <MapPin className="-mt-0.5 mr-1 inline size-3.5 flex-shrink-0" />
                <span>
                  {siteConfig.location.city}, {siteConfig.location.country}
                </span>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div>
            <SidebarSectionHeader icon={User} title="About Me" />
            <p className="text-primary-foreground/90 text-xs leading-relaxed">{bio.summary}</p>
          </div>

          {/* Contact */}
          <div>
            <SidebarSectionHeader icon={Mail} title="Contact" />
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-3.5 flex-shrink-0" />
                <Link
                  href={`mailto:${siteConfig.author.email}`}
                  className="break-all hover:underline"
                >
                  {siteConfig.author.email}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="size-3.5 flex-shrink-0" />
                <Link
                  href={siteConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.url.replace("https://", "")}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <LinkedInIcon className="size-3.5 flex-shrink-0" />
                <Link
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.social.linkedin.replace("https://www.linkedin.com/", "")}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <GitHubIcon className="size-3.5 flex-shrink-0" />
                <Link
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.social.github.replace("https://", "")}
                </Link>
              </li>
              {phone && (
                <li className="flex items-center gap-2">
                  <Phone className="size-3.5 flex-shrink-0" />
                  <Link href={`tel:${phone.replace(/\s/g, "")}`} className="hover:underline">
                    {phone}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <SidebarSectionHeader icon={Wrench} title="Skills" />
            <ul className="ml-1 space-y-1 text-xs">
              {topSkills.map((skill) => (
                <li key={skill.id} className="flex gap-2">
                  <span className="bg-primary-foreground/50 mt-[5px] size-1.5 flex-shrink-0 rounded-full" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Soft Skills */}
          <div>
            <SidebarSectionHeader icon={User} title="Soft Skills" />
            <ul className="ml-1 space-y-1 text-xs">
              {softSkills.map((skill) => (
                <li key={skill} className="flex gap-2">
                  <span className="bg-primary-foreground/50 mt-[5px] size-1.5 flex-shrink-0 rounded-full" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          {references.length > 0 && (
            <div>
              <SidebarSectionHeader icon={Users} title="References" />
              <ul className="space-y-3 text-xs">
                {references.map((ref) => (
                  <li key={ref.email}>
                    <p>
                      <span className="font-semibold">{ref.name}</span>
                      <span className="text-primary-foreground/80">
                        {" \u2014 "}
                        <Link
                          href={ref.company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {ref.company.name}
                        </Link>
                      </span>
                    </p>
                    <p className="text-primary-foreground/80 italic">{ref.title}</p>
                    <Link href={`mailto:${ref.email}`} className="break-all hover:underline">
                      {ref.email}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certificates */}
          {certifications.length > 0 && (
            <div className={cn("print:break-inside-avoid", topOfSecondPageClass)}>
              <SidebarSectionHeader icon={BookOpen} title="Certificates" />
              <ul className="ml-1 space-y-1 text-xs">
                {certifications.map((cert) => (
                  <li key={cert.slug} className="flex gap-2">
                    <span className="bg-primary-foreground/50 mt-[5px] size-1.5 flex-shrink-0 rounded-full" />
                    {cert.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Other */}
          {other.length > 0 && (
            <div>
              <SidebarSectionHeader icon={Info} title="Other" />
              <ul className="ml-1 space-y-1 text-xs">
                {other.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="bg-primary-foreground/50 mt-[5px] size-1.5 flex-shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <CVPageFooter />
        </aside>

        {/* Right Main Content */}
        <main className="dark:bg-card flex w-[67%] flex-col gap-7 bg-white p-8 pb-16 print:bg-white print:text-black">
          {/* Experience */}
          <section className="print:break-inside-avoid">
            <RightSectionHeader icon={Briefcase} title="Experience" />
            <div className="relative">
              <div className="bg-primary/80 print:bg-primary/80 absolute top-2 bottom-0 left-1 w-0.5 rounded-full [print-color-adjust:exact]" />
              {workExperience.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex gap-3 print:break-inside-avoid ${i < workExperience.length - 1 ? "pb-3" : ""}`}
                >
                  <EntryDot />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold">{item.title}</span>
                      <span className="text-muted-foreground text-xs whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs italic">
                      {item.companyUrl ? (
                        <Link
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {item.company}
                        </Link>
                      ) : (
                        item.company
                      )}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="print:break-inside-avoid">
            <RightSectionHeader icon={GraduationCap} title="Education" />
            <div className="relative">
              <div className="bg-primary/80 print:bg-primary/80 absolute top-2 bottom-0 left-1 w-0.5 rounded-full [print-color-adjust:exact]" />
              {education.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex gap-3 print:break-inside-avoid ${i < education.length - 1 ? "pb-3" : ""}`}
                >
                  <EntryDot />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold">{item.title}</span>
                      <span className="text-muted-foreground text-xs whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs italic">{item.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Awards */}
          {awards.length > 0 && (
            <section className={cn("print:break-inside-avoid")}>
              <RightSectionHeader icon={Trophy} title="Achievements" />
              <div className="relative">
                <div className="bg-primary/80 print:bg-primary/80 absolute top-2 bottom-0 left-1 w-0.5 rounded-full [print-color-adjust:exact]" />
                {awards.map((award, i) => (
                  <div
                    key={award.slug}
                    className={`relative flex gap-3 print:break-inside-avoid ${i < awards.length - 1 ? "pb-3" : ""}`}
                  >
                    <EntryDot />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-bold">{award.title}</span>
                        <span className="text-muted-foreground text-xs whitespace-nowrap">
                          {award.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs italic">{award.issuer}</p>
                      {award.description && (
                        <p className="mt-1 text-xs leading-relaxed">{award.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Projects */}
          <section className={cn("print:break-inside-avoid", topOfSecondPageClass)}>
            <RightSectionHeader icon={FolderOpen} title="Featured Projects" />
            <div className="relative">
              <div className="bg-primary/80 print:bg-primary/80 absolute top-2 bottom-0 left-1 w-0.5 rounded-full [print-color-adjust:exact]" />
              {featuredProjects.map((project, i) => (
                <div
                  key={project.slug}
                  className={`relative flex gap-3 print:break-inside-avoid ${i < featuredProjects.length - 1 ? "pb-3" : ""}`}
                >
                  <EntryDot />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-sm font-bold hover:underline"
                      >
                        {project.title}
                      </Link>
                      <div className="flex items-center gap-1.5">
                        {project.demoUrl && (
                          <Link
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                            title="View demo"
                          >
                            <ExternalLink className="size-3.5 flex-shrink-0" />
                          </Link>
                        )}
                        {project.githubUrl && (
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                            title="View GitHub repository"
                          >
                            <GitHubIcon className="size-3.5 flex-shrink-0" />
                          </Link>
                        )}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-muted-foreground hover:text-foreground"
                          title="View project details"
                        >
                          <ArrowUpRight className="size-3.5 flex-shrink-0" />
                        </Link>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs italic">
                      {project.technologies.slice(0, 5).join(", ")}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">{project.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
