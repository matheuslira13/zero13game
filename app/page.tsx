import { createClient } from "@/lib/supabase/server";

import {
  Banner,
  Button,
  Footer,
  Header,
  NewReference,
  News,
  Title,
} from "@/components";
import { Card } from "@/components/Card/Card";
import { CampeonatoHome, NewsProps } from "./types";

function getJogo(campeonato: CampeonatoHome) {
  if (Array.isArray(campeonato.jogos)) {
    return campeonato.jogos[0] ?? null;
  }

  return campeonato.jogos;
}

function getInscricoesCount(campeonato: CampeonatoHome) {
  return campeonato.inscricoes?.[0]?.count ?? 0;
}

const Home = async () => {
  const supabase = await createClient();

  const [
    { data: campeonatos, error: campeonatosError },
    { data: noticias, error: noticiasError },
  ] = await Promise.all([
    supabase
      .from("campeonatos")
      .select(
        `
      id,
      titulo,
      data_evento,
      numero_maximo_participantes,
      jogos(nome, imagem_url),
      inscricoes(count)
    `
      )
      .order("data_evento", { ascending: false }),

    supabase
      .from("noticias")
      .select("*")
      .order("data_noticia", { ascending: false }),
  ]);

  if (campeonatosError) {
    console.warn(campeonatosError.message);
  }

  if (noticiasError) {
    console.warn(noticiasError.message);
  }

  const listaCampeonatos = (campeonatos ?? []) as CampeonatoHome[];
  const noticiasData = (noticias ?? []) as NewsProps[];
  const reversedNews = [...noticiasData].reverse();
  const featuredNews = noticiasData[noticiasData.length - 1];
  const sideNews = noticiasData.slice(0, noticiasData.length - 1);
  console.log(noticiasData);
  return (
    <div className="flex flex-col items-center font-sans ">
      <Header />
      <Banner />
      <div className="bg-[#001233] flex flex-col w-full items-center">
        <div className="flex justify-between w-full px-8 md:px-24 my-4 items-end ">
          <Title title="Campeonatos disponíveis" color="#ffffff" />
          <Button type="primary" href="/campeonatos">
            <h1 className="text-xl">Ver{` `}Todos</h1>
          </Button>
        </div>
        <div className="flex w-[80vw] overflow-x-scroll mt-4">
          {listaCampeonatos.map((item) => {
            const jogo = getJogo(item);

            return (
              <Card
                key={item.id}
                id={item.id}
                date={item.data_evento}
                img={jogo?.imagem_url ?? "/bgBanner.png"}
                limitTotal={String(item.numero_maximo_participantes)}
                name={item.titulo}
                numberOfparticipant={String(getInscricoesCount(item))}
                type="presencial"
              />
            );
          })}
        </div>
      </div>
      <div className="bg-[#000a24] flex flex-col w-full items-center pt-8">
        <div className="flex justify-between w-full px-8 md:px-24 my-4 items-end">
          <Title title="últimas notícias" color="#ffffff" />

          <Button type="primary" href="/noticias">
            <h1 className="text-xl">Ver Todas</h1>
          </Button>
        </div>

        {/* MOBILE: abaixo de 500px */}
        <div className="flex max-[500px]:items-center max-[500px]:flex min-[501px]:hidden h-[400px] w-full flex-col gap-4 overflow-y-scroll px-8 pb-8">
          {reversedNews.map((item, index) => (
            <News
              key={index}
              data_noticia={item.data_noticia}
              imagem_url={item.imagem_url}
              titulo={item.titulo}
              id={item.id}
            />
          ))}
        </div>

        {/* DESKTOP/TABLET: acima de 500px */}
        <div className="hidden min-[501px]:grid grid-cols-3 gap-4 px-8 md:px-24 pb-8 h-[300px] md:h-[400px] w-full md:w-[80vw]">
          <NewReference
            data_noticia={featuredNews.data_noticia}
            titulo={featuredNews.titulo}
            texto={featuredNews.texto}
            imagem_url={featuredNews.imagem_url}
            subtitulo={featuredNews.subtitulo}
            id={featuredNews.id}
          />

          <div className="flex flex-col gap-4 overflow-y-scroll px-2">
            {sideNews.map((item, index) => (
              <News
                key={index}
                data_noticia={item.data_noticia}
                imagem_url={item.imagem_url}
                titulo={item.titulo}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
