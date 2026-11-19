import { siteConfig } from "@/config/site";

/** Monta a URL do WhatsApp com a mensagem codificada no parâmetro `text`. */
export function buildWhatsAppUrl(message?: string): string {
  const base = siteConfig.whatsapp.baseUrl;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const whatsappMessages = {
  general: () =>
    "Olá! Visitei o site da Brasscart e gostaria de falar com a equipe.",
  quote: () =>
    "Olá! Visitei o site da Brasscart e gostaria de solicitar um orçamento.",
  product: (name: string, details?: string[]) => {
    const extra = details?.filter(Boolean).join(" · ");
    return `Olá! Visitei o site da Brasscart e gostaria de solicitar um orçamento para ${name}${extra ? ` (${extra})` : ""}.`;
  },
  service: (name: string) =>
    `Olá! Gostaria de mais informações sobre o serviço de ${name}.`,
} as const;

export type WhatsAppContext =
  | { kind: "general" }
  | { kind: "quote" }
  | { kind: "product"; name: string; details?: string[] }
  | { kind: "service"; name: string };

export function messageFor(context: WhatsAppContext): string {
  switch (context.kind) {
    case "product":
      return whatsappMessages.product(context.name, context.details);
    case "service":
      return whatsappMessages.service(context.name);
    case "quote":
      return whatsappMessages.quote();
    default:
      return whatsappMessages.general();
  }
}
