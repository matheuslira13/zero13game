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

export class Campeonato {
  private data: CampeonatoPublico;

  constructor(data: CampeonatoPublico) {
    this.data = data;
  }
  getJogo() {
    if (Array.isArray(this.data.jogos)) {
      return this.data.jogos[0] ?? null;
    }

    return this.data.jogos;
  }
  getInscricoesCount() {
    return this.data.inscricoes?.[0]?.count ?? 0;
  }
}
