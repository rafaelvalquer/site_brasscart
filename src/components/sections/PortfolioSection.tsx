import { Info } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { InstagramCallout } from "@/components/sections/InstagramCallout";
import { getPortfolio } from "@/lib/data";

/**
 * Portfólio. Sem fotos reais validadas, mostra o convite para o Instagram.
 * Com NEXT_PUBLIC_SHOW_DEMO_CONTENT=true, exibe a galeria de demonstração com
 * imagens identificadas como ilustrativas.
 */
export function PortfolioSection({ showHeading = true, limit }: { showHeading?: boolean; limit?: number }) {
  const all = getPortfolio();
  const items = limit ? all.slice(0, limit) : all;
  const hasIllustrative = items.some((i) => i.kind === "ilustrativo");

  return (
    <section aria-label="Portfólio" className="section-y bg-white">
      <div className="container-site">
        {showHeading && (
          <SectionHeading
            eyebrow="Portfólio"
            title="Qualidade que aparece no resultado"
            description="Uma amostra dos trabalhos e soluções que entregamos no dia a dia."
          />
        )}

        {items.length > 0 ? (
          <div className={showHeading ? "mt-12" : ""}>
            {hasIllustrative && (
              <p className="mb-8 flex items-start gap-2.5 rounded-2xl border border-sun-300 bg-sun-100/70 px-4 py-3 text-sm text-ink">
                <Info className="mt-0.5 size-4 shrink-0 text-sun-600" aria-hidden="true" />
                Portfólio em construção: as imagens marcadas como “ilustrativas” são de bancos de imagens e não
                representam trabalhos realizados pela Brasscart.
              </p>
            )}
            <PortfolioGallery items={items} />
          </div>
        ) : (
          <div className={showHeading ? "mt-12" : ""}>
            <InstagramCallout
              title="Nosso portfólio está chegando"
              text="Enquanto preparamos a galeria de trabalhos, acompanhe as novidades da Brasscart no Instagram."
            />
          </div>
        )}
      </div>
    </section>
  );
}
