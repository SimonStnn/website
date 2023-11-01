import React from "react";
import Card from "@/components/card";

export default function Projects() {
  return (
    <>
      <h1 className="text-4xl font-bold mb">Projects</h1>
      <p className="my-5">
        Here are some projects I&apos;ve worked on. Some of them are open
        source, others are not.
      </p>
      <section className="flex flex-row flex-wrap gap-5">
        <Card
          title="Final project"
          content={
            <>
              For my final project in high school (2022 - 2023), I built a
              bluetooth detection system. It detects bluetooth devices and sends
              data via http to a server (Raspberry Pi). The server then tries to
              locate the found device in a room. This information is then
              displayed via websocket to a React app. This app had an advanced
              structure to make it easy to add new features.
            </>
          }
          footer={
            <>
              Python | React | Node.js |{" "}
              Raspberry Pi | Bluetooth | Websocket{" "}
              | ESP32
            </>
          }
        />
        <Card
          image={"/images/next-js-logo.png"}
          title="This app"
          content={
            <>
              This app is built with Next JS, a React framework. It is a static
              site generator, which means that it generates static HTML pages at
              build time.
            </>
          }
          footer={<></>}
        />
        <Card
          image={"/images/discord.svg"}
          title="Discord bot"
          content={
            <>
              I built a discord bot with node.js and discord.js. It&apos;s
              written in TypeScript and uses a MongoDB database.
            </>
          }
          footer={<>discord.js | MongoDB | Node.js</>}
        />
        <Card
          title="Other projects"
          content={
            <>
              I&apos;ve also build some closed source projects, but I cannot
              share them here. I&apos;ve made a prometheus exporter, that pushes
              to grafana. I&apos;m also working on an API.
            </>
          }
          footer={<>Python | C# | ...</>}
        />
      </section>
      <p className="my-5">
        I mostly work on larger projects, most of them included here. I also
        build smaller projects, but I don&apos;t share them here.
      </p>
    </>
  );
}
