import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("NotFound Page", () => {
  it("renders the 404 title", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the page not found heading", () => {
    render(<NotFound />);

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders the error message", () => {
    render(<NotFound />);

    expect(
      screen.getByText("The page you are looking for doesn't exist or has been moved.")
    ).toBeInTheDocument();
  });

  it("renders a button to return home", () => {
    render(<NotFound />);

    const link = screen.getByRole("link", { name: /return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
