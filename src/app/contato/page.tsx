import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contato e orçamento",
  description:
    "Fale com a Brasscart pelo WhatsApp ou envie seu pedido de orçamento pelo formulário — a mensagem chega organizada para a nossa equipe.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ])}
      />
      <PageHero
        eyebrow="Contato"
        title="Fale com a Brasscart"
        description="Tire dúvidas, peça um orçamento ou combine o atendimento. Respondemos pelo WhatsApp."
        breadcrumbs={[{ name: "Início", href: "/" }, { name: "Contato" }]}
      />
      <ContactSection />
      <FaqSection />
    </>
  );
}
