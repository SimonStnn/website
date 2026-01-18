import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/theme-toggle";

// Mock next-themes
const mockSetTheme = jest.fn();
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
    themes: ["light", "dark", "system"],
  }),
}));

// Mock UI components
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, className, "aria-label": ariaLabel }: Record<string, unknown>) => (
    <button onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: Record<string, unknown>) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: Record<string, unknown>) => <div>{children}</div>,
  DropdownMenuContent: ({ children, align, className }: Record<string, unknown>) => (
    <div className={className} data-align={align}>
      {children}
    </div>
  ),
  DropdownMenuItem: ({ children, onClick, className }: Record<string, unknown>) => (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  ),
}));

jest.mock("@/components/ui/tooltip", () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TooltipContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("lucide-react", () => ({
  Sun: () => <svg data-testid="sun-icon" />,
  Moon: () => <svg data-testid="moon-icon" />,
  Monitor: () => <svg data-testid="monitor-icon" />,
  Check: () => <svg data-testid="check-icon" />,
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders sun icon for light theme", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button.querySelector("[data-testid='sun-icon']")).toBeInTheDocument();
  });

  it("renders monitor icon for system theme", () => {
    // Mock system theme
    jest.mock(
      "next-themes",
      () => ({
        useTheme: () => ({
          theme: "system",
          setTheme: mockSetTheme,
          themes: ["light", "dark", "system"],
        }),
      }),
      { virtual: true }
    );

    render(<ThemeToggle />);
    expect(screen.getByTestId("monitor-icon")).toBeInTheDocument();
  });

  it("renders moon icon for dark theme", () => {
    // Mock dark theme
    jest.mock(
      "next-themes",
      () => ({
        useTheme: () => ({
          theme: "dark",
          setTheme: mockSetTheme,
          themes: ["light", "dark", "system"],
        }),
      }),
      { virtual: true }
    );

    render(<ThemeToggle />);
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("shows tooltip content", () => {
    render(<ThemeToggle />);
    expect(screen.getByText("Change theme")).toBeInTheDocument();
  });

  it("renders theme options in dropdown", () => {
    render(<ThemeToggle />);
    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("calls setTheme when option clicked", () => {
    render(<ThemeToggle />);
    const darkOption = screen.getByText("Dark");
    fireEvent.click(darkOption);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("shows check icon for current theme", () => {
    render(<ThemeToggle />);
    // For light theme, check should be on Light option
    const lightOption = screen.getByText("Light").closest("div");
    expect(lightOption?.querySelector("[data-testid='check-icon']")).toBeInTheDocument();
  });

  it("has correct aria-label", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });
});
