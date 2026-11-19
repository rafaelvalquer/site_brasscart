import { ArrowUpRight } from "lucide-react";

import { InstagramIcon } from "@/components/brand/SocialIcons";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";

/** Chamada para o Instagram oficial (usada enquanto o portfólio real não é publicado). */
export function InstagramCallout({ title, text }: { title?: string; text?: string }) {
  return (
    <Reveal>
      <a
        href={siteConfig.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col items-start gap-6 overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-sun-100/60 p-8 transition-shadow hover:shadow-lift sm:flex-row sm:items-center sm:p-10"
      >
        <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-[0_12px_28px_-12px_rgb(0_112_184/0.8)]">
          <InstagramIcon className="size-8" />
        </span>
        <span className="flex-1">
          <span className="block font-heading text-2xl font-bold text-ink">
            {title ?? "Acompanhe a Brasscart no Instagram"}
          </span>
          <span className="mt-2 block leading-relaxed text-muted-foreground">
            {text ?? "Novidades, dicas para cuidar da sua impressora e os trabalhos do dia a dia."}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-soft transition-transform group-hover:translate-x-1">
          {siteConfig.instagram.handle}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </Reveal>
  );
}
