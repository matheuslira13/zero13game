"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useNotificationStore } from "@/zustand/store";
import { atualizarPerfil, type PerfilState } from "./actions";
import Link from "next/link";

type PerfilFormProps = {
  apelido: string;
  fotoUrl: string | null;
};

const initialState: PerfilState = {
  error: "",
  success: "",
};
const MAX_PHOTO_SIZE_IN_BYTES = 1 * 1024 * 1024;

export function PerfilForm({ apelido, fotoUrl }: PerfilFormProps) {
  const [state, formAction, pending] = useActionState(
    atualizarPerfil,
    initialState
  );
  const [novoApelido, setNovoApelido] = useState(apelido);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoError, setFotoError] = useState("");
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const senhaFoiPreenchida = novaSenha.length > 0 || confirmarSenha.length > 0;
  const senhaValida = !senhaFoiPreenchida || novaSenha.length > 6;
  const confirmacaoValida = !senhaFoiPreenchida || novaSenha === confirmarSenha;
  const formularioValido =
    novoApelido.trim() !== "" && senhaValida && confirmacaoValida && !fotoError;

  useEffect(() => {
    if (state.error) {
      showNotification({ message: state.error, type: "error" });
    }

    if (state.success) {
      showNotification({ message: state.success, type: "success" });
    }
  }, [showNotification, state.error, state.success]);

  function handleFotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setFotoError("");
      return;
    }

    if (file.size > MAX_PHOTO_SIZE_IN_BYTES) {
      const message = "A foto precisa ter no maximo 1 MB.";

      setFotoError(message);
      event.target.value = "";
      showNotification({ message, type: "error" });
      return;
    }

    setFotoError("");
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <div className="flex items-center gap-4 border border-[#394c7d] bg-black/30 p-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#001131]">
          {fotoUrl ? (
            <Image src={fotoUrl} alt={apelido} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-black text-white">
              {apelido.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs uppercase text-white/60">Perfil atual</p>
          <p className="font-black uppercase text-white">{apelido}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Apelido
        </label>
        <input
          name="apelido"
          type="text"
          value={novoApelido}
          onChange={(event) => setNovoApelido(event.target.value)}
          required
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Nova imagem
        </label>
        <input
          name="foto_url"
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          className="cursor-pointer border border-[#394c7d] bg-[#001131] px-4 py-3 text-sm text-white file:mr-4 file:border-0 file:bg-[#f4c11a] file:px-4 file:py-2 file:font-black file:uppercase file:text-[#001131]"
        />
        <p
          className={`text-xs uppercase ${
            fotoError ? "text-red-200" : "text-white/60"
          }`}
        >
          {fotoError || "A foto precisa ter no maximo 1 MB."}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Nova senha
        </label>
        <input
          name="nova_senha"
          type="password"
          value={novaSenha}
          onChange={(event) => setNovaSenha(event.target.value)}
          placeholder="Preencha apenas se quiser trocar"
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
        <p
          className={`text-xs uppercase ${
            senhaValida ? "text-white/60" : "text-red-200"
          }`}
        >
          A nova senha precisa ter mais do que 6 caracteres.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Confirmar nova senha
        </label>
        <input
          name="confirmar_senha"
          type="password"
          value={confirmarSenha}
          onChange={(event) => setConfirmarSenha(event.target.value)}
          placeholder="Digite a nova senha novamente"
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
        <p
          className={`text-xs uppercase ${
            confirmacaoValida ? "text-white/60" : "text-red-200"
          }`}
        >
          A confirmacao precisa ser igual a nova senha.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending || !formularioValido}
        className="mt-4 bg-[#f4c11a] px-6 py-3 font-black uppercase text-[#001131] transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Salvando..." : "Salvar mudanças"}
      </button>
      <Link
        href="/"
        className="text-center mt-4 border border-[#FFFFFF] text-[#FFFFFF] px-6 py-3 font-black uppercase transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Pagina incial
      </Link>
    </form>
  );
}
