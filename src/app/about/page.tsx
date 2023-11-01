import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <>
      <h1>Simon</h1>
      <section>
        <h2>Personal information</h2>
        <ul>
          <li>Simon</li>
          <li>18 years old, 23 march 2005</li>
          <li>Living in the Belguim</li>
          <li>Studying Bachelor Elektronics &minus; ICT at Vives</li>
        </ul>
      </section>
      <section>
        <h2>Education</h2>
        <ol>
          <li>
            <strong>2023 &minus; &hellip; </strong>: Bachelor Elektronics &minus; ICT
            at Vives
          </li>
          <li>
            <strong>2022 &minus; 2023</strong>: Programming@home at Howest
          </li>
          <li>
            <strong>2021 &minus; 2023</strong>: Diploma secundair Industriële
            ICT at KTA Brugge.
          </li>
          <li>
            <strong>2019 &minus; 2021</strong>: Science Math at Sint-Jozef Humaniora
          </li>
          <li>
            <strong>2017 &minus; 2019</strong>: Science STEM at Sint-Pieter Oostkamp
          </li>
        </ol>
      </section>
      <section>
        <h2>Experience</h2>
        <ul>
          <li>
            <p>
              I did an internship at{" "}
              <Link href="https://advionics.be/">Advionics</Link>. I learned a
              lot about electronics and programming. I made an program that
              automatically takes pictures from 3 different cameras of their
              product right before it goes in the box for shipping.
            </p>
            <p>
              Later I worked there as a student. I helped measuring their
              machines that callibrated equipment. For example I measured the
              margin of error each machine had.
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}
