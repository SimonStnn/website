import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
import ProjectStructuredData from "@/components/project-structured-data";
import RelatedProjects from "@/components/related-projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, SquareArrowOutUpRight } from "lucide-react";

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
    <>
      <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
        <ProjectStructuredData
          title={project.title}
          description={project.description}
          slug={project.slug}
          technologies={project.technologies}
          images={project.images}
        />
        <Button variant="link" className="mb-6 !px-0" asChild>
          <Link href="/#projects" className="text-primary hover:underline">
            <ArrowLeft />
            Back to All Projects
          </Link>
        </Button>
        <h1 className="mb-6 text-4xl font-bold">{project.title}</h1>
        {project.images && project.images.length > 1 ? (
          <div className="mb-8">
            <Carousel className="w-full overflow-hidden rounded-md" opts={{ loop: true }}>
              <CarouselContent>
                {project.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="bg-muted aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={1200}
                        height={675}
                        className="h-full w-full object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        ) : (
          <div className="bg-muted mb-8 aspect-video overflow-hidden rounded-lg">
            {project.images && project.images.length === 1 ? (
              <Image
                src={project.images[0]}
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
        )}
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
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex gap-4">
          {project.demoUrl && (
            <Button asChild>
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
                <SquareArrowOutUpRight />
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="secondary" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                View Code
                <SquareArrowOutUpRight />
              </Link>
            </Button>
          )}
        </div>
      </div>
      {/* Add related projects section */}
      <hr />
      <RelatedProjects
        currentProject={project}
        allProjects={projects}
        className="container mx-auto my-8 max-w-4xl"
      />
    </>
  );
}
