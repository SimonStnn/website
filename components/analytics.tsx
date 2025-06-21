import Script from "next/script";
import { analyticsConfig, appConfig } from "@/lib/config";

export function Analytics() {
  // Don't render analytics if no ID is provided or we're in development
  if (!analyticsConfig.gaId || appConfig.isDevelopment) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsConfig.gaId}');
        `}
      </Script>
    </>
  );
}

export default Analytics;
