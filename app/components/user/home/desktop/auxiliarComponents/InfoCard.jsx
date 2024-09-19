import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function InfoCard({ img, title, description }) {
  return (
    <div className="relative w-full max-w-[300px] h-[270px] bg-white border border-gray-200 rounded-lg p-4 shadow-card-action gap-2 flex flex-col">
      {/* Icono Image */}

      <Image src={img} width={50} height={50} alt={title} />

      {/* Título */}
      <h2 className="font-semibold text-[18px] leading-[24px] text-black">
        {title}
      </h2>

      {/* Descripción */}
      <div className="">
        <p className="text-sm leading-[24px] text-gray-600">{description}</p>
      </div>
    </div>
  );
}
