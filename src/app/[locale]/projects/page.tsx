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
      <h1 className="text-4xl font-bold mb">{dict.projects.title}</h1>
      <p className="my-5">{dict.projects.text.intro}</p>
      <section className="flex flex-row flex-wrap gap-5">
        <Card
          title={dict.projects.card.finalProject.title}
          content={dict.projects.card.finalProject.content}
          footer={
            <div className="flex gap-5">
              <span>{dict.projects.card.finalProject.footer}</span>
              <span>
                <RedirectLink
                  href="https://github.com/SimonStnn/Eindwerk"
                  addIcon={true}
                >
                  Github
                </RedirectLink>
              </span>
            </div>
          }
        />
        <Card
          image={"/images/next-js-logo.png"}
          title={dict.projects.card.nextjs.title}
          content={dict.projects.card.nextjs.content}
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
          title={dict.projects.card.discordBot.title}
          content={dict.projects.card.discordBot.content}
          footer={
            <div className="flex gap-5">
              <span>{dict.projects.card.discordBot.footer}</span>
              <span>
                <RedirectLink
                  href="https://github.com/SimonStnn/MyBot"
                  addIcon={true}
                >
                  Github
                </RedirectLink>
              </span>
            </div>
          }
        />
        <Card
          title={dict.projects.card.other.title}
          content={dict.projects.card.other.content}
          footer={dict.projects.card.other.footer}
        />
      </section>
      <p className="my-5">{dict.projects.text.end}</p>
    </>
  );
}
