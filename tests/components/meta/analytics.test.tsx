import { render } from "@testing-library/react";
import { Analytics } from "@/components/meta/analytics";

jest.mock("@/lib/config", () => ({
  analyticsConfig: {
    gaId: "GA-123",
    gtmId: "GTM-456",
  },
  appConfig: {
    isDevelopment: false,
  },
}));

jest.mock("@vercel/analytics/react", () => ({
  Analytics: () => null,
}));

jest.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => null,
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ src, children }: { src?: string; children?: string }) => (
    <div data-testid="script" data-src={src}>
      {children}
    </div>
  ),
}));

describe("Analytics", () => {
  it("renders analytics scripts when IDs are provided and the app is not in development", () => {
    const { container } = render(<Analytics />);
    const scripts = container.querySelectorAll('[data-testid="script"]');
    expect(scripts).toHaveLength(3);
    expect(scripts[0]).toHaveAttribute("data-src", expect.stringContaining("GA-123"));
    expect(scripts[2]).toHaveTextContent("GTM-456");
  });
});
