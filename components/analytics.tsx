// import Script from "next/script";
import { analyticsConfig, appConfig } from "@/lib/config";

export function Analytics() {
  // Don't render analytics if no ID is provided or we're in development
  if (!analyticsConfig.gaId || !analyticsConfig.gtmId || appConfig.isDevelopment) {
    return null;
  }

  return (
    <>
      <meta name="google-site-verification" content="Yr7tvEhqrFxE-am7WS4b7RiQJhy_F9grOg12XEhHtLw" />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${analyticsConfig.gaId}');`,
        }}
      />
      <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${analyticsConfig.gtmId}');`}</script>
    </>
  );
}

export default Analytics;
