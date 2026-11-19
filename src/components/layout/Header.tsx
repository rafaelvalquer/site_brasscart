"use client";

import { Suspense } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLinks, NavLinksStatic } from "@/components/layout/NavLinks";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { LinkButton } from "@/components/ui/link-button";
import { quoteHref } from "@/config/site";
import { useScrolled } from "@/hooks/use-scrolled";
import type { SearchEntry } from "@/lib/search-index";
import { cn } from "@/lib/utils";

/** Cabeçalho fixo: fica translúcido no topo e ganha fundo ao rolar. */
export function Header({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const scrolled = useScrolled(12);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border/70 bg-white/90 shadow-[0_10px_30px_-20px_rgb(6_42_77/0.35)] backdrop-blur-md"
          : "border-transparent bg-white/60 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between gap-4 transition-[height] duration-300",
          scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-20"
        )}
      >
        <BrandLogo priority className="w-[132px] shrink-0 lg:w-[156px]" />

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <Suspense fallback={<NavLinksStatic />}>
            <NavLinks />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <SiteSearch index={searchIndex} />
          <LinkButton href={quoteHref} size="default" className="hidden sm:inline-flex">
            Solicitar orçamento
          </LinkButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
