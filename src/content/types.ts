import type { StaticImageData } from "next/image";

/**
 * Status editorial de cada item.
 *  - "confirmado": serviço/produto comprovado em fontes oficiais da Brasscart
 *    (perfil e publicações do Instagram) e exibido publicamente.
 *  - "rascunho": candidato ainda não confirmado pela empresa. Fica oculto no
 *    site público (só aparece com NEXT_PUBLIC_SHOW_DRAFTS=true).
 */
export type ContentStatus = "confirmado" | "rascunho";

export interface ImageRef {
  src: StaticImageData;
  alt: string;
}

export type CategoryIcon =
  | "files"
  | "scan"
  | "printer"
  | "wrench"
  | "droplets"
  | "paperclip"
  | "ruler"
  | "megaphone"
  | "palette";

export interface ServiceCategory {
  slug: string;
  title: string;
  /** Nome usado na mensagem "Gostaria de mais informações sobre o serviço de …". */
  serviceName: string;
  summary: string;
  description: string;
  highlights: string[];
  image: ImageRef;
  icon: CategoryIcon;
  status: ContentStatus;
  /** De onde vem a confirmação (ou o que falta confirmar). Não é exibido. */
  evidence: string;
  order: number;
}

export interface CatalogVariant {
  label: string;
  options: string[];
}

export interface CatalogItem {
  slug: string;
  name: string;
  type: "produto" | "servico";
  category: string;
  summary: string;
  description: string;
  features: string[];
  specs?: { label: string; value: string }[];
  variants?: CatalogVariant[];
  image: ImageRef;
  gallery?: ImageRef[];
  /** Nunca inventar preços: sempre "sob consulta" nesta versão. */
  price: { kind: "consulta" };
  keywords: string[];
  featured?: boolean;
  status: ContentStatus;
  evidence: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: ImageRef;
  /** "ilustrativo" = imagem de banco de imagens; NUNCA apresentar como trabalho real. */
  kind: "real" | "ilustrativo";
}

export interface FaqItem {
  question: string;
  answer: string;
  status: ContentStatus;
}

/** Item do catálogo sem as notas internas, seguro para enviar ao navegador. */
export type PublicCatalogItem = Omit<CatalogItem, "evidence" | "keywords">;
