import { createClient } from "../supabase/server";

export async function getCurrentCompetidor() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: competidor } = await supabase
    .from("competidores")
    .select("id, nome, apelido, foto_url")
    .eq("id", user.id)
    .maybeSingle();

  return competidor;
}
