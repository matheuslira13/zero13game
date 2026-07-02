import Image from "next/image";
import Link from "next/link";

const EsqueceuSenhaPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#000a24] bg-[url('/bgBanner.png')] bg-cover bg-center px-4">
      <div className="w-full max-w-[420px] border border-[#394c7d] bg-[#000a24]/70 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 flex justify-center">
          <Image src="/logo.png" alt="Zero13GameClub" width={160} height={60} />
        </div>

        <h1 className="text-center text-3xl font-black uppercase text-white">
          Recuperar senha
        </h1>

        <p className="mt-2 text-center text-sm uppercase text-white/70">
          Informe seu e-mail para receber as instrucoes de acesso
        </p>

        <form className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase text-[#f4c11a]">
              E-mail
            </label>

            <input
              name="email"
              type="email"
              inputMode="email"
              placeholder="seu@email.com"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Digite um e-mail valido, como nome@email.com"
              className="border border-[#394c7d] bg-[#001131] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#f4c11a]"
            />

            <p className="text-xs uppercase text-white/60">
              Digite o mesmo e-mail usado no cadastro.
            </p>
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#f4c11a] px-6 py-3 font-black uppercase text-[#001131] transition hover:brightness-90"
          >
            Enviar instrucoes
          </button>
        </form>

        <div className="mt-6 border-t border-[#394c7d] pt-6 text-center">
          <p className="text-sm uppercase text-white/70">
            Lembrou sua senha?
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

export default EsqueceuSenhaPage;
