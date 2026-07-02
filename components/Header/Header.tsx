import Link from "next/link";
import Image from "next/image";
import { optionsNav } from "./optionsNav";
import { Button } from "../Button/Button";
import { getCurrentCompetidor } from "@/lib/auth/current-user";
import { MobileMenu } from "./MobileMenu";
import { ProfileDropdown } from "./ProfileDropdown";

export const Header = async () => {
  const competidor = await getCurrentCompetidor();

  return (
    <header className="fixed z-50 flex w-full items-center justify-between bg-black/50 px-4 py-2">
      <Link href="/" aria-label="Voltar para a home">
        <Image src="/logo.png" alt="Zero13GameClub" width={100} height={32} />
      </Link>

      <nav className="hidden min-[501px]:block">
        <ul className="flex items-center gap-4">
          {optionsNav.map((option) => (
            <li key={option.href}>
              <Link
                href={option.href}
                className="text-white hover:text-[#f4c11a]"
              >
                {option.name}
              </Link>
            </li>
          ))}

          {competidor ? (
            <>
              <span className="font-bold text-white">
                Olá, {competidor.apelido}
              </span>

              <ProfileDropdown
                apelido={competidor.apelido}
                fotoUrl={competidor.foto_url}
              />
            </>
          ) : (
            <>
              <Button href="/login" type="primary">
                Entrar
              </Button>

              <Button href="/criar-conta" type="secondary">
                Criar Conta
              </Button>
            </>
          )}
        </ul>
      </nav>

      <MobileMenu competidor={competidor} />
    </header>
  );
};
