import { ArrowRight, BadgeCheck, MessageCircle, Store, Wrench } from "lucide-react";
import Image from "next/image";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/link-button";
import { about } from "@/content/about";
import { images } from "@/content/images";

const ICONS = { message: MessageCircle, store: Store, badge: BadgeCheck, wrench: Wrench } as const;

export function Differentials({ tone = "light" }: { tone?: "light" | "surface" }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {about.differentials.map((d, i) => {
        const Icon = ICONS[d.icon];
        return (
          <Reveal
            as="li"
            key={d.title}
            delay={i * 0.06}
            className={tone === "surface" ? "rounded-2xl bg-surface p-5" : "rounded-2xl border border-border bg-white p-5 shadow-soft"}
          >
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-bold">{d.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** Resumo institucional usado na página inicial. */
export function AboutSection() {
  return (
    <section aria-label="Sobre a Brasscart" className="section-y overflow-hidden bg-surface">
      <div className="container-site grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src={images.manutencaoTrocaToner}
              alt="Técnico substituindo o toner de uma impressora (imagem ilustrativa)"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-8 rounded-3xl bg-white p-6 shadow-lift sm:right-6">
            <BrandLogo href={null} className="w-40" />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Sobre a Brasscart</Eyebrow>
            <h2 className="mt-4 text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem]">
              Soluções em impressão com atendimento próximo
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{about.intro}</p>
          </Reveal>
          <div className="mt-8">
            <Differentials />
          </div>
          <Reveal className="mt-8">
            <LinkButton href="/sobre" variant="outline" size="lg">
              Conheça a Brasscart
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
