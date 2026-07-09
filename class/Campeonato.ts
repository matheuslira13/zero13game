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

export class CampeonatoClass {
  private data: CampeonatoPublico;

  constructor(data: CampeonatoPublico) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get titulo() {
    return this.data.titulo;
  }

  get descricao() {
    return this.data.descricao;
  }

  get numeroMaximoParticipantes() {
    return this.data.numero_maximo_participantes;
  }

  get dataEvento() {
    return this.data.data_evento;
  }

  get status() {
    return this.data.status;
  }

  get tipo() {
    return this.data.tipo;
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

  temVagas() {
    return this.getInscricoesCount() < this.data.numero_maximo_participantes;
  }

  isFinalizado() {
    return (
      this.data.status === "finalizado" ||
      new Date(this.data.data_evento).getTime() < Date.now()
    );
  }

  isCancelado() {
    return this.data.status === "cancelado";
  }

  isDisponivel() {
    return this.data.status === "disponivel";
  }

  podeInscrever() {
    return (
      this.isDisponivel() && this.data.tipo === "aberto" && this.temVagas()
    );
  }
}
