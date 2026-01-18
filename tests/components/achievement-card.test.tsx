import { render, screen } from "@testing-library/react";
import React from "react";
import { AchievementBadge } from "@/components/achievement-card";
import { Achievement } from "@/lib/achievements";

// Mock Next.js components
jest.mock("next/link", () => ({
  default: ({ children, href, target, rel, className, onClick }) => (
    <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

jest.mock("next/image", () => ({
  default: ({ src, alt, width, height, className }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

// Mock lucide icons
jest.mock("lucide-react", () => ({
  Award: () => <div data-testid="award-icon" />,
  Trophy: () => <div data-testid="trophy-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
  FileBadge: () => <div data-testid="file-badge-icon" />,
  Maximize2: () => <div data-testid="maximize-icon" />,
}));

// Mock utils
jest.mock("@/lib/utils", () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
}));

// Mock UI components
jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, variant, className }) => (
    <span className={className} data-variant={variant}>
      {children}
    </span>
  ),
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

jest.mock("@/components/ui/card", () => ({
  Card: ({ children, className }) => <div className={className}>{children}</div>,
  CardAction: ({ children, className }) => <div className={className}>{children}</div>,
  CardContent: ({ children, className }) => <div className={className}>{children}</div>,
  CardDescription: ({ children, className }) => <p className={className}>{children}</p>,
  CardHeader: ({ children, className }) => <div className={className}>{children}</div>,
  CardTitle: ({ children, className }) => <h3 className={className}>{children}</h3>,
}));

jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }) => <div data-testid="dialog">{children}</div>,
  DialogContent: ({ children, className }) => <div className={className}>{children}</div>,
  DialogDescription: ({ children, className }) => <p className={className}>{children}</p>,
  DialogFooter: ({ children }) => <div>{children}</div>,
  DialogHeader: ({ children }) => <div>{children}</div>,
  DialogTitle: ({ children, className }) => <h2 className={className}>{children}</h2>,
  DialogTrigger: ({ children, asChild }) =>
    asChild ? children : <div data-testid="dialog-trigger">{children}</div>,
}));

const mockAchievement: Achievement = {
  slug: "test-cert",
  title: "Test Certification",
  issuer: "Test Issuer",
  date: "2023-01-01",
  type: "certification",
  description: "A test description",
  link: "https://example.com",
  image: { src: "/image.jpg", alt: "Test image" },
};

describe("AchievementBadge", () => {
  it("renders badge with correct type and icon", () => {
    render(<AchievementBadge achievement={mockAchievement} />);
    expect(screen.getByText("certification")).toBeInTheDocument();
    expect(screen.getByTestId("file-badge-icon")).toBeInTheDocument();
  });

  it("applies correct color classes for certification", () => {
    render(<AchievementBadge achievement={mockAchievement} />);
    const badge = screen.getByText("certification");
    expect(badge).toHaveClass("bg-blue-100", "text-blue-800");
  });

  it("renders award icon for award type", () => {
    const awardAchievement = { ...mockAchievement, type: "award" as const };
    render(<AchievementBadge achievement={awardAchievement} />);
    expect(screen.getByTestId("award-icon")).toBeInTheDocument();
  });

  it("renders trophy icon for achievement type", () => {
    const achievementType = { ...mockAchievement, type: "achievement" as const };
    render(<AchievementBadge achievement={achievementType} />);
    expect(screen.getByTestId("trophy-icon")).toBeInTheDocument();
  });
});
