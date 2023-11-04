import React from "react";
import Card from "@/components/card";
import RedirectLink from "@/components/redirect-link";
import { Locale, getDictionary } from "@/dictionary";

export default function Projects({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(locale);
  return (
    <>
      <h1 className="text-4xl font-bold mb">{dict.Projects.title}</h1>
      <p className="my-5">{dict.Projects.text.intro}</p>
      <section className="flex flex-row flex-wrap gap-5">
        <Card
          title={dict.Projects.card.finalProject.title}
          content={dict.Projects.card.finalProject.content}
          footer={dict.Projects.card.finalProject.footer}
        />
        <Card
          image={"/images/next-js-logo.png"}
          title={dict.Projects.card.nextjs.title}
          content={dict.Projects.card.nextjs.content}
          footer={
            <span className="flex flex-col items-end gap-1">
              <RedirectLink href="https://nextjs.org/" addIcon={true}>
                Next.js
              </RedirectLink>
              <RedirectLink
                href="https://github.com/SimonStnn/website"
                addIcon={true}
              >
                Github
              </RedirectLink>
            </span>
          }
        />
        <Card
          image={"/images/discord.svg"}
          title={dict.Projects.card.discordBot.title}
          content={dict.Projects.card.discordBot.content}
          footer={dict.Projects.card.discordBot.footer}
        />
        <Card
          title={dict.Projects.card.other.title}
          content={dict.Projects.card.other.content}
          footer={dict.Projects.card.other.footer}
        />
      </section>
      <p className="my-5">{dict.Projects.text.end}</p>
    </>
  );
}
