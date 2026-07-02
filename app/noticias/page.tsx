import { Footer, Header } from "@/components";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/services/date";
import Image from "next/image";
import Link from "next/link";

const NOTICIAS_POR_PAGINA = 20;

type NoticiasPageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

type Noticia = {
  id: string;
  titulo: string;
  subtitulo: string | null;
  texto: string;
  imagem_url: string | null;
  data_noticia: string;
};

function getPageNumber(value: string | string[] | undefined) {
  const pageValue = Array.isArray(value) ? value[0] : value;
  const parsedPage = Number(pageValue ?? "1");

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return Math.floor(parsedPage);
}

function getPreview(texto: string) {
  if (texto.length <= 150) {
    return texto;
  }

  return `${texto.slice(0, 147).trim()}...`;
}

function getPageHref(page: number) {
  return page === 1 ? "/noticias" : `/noticias?page=${page}`;
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-[#394c7d] pt-6"
      aria-label="Paginação de notícias"
    >
      <Link
        href={getPageHref(Math.max(currentPage - 1, 1))}
        aria-disabled={currentPage === 1}
        className="border border-[#394c7d] px-4 py-2 text-sm font-black uppercase text-white transition hover:border-[#f4c11a] hover:text-[#f4c11a] aria-disabled:pointer-events-none aria-disabled:opacity-40"
      >
        Anterior
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className="grid h-10 w-10 place-items-center border border-[#394c7d] text-sm font-black text-white transition hover:border-[#f4c11a] hover:text-[#f4c11a] aria-current:border-[#f4c11a] aria-current:bg-[#f4c11a] aria-current:text-[#001131]"
        >
          {page}
        </Link>
      ))}

      <Link
        href={getPageHref(Math.min(currentPage + 1, totalPages))}
        aria-disabled={currentPage === totalPages}
        className="border border-[#394c7d] px-4 py-2 text-sm font-black uppercase text-white transition hover:border-[#f4c11a] hover:text-[#f4c11a] aria-disabled:pointer-events-none aria-disabled:opacity-40"
      >
        Próxima
      </Link>
    </nav>
  );
}

function NoticiaCard({
  noticia,
  featured = false,
}: {
  noticia: Noticia;
  featured?: boolean;
}) {
  const imageUrl = noticia.imagem_url ?? "/bgBanner.png";

  if (featured) {
    return (
      <Link
        href={`/noticias/${noticia.id}`}
        className="grid overflow-hidden border border-[#394c7d] bg-[#001131] transition hover:border-[#f4c11a]/80 md:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="relative min-h-[260px] md:min-h-[380px]">
          <Image
            src={imageUrl}
            alt={noticia.titulo}
            fill
            priority
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent md:hidden" />
        </div>

        <div className="flex flex-col justify-end p-5 md:p-8">
          <span className="text-sm font-black uppercase text-[#f4c11a]">
            {formatDate(noticia.data_noticia)}
          </span>
          <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-white md:text-5xl">
            {noticia.titulo}
          </h2>
          {noticia.subtitulo ? (
            <p className="mt-3 text-sm font-bold uppercase leading-6 text-white/70">
              {noticia.subtitulo}
            </p>
          ) : null}
          <p className="mt-4 text-sm leading-6 text-white/70">
            {getPreview(noticia.texto)}
          </p>
          <span className="mt-5 w-fit text-sm font-black uppercase text-[#f4c11a]">
            Ler notícia
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/noticias/${noticia.id}`}
      className="group grid overflow-hidden border border-[#394c7d] bg-[#001131] transition hover:border-[#f4c11a]/80 md:grid-cols-[180px_1fr]"
    >
      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[170px]">
        <Image
          src={imageUrl}
          alt={noticia.titulo}
          fill
          sizes="(min-width: 768px) 180px, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-col p-4">
        <span className="text-xs font-black uppercase text-[#f4c11a]">
          {formatDate(noticia.data_noticia)}
        </span>
        <h3 className="mt-2 text-xl font-black uppercase leading-tight text-white">
          {noticia.titulo}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/65">
          {noticia.subtitulo ?? getPreview(noticia.texto)}
        </p>
        <span className="mt-4 text-xs font-black uppercase text-[#f4c11a]">
          Ler notícia
        </span>
      </div>
    </Link>
  );
}

export default async function NoticiasPage({
  searchParams,
}: NoticiasPageProps) {
  const { page } = await searchParams;
  const currentPage = getPageNumber(page);
  const from = (currentPage - 1) * NOTICIAS_POR_PAGINA;
  const to = from + NOTICIAS_POR_PAGINA - 1;

  const supabase = await createClient();
  const {
    data: noticiasData,
    error: noticiasError,
    count,
  } = await supabase
    .from("noticias")
    .select("id,titulo,subtitulo,texto,imagem_url,data_noticia", {
      count: "exact",
    })
    .order("data_noticia", { ascending: false })
    .range(from, to);

  const noticias = (noticiasData ?? []) as Noticia[];
  const totalNoticias = count ?? noticias.length;
  const totalPages = Math.max(
    Math.ceil(totalNoticias / NOTICIAS_POR_PAGINA),
    1
  );
  const [featuredNoticia, ...listaNoticias] = noticias;

  return (
    <div className="flex min-h-screen flex-col bg-[#000a24] text-white">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pb-16 pt-28 md:px-8">
        <section>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f4c11a]">
            Zero13GameClub
          </p>
          <h1 className="mt-3 text-4xl font-black uppercase md:text-5xl">
            Todas as notícias
          </h1>
          <p className="mt-3 max-w-2xl text-sm uppercase leading-6 text-white/70">
            Acompanhe as novidades da comunidade, bastidores dos campeonatos e
            próximos movimentos da Zero13GameClub.
          </p>
        </section>

        {noticiasError ? (
          <p className="border border-red-500/50 bg-red-500/15 px-4 py-3 text-sm font-bold text-red-100">
            Não foi possível carregar notícias: {noticiasError.message}
          </p>
        ) : null}

        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#394c7d] pb-3">
            <h2 className="text-2xl font-black uppercase text-[#f4c11a]">
              Últimas notícias
            </h2>
            <span className="text-sm uppercase text-white/50">
              {totalNoticias} publicações
            </span>
          </div>

          {featuredNoticia ? (
            <div className="flex flex-col gap-5">
              <NoticiaCard noticia={featuredNoticia} featured />

              {listaNoticias.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  {listaNoticias.map((noticia) => (
                    <NoticiaCard key={noticia.id} noticia={noticia} />
                  ))}
                </div>
              ) : null}

              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          ) : (
            <p className="border border-[#394c7d] bg-black/30 px-4 py-6 text-center text-sm uppercase text-white/60">
              Sem notícias no momento.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
