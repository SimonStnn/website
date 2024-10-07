import React from "react";
import RedirectLink from "@/components/redirect-link";
import { getDictionary } from "@/dictionary";
import { getLocaleCookie } from "@/lib/cookies";

export default async function About() {
  const locale = await getLocaleCookie();
  const dict = getDictionary(locale);
  return (
    <>
      <section>
        <h2>{dict.about.section1.title}</h2>
        <ul>
          <li>{dict.about.section1.birthday}</li>
          <li>{dict.about.section1.livingIn}</li>
          <li>{dict.about.section1.studies}</li>
          <li>
            {dict.about.section1.hobby}{" "}
            <RedirectLink href="https://brugschebeiren.com/">
              Brugsche Beiren
            </RedirectLink>
          </li>
        </ul>
      </section>
      <section>
        <h2>{dict.about.section2.title}</h2>
        <ol>
          {dict.about.section2.studies.map((item, index) => (
            <li key={index}>
              <strong className="tabular-nums">{item.date}</strong>: {item.text}
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h2>{dict.about.section3.title}</h2>
        <ol className="space-y-3 my-3">
          {dict.about.section3.list.map((item, index) => (
            <li key={index}>
              <div className="flex items-baseline gap-2">
                <h3 className="m-0 text-xl">{item.date}</h3> &mdash;{" "}
                <span>{item.text}</span>{" "}
              </div>
              <p>
                {item.description}{" "}
                {item.hasOwnProperty("link") && (
                  <RedirectLink href={(item as any).link.url}>
                    {(item as any).link.text}
                  </RedirectLink>
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
