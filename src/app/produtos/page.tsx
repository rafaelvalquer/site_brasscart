import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogBrowser, CatalogView, type CatalogEntry } from "@/components/catalog/CatalogBrowser";
import { PageHero } from "@/components/common/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCatalog, getCategories, getCategoryTitle } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Catálogo de produtos e serviços",
  description:
    "Toners, refis de tinta Epson 544, cartuchos compatíveis, locação de impressoras, impressão, cópias, encadernação e manutenção. Preço sob consulta pelo WhatsApp.",
  path: "/produtos",
});

export default function ProdutosPage() {
  const categories = getCategories();
  const items: CatalogEntry[] = getCatalog().map((i) => ({
    slug: i.slug,
    name: i.name,
    type: i.type,
    summary: i.summary,
    image: i.image,
    status: i.status,
    category: i.category,
    categoryTitle: getCategoryTitle(i.category),
    keywords: [...i.keywords, ...(i.variants?.flatMap((v) => v.options) ?? [])],
    features: i.features,
  }));
  const categoryOptions = categories
    .filter((c) => items.some((i) => i.category === c.slug))
    .map((c) => ({ slug: c.slug, title: c.title }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Produtos", path: "/produtos" },
        ])}
      />
      <PageHero
        eyebrow="Catálogo"
        title="Produtos e serviços"
        description="Encontre o que precisa e consulte valores e disponibilidade diretamente pelo WhatsApp. Todos os itens são sob consulta."
        breadcrumbs={[{ name: "Início", href: "/" }, { name: "Produtos" }]}
      />
      <section aria-label="Catálogo" className="bg-white pt-10 pb-20 lg:pb-28">
        <div className="container-site">
          <Suspense fallback={<CatalogView items={items} categories={categoryOptions} />}>
            <CatalogBrowser items={items} categories={categoryOptions} />
          </Suspense>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
