import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/catalog/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/link-button";
import { getCategoryTitle, getFeaturedItems } from "@/lib/data";

export function FeaturedCatalog() {
  const items = getFeaturedItems(6);

  return (
    <section aria-label="Destaques do catálogo" className="section-y bg-white">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Catálogo"
            title="Produtos e serviços em destaque"
            description="Consulte valores e disponibilidade diretamente com a nossa equipe — todos os itens são sob consulta."
          />
          <Reveal delay={0.1}>
            <LinkButton href="/produtos" variant="outline" size="lg">
              Ver catálogo completo
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
          </Reveal>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={(i % 3) * 0.08}>
              <ProductCard item={{ ...item, categoryTitle: getCategoryTitle(item.category) }} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
