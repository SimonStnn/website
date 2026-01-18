import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";

// Mock the config
jest.mock("@/lib/config", () => ({
  siteConfig: {
    name: "Test Site",
  },
}));

describe("Header", () => {
  it("renders the site name", () => {
    render(<Header />);

    expect(screen.getByText("Test Site")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders theme toggle", () => {
    render(<Header />);

    // Assuming ThemeToggle has some identifiable element, like a button
    expect(screen.getByRole("button", { name: /theme/i })).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<Header />);

    expect(screen.getByRole("button", { name: "Toggle menu" })).toBeInTheDocument();
  });
});
