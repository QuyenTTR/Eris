import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        active: "bg-active text-active-foreground hover:brightness-90",
        success: "bg-success text-success-foreground hover:brightness-90",
        danger: "bg-danger text-danger-foreground hover:brightness-90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80",
        info: "bg-info text-info-foreground hover:brightness-90",

        outline:
          "border bg-background shadow-xs hover:bg-primary hover:text-primary-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-secondary":
          "border border-secondary bg-background text-secondary shadow-xs hover:bg-secondary hover:text-secondary-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-active":
          "border border-active bg-background text-active shadow-xs hover:bg-active hover:text-active-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-success":
          "border border-success bg-background text-success shadow-xs hover:bg-success hover:text-success-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-danger":
          "border border-danger bg-background text-danger shadow-xs hover:bg-danger hover:text-danger-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-warning":
          "border border-warning bg-background text-warning shadow-xs hover:bg-warning hover:text-warning-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-info":
          "border border-info bg-background text-info shadow-xs hover:bg-info hover:text-info-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({ className, variant, size, asChild = false, ...props }) {
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
