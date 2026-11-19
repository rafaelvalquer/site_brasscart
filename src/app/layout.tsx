import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { Analytics } from "@/components/analytics/Analytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { FloatingContact } from "@/components/whatsapp/FloatingContact";
import { siteConfig } from "@/config/site";
import { buildSearchIndex } from "@/lib/search-index";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Brasscart Soluções | Locação de impressoras, impressão e suprimentos",
    template: "%s | Brasscart Soluções",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Brasscart",
    "locação de impressoras",
    "aluguel de impressoras",
    "impressão",
    "xerox",
    "cópias",
    "encadernação",
    "digitalização",
    "toner",
    "tinta Epson 544",
    "cartuchos compatíveis",
    "manutenção de impressoras",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Brasscart Soluções — Soluções em impressão",
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasscart Soluções — Soluções em impressão",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0070b8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const searchIndex = buildSearchIndex();

  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-background">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-brand-800 px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <MotionProvider>
          <Header searchIndex={searchIndex} />
          <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <FloatingContact />
        </MotionProvider>
        <Analytics gaId={siteConfig.analytics.gaId} />
      </body>
    </html>
  );
}
