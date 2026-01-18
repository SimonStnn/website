import { render } from "@testing-library/react";
import { Analytics } from "@/components/meta/analytics";

// Mock config
jest.mock("@/lib/config", () => ({
  analyticsConfig: {
    gaId: "GA-123",
    gtmId: "GTM-456",
  },
  appConfig: {
    isDevelopment: false,
  },
}));

describe("Analytics", () => {
  it("renders analytics scripts when IDs are provided and not in development", () => {
    const { container } = render(<Analytics />);
    const scripts = container.querySelectorAll("script");
    expect(scripts).toHaveLength(2); // The two inline scripts
    // Meta is added to head, not container
  });
});
