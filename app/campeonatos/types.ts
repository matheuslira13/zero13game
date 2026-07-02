export type CampeonatoPublico = {
  id: string;
  titulo: string;
  descricao: string | null;
  numero_maximo_participantes: number;
  local: string;
  data_evento: string;
  tipo: "aberto" | "fechado";
  status: "disponivel" | "indisponivel" | "finalizado" | "cancelado";
  jogos:
    | {
        nome: string;
        imagem_url: string | null;
      }
    | {
        nome: string;
        imagem_url: string | null;
      }[]
    | null;
  inscricoes: { count: number }[] | null;
};

export function getJogo(campeonato: CampeonatoPublico) {
  if (Array.isArray(campeonato.jogos)) {
    return campeonato.jogos[0] ?? null;
  }

  return campeonato.jogos;
}

export function getInscricoesCount(campeonato: CampeonatoPublico) {
  return campeonato.inscricoes?.[0]?.count ?? 0;
}
