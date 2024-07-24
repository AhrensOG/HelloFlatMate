import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedRoomCard = React.forwardRef(
  (
    { img = "/home/featuredRoom.svg", title = "Cerca de la estación de tren" },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="cursor-pointer w-full min-w-56 max-w-56 flex flex-col justify-center items-start gap-2"
      >
        <Link href={'/pages/property-details'} className="w-full">
          <div className="relative w-full">
            <div className="absolute w-56 h-56" />
            <Image
              src={img}
              layout="responsive"
              width={240}
              height={240}
              alt="Habitacion"
              className="object-cover object-center"
            />
          </div>
          <span className="text-sm font-medium pl-1">{title}</span>
        </Link>
      </div>
    );
  }
);

export default FeaturedRoomCard;
