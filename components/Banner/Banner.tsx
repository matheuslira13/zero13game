import { Button } from "../Button/Button";
import { PortalBadge } from "../PortalBadge/PortalBadge";

export const Banner = () => {
  return (
    <div
      className="flex  w-full flex-col items-start justify-end px-8 md:px-16 
        bg-[url('/bgBanner.png')]
        bg-cover
        bg-center
        bg-no-repeat
        h-[80vh]
       
"
    >
      <PortalBadge />
      <h1 className="mt-2  font-bold text-white text-1xl md:text-4xl">
        CAMPEONATOS DA REGIAO
      </h1>
      <h1 className="   text-[#f4c11a] text-1xl md:text-4xl">E NOTICIAS</h1>
      <h3 className="  text-white text-1xl md:text-4xl">DE JOGOS DE LUTA</h3>
      <div className="mt-4 flex space-x-4">
        <Button href="/criar-conta" type="secondary" icons="profile">
          CRIAR CONTA
        </Button>
        <Button href="/login" type="primary">
          FAZER LOGIN
        </Button>
      </div>
      <p className="text-white italic text-xs md:text-lg">
        O zero13 game club é uma iniciativa sem fins lucrativos{" "}
      </p>
      <p className="text-white italic text-xs md:text-lg">
        para promover a cena dos jogos de luta na{" "}
      </p>{" "}
      <p className="text-white italic text-xs md:text-lg">
        região da baixada santista.
      </p>
    </div>
  );
};
