import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LeasingBanner } from "@/components/sections/LeasingBanner";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { getCategories } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Serviços",
  description:
    "Locação de impressoras, impressão e cópias, digitalização, encadernação, toners e tintas, manutenção de impressoras e materiais de escritório. Orçamento pelo WhatsApp.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ])}
      />
      <PageHero
        eyebrow="Serviços"
        title="Soluções completas em impressão"
        description="Equipamentos, suprimentos, impressões e assistência técnica para pessoas e empresas. Escolha um serviço e fale com a nossa equipe."
        breadcrumbs={[{ name: "Início", href: "/" }, { name: "Serviços" }]}
      >
        <WhatsAppButton
          location="services_hero"
          context={{ kind: "quote" }}
          size="lg"
          className="h-auto min-h-12 py-3 text-center leading-snug whitespace-normal"
        >
          Solicitar orçamento pelo WhatsApp
        </WhatsAppButton>
      </PageHero>
      <ServicesGrid categories={getCategories()} showHeading={false} />
      <LeasingBanner />
      <HowItWorks />
      <FaqSection background="surface" />
      <ContactSection />
    </>
  );
}
