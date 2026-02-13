// Mock the layout components
jest.mock("@/components/layout/header", () => ({
  default: ({ className }: { className?: string }) => (
    <header className={className}>Mock Header</header>
  ),
}));
jest.mock("@/components/layout/footer", () => ({
  default: () => <footer>Mock Footer</footer>,
}));
jest.mock("@/components/meta/analytics", () => ({
  default: () => <div>Mock Analytics</div>,
}));
jest.mock("@/components/meta/structured-data", () => ({
  PersonJsonLd: () => <script>Mock PersonJsonLd</script>,
}));
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));
jest.mock("@vercel/analytics/next", () => ({
  Analytics: () => <div>Mock VercelAnalytics</div>,
}));
jest.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => <div>Mock SpeedInsights</div>,
}));

// Mock the config
jest.mock("@/lib/config", () => ({
  siteConfig: {
    url: "https://example.com",
    name: "Test Name",
    description: "Test Description",
    author: { name: "Test Author" },
    social: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
}));
