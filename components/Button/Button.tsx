import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  type: "primary" | "secondary";
};

export const Button = ({ href, children, type }: ButtonLinkProps) => {
  const baseClasses = "font-bold py-2 px-4 rounded";

  const typeClasses =
    type === "primary"
      ? "border  text-[#FFFFFF] hover:bg-[#1a2a78] hover:text-[#f4c11a]"
      : "bg-[#f4c11a] text-white hover:bg-[#1a2a78] hover:text-[#f4c11a]";

  return (
    <Link href={href} className={`${baseClasses} ${typeClasses}`}>
      {children}
    </Link>
  );
};
