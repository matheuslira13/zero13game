import { formatDate } from "@/services/date";
import Image from "next/image";
import Link from "next/link";

type NewsProps = {
  data_noticia: string;
  imagem_url: string;
  titulo: string;
  id: string;
};

export const News = ({ data_noticia, imagem_url, titulo, id }: NewsProps) => {
  return (
    <Link
      href={`/noticias/${id}`}
      className="group flex min-h-24 w-full overflow-hidden border border-[#394c7d] bg-[#001131] transition hover:border-[#f4c11a] max-[501px]:h-[100px] max-[501px]:w-full max-[501px]:items-center"
    >
      <Image
        height={96}
        width={112}
        alt={titulo}
        src={imagem_url}
        className="h-24 w-28 shrink-0 object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
        <h2 className="text-sm font-black uppercase text-[#f4c11a]">
          {formatDate(data_noticia)}
        </h2>

        <div className="mt-1 flex items-center justify-between gap-3 text-amber-50">
          <h1 className="line-clamp-2 text-sm font-black uppercase leading-5">
            {titulo}
          </h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-[#f4c11a] transition group-hover:translate-x-1"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </div>
      </div>
    </Link>
  );
};
