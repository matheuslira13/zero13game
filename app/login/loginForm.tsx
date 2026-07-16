"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { loginFunction, type LoginStateType } from "./actions";
import { messagePopUpFront } from "@/mobx/store";

const initialState: LoginStateType = {
  error: "",
  success: "",
};

export const LoginForm = () => {
  const [state, formAction, pending] = useActionState(
    loginFunction,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      messagePopUpFront.setMessageStore({
        message: state.error,
        type: "error",
      });

      return;
    }

    if (state.success) {
      messagePopUpFront.setMessageStore({
        message: state.success,
        type: "success",
      });
    }
  }, [state.error, state.success]);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-bold uppercase text-[#f4c11a]"
        >
          E-mail
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          required
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="senha"
          className="text-sm font-bold uppercase text-[#f4c11a]"
        >
          Senha
        </label>

        <input
          id="senha"
          name="senha"
          type="password"
          placeholder="Sua senha"
          required
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
        disabled={pending}
        className="mt-4 bg-[#f4c11a] px-6 py-3 font-black uppercase text-[#001131] transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};
