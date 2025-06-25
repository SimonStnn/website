import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  images?: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface RelatedProjectsProps {
  currentProject: Project;
  allProjects: Project[];
  maxProjects?: number;
}

export default function RelatedProjects({
  currentProject,
  allProjects,
  maxProjects = 3,
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
    <div className="mt-16 border-t pt-8">
      <h2 className="mb-6 text-2xl font-bold">Related Projects</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {relatedProjects.map((project) => (
          <div key={project.slug} className="rounded-lg border p-4">
            <h3 className="mb-2 font-bold">{project.title}</h3>
            <p className="text-muted-foreground mb-3 text-sm">{project.shortDescription}</p>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/projects/${project.slug}`}>View Project</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
