import React from "react";
import RedirectLink from "@/components/redirect-link";
import { Locale, getDictionary } from "@/dictionary";

export default function About({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
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
          <li>
            <strong>{dict.about.section2.studies.vives.year}</strong>:{" "}
            {dict.about.section2.studies.vives.text}
          </li>
          <li>
            <strong>{dict.about.section2.studies.howest.year}</strong>:{" "}
            {dict.about.section2.studies.howest.text}
          </li>
          <li>
            <strong>{dict.about.section2.studies.kta.year}</strong>:{" "}
            {dict.about.section2.studies.kta.text}
          </li>
          <li>
            <strong>{dict.about.section2.studies.sjh.year}</strong>:{" "}
            {dict.about.section2.studies.sjh.text}
          </li>
          <li>
            <strong>{dict.about.section2.studies.sp.year}</strong>:{" "}
            {dict.about.section2.studies.sp.text}
          </li>
        </ol>
      </section>
      <section>
        <h2>{dict.about.section3.title}</h2>
        <ul>
          <li>
            <p>
              {dict.about.section3.paragraph1.section1}{" "}
              <RedirectLink href="https://advionics.be/">
                Advionics
              </RedirectLink>
              {dict.about.section3.paragraph1.section2}
            </p>
            <p>{dict.about.section3.paragraph2.section1}</p>
          </li>
        </ul>
      </section>
    </>
  );
}
