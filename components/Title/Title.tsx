import Image from "next/image";
import mark from "../../assests/TitleYellow.png";

type TitleProps = {
  title: string;
  color?: string;
};

export const Title = ({ title, color = "#f4c11a" }: TitleProps) => {
  return (
    <div className="flex items-end w-full">
      <Image src={mark} alt="Title" width={40} height={30} />
      <h1 className="text-2xl md:text-4xl" style={{ color }}>
        {title}
      </h1>
    </div>
  );
};
