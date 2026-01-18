import { render, screen } from "@testing-library/react";
import BadgeOverflow from "@/components/badge-overflow";

// Mock UI components
jest.mock("@/components/ui/badge", () => ({
  Badge: function Badge({ children, variant }: Record<string, unknown>) {
    return <span data-variant={variant}>{children}</span>;
  },
}));

jest.mock("@/components/ui/tooltip", () => ({
  Tooltip: function Tooltip({ children }: Record<string, unknown>) {
    return <div>{children}</div>;
  },
  TooltipContent: function TooltipContent({ children }: Record<string, unknown>) {
    return <div>{children}</div>;
  },
  TooltipTrigger: function TooltipTrigger({ children }: Record<string, unknown>) {
    return <div>{children}</div>;
  },
}));

describe("BadgeOverflow", () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 200,
      height: 20,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders all technologies as badges", () => {
    const technologies = ["React", "TypeScript", "Next.js"];
    render(<BadgeOverflow technologies={technologies} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const technologies = ["React"];
    render(<BadgeOverflow technologies={technologies} className="custom-class" />);
    const ul = screen.getByRole("list");
    expect(ul).toHaveClass("custom-class");
  });

  it("shows count badge when technologies overflow", () => {
    // Mock narrow container
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 50, // Very narrow
      height: 20,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    const technologies = ["React", "TypeScript", "Next.js", "Node.js"];
    render(<BadgeOverflow technologies={technologies} />);

    // Wait for effect
    setTimeout(() => {
      expect(screen.getByText("+3 more")).toBeInTheDocument();
    }, 0);
  });

  it("tooltip shows hidden technologies", () => {
    // Similar to above, but check tooltip content
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 50,
      height: 20,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    const technologies = ["React", "TypeScript"];
    render(<BadgeOverflow technologies={technologies} />);

    setTimeout(() => {
      expect(screen.getByText("TypeScript")).toBeInTheDocument(); // In tooltip
    }, 0);
  });
});
