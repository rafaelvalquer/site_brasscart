"use client";

import { ArrowRight, Search, SearchX } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { trackEvent } from "@/lib/analytics";
import { scoreRecord } from "@/lib/search";
import type { SearchEntry } from "@/lib/search-index";

const SUGGESTIONS = ["toner", "locação", "xerox", "encadernação", "conserto", "tinta epson"];

/** Busca global (atalho: Ctrl + K ou "/"). */
export function SiteSearch({ index }: { index: SearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return index
      .map((entry) => ({
        entry,
        score: scoreRecord(query, [
          { value: entry.title, weight: 3 },
          { value: entry.keywords, weight: 2 },
          { value: entry.subtitle, weight: 1 },
        ]),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.entry);
  }, [index, query]);

  const close = () => {
    if (query.trim()) trackEvent("search", { search_term: query.trim() });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
        aria-label="Buscar serviços e produtos"
      >
        <Search className="size-[1.15rem]" aria-hidden="true" />
      </button>

      <DialogContent className="top-[12vh] max-w-[calc(100%-1.5rem)] translate-y-0 gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Buscar no site</DialogTitle>
        <DialogDescription className="sr-only">
          Digite o nome de um serviço ou produto. Os resultados aparecem enquanto você digita.
        </DialogDescription>
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search className="size-5 shrink-0 text-brand-500" aria-hidden="true" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você procura? Ex.: toner Brother"
            aria-label="Buscar serviços e produtos"
            className="h-16 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted-foreground"
            maxLength={80}
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2" aria-live="polite">
          {!query.trim() && (
            <div className="px-3 py-4">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Sugestões</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-ink transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length > 0 && (
            <ul className="flex flex-col gap-1">
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={close}
                    className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-brand-50 focus-visible:bg-brand-50"
                  >
                    <span className="mt-0.5 shrink-0 rounded-md bg-brand-50 px-2 py-0.5 text-[0.7rem] font-semibold text-brand-700 group-hover:bg-white">
                      {r.kind}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{r.title}</span>
                      <span className="block truncate text-sm text-muted-foreground">{r.subtitle}</span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-brand-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query.trim() && results.length === 0 && (
            <div className="flex flex-col items-center px-6 py-10 text-center">
              <SearchX className="size-8 text-brand-300" aria-hidden="true" />
              <p className="mt-3 font-medium text-ink">Nada encontrado para “{query}”.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Fale com a equipe: podemos ajudar a encontrar o que você precisa.
              </p>
              <WhatsAppButton
                location="search_empty"
                className="mt-5"
                size="sm"
                context={{ kind: "product", name: query.trim().slice(0, 60) }}
              >
                Perguntar no WhatsApp
              </WhatsAppButton>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
