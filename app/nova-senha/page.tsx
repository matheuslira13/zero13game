import Image from "next/image";
import Link from "next/link";
import { NovaSenhaForm } from "./NovaSenhaForm";

const NovaSenhaPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#000a24] bg-[url('/bgBanner.png')] bg-cover bg-center px-4">
      <div className="w-full max-w-[420px] border border-[#394c7d] bg-[#000a24]/70 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 flex justify-center">
          <Image src="/logo.png" alt="Zero13GameClub" width={160} height={60} />
        </div>

        <h1 className="text-center text-3xl font-black uppercase text-white">
          Nova senha
        </h1>

        <p className="mt-2 text-center text-sm uppercase text-white/70">
          Crie uma nova senha para voltar a acessar sua conta
        </p>

        <NovaSenhaForm />

        <div className="mt-6 border-t border-[#394c7d] pt-6 text-center">
          <p className="text-sm uppercase text-white/70">
            Ja redefiniu sua senha?
          </p>

          <Link
            href="/login"
            className="mt-2 inline-block font-black uppercase text-[#f4c11a] hover:text-white"
          >
            Voltar para login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NovaSenhaPage;
