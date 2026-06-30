import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  type: "primary" | "secondary";
  icons?: "profile";
};

export const Button = ({ href, children, type, icons }: ButtonLinkProps) => {
  const baseClasses = "flex font-bold px-2 rounded w-fit ";

  const typeClasses =
    type === "primary"
      ? "border  text-[#FFFFFF] hover:bg-[#1a2a78] hover:text-[#f4c11a]"
      : "bg-[#f4c11a] text-[#000a25] hover:bg-[#1a2a78] hover:text-[#f4c11a]";

  const whichIcon = {
    profile: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-user"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
  };

  return (
    <Link
      href={href}
      className={`${baseClasses} ${typeClasses} flex min-w-fit h-fit`}
    >
      {icons && whichIcon[icons]}
      {children}
    </Link>
  );
};
