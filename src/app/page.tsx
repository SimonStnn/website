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
import RedirectLink from "@/components/redirect-link";
import { getDictionary } from "@/dictionary";
import { getLocaleCookie } from "@/lib/cookies";

export default async function Home() {
  const locale = await getLocaleCookie();
  console.log(locale);
  
  const dict = getDictionary(locale);
  return (
    <>
      <section className="w-4/5 md:w-1/2 m-auto py-28 text-center">
        <h1>
          {dict.index.header.title.section1}{" "}
          <span className="text-primary">Simon</span>&apos;s{" "}
          {dict.index.header.title.section2}
        </h1>
        <p>{dict.index.header.slogan}</p>
      </section>

      <hr />
      <section className="mb-16">
        <h2>{dict.index.section1.title}</h2>
        <p>{dict.index.section1.text}</p>
        <div className="flex justify-center mt-8">
          <Link
            className={buttonVariants({
              size: "lg",
              className: "flex justify-center items-center gap-2",
            })}
            href={"/about"}
          >
            <span className="font-bold text-primary-foreground">
              {dict.index.section1.button}
            </span>
            <FontAwesomeIcon className="" icon={faArrowRight} />
          </Link>
        </div>
      </section>
      {/* <hr /> */}
      <section className="mb-16">
        <h2>{dict.index.section2.title}</h2>

        <Accordion type="single" collapsible className="w-10/12 my-5">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg py-2">
              Maxim Claus
            </AccordionTrigger>
            <AccordionContent>
              <RedirectLink
                href="https://maximclaus.ikdoeict.be/"
                className="text-sm"
              >
                Maxim Claus
              </RedirectLink>{" "}
              {dict.index.section2.accordion.maxim}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p>{dict.index.section2.footer}</p>
      </section>
      {/* <hr /> */}
      <section className="mt-5 text-sm">
        <p>{dict.index.section3.text}</p>
      </section>
    </>
  );
}
