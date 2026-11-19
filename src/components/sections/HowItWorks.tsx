import { MessageCircle, MousePointerClick, Send } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    icon: MousePointerClick,
    title: "Escolha o que precisa",
    text: "Encontre o serviço ou produto no catálogo ou descreva sua necessidade no formulário.",
  },
  {
    icon: Send,
    title: "Envie pelo WhatsApp",
    text: "A mensagem já vai pronta e organizada. Se tiver arquivo para imprimir, envie na conversa.",
  },
  {
    icon: MessageCircle,
    title: "Receba o atendimento",
    text: "Nossa equipe responde com o orçamento e combina os próximos passos com você.",
  },
];

export function HowItWorks() {
  return (
    <section aria-label="Como funciona o orçamento" className="section-y bg-surface">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="Como funciona"
          title="Orçamento rápido, sem cadastro"
          description="Três passos simples para falar com a Brasscart."
        />
        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute top-14 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 md:block" />
        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="relative rounded-3xl bg-white p-7 text-center shadow-soft">
              <span className="relative mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-[0_10px_24px_-10px_rgb(0_112_184/0.7)]">
                <step.icon className="size-6" aria-hidden="true" />
                <span className="absolute -top-2 -right-2 inline-flex size-6 items-center justify-center rounded-full bg-sun-400 text-xs font-bold text-brand-950">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
