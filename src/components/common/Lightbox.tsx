"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useEffect } from "react";

import { IllustrativeBadge } from "@/components/common/Badges";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export interface LightboxImage {
  src: StaticImageData;
  alt: string;
  title?: string;
  caption?: string;
  illustrative?: boolean;
}

/** Visualização ampliada de imagens com navegação por teclado e botões. */
export function Lightbox({
  images,
  index,
  onIndexChange,
  open,
  onOpenChange,
}: {
  images: LightboxImage[];
  index: number;
  onIndexChange: (i: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const current = images[index];
  const total = images.length;
  const go = (delta: number) => onIndexChange((index + delta + total) % total);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange((index + 1) % total);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, total, onIndexChange]);

  if (!current) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-2xl bg-brand-950 p-0 text-white ring-white/10 sm:max-w-5xl">
        <DialogTitle className="sr-only">{current.title ?? current.alt}</DialogTitle>
        <DialogDescription className="sr-only">
          Imagem {index + 1} de {total}. Use as setas do teclado para navegar.
        </DialogDescription>
        <div className="relative aspect-[4/3] w-full bg-black sm:aspect-[16/10]">
          <Image
            key={index}
            src={current.src}
            alt={current.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-contain motion-safe:animate-fade-in"
          />
          {current.illustrative && <IllustrativeBadge className="absolute top-3 left-3" />}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute top-1/2 left-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute top-1/2 right-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        {(current.title || current.caption || total > 1) && (
          <div className="flex items-start justify-between gap-4 px-5 py-4">
            <div>
              {current.title && <p className="font-heading font-semibold">{current.title}</p>}
              {current.caption && <p className="mt-0.5 text-sm text-white/65">{current.caption}</p>}
            </div>
            {total > 1 && (
              <p className="shrink-0 text-sm text-white/60 tabular-nums">
                {index + 1} / {total}
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
