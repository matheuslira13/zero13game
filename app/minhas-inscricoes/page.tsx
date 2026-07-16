import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button, Footer, Header } from "@/components";
import { createClient } from "@/lib/supabase/server";
import { InscricoesClass, InscricoesType } from "@/class/incricoes";
import { estaVencido, formatDateWithYearAndTime } from "@/services/date";

export const metadata: Metadata = {
  title: "Minhas inscrições",
  robots: {
    index: false,
    follow: false,
  },
};

type InscricaoRecord = {
  id: string;
  campeonatos: InscricoesType | InscricoesType[] | null;
};

function getCampeonato(inscricao: InscricaoRecord) {
  if (Array.isArray(inscricao.campeonatos)) {
    return inscricao.campeonatos[0] ?? null;
  }

  return inscricao.campeonatos;
}

function sortInscricoes(a: InscricaoRecord, b: InscricaoRecord) {
  const campeonatoA = getCampeonato(a);
  const campeonatoB = getCampeonato(b);
  const dateA = campeonatoA
    ? new Date(campeonatoA.data_evento).getTime()
    : Number.POSITIVE_INFINITY;
  const dateB = campeonatoB
    ? new Date(campeonatoB.data_evento).getTime()
    : Number.POSITIVE_INFINITY;
  const now = Date.now();
  const aDisponivel = campeonatoA?.status === "disponivel" && dateA >= now;
  const bDisponivel = campeonatoB?.status === "disponivel" && dateB >= now;

  if (aDisponivel !== bDisponivel) {
    return aDisponivel ? -1 : 1;
  }

  return aDisponivel ? dateA - dateB : dateB - dateA;
}

export default async function MinhasInscricoes() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data } = await supabase
    .from("inscricoes")
    .select(
      `
    id,
    criado_em,
    campeonatos (
      id,
      titulo,
      descricao,
      local,
      data_evento,
      tipo,
      status,
      jogos (
        nome,
        imagem_url
      )
    )
  `
    )
    .eq("competidor_id", user.id)
    .order("criado_em", { ascending: false });
  const inscricoes = ((data ?? []) as InscricaoRecord[]).sort(sortInscricoes);

  return (
    <div className="min-h-screen bg-[#000a24] text-white ">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-28 md:px-8 ">
        <table className="table-auto w-full border-collapse border border-zinc-700">
          <caption className="mb-4 text-center text-2xl font-bold text-white">
            Minhas Inscrições
          </caption>

          <thead>
            <tr className="bg-zinc-900">
              <th className="border border-zinc-700 px-4 py-2">Nome</th>
              <th className="border border-zinc-700 px-4 py-2">Data</th>
              <th className="border border-zinc-700 px-4 py-2">Local</th>
            </tr>
          </thead>

          <tbody>
            {inscricoes.length > 0 ? (
              inscricoes.map((item) => {
                const campeonato = getCampeonato(item);

                if (!campeonato) {
                  return null;
                }

                const inscricao = new InscricoesClass(campeonato);

                return (
                  <tr key={item.id}>
                    <td className="border border-zinc-700 px-4 py-2">
                      {inscricao.getTitulo()}
                    </td>

                    <td className="flex justify-between border border-zinc-700 px-4 py-2">
                      {formatDateWithYearAndTime(inscricao.getDataEvento())}
                      {!estaVencido(inscricao.getDataEvento()) ? (
                        <Button
                          type="secondary"
                          href={`/campeonatos/${inscricao.getId()}`}
                        >
                          Ver detalhes
                        </Button>
                      ) : (
                        <p>Já aconteceu</p>
                      )}
                    </td>

                    <td className="border border-zinc-700 px-4 py-2">
                      {inscricao.getLocal()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="border border-zinc-700 px-4 py-8 text-center text-white/70"
                >
                  Voce ainda nao entrou em nenhum campeonato.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
}
