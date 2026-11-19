import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Deploys de preview (Vercel/Netlify) e ambientes de revisão (com rascunhos
  // ou conteúdo de demonstração) não devem ser indexados.
  const isPreviewDeploy =
    process.env.VERCEL_ENV === "preview" ||
    (process.env.NETLIFY === "true" && process.env.CONTEXT !== undefined && process.env.CONTEXT !== "production");
  const isReview = isPreviewDeploy || siteConfig.flags.showDrafts || siteConfig.flags.showDemoContent;

  if (isReview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
