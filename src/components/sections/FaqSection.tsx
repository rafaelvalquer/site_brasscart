import { DraftBadge } from "@/components/common/Badges";
import { SectionHeading } from "@/components/common/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getFaq } from "@/lib/data";

export function FaqSection({ background = "white" }: { background?: "white" | "surface" }) {
  const items = getFaq();
  const published = items.filter((i) => i.status === "confirmado");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: published.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };

  return (
    <section aria-label="Perguntas frequentes" className={`section-y ${background === "surface" ? "bg-surface" : "bg-white"}`}>
      <JsonLd data={faqJsonLd} />
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Dúvidas frequentes"
            title="Perguntas frequentes"
            description="Não encontrou a sua dúvida? Fale com a nossa equipe."
          />
          <Reveal delay={0.1} className="mt-8">
            <WhatsAppButton location="faq" size="lg">
              Tirar dúvidas no WhatsApp
            </WhatsAppButton>
          </Reveal>
        </div>
        <Reveal delay={0.08} className="lg:col-span-7">
          <Accordion className="rounded-3xl border border-border bg-white px-2 shadow-soft sm:px-4">
            {items.map((item) => (
              <AccordionItem key={item.question} value={item.question} className="border-border px-3 sm:px-4">
                <AccordionTrigger className="py-5 text-base font-semibold text-ink hover:no-underline sm:text-[1.05rem]">
                  <span className="flex flex-wrap items-center gap-2 pr-4">
                    {item.question}
                    {item.status === "rascunho" && <DraftBadge />}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[0.98rem] leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
