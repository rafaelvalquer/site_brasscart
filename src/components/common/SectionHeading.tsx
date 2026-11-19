import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, tone = "brand", className }: { children: ReactNode; tone?: "brand" | "light"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.14em] uppercase",
        tone === "brand" ? "text-brand-600" : "text-brand-200",
        className
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "brand" ? "bg-brand-400" : "bg-brand-300")} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "mt-4 text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem]",
          tone === "light" && "text-white"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-white/70" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
