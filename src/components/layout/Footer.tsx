import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/SocialIcons";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { mainNav, quoteHref, siteConfig } from "@/config/site";
import { getCategories } from "@/lib/data";
import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export function Footer() {
  const categories = getCategories();
  const { address, openingHours, serviceArea, legal } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white/75">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-10%] size-[520px] rounded-full bg-brand-500/20 blur-3xl" />
      <div className="container-site relative grid grid-cols-1 gap-12 pt-16 pb-10 md:grid-cols-2 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-4">
          <BrandLogo plate className="w-[190px]" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
            Soluções em impressão para pessoas e empresas: locação de impressoras, impressões e cópias,
            suprimentos e assistência técnica.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={buildWhatsAppUrl(whatsappMessages.general())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-wa"
              aria-label="WhatsApp da Brasscart (abre em nova aba)"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-500"
              aria-label="Instagram da Brasscart (abre em nova aba)"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Links rápidos" className="lg:col-span-2">
          <h2 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">Navegação</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={quoteHref} className="transition-colors hover:text-white">
                Solicitar orçamento
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Serviços" className="lg:col-span-3">
          <h2 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">Serviços</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/servicos/${c.slug}`} className="transition-colors hover:text-white">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">Atendimento</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li>
              <a
                href={buildWhatsAppUrl(whatsappMessages.general())}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="mt-0.5 size-4.5 shrink-0 text-wa-bright" />
                <span>
                  <span className="block text-xs text-white/50">WhatsApp comercial</span>
                  {siteConfig.whatsapp.display}
                </span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <InstagramIcon className="mt-0.5 size-4.5 shrink-0 text-brand-300" />
                <span>
                  <span className="block text-xs text-white/50">Instagram</span>
                  {siteConfig.instagram.handle}
                </span>
              </a>
            </li>
            {address && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-brand-300" aria-hidden="true" />
                <span>
                  {address.street} – {address.district}
                  <br />
                  {address.city} – {address.state}, {address.postalCode}
                </span>
              </li>
            )}
            {!address && serviceArea.confirmed && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-brand-300" aria-hidden="true" />
                <span>{serviceArea.label}</span>
              </li>
            )}
            {openingHours && (
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4.5 shrink-0 text-brand-300" aria-hidden="true" />
                <span>
                  {openingHours.map((h) => (
                    <span key={h} className="block">
                      {h}
                    </span>
                  ))}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 pb-24 text-sm text-white/55 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>
            © <CurrentYear /> {legal.registeredName ?? legal.companyName}
            {legal.cnpj ? ` · CNPJ ${legal.cnpj}` : ""}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/politica-de-privacidade" className="transition-colors hover:text-white">
              Política de privacidade
            </Link>
            <Link href="/creditos" className="transition-colors hover:text-white">
              Créditos das imagens
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
