import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 outline-none select-none focus-visible:ring-4 focus-visible:ring-brand-300/60 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  {
    variants: {
      variant: {
        default:
          "bg-brand-500 text-white shadow-[0_8px_20px_-8px_rgb(0_112_184/0.55)] hover:bg-brand-600 hover:shadow-[0_12px_28px_-10px_rgb(0_112_184/0.6)]",
        navy: "bg-brand-800 text-white hover:bg-brand-900",
        whatsapp:
          "bg-wa text-white shadow-[0_8px_20px_-8px_rgb(11_122_65/0.55)] hover:bg-wa-hover",
        outline:
          "border-border bg-white text-ink hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800",
        "outline-light":
          "border-white/30 bg-white/5 text-white backdrop-blur hover:border-white/60 hover:bg-white/10",
        light: "bg-white text-brand-800 hover:bg-brand-50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-brand-100",
        ghost: "text-ink hover:bg-muted",
        link: "rounded-md px-0 text-brand-600 underline-offset-4 hover:underline",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-[0.8125rem]",
        lg: "h-12 px-6 text-[0.9375rem]",
        xl: "h-14 px-7 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
