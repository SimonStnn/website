import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundGradient = cn(
  "bg-gradient-to-br from-accent via-muted to-primary text-primary-foreground",
  "z-1 [*>]:z-1 hover:bg-gradient-to-bl hover:from-accent hover:via-muted hover:to-primary",
  "active:before:bg-gradient-to-tl active:before:from-muted/90 active:before:to-primary/90"
);

const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition cursor-pointer select-none"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "shadow-xs",
          // Inner color gradient
          "before:-z-1 before:absolute before:inset-0.5 before:rounded-sm before:bg-gradient-to-br before:from-muted before:to-primary",
          backgroundGradient
        ),
        destructive: cn(
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
        ),
        outline: cn(
          // backgroundGradient,
          "border bg-background text-foreground shadow-xs hover:bg-accent/30 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/20"
          // "active:before:bg-gradient-to-tl active:before:from-muted/90 active:before:to-primary/90"
        ),
        secondary: cn(
          backgroundGradient,
          "before:-z-1 before:absolute before:inset-0.5 before:rounded-sm before:bg-background/95",
          "active:before:bg-gradient-to-br active:before:from-popover/50 active:before:to-popover/95",
          "text-foreground shadow-xs "
        ),
        ghost: cn("text-primary-foreground/80 hover:text-primary-foreground"),
        link: cn("text-primary underline-offset-4 hover:underline"),
      },
      size: {
        default: cn("h-9 px-4 py-2 has-[>svg]:px-3"),
        sm: cn("h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"),
        lg: cn("h-10 rounded-md px-6 has-[>svg]:px-4"),
        icon: cn("size-9"),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
