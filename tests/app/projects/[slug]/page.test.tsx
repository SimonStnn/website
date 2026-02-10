import ProjectPage, { generateStaticParams, generateMetadata } from "@/app/projects/[slug]/page";
import { getProjects } from "@/lib/projects";

// Mock Next.js
jest.mock("next/link", () => ({
  default: ({ children, ...props }: Record<string, unknown>) => <a {...props}>{children}</a>,
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
  Carousel: ({ children, ...props }: Record<string, unknown>) => (
    <div data-testid="carousel" {...props}>
      {children}
    </div>
  ),
  CarouselContent: ({ children }: Record<string, unknown>) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: Record<string, unknown>) => (
    <div data-testid="carousel-item">{children}</div>
  ),
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Prev</button>,
}));
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: Record<string, unknown>) => (
    <button {...props}>{children}</button>
  ),
}));
jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: Record<string, unknown>) => <span {...props}>{children}</span>,
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
    const mockProjects = [{ slug: "project1" }, { slug: "project2" }];
    mockGetProjects.mockResolvedValue(mockProjects);

    const params = await generateStaticParams();

    expect(params).toEqual([{ slug: "project1" }, { slug: "project2" }]);
  });
});

describe("generateMetadata", () => {
  it("returns metadata for existing project", async () => {
    const mockProjects = [
      {
        slug: "test-project",
        title: "Test Project",
        description: "Full description",
        technologies: ["React"],
      },
    ];
    mockGetProjects.mockResolvedValue(mockProjects);

    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "test-project" }) });

    expect(metadata).toEqual({
      title: "Test Project | Simon Stijnen Portfolio",
      description: "Details about Test Project.",
      openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://simon.stijnen.be/projects/test-project",
        title: "Test Project | Simon Stijnen",
        description: "Details about Test Project.",
        images: [
          {
            url: "/images/profile-meta.jpg",
            alt: "Test Project screenshot",
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Test Project | Simon Stijnen",
        description: "Details about Test Project.",
        images: ["/images/profile-meta.jpg"],
      },
    });
  });

  it("returns not found metadata for non-existing project", async () => {
    mockGetProjects.mockResolvedValue([]);

    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "non-existing" }) });

    expect(metadata).toEqual({
      title: "Project Not Found | Simon Stijnen Portfolio",
    });
  });
});
