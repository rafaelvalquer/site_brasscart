"use client";

import { Search, SearchX, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ProductCard, type ProductCardData } from "@/components/catalog/ProductCard";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { trackEvent } from "@/lib/analytics";
import { scoreRecord } from "@/lib/search";
import { cn } from "@/lib/utils";

export type CatalogEntry = ProductCardData & {
  category: string;
  keywords: string[];
  features: string[];
};

export interface CatalogCategoryOption {
  slug: string;
  title: string;
}

type TypeFilter = "todos" | "produto" | "servico";
const ALL = "todas";

/** Lê os filtros da URL (?categoria=&busca=&tipo=). Use dentro de <Suspense>. */
export function CatalogBrowser(props: { items: CatalogEntry[]; categories: CatalogCategoryOption[] }) {
  const params = useSearchParams();
  const tipo = params.get("tipo");
  return (
    <CatalogView
      {...props}
      syncUrl
      initialCategory={params.get("categoria") ?? ALL}
      initialQuery={params.get("busca") ?? ""}
      initialType={tipo === "produto" || tipo === "servico" ? tipo : "todos"}
    />
  );
}

/** Catálogo com busca inteligente e filtros por categoria e tipo. */
export function CatalogView({
  items,
  categories,
  initialCategory = ALL,
  initialQuery = "",
  initialType = "todos",
  syncUrl = false,
}: {
  items: CatalogEntry[];
  categories: CatalogCategoryOption[];
  initialCategory?: string;
  initialQuery?: string;
  initialType?: TypeFilter;
  syncUrl?: boolean;
}) {
  const [category, setCategory] = useState(
    categories.some((c) => c.slug === initialCategory) ? initialCategory : ALL
  );
  const [query, setQuery] = useState(initialQuery.slice(0, 80));
  const [type, setType] = useState<TypeFilter>(initialType);

  // Mantém a URL compartilhável sem recarregar a página.
  useEffect(() => {
    if (!syncUrl) return;
    const handle = window.setTimeout(() => {
      const url = new URL(window.location.href);
      const set = (key: string, value: string, empty: string) =>
        value && value !== empty ? url.searchParams.set(key, value) : url.searchParams.delete(key);
      set("categoria", category, ALL);
      set("busca", query.trim(), "");
      set("tipo", type, "todos");
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }, 250);
    return () => window.clearTimeout(handle);
  }, [category, query, type, syncUrl]);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 3) return;
    const handle = window.setTimeout(() => trackEvent("search", { search_term: term }), 1200);
    return () => window.clearTimeout(handle);
  }, [query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const i of items) map[i.category] = (map[i.category] ?? 0) + 1;
    return map;
  }, [items]);

  const results = useMemo(() => {
    const filtered = items.filter(
      (i) => (category === ALL || i.category === category) && (type === "todos" || i.type === type)
    );
    if (!query.trim()) return filtered;
    return filtered
      .map((item) => ({
        item,
        score: scoreRecord(query, [
          { value: item.name, weight: 3 },
          { value: item.keywords.join(" "), weight: 2 },
          { value: item.categoryTitle, weight: 1.5 },
          { value: `${item.summary} ${item.features.join(" ")}`, weight: 1 },
        ]),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }, [items, category, type, query]);

  const clearAll = () => {
    setCategory(ALL);
    setQuery("");
    setType("todos");
  };

  const hasFilters = category !== ALL || query.trim() !== "" || type !== "todos";

  return (
    <div>
      <div className="rounded-3xl border border-border bg-white p-4 shadow-soft sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Buscar no catálogo</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-brand-500" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={80}
              placeholder="Busque por produto, serviço ou marca — ex.: toner HP, xerox, locação"
              className="h-13 w-full rounded-2xl border border-input bg-surface pr-11 pl-12 text-base text-ink outline-none placeholder:text-muted-foreground focus-visible:border-brand-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-brand-200/60"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-ink"
                aria-label="Limpar busca"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </label>

          <div role="group" aria-label="Filtrar por tipo" className="inline-flex shrink-0 rounded-2xl bg-surface p-1">
            {(
              [
                ["todos", "Todos"],
                ["produto", "Produtos"],
                ["servico", "Serviços"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={type === value}
                onClick={() => setType(value)}
                className={cn(
                  "h-11 flex-1 rounded-xl px-4 text-sm font-semibold transition-colors",
                  type === value ? "bg-white text-brand-700 shadow-soft" : "text-muted-foreground hover:text-ink"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          role="group"
          aria-label="Filtrar por categoria"
          className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-5 sm:flex-wrap sm:px-5"
        >
          <CategoryChip active={category === ALL} onClick={() => setCategory(ALL)} label="Todas" count={items.length} />
          {categories.map((c) => (
            <CategoryChip
              key={c.slug}
              active={category === c.slug}
              onClick={() => setCategory(c.slug)}
              label={c.title}
              count={counts[c.slug] ?? 0}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {results.length === 1 ? "1 item encontrado" : `${results.length} itens encontrados`}
        </p>
        {hasFilters && (
          <button type="button" onClick={clearAll} className="text-sm font-semibold text-brand-600 hover:text-brand-800">
            Limpar filtros
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item, i) => (
            <li key={item.slug} className="motion-safe:animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <ProductCard item={item} priority={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-brand-200 bg-brand-50/50 px-6 py-16 text-center">
          <SearchX className="size-10 text-brand-300" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold">Não encontramos itens com esses filtros</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Tente outra palavra ou fale com a equipe — podemos ajudar a encontrar o que você precisa.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              location="catalog_empty"
              context={query.trim() ? { kind: "product", name: query.trim().slice(0, 60) } : { kind: "quote" }}
            >
              Perguntar no WhatsApp
            </WhatsAppButton>
            <button
              type="button"
              onClick={clearAll}
              className="h-11 rounded-full border border-border bg-white px-5 text-sm font-semibold text-ink hover:bg-muted"
            >
              Ver todo o catálogo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryChip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
        active ? "border-brand-500 bg-brand-500 text-white" : "border-border bg-white text-ink hover:border-brand-300 hover:bg-brand-50"
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 text-xs tabular-nums",
          active ? "bg-white/20 text-white" : "bg-surface text-muted-foreground"
        )}
      >
        {count}
      </span>
    </button>
  );
}
