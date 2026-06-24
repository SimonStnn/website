import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ContactDialogProvider } from "@/components/contact-dialog";
import Analytics from "@/components/meta/analytics";
import { PersonJsonLd } from "@/components/meta/structured-data";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/lib/config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | Simon Stijnen`,
    default: `${siteConfig.author.name}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.author.name,
    "Software Engineer",
    "AI",
    "Artificial Intelligence",
    "Machine Learning",
    "Developer",
    "Portfolio",
    "Full Stack",
    "TypeScript",
    "Junior Software Engineer",
  ],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Software Engineer & AI Portfolio",
    title: `${siteConfig.name} | Software Engineer & AI`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/profile-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Simon Stijnen - Software Engineer & AI Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Software Engineer & AI | ${siteConfig.name}`,
    description: siteConfig.description,
    images: ["/images/profile-meta.jpg"],
  },
  manifest: "/site.webmanifest",
  other: {
    "llms-txt": `${siteConfig.url}/llms.txt`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* AI agent discovery: structured site info for LLMs */}
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM-readable site information"
        />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Blog RSS Feed" />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
        <PersonJsonLd
          name={siteConfig.author.name}
          url={siteConfig.url}
          sameAs={[siteConfig.social.linkedin, siteConfig.social.github]}
          jobTitle={siteConfig.person.jobTitle}
          homeCountry={siteConfig.location.country}
          worksFor={siteConfig.person.worksFor}
          alumniOf={siteConfig.person.alumniOf}
          hasCredential={siteConfig.person.hasCredential}
          knowsAbout={siteConfig.person.knowsAbout}
          email={siteConfig.author.email}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} selection:bg-primary/80 selection:text-accent flex min-h-screen flex-col antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KH4ZNPL4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ContactDialogProvider>
            <a
              // Skip to main content link for screen readers
              href="#main-content"
              className="focus:bg-primary focus:text-primary-foreground focus:ring-accent sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-8 focus:py-2 focus:shadow-lg"
            >
              Skip to main content
            </a>
            <Header className="sticky top-0 z-40" />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </ContactDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
