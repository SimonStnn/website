import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { EmailCopyButton } from "@/components/email-copy-button";
import { siteConfig } from "@/lib/config";

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// Mock UI components
jest.mock("@/components/ui/button", () => ({
  Button: function Button({
    children,
    onClick,
    className,
    size,
    variant,
  }: Record<string, unknown>) {
    return (
      <button onClick={onClick} className={className} data-size={size} data-variant={variant}>
        {children}
      </button>
    );
  },
}));

jest.mock("@/components/ui/tooltip", () => ({
  Tooltip: function Tooltip({ children }: Record<string, unknown>) {
    return <div>{children}</div>;
  },
  TooltipTrigger: function TooltipTrigger({ children }: Record<string, unknown>) {
    return <div>{children}</div>;
  },
  TooltipContent: function TooltipContent({ children }: Record<string, unknown>) {
    return <div>{children}</div>;
  },
}));

jest.mock("lucide-react", () => ({
  Copy: () => <svg data-testid="copy-icon" />,
}));

describe("EmailCopyButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders copy icon", () => {
    render(<EmailCopyButton />);
    expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
  });

  it("shows initial tooltip content", () => {
    render(<EmailCopyButton />);
    expect(screen.getByText("Copy Email")).toBeInTheDocument();
  });

  it("copies email to clipboard on click", async () => {
    render(<EmailCopyButton />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(siteConfig.author.email);
  });

  it("changes tooltip to 'Email Copied!' after click", async () => {
    render(<EmailCopyButton />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Email Copied!")).toBeInTheDocument();
    });
  });

  it("resets tooltip after 2 seconds", async () => {
    jest.useFakeTimers();
    render(<EmailCopyButton />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Email Copied!")).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText("Copy Email")).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("applies custom className", () => {
    render(<EmailCopyButton className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
