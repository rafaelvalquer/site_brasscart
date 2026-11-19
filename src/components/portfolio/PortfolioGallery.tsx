"use client";

import * as m from "motion/react-m";
import { Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";

import { IllustrativeBadge } from "@/components/common/Badges";
import { Lightbox } from "@/components/common/Lightbox";
import { SafeImage } from "@/components/common/SafeImage";
import type { PortfolioItem } from "@/content/types";
import { cn } from "@/lib/utils";

const ALL = "Todos";

/** Galeria do portfólio com filtros por categoria e visualização ampliada. */
export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState(ALL);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const filters = useMemo(() => [ALL, ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const visible = useMemo(() => (filter === ALL ? items : items.filter((i) => i.category === filter)), [items, filter]);

  const lightboxImages = visible.map((i) => ({
    src: i.image.src,
    alt: i.image.alt,
    title: i.title,
    caption: i.description,
    illustrative: i.kind === "ilustrativo",
  }));

  return (
    <div>
      <div role="group" aria-label="Filtrar portfólio por categoria" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              filter === f
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-border bg-white text-ink hover:border-brand-300 hover:bg-brand-50"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <m.ul
        key={filter}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
          {visible.map((item, i) => (
            <m.li
              key={item.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              className={cn(i % 5 === 0 && "sm:row-span-2")}
            >
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-3xl bg-surface text-left",
                  i % 5 === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[26rem]" : "aspect-[4/3]"
                )}
                aria-label={`Ampliar: ${item.title}`}
              >
                <SafeImage
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                {item.kind === "ilustrativo" && <IllustrativeBadge className="absolute top-4 left-4" />}
                <span className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-lift transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="size-4" aria-hidden="true" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="text-xs font-semibold tracking-wider text-brand-200 uppercase">{item.category}</span>
                  <span className="mt-1 block font-heading text-lg font-bold">{item.title}</span>
                  <span className="mt-1 block text-sm text-white/75">{item.description}</span>
                </span>
              </button>
            </m.li>
          ))}
      </m.ul>

      <Lightbox images={lightboxImages} index={index} onIndexChange={setIndex} open={open} onOpenChange={setOpen} />
    </div>
  );
}
