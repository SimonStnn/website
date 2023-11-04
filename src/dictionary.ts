import "server-only";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";

export const locales = ["en"];
export const defaultLocale = "en";
export type Locale = typeof locales[number];

const headers = {
  "accept-language": `${locales.join(",")};q=0.5`,
};
export const languages = new Negotiator({ headers }).languages();

const dictionaries = {
  en: () => import("@translations/en.json").then((module) => module.default),
};

type PromiseType<T> = T extends Promise<infer U> ? U : never;
export type Dictionary = PromiseType<
  ReturnType<(typeof dictionaries)[keyof typeof dictionaries]>
>;

const loadedDicts = {} as { [key in keyof typeof dictionaries]: Dictionary };
async function loadDictionaries() {
  const locales = Object.keys(dictionaries) as Array<keyof typeof dictionaries>;

  await Promise.all(
    locales.map(async (locale) => {
      const dictionary = await dictionaries[locale]();
      loadedDicts[locale as keyof typeof dictionaries] = dictionary;
    })
  );
}
loadDictionaries();

export function getDictionary(locale: string) {
  if (!Object.keys(loadedDicts).includes(locale)) {
    locale = defaultLocale;
  }

  return loadedDicts[locale as keyof typeof loadedDicts];
}

// Get the preferred locale, similar to the above or using a library
export function getLocale(request: NextRequest) {
  return match(languages, locales, defaultLocale);
}
