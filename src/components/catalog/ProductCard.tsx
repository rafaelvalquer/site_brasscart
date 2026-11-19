import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { DraftBadge } from "@/components/common/Badges";
import { SafeImage } from "@/components/common/SafeImage";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import type { CatalogItem } from "@/content/types";
import { cn } from "@/lib/utils";

export type ProductCardData = Pick<
  CatalogItem,
  "slug" | "name" | "type" | "summary" | "image" | "status"
> & { categoryTitle: string };

export function ProductCard({ item, className, priority = false }: { item: ProductCardData; className?: string; priority?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-white shadow-soft transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <SafeImage
          src={item.image.src}
          alt={item.image.alt}
          fill
          preload={priority}
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 92vw"
          placeholder="blur"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm backdrop-blur">
            {item.type === "produto" ? "Produto" : "Serviço"}
          </span>
          {item.status === "rascunho" && <DraftBadge />}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-brand-600 uppercase">{item.categoryTitle}</p>
        <h3 className="mt-2 text-lg leading-snug font-bold">
          <Link
            href={`/produtos/${item.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:after:ring-4 focus-visible:after:ring-brand-300/60"
          >
            {item.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-muted-foreground">{item.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-sm font-medium text-ink/70">Preço sob consulta</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-transform duration-300 group-hover:translate-x-0.5">
            Detalhes
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
        <WhatsAppButton
          location="product_card"
          context={{ kind: "product", name: item.name }}
          size="sm"
          variant="outline"
          className="relative z-10 mt-4 w-full border-wa/25 text-wa hover:border-wa/50 hover:bg-wa/5 hover:text-wa-hover"
        >
          Consultar pelo WhatsApp
        </WhatsAppButton>
      </div>
    </article>
  );
}
