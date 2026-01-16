"use client";

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ScrollRevealProps {
  children: ReactNode;
}

export function ScrollReveal({ children }: ScrollRevealProps) {
  const [mounted, setMounted] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    // To avoid hydration mismatch, we only render the animation on the client side
    // This ensures the component is visible for clients that don't support JS
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "animate-scroll-reveal opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      {children}
    </div>
  );
}
