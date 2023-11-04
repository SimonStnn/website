import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/public/utils";
import Navbar from "@/components/navbar";
import { Providers } from "@/components/themechanger";
import Footer from "@/components/footer";
import { locales } from "@/dictionary";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal website",
  description: "My personal website",
};

// Used by nextjs to render static pages
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
          <main className="container m-auto py-6 px-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
