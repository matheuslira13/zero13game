export type CampeonatoHome = {
  id: string;
  titulo: string;
  data_evento: string;
  numero_maximo_participantes: number;
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
  data_noticia: string;
  imagem_url: string;
  subtitulo: string;
  texto: string;
  titulo: string;
};
