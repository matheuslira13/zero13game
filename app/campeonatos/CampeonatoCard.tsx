import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/services/date";
import {
  type CampeonatoPublico,
  getInscricoesCount,
  getJogo,
} from "./types";

type CampeonatoCardProps = {
  campeonato: CampeonatoPublico;
  inscrito?: boolean;
};

export function CampeonatoCard({
  campeonato,
  inscrito = false,
}: CampeonatoCardProps) {
  const jogo = getJogo(campeonato);
  const inscritos = getInscricoesCount(campeonato);
  const podeInscrever =
    campeonato.status === "disponivel" && campeonato.tipo === "aberto";
  const callToAction = inscrito
    ? "Já inscrito"
    : podeInscrever
      ? "Inscrever-se"
      : "Ver detalhes";

  return (
    <Link
      href={`/campeonatos/${campeonato.id}`}
      className="group overflow-hidden border border-[#394c7d] bg-black/40 transition hover:border-[#f4c11a]"
    >
      <div className="relative aspect-video bg-[#001131]">
        <Image
          src={jogo?.imagem_url ?? "/bgBanner.png"}
          alt={jogo?.nome ?? campeonato.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 bg-[#f4c11a] px-3 py-1 text-xs font-black uppercase text-[#001131]">
          {campeonato.status}
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm font-bold uppercase text-[#f4c11a]">
          {jogo?.nome ?? "Jogo"}
        </p>
        <h2 className="mt-2 text-xl font-black uppercase text-white">
          {campeonato.titulo}
        </h2>

        <div className="mt-4 grid gap-2 text-sm uppercase text-white/75">
          <p>Data: {formatDate(campeonato.data_evento)}</p>
          <p>Local: {campeonato.local}</p>
          <p>
            Participantes: {inscritos}/{campeonato.numero_maximo_participantes}
          </p>
          <p>Tipo: {campeonato.tipo}</p>
        </div>

        <div
          className={`mt-4 border-t border-[#394c7d] pt-3 text-sm font-black uppercase ${
            inscrito ? "text-emerald-300" : "text-[#f4c11a]"
          }`}
        >
          {callToAction}
        </div>
      </div>
    </Link>
  );
}
