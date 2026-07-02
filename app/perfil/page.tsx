import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PerfilForm } from "./PerfilForm";

const PerfilPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: competidor } = await supabase
    .from("competidores")
    .select("id,nome,apelido,foto_url")
    .eq("id", user.id)
    .maybeSingle();

  if (!competidor) {
    redirect("/criar-conta");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#000a24] bg-[url('/bgBanner.png')] bg-cover bg-center px-4 py-10">
      <div className="w-full max-w-[480px] border border-[#394c7d] bg-[#000a24]/70 p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Zero13GameClub"
              width={160}
              height={60}
            />
          </Link>
        </div>

        <h1 className="mt-4 text-center text-3xl font-black uppercase text-white">
          Perfil
        </h1>

        <p className="mt-2 text-center text-sm uppercase text-white/70">
          Altere seus dados e salve quando estiver tudo certo
        </p>

        <PerfilForm
          apelido={competidor.apelido}
          fotoUrl={competidor.foto_url}
        />
      </div>
    </main>
  );
};

export default PerfilPage;
