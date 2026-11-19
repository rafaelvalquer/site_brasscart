import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/brand/brasscart-logo.png";
import { cn } from "@/lib/utils";

/**
 * Logotipo oficial da Brasscart.
 *
 * O arquivo atual (src/assets/brand/brasscart-logo.png) foi extraído, sem
 * alterações de desenho, de uma peça oficial publicada no Instagram da empresa.
 * Para usar o arquivo vetorial definitivo, substitua-o por
 * `brasscart-logo.svg` e ajuste o import abaixo — o componente mantém a
 * proporção original (≈ 3,35 : 1).
 *
 * O logotipo possui grafite e azul: use-o sempre sobre fundos claros. Em fundos
 * escuros, aplique a variante `plate`, que o posiciona sobre uma base branca.
 */
export function BrandLogo({
  className,
  plate = false,
  priority = false,
  href = "/",
}: {
  className?: string;
  plate?: boolean;
  priority?: boolean;
  href?: string | null;
}) {
  const img = (
    <Image
      src={logo}
      alt="Brasscart — Soluções em impressão"
      sizes="(min-width: 1024px) 180px, 150px"
      preload={priority}
      className="h-auto w-full"
    />
  );

  const content = plate ? (
    <span className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-soft">{img}</span>
  ) : (
    img
  );

  if (!href) return <span className={cn("inline-block", className)}>{content}</span>;

  return (
    <Link href={href} className={cn("inline-block rounded-md", className)}>
      {content}
    </Link>
  );
}
