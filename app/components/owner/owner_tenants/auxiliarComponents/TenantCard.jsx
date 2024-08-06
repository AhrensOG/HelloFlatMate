import Image from "next/image";
import React from "react";

const TenantCard = ({
  name = "Briana González",
  location = "Villa Edén",
  action,
  image = "/profile/profile.jfif",
}) => {
  return (
    <div className="w-full p-2 rounded-lg flex justify-between items-center gap-2 shadow-profile shadow-black/40">
      <div className="h-16 w-16 min-w-16 rounded-full relative bg-[#875252]">
        <Image
          className="rounded-full"
          src={image}
          fill
          alt="Ilustracion de perfil"
          objectPosition="top"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <h1 className="font-bold text-base">{name}</h1>
        <span>{location}</span>
      </div>
      <div className="w-full max-w-20 flex flex-col justify-between items-center gap-2">
        <button className="bg-resolution-blue border border-resolution-blue text-sm text-white font-light w-full p-1 rounded-lg">
          Detalles
        </button>
        <button className="bg-white border border-resolution-blue text-sm text-black font-light w-full p-1 rounded-lg">
          Contactar
        </button>
      </div>
    </div>
  );
};

export default TenantCard;
