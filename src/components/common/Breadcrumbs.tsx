import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items, tone = "dark", className }: { items: Crumb[]; tone?: "dark" | "light"; className?: string }) {
  return (
    <nav aria-label="Você está em" className={className}>
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", tone === "light" ? "text-white/65" : "text-muted-foreground")}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className={cn("transition-colors", tone === "light" ? "hover:text-white" : "hover:text-brand-700")}>
                  {item.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn("font-medium", tone === "light" ? "text-white" : "text-ink")}>
                  {item.name}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
