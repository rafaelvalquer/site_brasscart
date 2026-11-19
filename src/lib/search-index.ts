import { getCatalog, getCategories, getCategoryTitle } from "@/lib/data";

export interface SearchEntry {
  href: string;
  title: string;
  subtitle: string;
  kind: "Categoria" | "Serviço" | "Produto";
  keywords: string;
}

/** Índice leve (serializável) usado pela busca global do cabeçalho. */
export function buildSearchIndex(): SearchEntry[] {
  const cats: SearchEntry[] = getCategories().map((c) => ({
    href: `/servicos/${c.slug}`,
    title: c.title,
    subtitle: c.summary,
    kind: "Categoria",
    keywords: [c.serviceName, ...c.highlights].join(" "),
  }));
  const items: SearchEntry[] = getCatalog().map((i) => ({
    href: `/produtos/${i.slug}`,
    title: i.name,
    subtitle: `${getCategoryTitle(i.category)} · ${i.summary}`,
    kind: i.type === "produto" ? "Produto" : "Serviço",
    keywords: [...i.keywords, ...i.features, ...(i.variants?.flatMap((v) => v.options) ?? [])].join(" "),
  }));
  return [...cats, ...items];
}
