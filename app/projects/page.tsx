import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/project-card";
import { Separator } from "@/components/ui/separator";

export default async function ProjectsPage() {
  const projects = await getProjects();

  // Separate featured and non-featured projects
  const featuredProjects = projects.filter((project) => project.featured);
  const nonFeaturedProjects = projects.filter((project) => !project.featured);

  return (
    <section className="scroll-mt-16 px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold">All Projects</h1>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg">
          Explore all of my projects, from featured work to experimental builds.
        </p>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-semibold">Featured Projects</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Separator */}
        {featuredProjects.length > 0 && nonFeaturedProjects.length > 0 && (
          <Separator className="my-12" />
        )}

        {/* Non-Featured Projects */}
        {nonFeaturedProjects.length > 0 && (
          <div>
            <h2 className="mb-8 text-center text-2xl font-semibold">Other Projects</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {nonFeaturedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
