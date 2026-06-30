"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type LoginStateType = {
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
