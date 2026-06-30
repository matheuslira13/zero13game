import { formatDate } from "@/services/date";
import Image from "next/image";

type NewReferenceProps = {
  data_noticia: string;
  imagem_url: string;
  subtitulo: string;
  texto: string;
  titulo: string;
};

export const NewReference = ({
  data_noticia,
  imagem_url,
  texto,
  titulo,
}: NewReferenceProps) => {
  return (
    <div className="min-w-[50vw] relative col-span-2 overflow-hidden border border-[#394c7d] ">
      <Image src={imagem_url} alt={titulo} fill className="object-cover" />

      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

      <div className="absolute bottom-0 left-0 z-10 p-6">
        <h2 className="text-[#f4c11a]">{formatDate(data_noticia)}</h2>

        <h1 className="mt-2 text-3xl font-bold text-white">{titulo}</h1>

        <h3 className="mt-2 max-w-xl text-white/80">{texto}</h3>
      </div>
    </div>
  );
};
