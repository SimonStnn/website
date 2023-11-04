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

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = getDictionary(locale);
  return (
    <>
      <section className="w-1/2 m-auto py-28 text-center">
        <h1>
          {dict.Index.header.title.section1}{" "}
          <span className="text-primary">Simon</span>&apos;s{" "}
          {dict.Index.header.title.section2}
        </h1>
        <p>{dict.Index.header.slogan}</p>
      </section>

      <hr />
      <section className="mb-16">
        <h2>{dict.Index.section1.title}</h2>
        <p>{dict.Index.section1.text}</p>
        <div className="flex justify-center mt-8">
          <Link
            className={buttonVariants({
              size: "lg",
              className: "flex justify-center items-center gap-2",
            })}
            href={"/about"}
          >
            <span className="font-bold text-primary-foreground">
              {dict.Index.section1.button}
            </span>
            <FontAwesomeIcon className="" icon={faArrowRight} />
          </Link>
        </div>
      </section>
      {/* <hr /> */}
      <section className="mb-16">
        <h2>{dict.Index.section2.title}</h2>

        <Accordion type="single" collapsible className="w-10/12 my-5">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg py-2">
              {dict.Index.section2.accordion.maxim.title}
            </AccordionTrigger>
            <AccordionContent>
              <RedirectLink
                href="https://maximclaus.ikdoeict.be/"
                className="text-sm"
              >
                {dict.Index.section2.accordion.maxim.link}
              </RedirectLink>{" "}
              {dict.Index.section2.accordion.maxim.text}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p>{dict.Index.section2.footer}</p>
      </section>
      {/* <hr /> */}
      <section className="mt-5 text-sm">
        <p>
          {dict.Index.section3.text}
        </p>
      </section>
    </>
  );
}
