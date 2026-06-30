import Image from "next/image";
import { Button } from "../Button/Button";

export const Footer = () => {
  return (
    <footer className="flex px-1.5 justify-center items-center gap-8 w-full h-36 bg-[url('/footer.png')] bg-cover bg-center bg-no-repeat">
      <div className="hidden min-[501px]:block">
        <Image src="/logo.png" alt="Zero13GameClub" width={100} height={64} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg md:text-3xl text-amber-50">
          faça parte do <span className="text-[#f4c11a]">Zero13gameclub</span>
        </h1>
        <p className="text-amber-50 text-xs md:text-3xl">
          Crie sua conta e participe de torneios com a zero13gameclub
        </p>
      </div>
      <Button type="secondary" icons="profile" href="/criar-conta">
        <p className="text-xs min-[501px]:text-lg">criar conta gratuita</p>
      </Button>
    </footer>
  );
};
