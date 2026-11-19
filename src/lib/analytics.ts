/**
 * Camada fina sobre o Google Analytics 4.
 * Nada é enviado se o GA não estiver configurado (NEXT_PUBLIC_GA_ID) ou se o
 * visitante não tiver aceitado os cookies de medição.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event" | "config" | "js" | "consent", ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const CONSENT_STORAGE_KEY = "brasscart-consent";
export type ConsentValue = "granted" | "denied";

export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Clique em qualquer botão de WhatsApp. `location` identifica onde o clique ocorreu. */
export function trackWhatsAppClick(location: string, item?: string) {
  trackEvent("whatsapp_click", { location, item });
  // Evento recomendado do GA4 para geração de lead.
  trackEvent("generate_lead", { method: "whatsapp", location, item });
}

export function trackQuoteSubmit(item: string) {
  trackEvent("quote_submit", { item });
  trackEvent("generate_lead", { method: "quote_form", item });
}
