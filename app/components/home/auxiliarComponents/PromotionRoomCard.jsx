import Image from "next/image";
import Link from "next/link";
import React from "react";

const PromotionRoomCard = ({ img = "/home/featuredRoom.svg", offer, id }) => {
  return (
    <div className="w-full min-w-28 max-w-28 flex flex-col justify-center items-start gap-2">
      <Link href={`/pages/property-details/${id}`} className="w-full">
        <div className="relative w-full">
          <div className="absolute w-28 h-28" />
          <Image
            src={img}
            layout="responsive"
            width={90}
            height={90}
            alt="Habitacion"
            className="object-cover object-center"
          />
        </div>
        <span className="text-xs font-medium pl-1">{`${offer}% de descuento en tu primera reserva`}</span>
      </Link>
    </div>
  );
};

export default PromotionRoomCard;
