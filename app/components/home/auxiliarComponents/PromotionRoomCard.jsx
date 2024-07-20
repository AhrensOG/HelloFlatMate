import Image from "next/image";
import React from "react";

const PromotionRoomCard = ({
  img = "/home/featuredRoom.svg",
  title = "10% de descuento en tu primera reserva",
}) => {
  return (
    <div className="w-full min-w-28 max-w-28 flex flex-col justify-center items-start gap-2">
      <div className="relative w-full">
        <div className="absolute w-28 h-28"/>
        <Image
          src={img}
          layout="responsive"
          width={90}
          height={90}
          alt="Habitacion"
          className="object-cover object-center"
        />
      </div>
      <span className="text-xs font-medium pl-1">{title}</span>
    </div>
  );
};

export default PromotionRoomCard;
