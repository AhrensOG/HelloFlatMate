import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedRoomCard = React.forwardRef(
  (
    {
      img = "/home/featuredRoom.svg",
      title = "Cerca de la estación de tren",
      id,
      item,
      type,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="cursor-pointer w-full flex flex-col justify-center items-start gap-2"
      >
        <Link
          href={
            type === "room"
              ? `/pages/user/property-details/${item.propertyId}//room-details/${item.id}`
              : `/pages/user/property-details/${id}`
          }
          className="w-full"
        >
          <div className="relative w-full">
            <div className="relative w-56 h-48" />
            <Image
              src={img}
              fill
              alt="Habitacion"
              className="object-cover object-center rounded-md"
            />
          </div>
          <span className="text-sm font-medium pl-1">{title}</span>
        </Link>
      </div>
    );
  }
);

export default FeaturedRoomCard;
