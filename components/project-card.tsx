import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/projects";
import BadgeOverflow from "@/components/badge-overflow";
import { isVideoFile } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Get first image that isn't a video
  const heroimg = project.images.filter((p) => !isVideoFile(p.src))[0];

  return (
    <Card className="group overflow-hidden pt-0">
      <CardHeader
        className={cn(
          "from-accent via-muted to-primary bg-gradient-to-br",
          "flex h-48 items-center justify-center px-1 pt-1",
          "text-muted-foreground",
          "transition-all group-hover:p-0"
        )}
      >
        {project.images && project.images.length > 0 && heroimg ? (
          <Image
            src={heroimg.src}
            alt={heroimg.alt}
            width={400}
            height={225}
            className="bg-muted/60 h-full w-full rounded-t-md object-cover transition-all group-hover:rounded-t-lg"
          />
        ) : (
          <div className="bg-muted/60 flex h-full w-full items-center justify-center rounded-t-md transition-all group-hover:rounded-t-lg">
            [Project Image]
          </div>
        )}
      </CardHeader>
      <CardContent className="grow">
        <CardTitle className="mb-1 text-lg">{project.title}</CardTitle>
        <CardDescription title={project.shortDescription}>
          {project.shortDescription}
        </CardDescription>
      </CardContent>
      <CardContent className="-my-2">
        <BadgeOverflow technologies={project.technologies} />
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm" className="w-full" asChild>
          <Link href={`/projects/${project.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
