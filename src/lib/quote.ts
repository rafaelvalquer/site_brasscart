import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Pedido de orçamento.
 *
 * Arquitetura preparada para evolução: hoje o pedido é transformado em uma
 * mensagem e aberto no WhatsApp (`whatsappSubmitter`). No futuro, um
 * `QuoteSubmitter` alternativo pode gravar o pedido no Supabase e enviar
 * anexos (campo `attachments`) para um bucket de armazenamento — sem alterar
 * o formulário.
 */
export interface QuoteRequest {
  name: string;
  company?: string;
  item: string;
  quantity?: string;
  details: string;
  deadline?: string;
  /** Reservado para a futura integração de envio de arquivos (não usado na v1). */
  attachments?: never[];
}

export type QuoteField = keyof Omit<QuoteRequest, "attachments">;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const QUOTE_LIMITS = {
  name: 80,
  company: 80,
  item: 120,
  quantity: 40,
  details: 800,
  deadline: 40,
} as const;

/** Remove caracteres de controle e espaços excedentes. */
export function sanitize(value: string | undefined, max: number): string {
  if (!value) return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

export function sanitizeQuote(input: QuoteRequest): QuoteRequest {
  return {
    name: sanitize(input.name, QUOTE_LIMITS.name),
    company: sanitize(input.company, QUOTE_LIMITS.company),
    item: sanitize(input.item, QUOTE_LIMITS.item),
    quantity: sanitize(input.quantity, QUOTE_LIMITS.quantity),
    details: sanitize(input.details, QUOTE_LIMITS.details),
    deadline: sanitize(input.deadline, QUOTE_LIMITS.deadline),
  };
}

export function validateQuote(input: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  if (input.name.length < 2) errors.name = "Informe seu nome.";
  else if (!/[\p{L}]/u.test(input.name)) errors.name = "Informe um nome válido.";
  if (!input.item) errors.item = "Selecione o serviço ou produto desejado.";
  if (input.details.length < 5)
    errors.details = "Descreva brevemente o que você precisa (mínimo de 5 caracteres).";
  return errors;
}

export function buildQuoteMessage(q: QuoteRequest): string {
  const lines = [
    "Olá, equipe Brasscart!",
    `Meu nome é ${q.name}.`,
    q.company ? `Empresa: ${q.company}` : null,
    "",
    "Gostaria de solicitar um orçamento:",
    `Produto/Serviço: ${q.item}`,
    q.quantity ? `Quantidade: ${q.quantity}` : null,
    q.deadline ? `Prazo desejado: ${q.deadline}` : null,
    `Observações: ${q.details}`,
    "",
    "Aguardo o retorno. Obrigado!",
  ];
  return lines.filter((l) => l !== null).join("\n");
}

export interface QuoteSubmitResult {
  /** URL a ser aberta após o envio (ex.: conversa do WhatsApp). */
  redirectUrl?: string;
}

/**
 * Estratégia de envio do pedido. Implementações futuras (ex.: Supabase) podem
 * ser assíncronas; a v1 é síncrona para que o WhatsApp abra dentro do gesto do
 * usuário e não seja bloqueado pelo navegador.
 */
export interface QuoteSubmitter {
  submit(request: QuoteRequest): QuoteSubmitResult | Promise<QuoteSubmitResult>;
}

/** Implementação v1: abre o WhatsApp com a mensagem organizada. */
export const whatsappSubmitter = {
  submit(request: QuoteRequest): QuoteSubmitResult {
    return { redirectUrl: buildWhatsAppUrl(buildQuoteMessage(request)) };
  },
} satisfies QuoteSubmitter;
