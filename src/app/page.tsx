"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GlassyBackground from "@/components/glassy-background";

export default function Home() {
  return (
    <>
      <section className="w-3/4 m-auto py-24 text-center">
        <h1>
          Welcome to <span className="text-primary">Simon</span>&apos;s <br />{" "}
          personal website!
        </h1>
        <p>
          Hello there! I&apos;m Simon, a passionate developer based in Belgium.
          Welcome to my digital space, where creativity meets technology and
          curiosity fuels innovation.
        </p>
      </section>

      <hr />
      <section className="mb-16">
        <h2>Get to know me</h2>
        <p>
          I&apos;m an 18 year old developer from Belgium. I&apos;m currently
          studying at Vives Burgge.
        </p>
        <div className="flex justify-center mt-8">
          <Link
            className={buttonVariants({
              size: "lg",
              className: "flex justify-center items-center gap-2",
            })}
            href={"/about"}
          >
            <span className="font-bold">Get to know me</span>{" "}
            <FontAwesomeIcon className="" icon={faArrowRight} />
          </Link>
        </div>
      </section>
      <hr />
      <section className="mb-16">
        <h2>
          Showcasing websites of talented <br />
          friends. Explore their work!
        </h2>

        <Accordion type="single" collapsible className="w-10/12 my-5">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg py-2">Maxim Claus</AccordionTrigger>
            <AccordionContent>
              <Link
                className={buttonVariants({
                  variant: "link",
                  size: "0",
                })}
                href="https://maximclaus.ikdoeict.be/"
                target="_blank"
              >
                Maxim Claus
              </Link>{" "}
              is a friend of mine who is also a developer. He is currently
              studying at Odisee in Ghent.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p>
          They are really talented and I&apos;m proud to call them my friends.
        </p>
      </section>
      <hr />
      <section className="mt-5 text-sm">
        <p>
          Feel free to browse around, and don&apos;t hesitate to get in touch.
          I&apos;m always eager to connect with like-minded individuals and
          explore new opportunities. Thank you for visiting, and I hope you
          enjoy your stay!
        </p>
      </section>
    </>
  );
}
