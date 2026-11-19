"use client";

import { useSearchParams } from "next/navigation";

import { QuoteForm, type QuoteOptionGroup } from "@/components/quote/QuoteForm";

/**
 * Pré-seleciona o item do orçamento a partir de `?item=<slug>` (ex.: links
 * "Solicitar orçamento" das páginas de produto). Deve ser usado dentro de
 * <Suspense>, com <QuoteForm> como fallback.
 */
export function QuoteFormWithParams({
  groups,
  slugToName,
}: {
  groups: QuoteOptionGroup[];
  slugToName: Record<string, string>;
}) {
  const params = useSearchParams();
  const slug = params.get("item") ?? "";
  return <QuoteForm key={slug} groups={groups} defaultItem={slugToName[slug] ?? ""} />;
}
