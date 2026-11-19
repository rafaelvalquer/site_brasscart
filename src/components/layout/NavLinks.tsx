"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";

export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function NavList({ pathname }: { pathname: string | null }) {
  return (
    <ul className="flex items-center gap-0.5">
      {mainNav.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink/75 transition-colors hover:text-brand-700",
                active && "text-brand-700"
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-500 transition-transform duration-300",
                  active && "scale-x-100"
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Links da navegação principal com indicação da página atual. */
export function NavLinks() {
  const pathname = usePathname();
  return <NavList pathname={pathname} />;
}

/** Versão sem estado ativo, usada como fallback durante a pré-renderização. */
export function NavLinksStatic() {
  return <NavList pathname={null} />;
}
