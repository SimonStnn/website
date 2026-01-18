import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

// Mock the config
jest.mock("@/lib/config", () => ({
  siteConfig: {
    name: "Test Site",
    social: {
      linkedin: "https://linkedin.com/test",
      github: "https://github.com/test",
    },
    author: {
      email: "test@example.com",
    },
    description: "Software Engineering & AI student building scalable software solutions.",
  },
}));

describe("Footer", () => {
  it("renders the site name and description", () => {
    render(<Footer />);

    expect(screen.getByText("Test Site")).toBeInTheDocument();
    expect(
      screen.getByText("Software Engineering & AI student building scalable software solutions.")
    ).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Footer />);

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders contact links", () => {
    render(<Footer />);

    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("Github")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
  });

  it("renders copyright", () => {
    render(<Footer />);

    // Assuming Copyright component renders something with year
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });
});
