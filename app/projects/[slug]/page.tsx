import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjects, type ProjectImage } from "@/lib/projects";
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
import { cn } from "@/lib/utils";

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

// Helper functions to reduce code duplication
function getImageProperties(image: ProjectImage | string, fallbackAlt: string) {
  return {
    src: typeof image === "string" ? image : image.src,
    alt: typeof image === "string" ? fallbackAlt : image.alt,
  };
}

function renderMediaContent(
  src: string,
  alt: string,
  isVideo: boolean,
  priority: boolean = false,
  preload: "metadata" | "none" = "metadata",
  isSingleImage: boolean = false
) {
  const videoClasses = isSingleImage
    ? "h-full w-full object-cover"
    : "text-muted-foreground bg-muted/80 h-full w-full rounded-md object-contain";

  const imageClasses = isSingleImage
    ? "h-full w-full object-contain"
    : "text-muted-foreground bg-muted/80 h-full w-full rounded-md object-contain";

  if (isVideo) {
    return (
      <video src={src} controls muted loop className={videoClasses} preload={preload}>
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={675}
      className={imageClasses}
      priority={priority}
    />
  );
}

function ImageCaption({ alt }: { alt: string }) {
  return <p className="text-muted-foreground mt-2 text-center text-sm text-balance">{alt}</p>;
}

function ActionButtons({ demoUrl, githubUrl }: { demoUrl?: string; githubUrl?: string }) {
  if (!demoUrl && !githubUrl) return null;

  return (
    <div className="mt-8 flex gap-4">
      {demoUrl && (
        <Button size="lg" asChild>
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
            Live Demo
            <SquareArrowOutUpRight />
          </Link>
        </Button>
      )}
      {githubUrl && (
        <Button size="lg" variant="secondary" asChild>
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            View Code
            <SquareArrowOutUpRight />
          </Link>
        </Button>
      )}
    </div>
  );
}

function ProjectContent({
  description,
  technologies,
}: {
  description: string;
  technologies: string[];
}) {
  return (
    <div className="prose max-w-none">
      <h2 className="mt-8 mb-4 text-2xl font-bold">Project Overview</h2>
      {description.split("\n").map((line, index) => (
        <p key={index} className="mb-4 text-justify">
          {line}
        </p>
      ))}

      <h2 className="mt-8 mb-4 text-2xl font-bold">Technologies Used</h2>
      <ul className="mb-8 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge key={tech} variant="secondary" asChild>
            <li>{tech}</li>
          </Badge>
        ))}
      </ul>
    </div>
  );
}

function GradientContainer(props: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative before:absolute before:size-full",
        "inset-1 pr-2 pb-2 before:-inset-1 before:-z-10",
        "before:from-accent before:via-muted before:to-primary before:bg-gradient-to-br",
        "aspect-video before:rounded-lg"
      )}
    >
      <div className={cn("bg-muted/60 inset-1 h-full w-full rounded-md", props.className)}>
        {props.children}
      </div>
    </div>
  );
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
        {project.images && project.images.length > 1 && (
          <Carousel className="w-full overflow-hidden rounded-md" opts={{ loop: true }}>
            <CarouselContent>
              {project.images.map((image, index) => {
                const { src, alt } = getImageProperties(
                  image,
                  `${project.title} screenshot ${index + 1}`
                );
                const isVideo = isVideoFile(src);

                return (
                  <CarouselItem key={index}>
                    <GradientContainer>
                      {renderMediaContent(
                        src,
                        alt,
                        isVideo,
                        index === 0,
                        index === 0 ? "metadata" : "none"
                      )}
                    </GradientContainer>
                    <ImageCaption alt={alt} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        )}
        {project.images && project.images.length === 1 && (
          <>
            <div className="aspect-video overflow-hidden rounded-lg">
              <GradientContainer>
                {(() => {
                  const { src, alt } = getImageProperties(
                    project.images[0],
                    `Screenshot of ${project.title}`
                  );
                  const isVideo = isVideoFile(src);

                  return renderMediaContent(src, alt, isVideo, true, "metadata", true);
                })()}
              </GradientContainer>
            </div>
            <ImageCaption
              alt={getImageProperties(project.images[0], `Screenshot of ${project.title}`).alt}
            />
          </>
        )}
        <ProjectContent description={project.description} technologies={project.technologies} />
        <ActionButtons demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
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
