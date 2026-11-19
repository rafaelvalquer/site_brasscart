import type { QuoteOptionGroup } from "@/components/quote/QuoteForm";
import { getCatalog, getCategories } from "@/lib/data";

/** Opções do campo "Serviço ou produto", agrupadas por categoria. */
export function getQuoteOptions(): { groups: QuoteOptionGroup[]; slugToName: Record<string, string> } {
  const catalog = getCatalog();
  const groups = getCategories()
    .map((c) => ({
      label: c.title,
      options: catalog.filter((i) => i.category === c.slug).map((i) => i.name),
    }))
    .filter((g) => g.options.length > 0);

  const slugToName: Record<string, string> = Object.fromEntries(catalog.map((i) => [i.slug, i.name]));
  return { groups, slugToName };
}
