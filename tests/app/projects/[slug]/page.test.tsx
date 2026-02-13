import React from "react";
import ProjectPage, { generateStaticParams } from "@/app/projects/[slug]/page";
import { getProjects } from "@/lib/projects";

// Mock Next.js
jest.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode }) => <a {...props}>{children}</a>,
}));
jest.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, unknown>) => <img {...props} alt="" />,
}));
jest.mock("lucide-react", () => ({
  ArrowLeft: () => <div data-testid="arrow-left" />,
  SquareArrowOutUpRight: () => <div data-testid="square-arrow" />,
}));

// Mock the data fetching function
jest.mock("@/lib/projects");
jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("Not found");
  }),
}));
jest.mock("@/lib/utils", () => ({
  isVideoFile: jest.fn((src: string) => src.endsWith(".mp4") || src.endsWith(".webm")),
  cn: jest.fn((...classes) => classes.join(" ")),
}));
jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="carousel" {...props}>
      {children}
    </div>
  ),
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-item">{children}</div>
  ),
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Prev</button>,
}));
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));
jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: { children: React.ReactNode }) => (
    <span {...props}>{children}</span>
  ),
}));
jest.mock("@/components/meta/project-structured-data", () => ({
  default: () => <div data-testid="project-structured-data" />,
}));
jest.mock("@/components/related-projects", () => ({
  default: () => <div data-testid="related-projects" />,
}));

const mockGetProjects = getProjects as jest.MockedFunction<typeof getProjects>;

describe("Project Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls notFound for non-existing project", async () => {
    mockGetProjects.mockResolvedValue([]);

    await expect(
      ProjectPage({ params: Promise.resolve({ slug: "non-existing" }) })
    ).rejects.toThrow("Not found");
  });
});

describe("generateStaticParams", () => {
  it("returns slugs for all projects", async () => {
    const mockProjects = [
      {
        slug: "project1",
        title: "Project 1",
        shortDescription: "Short desc 1",
        description: "Description 1",
        technologies: ["Tech1"],
        images: [{ src: "/img1.jpg", alt: "Alt1" }],
      },
      {
        slug: "project2",
        title: "Project 2",
        shortDescription: "Short desc 2",
        description: "Description 2",
        technologies: ["Tech2"],
        images: [{ src: "/img2.jpg", alt: "Alt2" }],
      },
    ];
    mockGetProjects.mockResolvedValue(mockProjects);

    const params = await generateStaticParams();

    expect(params).toEqual([{ slug: "project1" }, { slug: "project2" }]);
  });
});
