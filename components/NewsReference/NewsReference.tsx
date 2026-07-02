import { formatDate } from "@/services/date";
import Image from "next/image";
import Link from "next/link";

type NewReferenceProps = {
  data_noticia: string;
  imagem_url: string;
  subtitulo: string;
  texto: string;
  titulo: string;
  id: string;
};

export const NewReference = ({
  data_noticia,
  imagem_url,
  texto,
  titulo,
  id,
}: NewReferenceProps) => {
  return (
    <Link
      href={`/noticias/${id}`}
      className="group relative col-span-2 min-h-[300px] overflow-hidden border border-[#394c7d] bg-[#001131] transition hover:border-[#f4c11a] md:min-h-[400px]"
    >
      <Image
        src={imagem_url}
        alt={titulo}
        fill
        sizes="(min-width: 768px) 55vw, 100vw"
        className="object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

      <div className="absolute bottom-0 left-0 z-10 p-5 md:p-6">
        <h2 className="text-sm font-black uppercase text-[#f4c11a]">
          {formatDate(data_noticia)}
        </h2>

        <h1 className="mt-2 max-w-3xl text-2xl font-black uppercase leading-tight text-white md:text-3xl">
          {titulo}
        </h1>

        <h3 className="mt-2 line-clamp-2 max-w-2xl text-sm font-bold uppercase leading-6 text-white/80">
          {texto}
        </h3>
      </div>
    </Link>
  );
};
