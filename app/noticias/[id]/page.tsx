import { Footer, Header } from "@/components";
import { createClient } from "@/lib/supabase/server";
import {
  absoluteUrl,
  siteName,
  truncateDescription,
} from "@/lib/seo";
import { formatDate } from "@/services/date";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type NoticiaDetalhePageProps = {
  params: Promise<{ id: string }>;
};

type Noticia = {
  id: string;
  titulo: string;
  subtitulo: string | null;
  texto: string;
  imagem_url: string | null;
  data_noticia: string;
};

function splitParagraphs(texto: string) {
  return texto
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

async function getNoticia(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("noticias")
    .select("id,titulo,subtitulo,texto,imagem_url,data_noticia")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Noticia;
}

export async function generateMetadata({
  params,
}: NoticiaDetalhePageProps): Promise<Metadata> {
  const { id } = await params;
  const noticia = await getNoticia(id);

  if (!noticia) {
    return {
      title: "Notícia não encontrada",
    };
  }

  const description = truncateDescription(
    noticia.subtitulo ?? noticia.texto,
  );
  const imageUrl = noticia.imagem_url ?? absoluteUrl("/bgBanner.png");

  return {
    title: noticia.titulo,
    description,
    alternates: {
      canonical: `/noticias/${noticia.id}`,
    },
    openGraph: {
      type: "article",
      title: noticia.titulo,
      description,
      url: absoluteUrl(`/noticias/${noticia.id}`),
      publishedTime: noticia.data_noticia,
      siteName,
      images: [
        {
          url: imageUrl,
          alt: noticia.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: noticia.titulo,
      description,
      images: [imageUrl],
    },
  };
}

export default async function NoticiaDetalhePage({
  params,
}: NoticiaDetalhePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [noticia, { data: relacionadasData }] = await Promise.all([
    getNoticia(id),
    supabase
      .from("noticias")
      .select("id,titulo,subtitulo,texto,imagem_url,data_noticia")
      .neq("id", id)
      .order("data_noticia", { ascending: false })
      .limit(3),
  ]);

  if (!noticia) {
    notFound();
  }

  const relacionadas = (relacionadasData ?? []) as Noticia[];
  const imageUrl = noticia.imagem_url ?? "/bgBanner.png";
  const paragraphs = splitParagraphs(noticia.texto);
  const newsStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: truncateDescription(noticia.subtitulo ?? noticia.texto),
    image: [noticia.imagem_url ?? absoluteUrl("/bgBanner.png")],
    datePublished: noticia.data_noticia,
    dateModified: noticia.data_noticia,
    author: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/noticias/${noticia.id}`),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#000a24] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsStructuredData),
        }}
      />
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 pb-16 pt-28 md:px-8">
        <Link
          href="/noticias"
          className="w-fit text-sm font-black uppercase text-[#f4c11a] hover:text-white"
        >
          Voltar para notícias
        </Link>

        <article className="overflow-hidden border border-[#394c7d] bg-[#001131]">
          <div className="relative min-h-[300px] md:min-h-[520px]">
            <Image
              src={imageUrl}
              alt={noticia.titulo}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#000a24] via-[#000a24]/35 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <span className="text-sm font-black uppercase text-[#f4c11a]">
                {formatDate(noticia.data_noticia)}
              </span>
              <h1 className="mt-3 max-w-5xl text-4xl font-black uppercase leading-tight md:text-6xl">
                {noticia.titulo}
              </h1>
              {noticia.subtitulo ? (
                <p className="mt-4 max-w-3xl text-sm font-bold uppercase leading-6 text-white/75 md:text-base">
                  {noticia.subtitulo}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mx-auto flex max-w-4xl flex-col gap-5 px-5 py-8 md:px-8 md:py-10">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-white/80 md:text-lg"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-base leading-8 text-white/70">
                Notícia sem conteúdo cadastrado.
              </p>
            )}
          </div>
        </article>

        {relacionadas.length > 0 ? (
          <section>
            <div className="mb-5 flex items-end justify-between border-b border-[#394c7d] pb-3">
              <h2 className="text-2xl font-black uppercase text-[#f4c11a]">
                Mais notícias
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relacionadas.map((relacionada) => (
                <Link
                  key={relacionada.id}
                  href={`/noticias/${relacionada.id}`}
                  className="group overflow-hidden border border-[#394c7d] bg-[#001131] transition hover:border-[#f4c11a]/80"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={relacionada.imagem_url ?? "/bgBanner.png"}
                      alt={relacionada.titulo}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <span className="text-xs font-black uppercase text-[#f4c11a]">
                      {formatDate(relacionada.data_noticia)}
                    </span>
                    <h3 className="mt-2 text-lg font-black uppercase leading-tight">
                      {relacionada.titulo}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60">
                      {relacionada.subtitulo ?? relacionada.texto}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
