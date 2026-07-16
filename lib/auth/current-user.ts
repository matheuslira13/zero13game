import type { UserData } from "@/mobx/store";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentCompetidor(): Promise<UserData | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: competidor, error: competidorError } = await supabase
    .from("competidores")
    .select("id, nome, apelido, foto_url")
    .eq("id", user.id)
    .maybeSingle();

  if (competidorError || !competidor) {
    return null;
  }

  return competidor;
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/");
}
