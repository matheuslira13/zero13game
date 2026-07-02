import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components";
import { getCurrentCompetidor } from "@/lib/auth/current-user";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/services/date";
import { inscreverEmCampeonato } from "../actions";
import { type CampeonatoPublico, getInscricoesCount, getJogo } from "../types";

type CampeonatoDetalhePageProps = {
  params: Promise<{ id: string }>;
};

export default async function CampeonatoDetalhePage({
  params,
}: CampeonatoDetalhePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("campeonatos")
    .select(
      "id,titulo,descricao,numero_maximo_participantes,local,data_evento,tipo,status,jogos(nome,imagem_url),inscricoes(count)"
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const campeonato = data as CampeonatoPublico;
  const jogo = getJogo(campeonato);
  const inscritos = getInscricoesCount(campeonato);
  const competidor = await getCurrentCompetidor();
  const { data: inscricaoAtual } = competidor
    ? await supabase
        .from("inscricoes")
        .select("id")
        .eq("campeonato_id", campeonato.id)
        .eq("competidor_id", competidor.id)
        .maybeSingle()
    : { data: null };
  const jaInscrito = Boolean(inscricaoAtual);
  const campeonatoAbertoDisponivel =
    campeonato.status === "disponivel" && campeonato.tipo === "aberto";
  const vagasEsgotadas = inscritos >= campeonato.numero_maximo_participantes;

  return (
    <div className="min-h-screen bg-[#000a24] text-white">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-28 md:px-8">
        <Link
          href="/campeonatos"
          className="w-fit text-sm font-black uppercase text-[#f4c11a] hover:text-white"
        >
          Voltar para campeonatos
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative aspect-video overflow-hidden border border-[#394c7d] bg-[#001131]">
            <Image
              src={jogo?.imagem_url ?? "/bgBanner.png"}
              alt={jogo?.nome ?? campeonato.titulo}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          <div className="border border-[#394c7d] bg-black/40 p-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f4c11a]">
              {jogo?.nome ?? "Jogo"}
            </p>
            <h1 className="mt-3 text-4xl font-black uppercase">
              {campeonato.titulo}
            </h1>
            <p className="mt-4 text-sm uppercase leading-6 text-white/70">
              {campeonato.descricao || "Sem descrição cadastrada."}
            </p>

            <div className="mt-6 grid gap-3 text-sm uppercase text-white/80">
              <p>
                <span className="font-black text-[#f4c11a]">Data:</span>{" "}
                {formatDate(campeonato.data_evento)}
              </p>
              <p>
                <span className="font-black text-[#f4c11a]">Local:</span>{" "}
                {campeonato.local}
              </p>
              <p>
                <span className="font-black text-[#f4c11a]">Tipo:</span>{" "}
                {campeonato.tipo}
              </p>
              <p>
                <span className="font-black text-[#f4c11a]">Status:</span>{" "}
                {campeonato.status}
              </p>
              <p>
                <span className="font-black text-[#f4c11a]">
                  Participantes:
                </span>{" "}
                {inscritos}/{campeonato.numero_maximo_participantes}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {jaInscrito ? (
                <span className="border border-emerald-500/60 bg-emerald-500/15 px-6 py-3 text-center font-black uppercase text-emerald-200">
                  Já inscrito
                </span>
              ) : campeonatoAbertoDisponivel && !competidor ? (
                <Link
                  href="/login"
                  className="bg-[#f4c11a] px-6 py-3 text-center font-black uppercase text-[#001131] transition hover:brightness-90"
                >
                  Entrar para se inscrever
                </Link>
              ) : campeonatoAbertoDisponivel && vagasEsgotadas ? (
                <span className="border border-[#394c7d] px-6 py-3 text-center font-black uppercase text-white/60">
                  Vagas esgotadas
                </span>
              ) : campeonatoAbertoDisponivel ? (
                <form action={inscreverEmCampeonato}>
                  <input
                    type="hidden"
                    name="campeonato_id"
                    value={campeonato.id}
                  />
                  <button
                    type="submit"
                    className="bg-[#f4c11a] px-6 py-3 text-center font-black uppercase text-[#001131] transition hover:brightness-90"
                  >
                    Inscrever-se
                  </button>
                </form>
              ) : (
                <span className="border border-[#394c7d] px-6 py-3 text-center font-black uppercase text-white/60">
                  Inscrição indisponível
                </span>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
