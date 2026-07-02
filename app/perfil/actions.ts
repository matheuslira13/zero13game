"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type PerfilState = {
  error: string;
  success: string;
};

const MAX_PHOTO_SIZE_IN_BYTES = 1 * 1024 * 1024;

function createStorageSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadAvatar(
  userId: string,
  apelido: string,
  foto: File,
): Promise<{ error: string; publicUrl: string; path: string }> {
  const supabase = await createClient();
  const extensao = foto.name.split(".").pop()?.toLowerCase() ?? "webp";
  const nomeArquivo = createStorageSlug(apelido || userId);
  const caminhoFoto = `avatars/${userId}/${nomeArquivo}-${crypto.randomUUID()}.${extensao}`;

  const { error } = await supabase.storage
    .from("assets")
    .upload(caminhoFoto, foto, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return {
      error:
        error.message.includes("row-level security")
          ? "Nao foi possivel enviar a foto: falta aplicar a policy de Storage para assets/avatars."
          : `Nao foi possivel enviar a foto: ${error.message}`,
      publicUrl: "",
      path: "",
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("assets").getPublicUrl(caminhoFoto);

  return {
    error: "",
    publicUrl,
    path: caminhoFoto,
  };
}

function getAssetsPathFromPublicUrl(publicUrl: string | null) {
  if (!publicUrl) {
    return null;
  }

  const marker = "/storage/v1/object/public/assets/";
  const markerIndex = publicUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return decodeURIComponent(publicUrl.slice(markerIndex + marker.length));
}

export async function atualizarPerfil(
  _state: PerfilState,
  formData: FormData
): Promise<PerfilState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Entre na sua conta para editar o perfil.",
      success: "",
    };
  }

  const apelido = String(formData.get("apelido") ?? "").trim();
  const novaSenha = String(formData.get("nova_senha") ?? "");
  const confirmarSenha = String(formData.get("confirmar_senha") ?? "");
  const foto = formData.get("foto_url");

  if (!apelido) {
    return {
      error: "Informe um apelido.",
      success: "",
    };
  }

  if (novaSenha || confirmarSenha) {
    if (novaSenha.length <= 6) {
      return {
        error: "A nova senha precisa ter mais do que 6 caracteres.",
        success: "",
      };
    }

    if (novaSenha !== confirmarSenha) {
      return {
        error: "A confirmacao precisa ser igual a nova senha.",
        success: "",
      };
    }
  }

  const { data: perfilAtual, error: perfilAtualError } = await supabase
    .from("competidores")
    .select("apelido,foto_url")
    .eq("id", user.id)
    .maybeSingle();

  if (perfilAtualError || !perfilAtual) {
    return {
      error: "Nao foi possivel recuperar o perfil atual antes de salvar.",
      success: "",
    };
  }

  let fotoUrl: string | null | undefined;
  let novaFotoPath: string | null = null;

  if (foto instanceof File && foto.size > 0) {
    if (foto.size > MAX_PHOTO_SIZE_IN_BYTES) {
      return {
        error: "A foto precisa ter no maximo 1 MB.",
        success: "",
      };
    }

    const upload = await uploadAvatar(user.id, apelido, foto);

    if (upload.error) {
      return {
        error: upload.error,
        success: "",
      };
    }

    fotoUrl = upload.publicUrl;
    novaFotoPath = upload.path;
  }

  const updateData: {
    apelido: string;
    foto_url?: string | null;
  } = {
    apelido,
  };

  if (fotoUrl !== undefined) {
    updateData.foto_url = fotoUrl;
  }

  const { error } = await supabase
    .from("competidores")
    .update(updateData)
    .eq("id", user.id);

  if (error) {
    if (novaFotoPath) {
      await supabase.storage.from("assets").remove([novaFotoPath]);
    }

    return {
      error: `Nao foi possivel salvar o perfil: ${error.message}`,
      success: "",
    };
  }

  if (novaSenha || confirmarSenha) {
    const { error: senhaError } = await supabase.auth.updateUser({
      password: novaSenha,
    });

    if (senhaError) {
      const rollbackData: {
        apelido: string;
        foto_url: string | null;
      } = {
        apelido: perfilAtual.apelido,
        foto_url: perfilAtual.foto_url,
      };

      await supabase
        .from("competidores")
        .update(rollbackData)
        .eq("id", user.id);

      if (novaFotoPath) {
        await supabase.storage.from("assets").remove([novaFotoPath]);
      }

      return {
        error: `Nenhuma alteracao foi salva. Nao foi possivel alterar a senha: ${senhaError.message}`,
        success: "",
      };
    }
  }

  const fotoAntigaPath = getAssetsPathFromPublicUrl(perfilAtual.foto_url);

  if (novaFotoPath && fotoAntigaPath) {
    await supabase.storage.from("assets").remove([fotoAntigaPath]);
  }

  revalidatePath("/");
  revalidatePath("/perfil");

  return {
    error: "",
    success: "Perfil atualizado com sucesso.",
  };
}
