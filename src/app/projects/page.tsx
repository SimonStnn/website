import React from "react";
import RedirectLink from "@/components/redirect-link";
import { getDictionary } from "@/dictionary";
import { getLocaleCookie } from "@/lib/cookies";

export default async function Projects() {
  const locale = await getLocaleCookie();
  const dict = getDictionary(locale);
  return (
    <>
      <h1 className="text-4xl font-bold mb">{dict.projects.title}</h1>
      <p className="my-5">{dict.projects.text.intro}</p>
      <section className="flex flex-row flex-wrap gap-5">
 
      </section>
      <p className="my-5">{dict.projects.text.end}</p>
    </>
  );
}
