import { ArrowLeft, Search } from "lucide-react";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/common/SectionHeading";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-label="Página não encontrada" className="relative overflow-hidden bg-surface pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div className="container-site relative flex flex-col items-center text-center">
        <p aria-hidden="true" className="font-heading text-[7rem] leading-none font-extrabold text-brand-500/15 sm:text-[10rem]">
          404
        </p>
        <Eyebrow className="mt-2">Página não encontrada</Eyebrow>
        <h1 className="mt-4 max-w-xl text-3xl leading-tight font-bold sm:text-4xl">
          Não encontramos o que você procurava
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          O endereço pode ter mudado ou o item não está mais disponível. Veja o catálogo ou fale com a equipe.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/" variant="outline" size="lg">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao início
          </LinkButton>
          <LinkButton href="/produtos" variant="navy" size="lg">
            <Search className="size-4" aria-hidden="true" />
            Ver catálogo
          </LinkButton>
          <WhatsAppButton location="not_found" size="lg">
            Falar com a Brasscart
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
