/**
 * Configuração central da Brasscart.
 *
 * Todos os dados de contato, redes sociais e informações comerciais ficam aqui.
 * Campos com valor `null` estão PENDENTES DE CONFIRMAÇÃO pela empresa e não são
 * exibidos no site enquanto não forem preenchidos (ver docs/PENDENCIAS.md).
 */

/**
 * URL pública do site. Ordem: NEXT_PUBLIC_SITE_URL (domínio oficial) →
 * URL do Netlify (produção ou preview) → domínio de produção da Vercel →
 * localhost.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.NETLIFY === "true") {
    const netlifyUrl = process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL;
    if (netlifyUrl) return netlifyUrl.replace(/\/+$/, "");
  }
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelUrl) return `https://${vercelUrl}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Brasscart Soluções",
  shortName: "Brasscart",
  tagline: "Soluções em impressão",
  description:
    "Locação de impressoras, impressões e cópias, digitalização, encadernação, toners, tintas e assistência técnica. Peça seu orçamento pelo WhatsApp.",
  url: resolveSiteUrl(),
  locale: "pt_BR",
  language: "pt-BR",

  whatsapp: {
    /** Número no formato internacional, apenas dígitos. */
    number: "5511973355559",
    display: "+55 11 97335-5559",
    baseUrl: "https://wa.me/5511973355559",
  },

  instagram: {
    handle: "@brasscartsolucoes",
    url: "https://www.instagram.com/brasscartsolucoes/",
  },

  /** PENDENTE — endereço comercial ainda não validado. */
  address: null as null | {
    street: string;
    district: string;
    city: string;
    state: string;
    postalCode: string;
    /** URL de incorporação do Google Maps (iframe). */
    mapEmbedUrl?: string;
    mapLink?: string;
  },

  /** PENDENTE — horário de atendimento ainda não validado. Ex.: ["Seg. a sex.: 8h às 18h"] */
  openingHours: null as null | string[],

  /**
   * Região citada nas publicações do Instagram (out/2025). Só é exibida
   * quando `confirmed` for `true`.
   */
  serviceArea: {
    label: "Ibiúna, São Roque e Mairinque – SP",
    confirmed: false,
  },

  /** Dados institucionais exibidos na política de privacidade e no rodapé. */
  legal: {
    companyName: "Brasscart Soluções",
    /** PENDENTE — razão social e CNPJ não validados. */
    registeredName: null as null | string,
    cnpj: null as null | string,
    privacyEmail: null as null | string,
  },

  /** Ano de início das atividades — PENDENTE (não exibir números não confirmados). */
  foundedYear: null as null | number,

  flags: {
    /**
     * Exibe serviços, produtos e textos marcados como rascunho (não confirmados),
     * sempre com o selo "Rascunho". Use apenas em ambientes de revisão.
     */
    showDrafts: process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true",
    /**
     * Exibe o portfólio de demonstração com imagens ilustrativas (identificadas
     * como tal). Desative em produção até haver fotos reais de trabalhos.
     */
    showDemoContent: process.env.NEXT_PUBLIC_SHOW_DEMO_CONTENT === "true",
  },

  analytics: {
    /** ID de medição do Google Analytics 4 (ex.: G-XXXXXXX). Opcional. */
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const mainNav = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/produtos", label: "Produtos" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/contato", label: "Contato" },
] as const;

export const quoteHref = "/contato#orcamento";
