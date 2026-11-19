"use client";

import { ImageOff } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * `next/image` com fallback visual: se a imagem não carregar, exibe um bloco
 * neutro com ícone, mantendo o layout estável.
 */
export function SafeImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-300",
          props.fill ? "absolute inset-0" : "",
          className
        )}
      >
        <ImageOff className="size-8" aria-hidden="true" />
      </span>
    );
  }

  return <Image {...props} alt={alt} className={className} onError={() => setFailed(true)} />;
}
