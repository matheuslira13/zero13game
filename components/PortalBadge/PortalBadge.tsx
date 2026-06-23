export const PortalBadge = () => {
  return (
    <div
      className=" flex bg-[#f4c11a]  px-2 py-1"
      style={{
        width: "fit-content",
        clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
      }}
    >
      <span className="block text-[#1a2a78]">Seu Portal de</span>
    </div>
  );
};
