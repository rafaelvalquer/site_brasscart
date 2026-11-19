import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/common/PageHero";
import { imageCredits, images } from "@/content/images";

export const metadata: Metadata = {
  title: "Créditos das imagens",
  description: "Autoria e licenças das fotografias ilustrativas utilizadas no site da Brasscart Soluções.",
  alternates: { canonical: "/creditos" },
  robots: { index: false, follow: true },
};

const LICENSES = {
  Unsplash: { name: "Licença Unsplash", url: "https://unsplash.com/license" },
  Pexels: { name: "Licença Pexels", url: "https://www.pexels.com/license/" },
} as const;

export default function CreditosPage() {
  return (
    <>
      <PageHero
        eyebrow="Créditos"
        title="Créditos das imagens"
        description="As fotografias deste site são ilustrativas, obtidas em bancos de imagens de uso livre, e não representam trabalhos, produtos ou instalações da Brasscart. A marca Brasscart é de propriedade da empresa."
        breadcrumbs={[{ name: "Início", href: "/" }, { name: "Créditos das imagens" }]}
      />
      <section aria-label="Lista de créditos" className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {imageCredits.map((credit) => {
              const license = LICENSES[credit.source];
              return (
                <li key={credit.key} className="flex items-center gap-4 rounded-2xl border border-border p-3">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface">
                    <Image src={images[credit.key]} alt="" fill sizes="80px" placeholder="blur" className="object-cover" />
                  </div>
                  <div className="min-w-0 text-sm">
                    <p className="font-semibold text-ink">Foto de {credit.author}</p>
                    <p className="mt-0.5 text-muted-foreground">
                      <a
                        href={credit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-brand-700"
                      >
                        Ver no {credit.source}
                      </a>{" "}
                      ·{" "}
                      <a
                        href={license.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-brand-700"
                      >
                        {license.name}
                      </a>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
            Ícones: Lucide (licença ISC). Ícone do WhatsApp: Simple Icons (CC0). Marcas de fabricantes citadas no site
            pertencem aos respectivos titulares e são mencionadas apenas para indicar compatibilidade.
          </p>
        </div>
      </section>
    </>
  );
}
