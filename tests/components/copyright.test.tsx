import { render, screen } from "@testing-library/react";
import Copyright from "@/components/copyright";

describe("Copyright", () => {
  it("renders copyright text with current year and site name", () => {
    const currentYear = new Date().getFullYear();
    render(<Copyright />);
    expect(
      screen.getByText(`© ${currentYear} Simon Stijnen. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Copyright className="custom-class" />);
    const element = screen.getByText(/© \d{4} Simon Stijnen\. All rights reserved\./);
    expect(element).toHaveClass("custom-class");
  });

  it("applies default className when none provided", () => {
    render(<Copyright />);
    const element = screen.getByText(/© \d{4} Simon Stijnen\. All rights reserved\./);
    expect(element).toHaveClass(
      "text-primary-foreground/80",
      "mx-auto",
      "py-6",
      "text-center",
      "text-sm",
      "md:text-base"
    );
  });
});
