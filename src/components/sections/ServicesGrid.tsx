import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { LinkButton } from "@/components/ui/link-button";
import type { ServiceCategory } from "@/content/types";

export function ServicesGrid({
  categories,
  showHeading = true,
  showAllLink = false,
}: {
  categories: ServiceCategory[];
  showHeading?: boolean;
  showAllLink?: boolean;
}) {
  return (
    <section id="servicos" aria-label="Nossos serviços" className="section-y relative bg-white">
      <div className="container-site">
        {showHeading && (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Nossos serviços"
              title="Tudo o que a sua impressão precisa, em um só lugar"
              description="Da impressão do dia a dia à locação de equipamentos para a sua empresa — com suprimentos e assistência técnica."
            />
            {showAllLink && (
              <Reveal delay={0.1}>
                <LinkButton href="/servicos" variant="outline" size="lg">
                  Ver todos os serviços
                  <ArrowRight className="size-4" aria-hidden="true" />
                </LinkButton>
              </Reveal>
            )}
          </div>
        )}
        <ul className={showHeading ? "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"}>
          {categories.map((category, i) => (
            <Reveal as="li" key={category.slug} delay={(i % 3) * 0.08}>
              <ServiceCard category={category} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
