import { FlaskConical, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Selo para conteúdo ainda não confirmado (visível apenas em modo de revisão). */
export function DraftBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-sun-400 px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-brand-950 uppercase shadow-sm",
        className
      )}
      title="Conteúdo não confirmado pela Brasscart — oculto no site público"
    >
      <FlaskConical className="size-3" aria-hidden="true" />
      Rascunho
    </span>
  );
}

/** Selo para imagens de banco de imagens (não são trabalhos da Brasscart). */
export function IllustrativeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[0.7rem] font-semibold text-white backdrop-blur",
        className
      )}
    >
      <ImageIcon className="size-3" aria-hidden="true" />
      Imagem ilustrativa
    </span>
  );
}
