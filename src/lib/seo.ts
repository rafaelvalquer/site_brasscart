import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { CatalogItem, ServiceCategory } from "@/content/types";

const abs = (path: string) => new URL(path, siteConfig.url).toString();

export function organizationJsonLd() {
  const { address } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": address ? "LocalBusiness" : "Organization",
    "@id": abs("/#organizacao"),
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: abs("/"),
    logo: abs("/brand/brasscart-logo.png"),
    image: abs("/opengraph-image.jpg"),
    sameAs: [siteConfig.instagram.url],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.whatsapp.number}`,
        contactType: "sales",
        availableLanguage: ["Portuguese"],
        url: siteConfig.whatsapp.baseUrl,
      },
    ],
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.state,
            postalCode: address.postalCode,
            addressCountry: "BR",
          },
        }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#site"),
    name: siteConfig.name,
    url: abs("/"),
    inLanguage: siteConfig.language,
    publisher: { "@id": abs("/#organizacao") },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function serviceJsonLd(category: ServiceCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.title,
    description: category.description,
    serviceType: category.title,
    url: abs(`/servicos/${category.slug}`),
    provider: { "@id": abs("/#organizacao") },
    areaServed: siteConfig.serviceArea.confirmed ? siteConfig.serviceArea.label : undefined,
  };
}

export function catalogItemJsonLd(item: CatalogItem, categoryTitle: string) {
  if (item.type === "servico") {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: item.name,
      description: item.description,
      serviceType: categoryTitle,
      url: abs(`/produtos/${item.slug}`),
      image: abs(item.image.src.src),
      provider: { "@id": abs("/#organizacao") },
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    category: categoryTitle,
    url: abs(`/produtos/${item.slug}`),
    image: abs(item.image.src.src),
  };
}

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Brasscart Soluções — Soluções em impressão",
};

/**
 * Metadados padronizados das páginas internas: título, descrição, canonical,
 * Open Graph e Twitter com imagem de compartilhamento (padrão ou específica).
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const images = [image ?? DEFAULT_OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
