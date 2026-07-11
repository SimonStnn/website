import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this website uses cookies and analytics, and how to manage your preferences.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-8 py-16">
      <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
      <p className="text-muted-foreground mb-10 text-sm">Last updated: July 2025</p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Data Controller</h2>
        <p className="text-muted-foreground">
          {siteConfig.author.name}
          <br />
          {siteConfig.location.city}, {siteConfig.location.country}
          <br />
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="underline hover:text-foreground transition-colors"
          >
            {siteConfig.author.email}
          </a>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">What We Collect and Why</h2>
        <p className="text-muted-foreground mb-4">
          With your consent, this site uses Google Analytics 4 and Google Tag Manager to understand
          how visitors use the site. This helps improve content and user experience.
        </p>
        <p className="text-muted-foreground">The following data is collected:</p>
        <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-6">
          <li>Pages visited and time spent on each page</li>
          <li>Referral source (how you arrived at the site)</li>
          <li>Approximate country and city (derived from IP address, then discarded)</li>
          <li>Device type, browser, and operating system</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          No personal profiles are built. No data is sold or shared with third parties beyond
          Google&rsquo;s analytics infrastructure.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Cookies Set</h2>
        <p className="text-muted-foreground mb-4">
          Analytics cookies are only placed after you give consent.
        </p>
        <div className="overflow-x-auto">
          <table className="text-muted-foreground w-full border-collapse text-sm">
            <thead>
              <tr className="border-border border-b text-left">
                <th className="py-2 pr-4 font-semibold">Cookie</th>
                <th className="py-2 pr-4 font-semibold">Provider</th>
                <th className="py-2 pr-4 font-semibold">Purpose</th>
                <th className="py-2 font-semibold">Expiry</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border border-b">
                <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                <td className="py-2 pr-4">Google Analytics</td>
                <td className="py-2 pr-4">Distinguishes unique visitors</td>
                <td className="py-2">2 years</td>
              </tr>
              <tr className="border-border border-b">
                <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                <td className="py-2 pr-4">Google Analytics 4</td>
                <td className="py-2 pr-4">Persists session state</td>
                <td className="py-2">2 years</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">_gid</td>
                <td className="py-2 pr-4">Google Analytics</td>
                <td className="py-2 pr-4">Distinguishes users within a day</td>
                <td className="py-2">24 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Legal Basis</h2>
        <p className="text-muted-foreground">
          Processing is based on your consent (Article 6(1)(a) GDPR). You may withdraw consent at
          any time — this will not affect the lawfulness of processing before withdrawal.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Data Transfers</h2>
        <p className="text-muted-foreground">
          Google Analytics data is processed by Google LLC, which operates servers in the United
          States. Google participates in the EU–US Data Privacy Framework, providing a legal
          mechanism for this transfer under GDPR Chapter V.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Data Retention</h2>
        <p className="text-muted-foreground">
          Analytics data is retained for 14 months in Google Analytics, after which it is
          automatically deleted. You can request deletion of your data at any time by contacting
          us.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Your Rights</h2>
        <p className="text-muted-foreground mb-2">Under GDPR you have the right to:</p>
        <ul className="text-muted-foreground list-disc space-y-1 pl-6">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Object to or restrict processing</li>
          <li>Data portability</li>
          <li>Lodge a complaint with the Belgian Data Protection Authority (GBA/APD) at{" "}
            <a
              href="https://www.dataprotectionauthority.be"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              dataprotectionauthority.be
            </a>
          </li>
        </ul>
        <p className="text-muted-foreground mt-4">
          To exercise your rights, contact{" "}
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="underline hover:text-foreground transition-colors"
          >
            {siteConfig.author.email}
          </a>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Manage Your Preferences</h2>
        <p className="text-muted-foreground">
          You can withdraw or update your cookie consent at any time using the{" "}
          <strong>Cookie Settings</strong> link in the site footer.
        </p>
      </section>
    </div>
  );
}
