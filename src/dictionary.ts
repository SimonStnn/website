import "server-only";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";

export const locales = ["en"];
const headers = {
  "accept-language": `${locales.join(",")};q=0.5`,
};

export const languages = new Negotiator({ headers }).languages();
export const defaultLocale = "en";

// Get the preferred locale, similar to the above or using a library
export function getLocale(request: NextRequest) {
  return match(languages, locales, defaultLocale);
}

const dictionaries = {
  en: () => import("@translations/en.json").then((module) => module.default),
};

(() => {})();
type PromiseType<T> = T extends Promise<infer U> ? U : never;
type Dictionary = PromiseType<
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
// const loadedDictionaries: LoadedDictionaries = {};

// // Load all dictionaries at startup
// async function loadDictionaries() {
//   for (let locale of Object.keys(dictionaries)) {
//     loadedDictionaries[locale as keyof typeof dictionaries] = await dictionaries[locale as keyof typeof dictionaries]();
//   }
// }

// loadDictionaries();

// export function getDictionary(locale: string) {
//   if (!Object.keys(loadedDictionaries).includes(locale)) {
//     locale = defaultLocale;
//   }

//   return loadedDictionaries[locale];
// }