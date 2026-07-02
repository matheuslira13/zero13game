"use client";

import { logoutFunction } from "@/app/login/actions";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "../Avatar/Avatar";

type ProfileDropdownProps = {
  apelido: string;
  fotoUrl: string | null;
};

export function ProfileDropdown({ apelido, fotoUrl }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-full border border-transparent transition hover:border-[#f4c11a]"
        aria-label="Abrir menu do perfil"
        aria-expanded={isOpen}
      >
        <Avatar src={fotoUrl} alt={apelido} size={40} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-12 w-48 border border-[#394c7d] bg-[#000a24] shadow-xl">
          <div className="border-b border-[#394c7d] px-4 py-3">
            <p className="text-xs uppercase text-white/50">Competidor</p>
            <p className="font-bold uppercase text-white">{apelido}</p>
          </div>

          <Link
            href="/perfil"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-sm font-black uppercase text-[#f4c11a] hover:bg-[#001131] hover:text-white"
          >
            Perfil
          </Link>

          <Link
            href="/minhas-inscricoes"
            onClick={() => setIsOpen(false)}
            className="block border-t border-[#394c7d] px-4 py-3 text-sm font-black uppercase text-[#f4c11a] hover:bg-[#001131] hover:text-white"
          >
            Minhas inscrições
          </Link>

          <form action={logoutFunction} className="border-t border-[#394c7d]">
            <button
              type="submit"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-3 text-left text-sm font-black uppercase text-[#f4c11a] hover:bg-[#001131] hover:text-white"
            >
              Sair
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
