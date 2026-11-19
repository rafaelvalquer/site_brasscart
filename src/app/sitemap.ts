import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { catalog } from "@/content/catalog";
import { categories } from "@/content/categories";

/** Data da última revisão do conteúdo. Atualize ao publicar mudanças relevantes. */
const CONTENT_UPDATED = "2026-11-19";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  // Somente conteúdo confirmado entra no sitemap, mesmo em ambientes de revisão.
  const confirmedCategories = categories.filter((c) => c.status === "confirmado");
  const confirmedSlugs = new Set(confirmedCategories.map((c) => c.slug));
  const confirmedItems = catalog.filter((i) => i.status === "confirmado" && confirmedSlugs.has(i.category));

  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/servicos", priority: 0.9, changeFrequency: "monthly" },
    { path: "/produtos", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contato", priority: 0.8, changeFrequency: "yearly" },
    { path: "/sobre", priority: 0.6, changeFrequency: "yearly" },
    { path: "/portfolio", priority: 0.5, changeFrequency: "monthly" },
    { path: "/politica-de-privacidade", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({ url: url(p.path), lastModified: CONTENT_UPDATED, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...confirmedCategories.map((c) => ({
      url: url(`/servicos/${c.slug}`),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...confirmedItems.map((i) => ({
      url: url(`/produtos/${i.slug}`),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
