import React from "react";
import { getDictionary } from "@/dictionary";
import { getLocaleCookie } from "@/lib/cookies";
import RedirectLink from "@/components/redirect-link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

export default async function Projects() {
  const locale = await getLocaleCookie();
  const dict = getDictionary(locale);

  const highlighted_projects = [
    <>
      <Card>
        <CardHeader>
          <CardTitle>{dict.projects.card.finalProject.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{dict.projects.card.finalProject.content}</p>
        </CardContent>
        <CardFooter>
          <>
            <div>
              Python
              <Separator orientation="vertical" className="mx-2" />
              React
              <Separator orientation="vertical" className="mx-2" />
              Node.js
              <Separator orientation="vertical" className="mx-2" />
              Raspberry Pi
              <Separator orientation="vertical" className="mx-2" />
              Bluetooth
              <Separator orientation="vertical" className="mx-2" />
              Websocket
              <Separator orientation="vertical" className="mx-2" />
              ESP32
            </div>
            <Separator orientation="vertical" className="mr-2 ml-1" />
            <div className="min-w-fit">
              <RedirectLink
                href="https://github.com/SimonStnn/Eindwerk"
                addIcon={true}
              >
                Github
              </RedirectLink>
            </div>
          </>
        </CardFooter>
      </Card>
    </>,
    <>
      <Card>
        <CardHeader>
          <CardTitle>{dict.projects.card.nextjs.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{dict.projects.card.nextjs.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <>
            <div>
              <RedirectLink href="https://nextjs.org/" addIcon={true}>
                Next.js
              </RedirectLink>
              <Separator orientation="vertical" className="mx-2" />
              <RedirectLink
                href="https://github.com/SimonStnn/website"
                addIcon={true}
              >
                Github
              </RedirectLink>
            </div>
          </>
        </CardFooter>
      </Card>
    </>,
    <>
      <Card>
        <CardHeader>
          <CardTitle>{dict.projects.card.discordBot.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{dict.projects.card.discordBot.content}</p>
        </CardContent>
        <CardFooter className="flex">
          <>
            <div className="flex-grow">
              discord.js
              <Separator orientation="vertical" className="mx-2" />
              MongoDB
              <Separator orientation="vertical" className="mx-2" />
              Node.js
            </div>
            <Separator orientation="vertical" className="mr-2 ml-1" />
            <div>
              <RedirectLink
                href="https://github.com/SimonStnn/website"
                addIcon={true}
              >
                Github
              </RedirectLink>
            </div>
          </>
        </CardFooter>
      </Card>
    </>,
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Is even</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{dict.projects.card.oddAndEven.even.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <>
            <div className="flex justify-self-start w-full">Go</div>
            <Separator orientation="vertical" className="mr-2 ml-1" />
            <div>
              <RedirectLink
                href="https://github.com/SimonStnn/iseven"
                addIcon={true}
              >
                Github
              </RedirectLink>
            </div>
          </>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Is odd</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{dict.projects.card.oddAndEven.odd.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <>
            <div className="flex justify-self-start w-full">Go</div>
            <Separator orientation="vertical" className="mr-2 ml-1" />
            <div>
              <RedirectLink
                href="https://github.com/SimonStnn/isodd"
                addIcon={true}
              >
                Github
              </RedirectLink>
            </div>
          </>
        </CardFooter>
      </Card>
    </>,
    <>
      <Card>
        <CardHeader>
          <CardTitle>{dict.projects.card.other.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{dict.projects.card.other.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <>
            <div className="flex justify-self-start w-full">
              Python
              <Separator orientation="vertical" className="mx-2" />
              C#
              <Separator orientation="vertical" className="mx-2" />
              ...
            </div>
          </>
        </CardFooter>
      </Card>
    </>,
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb">{dict.projects.title}</h1>
      <p className="my-5">{dict.projects.text.intro}</p>
      <section className="flex flex-row flex-wrap justify-center gap-5">
        <Carousel
          className="w-[90%]"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1">
            {highlighted_projects.map((project, index) => (
              <CarouselItem
                key={index}
                className="md:basis-4/5 lg:basis-1/2 xl:basis-1/3"
              >
                {project}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <p className="my-5">{dict.projects.text.end}</p>
    </>
  );
}
