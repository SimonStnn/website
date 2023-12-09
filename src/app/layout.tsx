import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/public/utils";
import Navbar from "@/components/navbar";
import { Providers } from "@/components/themechanger";
import Footer from "@/components/footer";
import Worker from "@/components/worker";
import { locales } from "@/dictionary";
import { getLocaleCookie } from "@/lib/cookies";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simon Stijnen",
  description: "My personal website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocaleCookie();
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "p-0 scroll-smooth min-h-screen border-r"
        )}
      >
        <Providers>
          <Navbar locale={locale} />
          <main className="container m-auto py-6 px-10 min-h-[90vh]">
            {children}
          </main>
          <Footer />
        </Providers>
        <Worker />
      </body>
    </html>
  );
}
