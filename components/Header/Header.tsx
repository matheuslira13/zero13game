import Link from "next/link";
import Image from "next/image";
import { optionsNav } from "./optionsNav";
import { Button } from "../Button/Button";

export const Header = async () => {
  return (
    <header className="items-center justify-around flex  w-full ">
      <Image src="/logo.png" alt="Zero13GameClub" width={100} height={32} />
      <nav>
        <ul className="flex flex-row items-center space-x-4">
          <>
            {optionsNav.map((option) => (
              <li key={option.href}>
                <Link href={option.href}>{option.name}</Link>
              </li>
            ))}
            <Button href="/entra" type="primary">
              Entrar
            </Button>
            <Button href="/criar-rota" type="secondary">
              Criar Rota
            </Button>
          </>
        </ul>
      </nav>
    </header>
  );
};
