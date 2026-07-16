"use client";

import { logoutFunction, type LogoutStateType } from "@/app/login/actions";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "../Avatar/Avatar";
import { userDataStore } from "@/mobx/store";

type ProfileDropdownProps = {
  apelido: string;
  fotoUrl: string | null;
};

const initialLogoutState: LogoutStateType = {
  error: "",
  success: "",
};

export function ProfileDropdown({ apelido, fotoUrl }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [logoutState, logoutAction, logoutPending] = useActionState(
    logoutFunction,
    initialLogoutState,
  );

  useEffect(() => {
    if (!logoutState.success) {
      return;
    }

    userDataStore.clearUserInfo();
    router.replace("/");
    router.refresh();
  }, [logoutState.success, router]);

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

          <form action={logoutAction} className="border-t border-[#394c7d]">
            <button
              type="submit"
              disabled={logoutPending}
              className="block w-full px-4 py-3 text-left text-sm font-black uppercase text-[#f4c11a] hover:bg-[#001131] hover:text-white"
            >
              {logoutPending ? "Saindo..." : "Sair"}
            </button>

            {logoutState.error ? (
              <p className="px-4 pb-3 text-xs font-bold text-red-300">
                {logoutState.error}
              </p>
            ) : null}
          </form>
        </div>
      ) : null}
    </div>
  );
}
