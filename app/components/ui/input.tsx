import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, "aria-invalid": ariaInvalid, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      aria-invalid={ariaInvalid}
      className={cn(
        "w-full px-3.5 py-2.5 rounded-md border border-[#E8E8E8] bg-background text-foreground placeholder:text-[#BFBFBF] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        ariaInvalid && "border-destructive focus:ring-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
