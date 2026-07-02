"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function inscreverEmCampeonato(formData: FormData) {
  const campeonatoId = String(formData.get("campeonato_id") ?? "").trim();

  if (!campeonatoId) {
    return;
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: competidor } = await supabase
    .from("competidores")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!competidor) {
    redirect("/criar-conta");
  }

  const { data: campeonato } = await supabase
    .from("campeonatos")
    .select("id,tipo,status,numero_maximo_participantes")
    .eq("id", campeonatoId)
    .maybeSingle();

  if (
    !campeonato ||
    campeonato.tipo !== "aberto" ||
    campeonato.status !== "disponivel"
  ) {
    revalidatePath(`/campeonatos/${campeonatoId}`);
    return;
  }

  const { count: totalInscritos } = await supabase
    .from("inscricoes")
    .select("id", { count: "exact", head: true })
    .eq("campeonato_id", campeonatoId);

  if ((totalInscritos ?? 0) >= campeonato.numero_maximo_participantes) {
    revalidatePath(`/campeonatos/${campeonatoId}`);
    return;
  }

  await supabase.from("inscricoes").upsert(
    {
      campeonato_id: campeonatoId,
      competidor_id: competidor.id,
    },
    {
      onConflict: "campeonato_id,competidor_id",
      ignoreDuplicates: true,
    },
  );

  revalidatePath("/campeonatos");
  revalidatePath(`/campeonatos/${campeonatoId}`);
}
