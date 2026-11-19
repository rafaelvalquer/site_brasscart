"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
/** No prerender o ano não é calculado; ele aparece assim que a página hidrata. */
const getServerYear = () => null;

/** Ano corrente, calculado no navegador (mantém o rodapé sempre atualizado). */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);
  return <span className="inline-block min-w-[4ch] tabular-nums">{year}</span>;
}
