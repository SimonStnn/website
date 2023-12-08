"use server";
import { cookies } from "next/headers";

const days = 60 * 60 * 24; // Seconds * minutes * hours

export async function setLocaleCookies(
  userLang: string,
  force_overwrite = false
) {
  const cookieStore = cookies();

  if (!force_overwrite) userLang = cookieStore.get("locale")?.value || userLang;

  cookies().set("locale", userLang, {
    expires: new Date(Date.now() + 100 * days),
    maxAge: 100 * days,
  });
}
