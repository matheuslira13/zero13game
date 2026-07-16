"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type LoginStateType = {
  error: string;
  success: string;
};

export type LogoutStateType = {
  error: string;
  success: string;
};

export const loginFunction = async (
  _state: LoginStateType,
  formData: FormData
): Promise<LoginStateType> => {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "").trim();

  if (!email || !senha) {
    return {
      error: "email e senha.",
      success: "",
    };
  }
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
  if (loginError) {
    return {
      error: "Usuario ou senha invalido",
      success: "",
    };
  }
  const user = loginData.user;

  if (!user) {
    return {
      error: "Nao foi possivel recuperar o usuario criado.",
      success: "",
    };
  }
  redirect("/");
};

export const logoutFunction = async (
  _state: LogoutStateType,
  _formData: FormData,
): Promise<LogoutStateType> => {
  void _state;
  void _formData;

  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: `Nao foi possivel sair: ${error.message}`,
      success: "",
    };
  }

  revalidatePath("/", "layout");

  return {
    error: "",
    success: "Sessao encerrada.",
  };
};
