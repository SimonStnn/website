import { render } from "@testing-library/react";
import { useConsent } from "@/components/consent/ConsentProvider";
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

jest.mock("@/components/consent/ConsentProvider");

jest.mock("@vercel/analytics/next", () => ({
  Analytics: () => null,
}));

jest.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => null,
}));

const mockUseConsent = useConsent as jest.MockedFunction<typeof useConsent>;

describe("Analytics", () => {
  it("renders analytics scripts when IDs are provided, not in development, and consent is accepted", () => {
    mockUseConsent.mockReturnValue({
      consent: "accepted",
      accept: jest.fn(),
      decline: jest.fn(),
      reset: jest.fn(),
    });

    const { container } = render(<Analytics />);
    const scripts = container.querySelectorAll("script");
    // GA src script, GA config inline script, GTM loader inline script
    expect(scripts).toHaveLength(3);
  });

  it("renders nothing when consent has not been given", () => {
    mockUseConsent.mockReturnValue({
      consent: null,
      accept: jest.fn(),
      decline: jest.fn(),
      reset: jest.fn(),
    });

    const { container } = render(<Analytics />);
    expect(container.querySelectorAll("script")).toHaveLength(0);
  });

  it("renders nothing when consent is declined", () => {
    mockUseConsent.mockReturnValue({
      consent: "declined",
      accept: jest.fn(),
      decline: jest.fn(),
      reset: jest.fn(),
    });

    const { container } = render(<Analytics />);
    expect(container.querySelectorAll("script")).toHaveLength(0);
  });
});
