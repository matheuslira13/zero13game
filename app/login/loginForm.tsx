"use client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { loginFunction, LoginStateType } from "./actions";
import { useNotificationStore } from "@/zustand/store";

export const LoginForm = () => {
  const initialState: LoginStateType = {
    error: "",
    success: "",
  };
  const [state, formAction, pending] = useActionState(
    loginFunction,
    initialState
  );
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  useEffect(() => {
    if (state.error) {
      showNotification({
        message: state.error,
        type: "error",
      });
    }

    if (state.success) {
      showNotification({
        message: state.success,
        type: "success",
      });
    }
  }, [showNotification, state.error, state.success]);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          E-mail
        </label>

        <input
          name="email"
          type="email"
          placeholder="seu@email.com"
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Senha
        </label>

        <input
          name="senha"
          type="password"
          placeholder="Sua senha"
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
      </div>

      <div className="flex justify-end">
        <Link
          href="/esqueceu-senha"
          className="text-sm font-bold uppercase text-[#f4c11a] hover:text-white"
        >
          Esqueci a senha
        </Link>
      </div>

      <button
        type="submit"
        className="mt-4 bg-[#f4c11a] px-6 py-3 font-black uppercase text-[#001131] transition hover:brightness-90"
      >
        Entrar
      </button>
    </form>
  );
};
