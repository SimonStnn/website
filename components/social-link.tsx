import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  ariaLabel: string;
  className?: string;
  children?: ReactNode;
  download?: string;
  // Icon component prop (optional)
  icon?: React.ComponentType<{ className?: string }>;
  // Icon image props (optional)
  imgSrc?: string;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
  // Text label (optional)
  label?: string;
}

export default function SocialLink({
  href,
  ariaLabel,
  className,
  children,
  download,
  icon: Icon,
  imgSrc,
  imgAlt,
  imgWidth = 32,
  imgHeight = 32,
  label,
}: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn("hover:text-primary transition-colors", className)}
      download={download}
    >
      {/* If children are provided, render them directly */}
      {children || (
        <>
          {/* Render icon if provided */}
          {Icon && <Icon className="size-6" />}

          {/* Render image if provided and no icon */}
          {!Icon && imgSrc && (
            <Image
              src={imgSrc}
              alt={imgAlt || ariaLabel}
              width={imgWidth}
              height={imgHeight}
              className="size-6"
            />
          )}

          {label && <span>{label}</span>}

          {!Icon && !imgSrc && !label && ariaLabel}
        </>
      )}
    </Link>
  );
}
