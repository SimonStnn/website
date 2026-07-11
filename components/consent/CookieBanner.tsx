"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/consent/ConsentProvider";

export function CookieBanner() {
  const { consent, accept, decline } = useConsent();

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex max-w-6xl flex-col gap-4 px-8 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          This site uses Google Analytics to understand visitor behaviour. No personal profiles are
          built.{" "}
          <Link href="/privacy" className="underline transition-colors hover:text-foreground">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="outline" size="sm" onClick={decline}>
            Decline
          </Button>
          <Button size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
