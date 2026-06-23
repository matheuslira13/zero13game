import { Button } from "../Button/Button";
import { PortalBadge } from "../PortalBadge/PortalBadge";

export const Banner = () => {
  return (
    <div
      className="flex  w-full flex-col items-start justify-center  px-16 
        bg-[url('/bgBanner.png')]
        bg-cover
        bg-center
        bg-no-repeat
        h-[50vh]
"
    >
      <PortalBadge />

      <h1 className="mt-2 text-4xl font-bold text-white">
        CAMPEONATOS DA REGIAO
      </h1>

      <h1 className=" text-4xl  text-[#f4c11a]">E NOTICIAS</h1>
      <h3 className=" text-lg text-white">DE JOGOS DE LUTA</h3>
      <div className="mt-4 flex space-x-4">
        <Button href="/entra" type="secondary">
          CRIAR CONTA
        </Button>
        <Button href="/entra" type="primary">
          FAZER LOGIN
        </Button>
      </div>
    </div>
  );
};
