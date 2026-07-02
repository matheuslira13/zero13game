"use client";

import { useState } from "react";
import Link from "next/link";
import { optionsNav } from "./optionsNav";
import { Button } from "../Button/Button";

type Competidor = {
  id: string;
  nome: string;
  apelido: string;
  foto_url: string | null;
} | null;

export function MobileMenu({ competidor }: { competidor: Competidor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="min-[501px]:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "X" : "☰"}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col bg-black border-t border-[#394c7d] min-[501px]:hidden">
          {optionsNav.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="border-b border-[#394c7d] px-4 py-4 text-white hover:bg-[#0d1d4d]"
              onClick={() => setIsOpen(false)}
            >
              {option.name}
            </Link>
          ))}

          <div className="flex flex-col gap-2 p-4">
            {competidor ? (
              <>
                <p className="font-bold text-white">
                  Olá, {competidor.apelido}
                </p>

                <Button href="/minhas-inscricoes" type="primary">
                  Minhas inscrições
                </Button>

                <Button href="/perfil" type="secondary">
                  Perfil
                </Button>
              </>
            ) : (
              <>
                <Button href="/login" type="primary">
                  Entrar
                </Button>

                <Button href="/criar-conta" type="secondary">
                  Criar conta
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
