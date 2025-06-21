import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Analytics from "@/components/analytics";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | Software Engineer & AI`,
    default: `${siteConfig.name} | Software Engineer & AI`,
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
        url: "/image/profile-meta.jpg",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} selection:bg-primary/80 selection:text-accent flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header className="sticky top-0 z-40" />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
