import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/perfil", "/minhas-inscricoes", "/nova-senha"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
