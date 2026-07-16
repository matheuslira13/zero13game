export type CampeonatoHome = {
  id: string;
  titulo: string;
  descricao: string | null;
  local: string;
  data_evento: string;
  numero_maximo_participantes: number;
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

export type NewsProps = {
  id: string;
  data_noticia: string;
  imagem_url: string;
  subtitulo: string;
  texto: string;
  titulo: string;
};
