import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/seo";

type SitemapNoticia = {
  id: string;
  data_noticia: string;
};

type SitemapCampeonato = {
  id: string;
  data_evento: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const [noticiasResult, campeonatosResult] = await Promise.all([
    supabase
      .from("noticias")
      .select("id,data_noticia")
      .order("data_noticia", { ascending: false })
      .limit(200),
    supabase
      .from("campeonatos")
      .select("id,data_evento")
      .order("data_evento", { ascending: false })
      .limit(200),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/campeonatos"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/noticias"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/criar-conta"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/login"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const noticias = ((noticiasResult.data ?? []) as SitemapNoticia[]).map(
    (noticia) => ({
      url: absoluteUrl(`/noticias/${noticia.id}`),
      lastModified: new Date(noticia.data_noticia),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }),
  );

  const campeonatos = (
    (campeonatosResult.data ?? []) as SitemapCampeonato[]
  ).map((campeonato) => ({
    url: absoluteUrl(`/campeonatos/${campeonato.id}`),
    lastModified: new Date(campeonato.data_evento),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...campeonatos, ...noticias];
}
