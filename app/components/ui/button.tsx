import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "w-full pl-[20px] pr-6 py-4 rounded-[10px] text-[15px] bg-[#6A59CE] text-primary-foreground font-semibold font-geist hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-[-0.2px]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[#E8E8E8] text-[#959595] text-[15px]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        darker:
          "bg-[#2a272d] text-primary-foreground shadow hover:bg-[#2a272d]/90",
      },
      // size: {
      //   default: "h-9 px-6 py-4 rounded-lg text-[15px]",
      //   sm: "h-8 rounded-md px-3 text-xs",
      //   lg: "h-10 rounded-md px-8",
      //   icon: "h-9 w-9",
      // },
    },
    defaultVariants: {
      variant: "default",
      // size: "default",
    },
  }
);

function Button({
  className,
  variant,
  // size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
