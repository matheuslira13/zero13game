export type InscricoesType = {
  id: string;
  titulo: string;
  local: string;
  data_evento: string;
  status: "disponivel" | "indisponivel" | "finalizado" | "cancelado";
};
export class InscricoesClass {
  private data: InscricoesType;

  constructor(data: InscricoesType) {
    this.data = data;
  }
  getId() {
    return this.data.id;
  }
  getTitulo() {
    return this.data.titulo;
  }
  getLocal() {
    return this.data.local;
  }
  getDataEvento() {
    return this.data.data_evento;
  }
  getStatus() {
    return this.data.status;
  }
}
