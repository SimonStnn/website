import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/public/utils";
import Navbar from "@/components/navbar";
import { Providers } from "@/components/themechanger";
import Footer from "@/components/footer";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal website",
  description: "My personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "p-0 scroll-smooth min-h-screen border-r"
        )}
      >
        <Providers>
          <Navbar />
          <main className="container m-auto py-6 px-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
