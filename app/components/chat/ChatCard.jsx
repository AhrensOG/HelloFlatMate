import Image from "next/image";

export default function ChatCard({ name, image }) {
  return (
    <article className="flex justify-between items-center gap-1 h-[5rem] p-1">
      <div className="relative w-[4.4rem] h-[4.4rem] rounded-full">
        <Image
          className="rounded-full"
          src={image}
          fill
          alt="Ilustracion de chat"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="font-normal text-xs text-[#919191]">
          Mensaje del grupo de la habitacion
        </p>
      </div>
      <div className="flex flex-col h-full justify-between">
        <span className="h-5 w-5 rounded-full text-white font-normal text-xs bg-[#FF0000] flex justify-center items-center">
          1
        </span>
        <p className="font-normal text-xs text-[#919191]">14:05</p>
      </div>
    </article>
  );
}
