import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  content: string | React.JSX.Element;
  footer?: React.JSX.Element;
  image?:
    | string
    | {
        src: string;
        alt: string;
      };
}

const Card = ({ title, content, footer, image }: CardProps) => {
  if (typeof image === "string") {
    image = {
      src: image,
      alt: "card image",
    };
  }

  return (
    <article className="block bg-card w-full h-full sm:w-80 text-justify bg-gradient-to-br rounded-lg border shadow-lg hover:scale-105 hover:shadow-xl transition-all">
      {!image ? (
        <></>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          className="object-cover w-full h-40 rounded-tr-md rounded-tl-md select-none"
          width={500}
          height={500}
        />
      )}

      <div className="p-4">
        <header>
          <h1 className="mb-3 text-2xl font-normal capitalize">
            {title}
            <hr />
          </h1>
        </header>

        <div>
          <p>{content}</p>
        </div>

        {!footer ? (
          <></>
        ) : (
          <footer className="mt-3 text-sm">
            <hr className="mb-2" />
            {footer}
          </footer>
        )}
      </div>
    </article>
  );
};

export default Card;
