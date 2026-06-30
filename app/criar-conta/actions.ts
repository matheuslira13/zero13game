"use server";

import { createClient } from "@/lib/supabase/server";

export type CriarContaState = {
  error: string;
  success: string;
};

function createStorageSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadAvatar(userId: string, apelido: string, foto: File) {
  const supabase = await createClient();
  const extensao = foto.name.split(".").pop()?.toLowerCase() ?? "webp";
  const nomeArquivo = createStorageSlug(apelido || userId);
  const caminhoFoto = `avatars/${userId}/${nomeArquivo}.${extensao}`;

  const { error } = await supabase.storage
    .from("assets")
    .upload(caminhoFoto, foto, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return {
      error:
        error.message.includes("row-level security")
          ? "Nao foi possivel enviar a foto: falta liberar policy de upload no bucket assets para a pasta avatars."
          : `Nao foi possivel enviar a foto: ${error.message}`,
      publicUrl: "",
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("assets").getPublicUrl(caminhoFoto);

  return {
    error: "",
    publicUrl,
  };
}

export async function criarConta(
  _state: CriarContaState,
  formData: FormData,
): Promise<CriarContaState> {
  const supabase = await createClient();
  const nome = String(formData.get("nome") ?? "").trim();
  const apelido = String(formData.get("apelido") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "");
  const foto = formData.get("foto_url");

  if (!nome || !apelido || !email || !senha) {
    return {
      error: "Informe nome, apelido, email e senha.",
      success: "",
    };
  }

  if (senha.length < 6) {
    return {
      error: "A senha precisa ter pelo menos 6 caracteres.",
      success: "",
    };
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password: senha,
  });

  if (signUpError) {
    return {
      error: `Nao foi possivel criar o usuario: ${signUpError.message}`,
      success: "",
    };
  }

  const user = signUpData.user;

  if (!user) {
    return {
      error: "Nao foi possivel recuperar o usuario criado.",
      success: "",
    };
  }

  let fotoUrl: string | null = null;

  if (foto instanceof File && foto.size > 0) {
    const upload = await uploadAvatar(user.id, apelido, foto);

    if (upload.error) {
      return {
        error: upload.error,
        success: "",
      };
    }

    fotoUrl = upload.publicUrl;
  }

  const { error: insertError } = await supabase.from("competidores").insert({
    id: user.id,
    nome,
    apelido,
    telefone: telefone || null,
    foto_url: fotoUrl,
  });

  if (insertError) {
    return {
      error: `Usuario criado no Auth, mas nao foi possivel criar o perfil de competidor: ${insertError.message}`,
      success: "",
    };
  }

  return {
    error: "",
    success:
      "Conta criada com sucesso. Agora voce ja pode fazer login e participar dos campeonatos.",
  };
}
