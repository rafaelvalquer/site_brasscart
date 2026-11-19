import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductDetails } from "@/components/catalog/ProductDetails";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCatalog, getCatalogItem, getCategoryTitle, getRelatedItems, toPublicItem } from "@/lib/data";
import { breadcrumbJsonLd, catalogItemJsonLd, pageMetadata } from "@/lib/seo";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getCatalog().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produtos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) return { title: "Item não encontrado" };
  return pageMetadata({
    title: item.name,
    description: `${item.summary} Preço sob consulta — solicite seu orçamento pelo WhatsApp.`,
    path: `/produtos/${item.slug}`,
    image: { url: item.image.src.src, width: item.image.src.width, height: item.image.src.height, alt: item.image.alt },
    noindex: item.status === "rascunho",
  });
}

export default async function ProdutoPage({ params }: PageProps<"/produtos/[slug]">) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();

  const categoryTitle = getCategoryTitle(item.category);
  const related = getRelatedItems(item, 3);

  return (
    <>
      <JsonLd data={catalogItemJsonLd(item, categoryTitle)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Produtos", path: "/produtos" },
          { name: item.name, path: `/produtos/${item.slug}` },
        ])}
      />

      <section aria-label={item.name} className="bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { name: "Início", href: "/" },
              { name: "Produtos", href: "/produtos" },
              { name: categoryTitle, href: `/produtos?categoria=${item.category}` },
              { name: item.name },
            ]}
          />
          <div className="mt-8">
            <ProductDetails item={toPublicItem(item)} categoryTitle={categoryTitle} />
          </div>
        </div>
      </section>

      <HowItWorks />

      {related.length > 0 && (
        <section aria-label="Itens relacionados" className="section-y bg-white">
          <div className="container-site">
            <SectionHeading eyebrow="Veja também" title="Itens relacionados" />
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 0.06}>
                  <ProductCard item={{ ...r, categoryTitle: getCategoryTitle(r.category) }} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
