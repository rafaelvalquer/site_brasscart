import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { InstagramCallout } from "@/components/sections/InstagramCallout";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPortfolio } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfólio",
  description:
    "Trabalhos e soluções da Brasscart em impressão, encadernação, suprimentos e assistência técnica.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const hasItems = getPortfolio().length > 0;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Portfólio", path: "/portfolio" },
        ])}
      />
      <PageHero
        eyebrow="Portfólio"
        title="Nossos trabalhos"
        description="Impressões, encadernações, suprimentos e manutenção: uma amostra do que fazemos no dia a dia."
        breadcrumbs={[{ name: "Início", href: "/" }, { name: "Portfólio" }]}
      />
      <PortfolioSection showHeading={false} />
      {hasItems && (
        <section aria-label="Instagram" className="bg-white pb-20 lg:pb-28">
          <div className="container-site">
            <InstagramCallout />
          </div>
        </section>
      )}
      <ContactSection />
    </>
  );
}
