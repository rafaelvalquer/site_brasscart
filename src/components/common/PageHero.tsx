import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/common/Breadcrumbs";
import { Eyebrow } from "@/components/common/SectionHeading";

/** Cabeçalho das páginas internas. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-surface pt-28 pb-14 lg:pt-36 lg:pb-20">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full bg-brand-200/40 blur-3xl" />
      <div className="container-site relative">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 max-w-3xl motion-safe:animate-fade-up">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
