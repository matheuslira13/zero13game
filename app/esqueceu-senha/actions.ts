"use server";

import { createClient } from "@/lib/supabase/server";

export type ResetPasswordState = {
  error: string;
  success: string;
};

export async function resetPassword(
  formData: FormData
): Promise<ResetPasswordState> {
  const supabase = await createClient();

  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return {
      error: "Digite um email.",
      success: "",
    };
  }

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/nova-senha`,
  });

  return {
    error: "",
    success:
      "Se este email estiver cadastrado, voce recebera um link para redefinir sua senha.",
  };
}
