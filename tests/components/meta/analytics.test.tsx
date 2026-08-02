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

describe("Analytics", () => {
  it("renders analytics scripts when IDs are provided and the app is not in development", () => {
    const { container } = render(<Analytics />);
    const scripts = container.querySelectorAll("script");
    expect(scripts).toHaveLength(2);
  });
});
