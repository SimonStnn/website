import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectCard from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timeline from "@/components/timeline";
import { cn } from "@/lib/utils";
import SocialLink from "@/components/social-link";
import { Mail, SquareArrowOutUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";

export default async function Home() {
  const projects = await getProjects();
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="container mx-auto flex flex-col justify-center gap-4 px-6 py-10 md:flex-row md:items-center md:gap-12 lg:w-4/5">
        <aside className="">
          <div
            className={cn(
              "relative ml-auto hidden md:block",
              "w-[250px] transition-transform duration-700 ease-in-out hover:-rotate-4"
            )}
          >
            <span
              className={cn(
                "from-accent via-secondary to-primary pointer-events-none absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br shadow-2xl"
              )}
            />
            <Image
              src="/images/hero.jpg"
              alt="Hero Image"
              width={400}
              height={400}
              className={cn(
                "size-full h-[400px] max-h-[400px] rounded-lg bg-transparent object-cover shadow-lg",
                "transition-transform duration-700 ease-in-out hover:-rotate-4"
              )}
            />
          </div>
        </aside>
        <section id="home" className="flex flex-col py-24">
          <h1 className="mb-3 text-4xl font-extrabold md:text-6xl">
            Hi, I&apos;m <span className="text-primary text-nowrap">Simon Stijnen</span>
          </h1>
          <p className="mb-4">
            <b>Software Engineering & AI student</b> at VIVES University of Applied Sciences.
          </p>
          <p className="mb-8 text-xl text-pretty md:text-2xl">
            I build software that works, scales, and is maintainable; even under heavy load.
          </p>
          <div className="mb-8 flex items-center gap-4">
            <SocialLink
              href={siteConfig.social.linkedin}
              ariaLabel="LinkedIn"
              icon={LinkedInIcon}
              className="text-primary hover:text-accent/80 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform"
            />
            <SocialLink
              href={siteConfig.social.github}
              ariaLabel="GitHub"
              icon={GitHubIcon}
              className="text-primary hover:text-accent/80 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform"
            />
            <SocialLink
              href={`mailto:${siteConfig.author.email}`}
              ariaLabel="Email"
              icon={Mail}
              className="text-primary hover:text-accent/80 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform"
            />
          </div>
          <div className="flex gap-4">
            <Button asChild size="lg" className="font-bold">
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
            <Button variant="secondary" size="lg" asChild className="hidden md:inline-flex">
              <Link href="/download/resume.pdf" target="_blank">
                Resume
                <SquareArrowOutUpRight />
              </Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Experience Section */}
      <section id="experience" className="bg-muted/30 scroll-mt-16 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Experience</h2>
          <Tabs defaultValue="work">
            <TabsList className="w-full">
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
              <Card className="p-0 shadow-md">
                <CardContent className="grid gap-6 py-0">
                  <Timeline
                    items={[
                      {
                        year: "Apr. 2024",
                        title: "Student Job Test Engineer",
                        company: "Advionics NV",
                        description:
                          "Developed a sensor monitoring system using real-time data analysis and MLX90640 heat sensors. Integrated the solution into an existing application, enabling continuous thermal monitoring for anomaly detection in a production environment.",
                      },
                      {
                        year: "Apr. 2022",
                        title: "Intern Test Engineer",
                        company: "Advionics NV",
                        description:
                          "During my internship in my final year of secondary school, I developed an automated camera system for quality control in the shipping process. The system captures photos of products before packaging and automatically generates PDF reports as proof of undamaged shipments.",
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education">
              <Card className="p-0 shadow-md">
                <CardContent className="grid gap-6 py-0">
                  <Timeline
                    items={[
                      {
                        year: "2023 - 2026",
                        title:
                          "Electronics \u2013 ICT \u2013 Specialization in Software Engineering & AI",
                        company: "Vives University of Applied Sciences \u2013 Bruges, Belgium",
                        description: "Specialized in Software Engineering & AI.",
                      },
                      {
                        year: "Sep. 2023 - Dec. 2023",
                        title: "Graduate Programming",
                        company: "HOWEST \u2013 Bruges, Belgium",
                        description:
                          "Evening school program focused on programming and software development & Git.",
                      },
                      {
                        year: "2021 - 2023",
                        title: "Internet of Things",
                        company: "KTA Brugge \u2013 Bruges, Belgium",
                        description:
                          "Secondary education with a focus on Internet of Things (IoT) technologies.",
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="scroll-mt-16 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Projects</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg">
            Here are some of the projects I&apos;ve worked on. Each project showcases different
            skills and technologies.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-muted/30 scroll-mt-16 px-4 py-16 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">About Me</h2>

          <div className="prose max-w-none">
            <p className="mb-6 text-lg">
              Hello! I&apos;m {siteConfig.author.name}, a software Engineering & AI student at VIVES
              University of Applied Sciences. I build software that works, scales, and is
              maintainable; even under heavy load.
            </p>

            <h3 className="mt-8 mb-4 text-2xl font-bold">My Background</h3>
            <p className="mb-4">
              With over {new Date().getFullYear() - 2021} years of experience in software
              development, I focus on creating responsive, accessible, and high-performance
              applications. I have worked with a variety of clients, from startups to established
              organizations, to help them achieve their digital goals.
            </p>
            <p className="mb-4">
              I learn fast and apply new technology in practice. At 17, I built a system to
              determine device locations using Bluetooth signal strength, similar to how satellites
              operate. Today, I work with AI and developed Pop-a-loon, a browser extension with over{" "}
              <b>200 active users</b>.
            </p>
            <p className="mb-4">
              In 2023, Rotary International recognized me as the top graduating student in secondary
              school; a recognition of my dedication, curiosity, and results.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
