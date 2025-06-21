import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
import ProjectStructuredData from "@/components/project-structured-data";
import RelatedProjects from "@/components/related-projects";

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const projects = await getProjects();
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Simon Stijnen Portfolio",
    };
  }

  return {
    title: `${project.title} | Simon Stijnen Portfolio`,
    description: `Details about ${project.title}, a project by Simon Stijnen`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const projects = await getProjects();
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }
  // Client components must be rendered as children in Server Components
  return (
    <div className="container max-w-4xl px-4 py-12 md:px-6">
      {/* Add structured data */}
      <ProjectStructuredData
        title={project.title}
        description={project.description}
        slug={project.slug}
        technologies={project.technologies}
      />
      <div className="mb-6">
        <Link href="/#projects" className="text-primary hover:underline">
          ← Back to All Projects
        </Link>
      </div>
      <h1 className="mb-6 text-4xl font-bold">{project.title}</h1>
      <div className="bg-muted mb-8 aspect-video overflow-hidden rounded-lg">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={1200}
            height={675}
            className="h-full w-full object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-muted-foreground">[Project Screenshot]</span>
          </div>
        )}
      </div>
      <div className="prose max-w-none">
        <h2 className="mt-8 mb-4 text-2xl font-bold">Project Overview</h2>
        {project.description.split("\n").map((line, index) => (
          <p key={index} className="mb-4">
            {line}
          </p>
        ))}

        <h2 className="mt-8 mb-4 text-2xl font-bold">Technologies Used</h2>
        <ul className="mb-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="bg-secondary rounded-full px-3 py-1 text-sm">
              {tech}
            </li>
          ))}
        </ul>

        <h2 className="mt-8 mb-4 text-2xl font-bold">Challenge & Solution</h2>
        <p>[Detailed explanation of challenges faced and solutions implemented]</p>

        <h2 className="mt-8 mb-4 text-2xl font-bold">Results</h2>
        <p>[Outcomes and results of the project]</p>
      </div>
      <div className="mt-12 flex gap-4">
        {project.demoUrl && (
          <Button asChild>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          </Button>
        )}{" "}
        {project.githubUrl && (
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              View Code
            </a>
          </Button>
        )}
      </div>{" "}
      {/* Add related projects section */}
      <RelatedProjects currentProject={project} allProjects={projects} />
    </div>
  );
}
