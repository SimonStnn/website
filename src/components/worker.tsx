"use client";

import { useEffect } from "react";
import { setLocaleCookie } from "@/lib/cookies";
import { getBestMatchLocale } from "@/dictionary";

export default function Worker() {
  useEffect(() => {
    const userLang = getBestMatchLocale(navigator.languages as string[]);

    setLocaleCookie(userLang);
  }, []);

  return <></>;
}
