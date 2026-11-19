/**
 * Camada de acesso a dados.
 *
 * Hoje lê arquivos estruturados em src/content. Para migrar para um painel
 * administrativo com Supabase, basta reimplementar estas funções (mantendo as
 * assinaturas) consultando as tabelas correspondentes — os componentes não
 * precisam mudar.
 */
import { siteConfig } from "@/config/site";
import { catalog } from "@/content/catalog";
import { categories } from "@/content/categories";
import { faq } from "@/content/faq";
import { portfolio } from "@/content/portfolio";
import type { CatalogItem, ContentStatus, FaqItem, PortfolioItem, PublicCatalogItem, ServiceCategory } from "@/content/types";

const isVisible = (status: ContentStatus) =>
  status === "confirmado" || siteConfig.flags.showDrafts;

export function getCategories(): ServiceCategory[] {
  return categories.filter((c) => isVisible(c.status)).sort((a, b) => a.order - b.order);
}

export function getCategory(slug: string): ServiceCategory | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function getCatalog(): CatalogItem[] {
  const visibleCategories = new Set(getCategories().map((c) => c.slug));
  return catalog.filter((i) => isVisible(i.status) && visibleCategories.has(i.category));
}

export function getCatalogItem(slug: string): CatalogItem | undefined {
  return getCatalog().find((i) => i.slug === slug);
}

export function getItemsByCategory(categorySlug: string): CatalogItem[] {
  return getCatalog().filter((i) => i.category === categorySlug);
}

export function getFeaturedItems(limit = 6): CatalogItem[] {
  return getCatalog()
    .filter((i) => i.featured)
    .slice(0, limit);
}

export function getRelatedItems(item: CatalogItem, limit = 3): CatalogItem[] {
  const sameCategory = getCatalog().filter((i) => i.slug !== item.slug && i.category === item.category);
  const others = getCatalog().filter((i) => i.slug !== item.slug && i.category !== item.category && i.featured);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getPortfolio(): PortfolioItem[] {
  return portfolio.filter((p) => p.kind === "real" || siteConfig.flags.showDemoContent);
}

export function getFaq(): FaqItem[] {
  return faq.filter((f) => isVisible(f.status));
}

export function getCategoryTitle(slug: string): string {
  return categories.find((c) => c.slug === slug)?.title ?? "";
}

/** Remove notas internas antes de enviar um item a um Client Component. */
export function toPublicItem(item: CatalogItem): PublicCatalogItem {
  const copy: Partial<CatalogItem> = { ...item };
  delete copy.evidence;
  delete copy.keywords;
  return copy as PublicCatalogItem;
}
