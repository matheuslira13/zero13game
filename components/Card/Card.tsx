import { formatDate } from "@/services/date";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  type: "presencial" | "online";
  date: number | string;
  name: string;
  limitTotal: string;
  numberOfparticipant: string;
  img: string;
  id: string;
};

export const Card = ({
  date,
  limitTotal,
  name,
  numberOfparticipant,
  type,
  img,
  id,
}: CardProps) => {
  return (
    <Link href={`/campeonatos/${id}`} className="cursor-pointer">
      <div className="border border-gray-700 mt-2 mx-5 min-w-1xs md:min-w-3xs">
        <Image
          src={img}
          width={300}
          height={100}
          className="
          w-[200px]
          md:w-[300px]
          h-auto
          object-cover
        "
          alt="Card"
        />
        <div className="p-4 bg-black/60 cursor-pointer">
          <h1 className="text-[#ffffff] text-lg font-bold text-center border-t border-gray-700">
            {name}
          </h1>
          <div className="flex flex-col">
            <div className="flex">
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-week col-auto text-[#f4c11a]"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M7 14h.013" />
                <path d="M10.01 14h.005" />
                <path d="M13.01 14h.005" />
                <path d="M16.015 14h.005" />
                <path d="M13.015 17h.005" />
                <path d="M7.01 17h.005" />
                <path d="M10.01 17h.005" />
              </svg>
              <div className="flex px-2 ">
                <h2 className="text-[#ffffff]">{formatDate(date)}</h2>
              </div>
            </div>
            <div className="flex">
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-users-group  text-[#f4c11a]"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
              </svg>
              <div className="flex px-2 ">
                <h2 className="text-[#ffffff]">
                  {" "}
                  {numberOfparticipant} / {limitTotal}
                </h2>
              </div>
            </div>
            <div className="flex border-b border-gray-700 text-[#ffffff] pb-2">
              {type === "online" ? (
                <>
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-wifi text-[#356894]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 18l.01 0" />
                    <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
                    <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
                    <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                  </svg>
                  <h2 className="px-2 text-[#356894]">ONLINE</h2>
                </>
              ) : (
                <>
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-home-2 text-[#356894]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M10 12h4v4h-4l0 -4" />
                  </svg>
                  <h2 className="px-2 text-[#356894]">PRESENCIAL</h2>
                </>
              )}
            </div>
            <div className="flex justify-between pt-2">
              <h2 className="text-[#f4c11a]">VER DETALHES</h2>
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right text-[#f4c11a]"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
