import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/catalog/ProductCard";
import { DraftBadge } from "@/components/common/Badges";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { SafeImage } from "@/components/common/SafeImage";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ContactSection } from "@/components/sections/ContactSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { JsonLd } from "@/components/seo/JsonLd";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { getCategories, getCategory, getCategoryTitle, getItemsByCategory } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Serviço não encontrado" };
  return pageMetadata({
    title: category.title,
    description: `${category.summary} Fale com a Brasscart e solicite seu orçamento pelo WhatsApp.`,
    path: `/servicos/${category.slug}`,
    image: {
      url: category.image.src.src,
      width: category.image.src.width,
      height: category.image.src.height,
      alt: category.image.alt,
    },
    noindex: category.status === "rascunho",
  });
}

export default async function ServicoPage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getItemsByCategory(category.slug);
  const others = getCategories()
    .filter((c) => c.slug !== category.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd(category)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: category.title, path: `/servicos/${category.slug}` },
        ])}
      />

      <section aria-label={category.title} className="relative overflow-hidden bg-surface pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_60%)]" />
        <div className="container-site relative">
          <Breadcrumbs
            items={[
              { name: "Início", href: "/" },
              { name: "Serviços", href: "/servicos" },
              { name: category.title },
            ]}
          />
          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 motion-safe:animate-fade-up">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-[0_12px_28px_-12px_rgb(0_112_184/0.8)]">
                  <CategoryIcon name={category.icon} className="size-6" />
                </span>
                {category.status === "rascunho" && <DraftBadge />}
              </div>
              <h1 className="mt-6 text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-[3.2rem]">{category.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{category.description}</p>
              <ul className="mt-7 space-y-3">
                {category.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-ink/85">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
                      <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton
                  location="service_details"
                  context={{ kind: "service", name: category.serviceName }}
                  size="lg"
                  className="h-auto min-h-12 py-3 text-center leading-snug whitespace-normal"
                >
                  Solicitar orçamento pelo WhatsApp
                </WhatsAppButton>
                <LinkButton href="/contato#orcamento" variant="outline" size="lg">
                  Preencher formulário
                </LinkButton>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white shadow-lift">
                <SafeImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Imagem ilustrativa.</p>
            </div>
          </div>
        </div>
      </section>

      {items.length > 0 && (
        <section aria-label={`Itens de ${category.title}`} className="section-y bg-white">
          <div className="container-site">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Catálogo"
                title={items.length === 1 ? "O que oferecemos" : "Opções disponíveis"}
                description="Consulte valores e disponibilidade de cada item diretamente com a equipe. Preço sob consulta."
              />
              <Reveal delay={0.1}>
                <LinkButton href={`/produtos?categoria=${category.slug}`} variant="outline" size="lg">
                  Ver no catálogo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </LinkButton>
              </Reveal>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={(i % 3) * 0.06}>
                  <ProductCard item={{ ...item, categoryTitle: getCategoryTitle(item.category) }} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <HowItWorks />

      {others.length > 0 && (
        <section aria-label="Outros serviços" className="section-y bg-white">
          <div className="container-site">
            <SectionHeading eyebrow="Conheça também" title="Outros serviços da Brasscart" />
            <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {others.map((c, i) => (
                <Reveal as="li" key={c.slug} delay={i * 0.08}>
                  <ServiceCard category={c} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactSection />
    </>
  );
}
