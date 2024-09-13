import Image from "next/image";
import Link from "next/link";
import React from "react";

const PromotionRoomCard = ({
  img = "/home/featuredRoom.svg",
  offer,
  roomId,
  propertyId,
}) => {
  // Condicional para definir la ruta de redirección
  const href = roomId
    ? `/pages/user/property-details/${propertyId}/room-details/${roomId}`
    : `/pages/user/property-details/${propertyId}`;

  return (
    <div className="w-full min-w-28 max-w-28 flex flex-col justify-center items-start gap-2">
      <Link href={href} className="w-full">
        <div className="relative w-full">
          <div className="relative w-28 h-28" />
          <Image
            src={img}
            fill
            alt="Habitacion"
            className="object-cover object-center rounded-md"
          />
        </div>
        <span className="text-xs font-medium pl-1">{`${offer}% de descuento en tu primera reserva`}</span>
      </Link>
    </div>
  );
};

export default PromotionRoomCard;
