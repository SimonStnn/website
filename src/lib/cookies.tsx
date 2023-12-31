"use server";
import { defaultLocale } from "@/dictionary";
import { cookies } from "next/headers";

const days = 60 * 60 * 24; // Seconds * minutes * hours

export async function setLocaleCookie(userLang: string, force_overwrite = false) {
  const cookieStore = cookies();

  if (!force_overwrite) userLang = cookieStore.get("locale")?.value || userLang;

  cookies().set("locale", userLang, {
    expires: new Date(Date.now() + 100 * days),
    maxAge: 100 * days,
  });
}

export async function getLocaleCookie() {  
  return cookies().get("locale")?.value || defaultLocale;
}
