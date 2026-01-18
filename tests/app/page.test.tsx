import { Project } from "@/lib/projects";
import { Achievement } from "@/lib/achievements";
import { Skill } from "@/lib/skills";

// Mock Next.js components
jest.mock("next/image", () => ({
  default: ({ src, alt, width, height, className }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

jest.mock("next/link", () => ({
  default: ({ children, href, target, rel, className, onClick }) => (
    <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

// Mock lucide icons
jest.mock("lucide-react", () => ({
  Download: () => <div data-testid="download-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
}));

// Mock utils
jest.mock("@/lib/utils", () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
}));

// Mock the config
jest.mock("@/lib/config", () => ({
  siteConfig: {
    author: {
      name: "Simon Stijnen",
      email: "simon@example.com",
    },
    social: {
      linkedin: "https://linkedin.com/in/simon",
      github: "https://github.com/simon",
    },
  },
}));

// Mock components
jest.mock("@/components/project-card", () => ({
  default: ({ project }: { project: Project }) => (
    <div data-testid="project-card">{project.title}</div>
  ),
}));

jest.mock("@/components/achievement-card", () => ({
  default: ({ achievement }: { achievement: Achievement }) => (
    <div data-testid="achievement-card">{achievement.title}</div>
  ),
}));

jest.mock("@/components/timeline", () => ({
  default: () => <div data-testid="timeline">Timeline</div>,
}));

jest.mock("@/components/skills-data-table", () => ({
  SkillsDataTable: ({ skills }: { skills: Skill[] }) => (
    <div data-testid="skills-table">{skills.map((s) => s.name).join(", ")}</div>
  ),
}));

jest.mock("@/components/social-link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/components/icons", () => ({
  GitHubIcon: () => <svg data-testid="github-icon" />,
  LinkedInIcon: () => <svg data-testid="linkedin-icon" />,
}));

// Mock UI components
jest.mock("@/components/ui/separator", () => ({
  Separator: () => <hr data-testid="separator" />,
}));

jest.mock("@/components/ui/tabs", () => ({
  Tabs: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs">{children}</div>,
  TabsContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TabsList: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TabsTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, className, onClick }: Record<string, unknown>) =>
    asChild ? (
      children
    ) : (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    ),
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, variant, className }: Record<string, unknown>) => (
    <span className={className} data-variant={variant}>
      {children}
    </span>
  ),
}));

jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog">{children}</div>
  ),
  DialogContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  DialogDescription: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <p className={className}>{children}</p>,
  DialogFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h2 className={className}>{children}</h2>
  ),
  DialogTrigger: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) =>
    asChild ? children : <div data-testid="dialog-trigger">{children}</div>,
}));

// Mock the data fetching functions
jest.mock("@/lib/projects");
jest.mock("@/lib/achievements");
jest.mock("@/lib/skills");

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
});
