import React from "react";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/public/utils";
import { ClassValue } from "clsx";

export default function RedirectLink({
  href,
  target,
  addIcon = false,
  className,
  children,
}: {
  href: string;
  target?: string;
  addIcon?: boolean;
  className?: ClassValue;
  children: React.ReactNode;
}) {
  if (!target) {
    target = target?.startsWith("http") ? "_blank" : "_self";
  }

  return (
    <Link
      href={href}
      target={target}
      className={buttonVariants({
        variant: "link",
        size: "0",
        className: cn("flex gap-2 text-base", className),
      })}
    >
      {children}
      {addIcon ? <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" /> : <></>}
    </Link>
  );
}
