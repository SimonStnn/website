"use client";

import { useEffect } from "react";
import { setLocaleCookies } from "@/lib/cookies";

export default function Worker() {
  useEffect(() => {
    const userLang = navigator.language;
    setLocaleCookies(userLang);
  }, []);

  return <></>;
}
