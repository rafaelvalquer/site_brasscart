"use client";

import { Check, ClipboardList, Expand, MessageSquareText } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { DraftBadge } from "@/components/common/Badges";
import { Lightbox, type LightboxImage } from "@/components/common/Lightbox";
import { SafeImage } from "@/components/common/SafeImage";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import type { PublicCatalogItem } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Detalhes de um item do catálogo: galeria com ampliação, variações que
 * entram na mensagem do WhatsApp, especificações e chamadas de orçamento.
 */
export function ProductDetails({ item, categoryTitle }: { item: PublicCatalogItem; categoryTitle: string }) {
  const gallery = [item.image, ...(item.gallery ?? [])];
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selection, setSelection] = useState<Record<string, string>>({});

  const details = (item.variants ?? [])
    .map((v) => (selection[v.label] ? `${v.label}: ${selection[v.label]}` : ""))
    .filter(Boolean);

  const lightboxImages: LightboxImage[] = gallery.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: item.name,
    caption: img.alt,
    illustrative: true,
  }));

  const toggle = (label: string, option: string) =>
    setSelection((s) => {
      const next = { ...s };
      if (next[label] === option) delete next[label];
      else next[label] = option;
      return next;
    });

  const current = gallery[active] ?? gallery[0];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Galeria */}
      <div className="lg:col-span-7">
        <div className="lg:sticky lg:top-28">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-surface shadow-soft"
            aria-label={`Ampliar imagem: ${current.alt}`}
          >
            <SafeImage
              key={active}
              src={current.src}
              alt={current.alt}
              fill
              preload={active === 0}
              placeholder="blur"
              sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-safe:animate-fade-in"
            />
            <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur">
              <Expand className="size-3.5" aria-hidden="true" />
              Ampliar
            </span>
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            Imagens ilustrativas. Marcas, modelos e acabamentos podem variar conforme disponibilidade.
          </p>

          {gallery.length > 1 && (
            <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5" aria-label="Miniaturas">
              {gallery.map((img, i) => (
                <li key={img.src.src}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Ver imagem ${i + 1}: ${img.alt}`}
                    aria-current={i === active ? "true" : undefined}
                    className={cn(
                      "relative block aspect-square w-full overflow-hidden rounded-2xl bg-surface ring-2 transition",
                      i === active ? "ring-brand-500" : "ring-transparent hover:ring-brand-200"
                    )}
                  >
                    <Image src={img.src} alt="" fill sizes="120px" placeholder="blur" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Informações */}
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {item.type === "produto" ? "Produto" : "Serviço"}
          </span>
          <span className="text-xs font-semibold tracking-wider text-brand-600 uppercase">{categoryTitle}</span>
          {item.status === "rascunho" && <DraftBadge />}
        </div>

        <h1 className="mt-4 text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-[2.6rem]">{item.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{item.description}</p>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
          <MessageSquareText className="size-5 shrink-0 text-brand-500" aria-hidden="true" />
          <div>
            <p className="font-heading font-bold text-ink">Preço sob consulta</p>
            <p className="text-sm text-muted-foreground">Valores e disponibilidade confirmados pela equipe no WhatsApp.</p>
          </div>
        </div>

        {item.variants && item.variants.length > 0 && (
          <div className="mt-8 space-y-6">
            {item.variants.map((variant) => (
              <fieldset key={variant.label}>
                <legend className="text-sm font-semibold text-ink">
                  {variant.label}
                  <span className="ml-1 font-normal text-muted-foreground">(opcional)</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {variant.options.map((option) => {
                    const selected = selection[variant.label] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggle(variant.label, option)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                          selected
                            ? "border-brand-500 bg-brand-500 text-white"
                            : "border-border bg-white text-ink hover:border-brand-300 hover:bg-brand-50"
                        )}
                      >
                        {selected && <Check className="size-3.5" aria-hidden="true" />}
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
            <p className="text-sm text-muted-foreground">
              As opções escolhidas são incluídas automaticamente na mensagem do WhatsApp.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <WhatsAppButton
            location="product_details"
            context={{ kind: "product", name: item.name, details }}
            size="lg"
            className="flex-1"
          >
            Consultar pelo WhatsApp
          </WhatsAppButton>
          <LinkButton href={`/contato?item=${item.slug}#orcamento`} variant="outline" size="lg" className="flex-1">
            <ClipboardList className="size-4" aria-hidden="true" />
            Solicitar orçamento
          </LinkButton>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <h2 className="text-lg font-bold">Destaques</h2>
          <ul className="mt-4 space-y-3">
            {item.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/85">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {item.specs && item.specs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold">Especificações</h2>
            <dl className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border">
              {item.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-5 gap-4 bg-white px-5 py-3.5 text-sm odd:bg-surface/60">
                  <dt className="col-span-2 font-semibold text-ink">{spec.label}</dt>
                  <dd className="col-span-3 text-muted-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <Lightbox
        images={lightboxImages}
        index={active}
        onIndexChange={setActive}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}
