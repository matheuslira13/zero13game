import { Footer, Header } from "@/components";
import { createClient } from "@/lib/supabase/server";
import { getCurrentCompetidor } from "@/lib/auth/current-user";
import { CampeonatoCard } from "./CampeonatoCard";
import { type CampeonatoPublico } from "./types";
import type { Metadata } from "next";
import {
  absoluteUrl,
  siteKeywords,
  siteName,
  truncateDescription,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Campeonatos gamer e torneios",
  description: truncateDescription(
    "Veja campeonatos gamer, torneios de jogos de luta, eventos presenciais e inscrições abertas da comunidade Zero13GameClub.",
  ),
  keywords: [
    ...siteKeywords,
    "campeonatos abertos",
    "torneios de games",
    "inscrição campeonato gamer",
  ],
  alternates: {
    canonical: "/campeonatos",
  },
  openGraph: {
    title: `Campeonatos gamer | ${siteName}`,
    description:
      "Calendário de campeonatos, torneios e eventos gamer da Zero13GameClub.",
    url: absoluteUrl("/campeonatos"),
    images: [absoluteUrl("/bgBanner.png")],
  },
};

function splitCampeonatos(campeonatos: CampeonatoPublico[]) {
  const now = Date.now();

  const proximos = campeonatos
    .filter(
      (campeonato) =>
        campeonato.status !== "finalizado" &&
        campeonato.status !== "cancelado" &&
        new Date(campeonato.data_evento).getTime() >= now,
    )
    .sort(
      (a, b) =>
        new Date(a.data_evento).getTime() - new Date(b.data_evento).getTime(),
    );

  const finalizados = campeonatos
    .filter(
      (campeonato) =>
        campeonato.status === "finalizado" ||
        new Date(campeonato.data_evento).getTime() < now,
    )
    .sort(
      (a, b) =>
        new Date(b.data_evento).getTime() - new Date(a.data_evento).getTime(),
    );

  return {
    proximos,
    finalizados,
  };
}

export default async function CampeonatosPage() {
  const supabase = await createClient();
  const [competidor, campeonatosResult] = await Promise.all([
    getCurrentCompetidor(),
    supabase
      .from("campeonatos")
      .select(
        "id,titulo,descricao,numero_maximo_participantes,local,data_evento,tipo,status,jogos(nome,imagem_url),inscricoes(count)",
      )
      .order("data_evento", { ascending: true }),
  ]);

  const { data, error } = campeonatosResult;

  const campeonatos = (data ?? []) as CampeonatoPublico[];
  const { proximos, finalizados } = splitCampeonatos(campeonatos);
  const { data: inscricoes } = competidor
    ? await supabase
        .from("inscricoes")
        .select("campeonato_id")
        .eq("competidor_id", competidor.id)
    : { data: [] };
  const campeonatosInscritos = new Set(
    (inscricoes ?? []).map((inscricao) => inscricao.campeonato_id),
  );

  return (
    <div className="min-h-screen bg-[#000a24] text-white">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 pt-28 md:px-8">
        <section>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f4c11a]">
            Zero13GameClub
          </p>
          <h1 className="mt-3 text-4xl font-black uppercase md:text-5xl">
            Campeonatos
          </h1>
          <p className="mt-3 max-w-2xl text-sm uppercase leading-6 text-white/70">
            Veja os próximos campeonatos da comunidade e consulte também os
            eventos já finalizados.
          </p>
        </section>

        {error ? (
          <p className="border border-red-500/50 bg-red-500/15 px-4 py-3 text-sm font-bold text-red-100">
            Não foi possível carregar campeonatos: {error.message}
          </p>
        ) : null}

        <section>
          <div className="mb-4 flex items-end justify-between border-b border-[#394c7d] pb-3">
            <h2 className="text-2xl font-black uppercase text-[#f4c11a]">
              Próximos campeonatos
            </h2>
            <span className="text-sm uppercase text-white/50">
              {proximos.length} eventos
            </span>
          </div>

          {proximos.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {proximos.map((campeonato) => (
                <CampeonatoCard
                  key={campeonato.id}
                  campeonato={campeonato}
                  inscrito={campeonatosInscritos.has(campeonato.id)}
                />
              ))}
            </div>
          ) : (
            <p className="border border-[#394c7d] bg-black/30 px-4 py-6 text-center text-sm uppercase text-white/60">
              Nenhum campeonato próximo no momento.
            </p>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between border-b border-[#394c7d] pb-3">
            <h2 className="text-2xl font-black uppercase text-[#f4c11a]">
              Campeonatos finalizados
            </h2>
            <span className="text-sm uppercase text-white/50">
              {finalizados.length} eventos
            </span>
          </div>

          {finalizados.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {finalizados.map((campeonato) => (
                <CampeonatoCard
                  key={campeonato.id}
                  campeonato={campeonato}
                  inscrito={campeonatosInscritos.has(campeonato.id)}
                />
              ))}
            </div>
          ) : (
            <p className="border border-[#394c7d] bg-black/30 px-4 py-6 text-center text-sm uppercase text-white/60">
              Nenhum campeonato finalizado ainda.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
