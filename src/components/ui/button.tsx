import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/** Trailing arrow slide on hover — only when SVG is the last child */
const buttonArrow =
  "[&>svg:last-child]:transition-transform [&>svg:last-child]:duration-300 [&>svg:last-child]:ease-[cubic-bezier(0.4,0,0.2,1)] hover:[&>svg:last-child]:translate-x-0.5 motion-reduce:hover:[&>svg:last-child]:translate-x-0"

const buttonTransition =
  "transition-[background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"

const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none",
    buttonTransition,
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    buttonArrow,
  ),
  {
    variants: {
      variant: {
        /** Primary — DOT Orange default, Deep Navy on hover */
        accent: cn(
          "border-transparent bg-[var(--dot-orange)] text-white",
          "shadow-[0_2px_8px_-2px_rgba(246,142,5,0.28)]",
          "hover:border-[var(--dot-navy)] hover:bg-[var(--dot-navy)] hover:text-white",
          "hover:shadow-[0_4px_12px_-4px_rgba(12,21,36,0.18)]",
        ),
        /** Secondary — transparent with Deep Navy border, filled on hover */
        outline: cn(
          "border-[var(--dot-navy)] bg-transparent text-[var(--dot-navy)]",
          "hover:border-[var(--dot-navy)] hover:bg-[var(--dot-navy)] hover:text-white",
        ),
        /** On dark backgrounds — white outline, white fill on hover */
        inverse: cn(
          "border-white bg-transparent text-white",
          "hover:border-white hover:bg-white hover:text-[var(--dot-navy)]",
        ),
        /** Hero primary — white fill on dark imagery */
        hero: cn(
          "border-transparent bg-white text-[var(--dot-navy)]",
          "shadow-[0_2px_10px_-4px_rgba(0,0,0,0.18)]",
          "hover:border-[var(--dot-orange)] hover:bg-[var(--dot-orange)] hover:text-white",
          "hover:shadow-[0_4px_12px_-4px_rgba(246,142,5,0.28)]",
        ),
        /** Filled Deep Navy — for dark panels */
        default: cn(
          "border-[var(--dot-navy)] bg-[var(--dot-navy)] text-white",
          "hover:border-[var(--dot-navy)] hover:bg-[color-mix(in_oklch,var(--dot-navy),white_8%)] hover:text-white",
        ),
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)]",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 [&_svg]:group-hover/button:translate-x-0",
        destructive:
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 [&_svg]:group-hover/button:translate-x-0",
        link: "border-transparent bg-transparent text-primary shadow-none hover:text-accent underline-offset-4 hover:underline [&_svg]:group-hover/button:translate-x-0",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xl: "h-11 gap-2 px-6 text-base",
        icon: "size-8 [&_svg]:group-hover/button:!translate-x-0",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3 [&_svg]:group-hover/button:!translate-x-0",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg [&_svg]:group-hover/button:!translate-x-0",
        "icon-lg": "size-9 [&_svg]:group-hover/button:!translate-x-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
