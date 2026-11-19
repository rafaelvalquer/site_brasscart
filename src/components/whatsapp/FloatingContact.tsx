"use client";

import { ClipboardList } from "lucide-react";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/brand/SocialIcons";
import { quoteHref } from "@/config/site";
import { useScrolled } from "@/hooks/use-scrolled";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

const MOBILE_BAR_THRESHOLD = 520;

/**
 * Contato persistente:
 *  - Botão flutuante do WhatsApp (canto inferior direito), em todas as páginas.
 *  - No celular, após rolar a página, uma barra fixa com "Orçamento" e
 *    "WhatsApp" substitui o botão flutuante, sem cobrir o conteúdo.
 */
export function FloatingContact() {
  const showBar = useScrolled(MOBILE_BAR_THRESHOLD);
  const href = buildWhatsAppUrl(whatsappMessages.general());

  return (
    <>
      {/* Botão flutuante */}
      <div
        className={cn(
          "fixed right-4 bottom-4 z-40 transition-[opacity,transform] duration-300 sm:right-6 sm:bottom-6",
          showBar && "max-md:pointer-events-none max-md:translate-y-4 max-md:opacity-0"
        )}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("floating_button")}
          className="group relative flex size-14 items-center justify-center rounded-full bg-wa-bright text-white shadow-[0_12px_30px_-8px_rgb(11_122_65/0.6)] transition-transform duration-300 hover:scale-105 focus-visible:outline-offset-4"
          aria-label="Fale com a Brasscart pelo WhatsApp (abre em nova aba)"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-wa-bright [animation-iteration-count:4] motion-safe:animate-pulse-ring"
          />
          <WhatsAppIcon className="relative size-7" />
          <span
            role="tooltip"
            className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 rounded-xl bg-ink px-3 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lift transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block"
          >
            Fale com a Brasscart
          </span>
        </a>
      </div>

      {/* Barra fixa no celular */}
      <div
        aria-hidden={!showBar}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-18px_rgb(6_42_77/0.35)] backdrop-blur transition-transform duration-300 md:hidden",
          showBar ? "translate-y-0" : "pointer-events-none translate-y-full"
        )}
      >
        <div className="mx-auto flex max-w-md gap-3">
          <Link
            href={quoteHref}
            tabIndex={showBar ? undefined : -1}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-white text-sm font-semibold text-ink"
          >
            <ClipboardList className="size-4.5 text-brand-500" aria-hidden="true" />
            Orçamento
          </Link>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={showBar ? undefined : -1}
            onClick={() => trackWhatsAppClick("mobile_bar")}
            className="flex h-12 flex-[1.3] items-center justify-center gap-2 rounded-full bg-wa text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </>
  );
}
