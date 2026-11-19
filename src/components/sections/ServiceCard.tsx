import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { CategoryIcon } from "@/components/common/CategoryIcon";
import { DraftBadge } from "@/components/common/Badges";
import { SafeImage } from "@/components/common/SafeImage";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import type { ServiceCategory } from "@/content/types";

export function ServiceCard({ category }: { category: ServiceCategory }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-white shadow-soft transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <SafeImage
          src={category.image.src}
          alt={category.image.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-brand-950/0 to-transparent" />
        <span className="absolute bottom-4 left-4 inline-flex size-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-lift transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
          <CategoryIcon name={category.icon} className="size-5.5" />
        </span>
        {category.status === "rascunho" && <DraftBadge className="absolute top-4 left-4" />}
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="text-xl font-bold">{category.title}</h3>
        <p className="mt-2.5 leading-relaxed text-muted-foreground">{category.summary}</p>
        <ul className="mt-5 space-y-2.5">
          {category.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-[0.93rem] text-ink/80">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-2.5 pt-7 sm:flex-row">
          <Link
            href={`/servicos/${category.slug}`}
            className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
            aria-label={`Saiba mais sobre ${category.title}`}
          >
            Saiba mais
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <WhatsAppButton
            location="service_card"
            context={{ kind: "service", name: category.serviceName }}
            className="flex-1"
            icon
          >
            Solicitar orçamento
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
