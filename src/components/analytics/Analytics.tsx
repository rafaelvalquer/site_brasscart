"use client";

import { Cookie } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";

import { CONSENT_STORAGE_KEY, type ConsentValue } from "@/lib/analytics";

function readConsent(): ConsentValue | null {
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Escolha feita nesta visita (vale mesmo se o armazenamento local falhar). */
let sessionChoice: ConsentValue | null = null;
const listeners = new Set<() => void>();

function saveConsent(value: ConsentValue) {
  sessionChoice = value;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* armazenamento indisponível: a escolha vale apenas para esta visita */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

type ConsentState = ConsentValue | "pending" | null;

const getSnapshot = (): ConsentState => sessionChoice ?? readConsent();
/** No servidor e na hidratação o estado é "pending": o aviso só aparece no navegador. */
const getServerSnapshot = (): ConsentState => "pending";

/**
 * Google Analytics 4 com consentimento (LGPD).
 * Só é renderizado quando NEXT_PUBLIC_GA_ID está definido. O script do GA só
 * é carregado depois que o visitante aceita os cookies de medição.
 */
export function Analytics({ gaId }: { gaId: string }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!gaId) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Preferências de cookies"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-border bg-white p-5 shadow-lift sm:bottom-6"
        >
          <div className="flex gap-3">
            <Cookie className="mt-0.5 size-5 shrink-0 text-brand-500" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Usamos cookies de medição (Google Analytics) para entender como o site é utilizado e melhorar a sua
              experiência. Veja a nossa{" "}
              <Link href="/politica-de-privacidade" className="font-medium text-brand-700 underline underline-offset-2">
                política de privacidade
              </Link>
              .
            </p>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => saveConsent("denied")}
              className="h-10 rounded-full border border-border px-4 text-sm font-semibold text-ink hover:bg-muted"
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => saveConsent("granted")}
              className="h-10 rounded-full bg-brand-500 px-5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
