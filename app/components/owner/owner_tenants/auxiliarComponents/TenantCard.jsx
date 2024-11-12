import Image from "next/image";
import Link from "next/link";
import React from "react";

const TenantCard = ({
  name = "Briana González",
  location = "Villa Edén",
  action,
  image = false,
}) => {
  return (
    <div className="w-full p-2 rounded-lg flex justify-between items-center gap-2 shadow-profile shadow-black/40 border-2">
      <div className="w-full flex justify-start items-center gap-4">
        <div className="h-16 w-16 min-w-16 rounded-full relative">
          <Image
            className="rounded-full"
            src={image || "/profile/profile.png"}
            fill
            alt="Ilustracion de perfil"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <div>
          <h1 className="font-bold text-base">{name}</h1>
          <span>{location}</span>
        </div>
      </div>
      <div className="w-full max-w-20 flex flex-col justify-between items-center gap-2">
        <button
          onClick={action}
          className="bg-resolution-blue border border-resolution-blue text-sm text-white font-light w-full p-1 rounded-lg"
        >
          Detalles
        </button>
      </div>
    </div>
  );
};

export default TenantCard;
