"use client";

import Script from "next/script";

import { analyticsConfig, appConfig } from "@/lib/config";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function Analytics() {
  if (!analyticsConfig.gaId || !analyticsConfig.gtmId || appConfig.isDevelopment) return null;

  return (
    <>
      <Script
        id="ga-gtag-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`}
      />
      <Script id="ga-gtag-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${analyticsConfig.gaId}');`}
      </Script>
      <Script id="gtm-loader" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${analyticsConfig.gtmId}');`}
      </Script>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}

export default Analytics;
