"use client";

import { useState } from "react";

const MIN_PASSWORD_LENGTH = 7;

export function NovaSenhaForm() {
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  const senhaTemTamanhoMinimo = senha.length >= MIN_PASSWORD_LENGTH;
  const senhasConferem =
    confirmacaoSenha.length > 0 && senha === confirmacaoSenha;
  const formularioValido = senhaTemTamanhoMinimo && senhasConferem;

  return (
    <form className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Nova senha
        </label>

        <input
          name="senha"
          type="password"
          placeholder="Digite sua nova senha"
          required
          minLength={MIN_PASSWORD_LENGTH}
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          aria-describedby="senha-observacao"
          aria-invalid={senha.length > 0 && !senhaTemTamanhoMinimo}
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />

        <p
          id="senha-observacao"
          className={`text-xs uppercase ${
            senha.length > 0 && !senhaTemTamanhoMinimo
              ? "text-red-200"
              : "text-white/60"
          }`}
        >
          A senha precisa ter mais do que 6 caracteres.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold uppercase text-[#f4c11a]">
          Confirmar senha
        </label>

        <input
          name="confirmacao_senha"
          type="password"
          placeholder="Digite a senha novamente"
          required
          minLength={MIN_PASSWORD_LENGTH}
          value={confirmacaoSenha}
          onChange={(event) => setConfirmacaoSenha(event.target.value)}
          aria-describedby="confirmacao-senha-observacao"
          aria-invalid={confirmacaoSenha.length > 0 && !senhasConferem}
          className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
        />

        <p
          id="confirmacao-senha-observacao"
          className={`text-xs uppercase ${
            confirmacaoSenha.length > 0 && !senhasConferem
              ? "text-red-200"
              : "text-white/60"
          }`}
        >
          Digite a mesma senha nos dois campos.
        </p>
      </div>

      <button
        type="submit"
        disabled={!formularioValido}
        className="mt-4 bg-[#f4c11a] px-6 py-3 font-black uppercase text-[#001131] transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Salvar nova senha
      </button>
    </form>
  );
}
