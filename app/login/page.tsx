import { Button } from "@/components";
import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./loginForm";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Entre na sua conta Zero13GameClub para se inscrever em campeonatos gamer e acompanhar sua participação.",
  alternates: {
    canonical: "/login",
  },
};

const LoginPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: competidor } = user
    ? await supabase
        .from("competidores")
        .select("id, nome, apelido, foto_url")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#000a24] bg-[url('/bgBanner.png')] bg-cover bg-center px-4">
      <div className="w-full max-w-[420px] border border-[#394c7d] bg-[#000a24]/70 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 flex justify-center">
          <Image src="/logo.png" alt="Zero13GameClub" width={160} height={60} />
        </div>

        <h1 className="text-center text-3xl font-black uppercase text-white">
          Entrar na conta
        </h1>

        <p className="mt-2 text-center text-sm uppercase text-white/70">
          Acesse sua conta e participe dos campeonatos
        </p>

        <LoginForm />

        <div className=" flex items-center justify-center gap-8 mt-6 border-t border-[#394c7d] pt-6 text-center">
          <p className="text-sm uppercase text-white/70">
            Ainda não tem conta?
          </p>

          <Button href="/criar-conta" type="primary">
            Criar conta gratuita
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
