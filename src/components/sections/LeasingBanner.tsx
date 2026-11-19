import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

import { Eyebrow } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { images } from "@/content/images";

const points = [
  "Planos mensais para a sua empresa",
  "Sem preocupação com manutenção, toner ou suporte técnico",
  "Equipamentos de alto desempenho",
];

/** Destaque para a locação de impressoras (serviço confirmado no perfil oficial). */
export function LeasingBanner() {
  return (
    <section aria-label="Locação de impressoras" className="relative overflow-hidden bg-brand-950 py-20 text-white lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 size-[560px] rounded-full bg-brand-500/25 blur-3xl" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_70%)]" />
      <div className="container-site relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow tone="light">Para empresas</Eyebrow>
          <h2 className="mt-4 text-3xl leading-[1.12] font-bold text-white sm:text-4xl lg:text-5xl">
            Impressoras modernas, sem dor de cabeça.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
            Alugue impressoras com a Brasscart e reduza custos com manutenção. Peça sua proposta e veja como a locação
            pode simplificar a rotina da sua empresa.
          </p>
          <ul className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-white/90">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-sun-400 text-brand-950">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              location="leasing_banner"
              context={{ kind: "service", name: "locação de impressoras" }}
              size="lg"
            >
              Pedir proposta de locação
            </WhatsAppButton>
            <LinkButton href="/servicos/locacao-de-impressoras" variant="outline-light" size="lg">
              Como funciona
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <Image
              src={images.locacaoPainel}
              alt="Painel touchscreen de impressora multifuncional"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-2 hidden w-56 overflow-hidden rounded-2xl ring-4 ring-brand-950 sm:block lg:-left-10">
            <div className="relative aspect-[4/3]">
              <Image
                src={images.locacaoMultifuncional}
                alt="Impressora multifuncional em escritório"
                fill
                placeholder="blur"
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
