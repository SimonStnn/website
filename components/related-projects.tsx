import Link from "next/link";
import type { ClassValue } from "clsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/lib/projects";

export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  images?: ProjectImage[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface RelatedProjectsProps {
  currentProject: Project;
  allProjects: Project[];
  maxProjects?: number;
  className?: ClassValue;
}

export default function RelatedProjects({
  currentProject,
  allProjects,
  maxProjects = 3,
  className,
}: RelatedProjectsProps) {
  // Find projects that share at least one technology with the current project
  const relatedProjects = allProjects
    .filter(
      (project) =>
        project.slug !== currentProject.slug && // Exclude current project
        project.technologies.some((tech) => currentProject.technologies.includes(tech))
    )
    .slice(0, maxProjects);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <div className={cn("", className)}>
      <h2 className="mb-6 text-2xl font-bold">Related Projects</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {relatedProjects.map((project) => (
          <Card key={project.slug} className="shadow-md">
            <CardContent className="grow">
              <CardTitle className="mb-2 font-bold">{project.title}</CardTitle>
              <CardDescription className="line-clamp-3" title={project.shortDescription}>
                {project.shortDescription}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href={`/projects/${project.slug}`}>View Project</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
