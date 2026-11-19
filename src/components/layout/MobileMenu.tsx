"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { InstagramIcon } from "@/components/brand/SocialIcons";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { mainNav, quoteHref, siteConfig } from "@/config/site";

/** Menu hambúrguer para celulares e tablets. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Garante que o menu esteja fechado se a página for ocultada (Activity).
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors hover:bg-brand-50 lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[88%] max-w-sm gap-0 bg-white p-0">
        <div className="flex items-center border-b border-border px-6 py-5">
          <BrandLogo className="w-32" href={null} />
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Navegação principal do site da Brasscart</SheetDescription>
        </div>
        <nav aria-label="Menu principal" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 font-heading text-lg font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-brand-400" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 border-t border-border bg-surface px-6 py-6">
          <Link
            href={quoteHref}
            onClick={() => setOpen(false)}
            className="flex h-12 w-full items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white"
          >
            Solicitar orçamento
          </Link>
          <WhatsAppButton location="mobile_menu" className="w-full" size="lg">
            Falar no WhatsApp
          </WhatsAppButton>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 pt-1 text-sm font-medium text-muted-foreground hover:text-brand-700"
          >
            <InstagramIcon className="size-4" />
            {siteConfig.instagram.handle}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
