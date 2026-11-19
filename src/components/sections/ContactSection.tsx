import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Suspense } from "react";

import { InstagramIcon, WhatsAppIcon } from "@/components/brand/SocialIcons";
import { DraftBadge } from "@/components/common/Badges";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteFormWithParams } from "@/components/quote/QuoteFormWithParams";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { getQuoteOptions } from "@/lib/quote-options";
import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

/** Seção de contato com chamada de destaque, canais oficiais e formulário de orçamento. */
export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { groups, slugToName } = getQuoteOptions();
  const { address, openingHours, flags } = siteConfig;
  const Heading = headingLevel;

  return (
    <section id="orcamento" aria-label="Contato e orçamento" className="relative overflow-hidden bg-brand-900 py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 -right-40 size-[620px] rounded-full bg-brand-500/30 blur-3xl" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />

      <div className="container-site relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow tone="light">Contato</Eyebrow>
            <Heading className="mt-4 text-3xl leading-[1.1] font-bold text-white sm:text-4xl lg:text-5xl">
              Precisa de uma solução? Converse com nossa equipe.
            </Heading>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Preencha o formulário e a sua solicitação chega organizada no nosso WhatsApp. Se preferir, chame a gente
              direto.
            </p>
            <WhatsAppButton location="contact_cta" size="xl" className="mt-8">
              Falar com a Brasscart
            </WhatsAppButton>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-3">
              <li>
                <a
                  href={buildWhatsAppUrl(whatsappMessages.general())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition-colors hover:bg-white/10"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-wa-bright text-white">
                    <WhatsAppIcon className="size-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm text-white/60">WhatsApp comercial</span>
                    <span className="block font-heading text-lg font-semibold">{siteConfig.whatsapp.display}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition-colors hover:bg-white/10"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
                    <InstagramIcon className="size-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm text-white/60">Instagram oficial</span>
                    <span className="block font-heading text-lg font-semibold">{siteConfig.instagram.handle}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </li>
              {address && (
                <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <MapPin className="size-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-white/60">Endereço</span>
                    {address.street} – {address.district}, {address.city} – {address.state}
                  </span>
                </li>
              )}
              {openingHours && (
                <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Clock className="size-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-white/60">Horário de atendimento</span>
                    {openingHours.join(" · ")}
                  </span>
                </li>
              )}
              {flags.showDrafts && (!address || !openingHours) && (
                <li className="rounded-2xl border border-dashed border-sun-300/60 p-4 text-sm text-white/75">
                  <DraftBadge className="mb-2" />
                  <span className="block">
                    Endereço, horário de atendimento e mapa serão exibidos após a confirmação dos dados pela Brasscart.
                  </span>
                </li>
              )}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="rounded-[2rem] bg-white/10 p-1.5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] ring-1 ring-white/15">
            <div className="px-6 pt-6 pb-2 sm:px-8 lg:px-10">
              <h3 className="font-heading text-xl font-bold text-white">Solicite seu orçamento</h3>
            </div>
            <Suspense fallback={<QuoteForm groups={groups} />}>
              <QuoteFormWithParams groups={groups} slugToName={slugToName} />
            </Suspense>
          </div>
        </Reveal>
      </div>

      {address?.mapEmbedUrl && (
        <div className="container-site relative mt-14">
          <div className="overflow-hidden rounded-[2rem] ring-1 ring-white/15">
            <iframe
              title="Mapa com a localização da Brasscart"
              src={address.mapEmbedUrl}
              className="h-80 w-full border-0 lg:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </section>
  );
}
