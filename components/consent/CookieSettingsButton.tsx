"use client";

import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/consent/ConsentProvider";

export function CookieSettingsButton() {
  const { reset } = useConsent();

  return (
    <Button
      variant="link"
      size="sm"
      onClick={reset}
      className="text-primary-foreground/80 hover:text-primary-foreground w-full justify-start !p-0 transition-colors"
    >
      Cookie Settings
    </Button>
  );
}

export default CookieSettingsButton;
