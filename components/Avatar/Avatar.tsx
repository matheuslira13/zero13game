import * as AvatarPrimitive from "@radix-ui/react-avatar";

type AvatarProps = {
  src: string | null;
  alt: string;
  size?: number;
};

export const Avatar = ({ src, alt, size = 40 }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root
      className="inline-flex shrink-0 overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
      }}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="block h-full w-full object-cover"
        />
      ) : null}

      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center bg-zinc-700 text-white font-bold">
        {alt.substring(0, 2).toUpperCase()}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
