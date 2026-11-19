import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { DraftBadge } from "@/components/common/Badges";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Differentials } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { InstagramCallout } from "@/components/sections/InstagramCallout";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { about } from "@/content/about";
import { images } from "@/content/images";
import { getCategories } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sobre nós",
  description:
    "Conheça a Brasscart Soluções: locação de impressoras, impressões, suprimentos e assistência técnica com atendimento próximo, na loja ou pelo WhatsApp.",
  path: "/sobre",
});

export default function SobrePage() {
  const categories = getCategories();
  const pending = [
    !about.history && "História e trajetória da empresa",
    !about.structure && "Estrutura e equipamentos",
    !siteConfig.address && "Endereço da loja",
    !siteConfig.openingHours && "Horário de atendimento",
  ].filter(Boolean) as string[];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Sobre nós", path: "/sobre" },
        ])}
      />
      <PageHero
        eyebrow="Sobre nós"
        title="Soluções em impressão com atendimento próximo"
        description={about.intro}
        breadcrumbs={[{ name: "Início", href: "/" }, { name: "Sobre nós" }]}
      />

      <section aria-label="Quem somos" className="section-y bg-white">
        <div className="container-site grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src={images.impressaoCopiadora}
                alt="Pessoa utilizando uma copiadora em um escritório (imagem ilustrativa)"
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

          <div>
            <SectionHeading
              eyebrow="Nossos diferenciais"
              title="Por que escolher a Brasscart"
              description="Do equipamento ao suprimento, cuidamos de tudo o que a sua impressão precisa para funcionar bem."
            />
            <div className="mt-8">
              <Differentials tone="surface" />
            </div>
          </div>
        </div>
      </section>

      {about.history && (
        <section aria-label="Nossa história" className="section-y bg-surface">
          <div className="container-site max-w-3xl">
            <SectionHeading eyebrow="Trajetória" title="Nossa história" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
              {about.history.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {about.structure && (
        <section aria-label="Nossa estrutura" className="section-y bg-white">
          <div className="container-site max-w-3xl">
            <SectionHeading eyebrow="Estrutura" title="Nossa estrutura" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
              {about.structure.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-label="O que fazemos" className="section-y bg-surface">
        <div className="container-site">
          <SectionHeading eyebrow="O que fazemos" title="Áreas de atuação" />
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/servicos/${c.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <CategoryIcon name={c.icon} className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 font-heading font-bold text-ink">
                      {c.title}
                      {c.status === "rascunho" && <DraftBadge />}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c.summary}</span>
                  </span>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-brand-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {siteConfig.flags.showDrafts && pending.length > 0 && (
        <section aria-label="Conteúdo pendente" className="bg-white pt-16">
          <div className="container-site">
            <div className="rounded-3xl border border-dashed border-sun-300 bg-sun-100/50 p-6 sm:p-8">
              <DraftBadge />
              <p className="mt-3 font-heading font-bold text-ink">Conteúdo aguardando informações da Brasscart</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink/80">
                {pending.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section aria-label="Instagram" className="section-y bg-white">
        <div className="container-site">
          <InstagramCallout />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
