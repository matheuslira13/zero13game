import Image from "next/image";
import Link from "next/link";
import { CriarContaForm } from "./CriarContaForm";

const CriarContaPage = async () => {
  return (
    <main className="py-2 flex min-h-screen items-center justify-center bg-[#000a24] bg-[url('/bgBanner.png')] bg-cover bg-center px-4">
      <div className="w-full max-w-[480px] border border-[#394c7d] bg-[#000a24]/70 p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="Zero13GameClub" width={160} height={60} />
        </div>

        <h1 className="text-center text-3xl font-black uppercase text-white">
          Criar conta
        </h1>

        <p className=" text-center text-sm uppercase text-white/70">
          Entre para a comunidade Zero13GameClub
        </p>

        <CriarContaForm />

        <div className="mt-6 border-t border-[#394c7d] pt-6 text-center">
          <p className="text-sm uppercase text-white/70">Já tem conta?</p>

          <Link
            href="/login"
            className="mt-2 inline-block font-black uppercase text-[#f4c11a] hover:text-white"
          >
            Fazer login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CriarContaPage;
