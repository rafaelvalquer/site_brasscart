import { ArrowDown, BadgeCheck, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Eyebrow } from "@/components/common/SectionHeading";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { images } from "@/content/images";

const quickLinks = [
  { href: "/servicos/locacao-de-impressoras", label: "Locação de impressoras" },
  { href: "/servicos/impressao-e-copias", label: "Impressão e cópias" },
  { href: "/servicos/toners-tintas-e-cartuchos", label: "Toners e tintas" },
  { href: "/servicos/manutencao-de-impressoras", label: "Manutenção" },
];

const supportedBrands = ["HP", "Brother", "Samsung", "Canon", "Lexmark", "Epson"];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_15%,transparent_60%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-24 -left-40 size-[480px] rounded-full bg-brand-200/45 blur-3xl" />

      <div className="container-site relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-6 xl:col-span-6">
          <div className="motion-safe:animate-fade-up">
            <Eyebrow>Soluções em impressão</Eyebrow>
          </div>
          <h1
            id="hero-title"
            className="mt-5 text-[2.55rem] leading-[1.04] font-extrabold tracking-[-0.025em] sm:text-6xl lg:text-[4rem] xl:text-[4.35rem] motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]"
          >
            Soluções que transformam suas ideias em{" "}
            <span className="relative whitespace-nowrap text-brand-500">
              resultados.
              <svg aria-hidden="true" viewBox="0 0 300 12" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2.5 w-full text-sun-400">
                <path d="M2 9c60-6 160-8 296-3" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            Conheça nossas soluções em impressão, produtos e serviços profissionais. Qualidade e atendimento para cada
            necessidade.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <WhatsAppButton
              location="hero"
              context={{ kind: "quote" }}
              size="xl"
              className="h-auto min-h-14 px-6 py-3 text-center leading-snug whitespace-normal sm:px-8 sm:whitespace-nowrap"
            >
              Solicite um orçamento pelo WhatsApp
            </WhatsAppButton>
            <LinkButton href="#servicos" variant="outline" size="xl">
              Conheça nossos serviços
              <ArrowDown className="size-4" aria-hidden="true" />
            </LinkButton>
          </div>

          <ul aria-label="Acesso rápido aos serviços" className="mt-9 flex flex-wrap gap-2 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center rounded-full border border-brand-100 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-brand-800 backdrop-blur transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[16/11] lg:aspect-[4/4.4] motion-safe:animate-fade-in">
            <Image
              src={images.heroImpressora}
              alt="Detalhe de impressora com cartuchos coloridos em funcionamento"
              fill
              preload
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-brand-950/45 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 left-4 max-w-[17rem] rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lift backdrop-blur-md sm:left-6 lg:-left-8 motion-safe:animate-fade-up motion-safe:[animation-delay:450ms]">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
                <Printer className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading font-bold text-ink">Locação de impressoras</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Planos mensais para empresas</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-5 right-4 hidden rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lift backdrop-blur-md sm:block lg:-right-4 motion-safe:animate-fade-up motion-safe:[animation-delay:550ms]">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-sun-100 text-sun-600">
                <BadgeCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading font-bold text-ink">Originais e compatíveis</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Toners, tintas e cartuchos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site relative mt-20 lg:mt-24">
        <div className="flex flex-col items-center gap-5 border-t border-border/80 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm font-medium text-muted-foreground">Toners e tintas originais e compatíveis para as principais marcas</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {supportedBrands.map((b) => (
              <li key={b} className="font-heading text-lg font-bold tracking-tight text-ink/35">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
