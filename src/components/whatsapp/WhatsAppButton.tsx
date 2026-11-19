"use client";

import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { WhatsAppIcon } from "@/components/brand/SocialIcons";
import { buttonVariants } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, messageFor, type WhatsAppContext } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  context?: WhatsAppContext;
  /** Identificador da posição do botão, enviado ao Analytics. */
  location: string;
  children?: ReactNode;
  className?: string;
  icon?: boolean;
} & VariantProps<typeof buttonVariants>;

/**
 * Link para o WhatsApp com mensagem contextualizada, aberto em nova aba e
 * rastreado no Analytics.
 */
export function WhatsAppButton({
  context = { kind: "general" },
  location,
  children = "Falar no WhatsApp",
  className,
  icon = true,
  variant = "whatsapp",
  size,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(messageFor(context));
  const item = context.kind === "product" || context.kind === "service" ? context.name : undefined;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(location, item)}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {icon && <WhatsAppIcon className="size-[1.15em]" />}
      {children}
      <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
    </a>
  );
}
