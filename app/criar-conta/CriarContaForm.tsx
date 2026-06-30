"use client";

import { useActionState, useEffect, useState } from "react";
import { criarConta, type CriarContaState } from "./actions";
import { maskPhone } from "@/util/mask/phone";
import { useNotificationStore } from "@/zustand/store";

const initialState: CriarContaState = {
  error: "",
  success: "",
};

const MAX_PHOTO_SIZE_IN_BYTES = 1 * 1024 * 1024;
const MAX_PHOTO_SIZE_LABEL = "1 MB";

export const CriarContaForm = () => {
  const [state, formAction, pending] = useActionState(criarConta, initialState);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [apelido, setApelido] = useState("");
  const [fotoError, setFotoError] = useState("");
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  const emailValido = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formularioValido =
    nome.trim() !== "" &&
    senha.length >= 6 &&
    email.trim() !== "" &&
    emailValido &&
    apelido.trim() !== "" &&
    !fotoError;

  function handleFotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setFotoError("");
      return;
    }

    if (file.size > MAX_PHOTO_SIZE_IN_BYTES) {
      const message = `A foto precisa ter no maximo ${MAX_PHOTO_SIZE_LABEL}. Escolha uma imagem menor.`;

      setFotoError(message);
      event.target.value = "";
      showNotification({
        message,
        type: "error",
      });
      return;
    }

    setFotoError("");
  }

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
    <form action={formAction} className="mt-2 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Nome
        </label>
        <input
          name="nome"
          type="text"
          placeholder="Seu nome"
          required
          value={nome}
          onChange={(event) => setNome(event.target.value)}
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
          placeholder="Crie uma senha"
          required
          minLength={6}
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          aria-describedby="senha-observacao"
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
        <p id="senha-observacao" className="text-xs uppercase text-white/60">
          A senha precisa ter mais do que 6 caracteres.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Telefone
        </label>
        <input
          name="telefone"
          type="tel"
          inputMode="numeric"
          placeholder="(13) 99999-9999"
          value={telefone}
          onChange={(event) => setTelefone(maskPhone(event.target.value))}
          maxLength={15}
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          E-mail
        </label>
        <input
          name="email"
          type="email"
          inputMode="email"
          placeholder="seu@email.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          title="Digite um e-mail valido, como nome@email.com"
          aria-describedby="email-observacao"
          aria-invalid={!emailValido}
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
        <p
          id="email-observacao"
          className={`text-xs uppercase ${
            emailValido ? "text-white/60" : "text-red-200"
          }`}
        >
          Digite um e-mail valido, como nome@email.com.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Apelido
        </label>
        <input
          name="apelido"
          type="text"
          placeholder="Seu nick nos campeonatos"
          required
          value={apelido}
          onChange={(event) => setApelido(event.target.value)}
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Foto
        </label>
        <input
          name="foto_url"
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          aria-describedby="foto-observacao"
          aria-invalid={!!fotoError}
          className="cursor-pointer border border-[#394c7d] bg-[#001131] px-4 py-3 text-sm text-white file:mr-4 file:border-0 file:bg-[#f4c11a] file:px-4 file:py-2 file:font-black file:uppercase file:text-[#001131]"
        />
        <p
          id="foto-observacao"
          className={`text-xs uppercase ${
            fotoError ? "text-red-200" : "text-white/60"
          }`}
        >
          {fotoError || `A foto precisa ter no maximo ${MAX_PHOTO_SIZE_LABEL}.`}
        </p>
      </div>

      {state.error ? (
        <p className="border border-red-500/50 bg-red-500/15 px-4 py-3 text-sm font-bold text-red-100">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="border border-emerald-500/50 bg-emerald-500/15 px-4 py-3 text-sm font-bold text-emerald-100">
          {state.success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || !formularioValido}
        className="mt-4 bg-[#f4c11a] px-6 py-3 font-black uppercase text-[#001131] transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Criando conta..." : "Criar conta gratuita"}
      </button>
    </form>
  );
};
