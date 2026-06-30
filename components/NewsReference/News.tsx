import { formatDate } from "@/services/date";
import Image from "next/image";

type NewsProps = {
  data_noticia: string;
  imagem_url: string;
  titulo: string;
};

export const News = ({ data_noticia, imagem_url, titulo }: NewsProps) => {
  return (
    <div
      className="
      flex
      border
      border-[#394c7d]
      bg-[#001131]
      max-[501px]:h-[100px]
       max-[501px]:w-[200px]
      max-[501px]:items-center
    "
    >
      <Image height={80} width={80} alt={titulo} src={imagem_url} />
      <div className="flex flex-col">
        <h2 className="text-[#f4c11a]">{formatDate(data_noticia)}</h2>
        <div className="flex justify-between text-amber-50">
          <h1>{titulo}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" text-[#f4c11a] icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
