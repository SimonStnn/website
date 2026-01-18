import { render, screen } from "@testing-library/react";
import SocialLink from "@/components/social-link";

/* eslint-disable react/display-name, @next/next/no-img-element */

// Mock Next.js components
jest.mock("next/link", () => {
  return ({
    children,
    href,
    target,
    rel,
    className,
    "aria-label": ariaLabel,
  }: Record<string, unknown>) => (
    <a href={href} target={target} rel={rel} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
});

jest.mock("next/image", () => {
  return ({ src, alt, width, height, className }: Record<string, unknown>) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
  );
});

// Mock icon
const MockIcon = () => <div data-testid="mock-icon" />;

describe("SocialLink", () => {
  it("renders link with href and aria-label", () => {
    render(<SocialLink href="https://example.com" ariaLabel="Example" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("aria-label", "Example");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders icon when provided", () => {
    render(<SocialLink href="https://example.com" ariaLabel="Example" icon={MockIcon} />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("renders image when imgSrc provided", () => {
    render(
      <SocialLink href="https://example.com" ariaLabel="Example" imgSrc="/icon.png" imgAlt="Icon" />
    );
    const img = screen.getByAltText("Icon");
    expect(img).toHaveAttribute("src", "/icon.png");
  });

  it("renders label when provided", () => {
    render(<SocialLink href="https://example.com" ariaLabel="Example" label="Follow me" />);
    expect(screen.getByText("Follow me")).toBeInTheDocument();
  });

  it("renders ariaLabel as fallback text", () => {
    render(<SocialLink href="https://example.com" ariaLabel="Example" />);
    expect(screen.getByText("Example")).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(
      <SocialLink href="https://example.com" ariaLabel="Example">
        <span>Custom</span>
      </SocialLink>
    );
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<SocialLink href="https://example.com" ariaLabel="Example" className="custom-class" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  it("applies hover class", () => {
    render(<SocialLink href="https://example.com" ariaLabel="Example" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("hover:text-primary", "transition-colors");
  });
});
