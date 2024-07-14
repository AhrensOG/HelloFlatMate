import Image from "next/image";
import React from "react";

const RoomCard = ({
  img = "/home/featuredRoom.svg",
  title = "Cerca de la estación de tren",
}) => {
  return (
    <div className="w-full min-w-56 max-w-56 flex flex-col justify-center items-start gap-2">
      <div className="relative w-full">
        <Image
          src={img}
          layout="responsive"
          width={240}
          height={240}
          alt="Habitacion"
          className="object-cover object-center"
        />
      </div>
      <span className="text-sm font-light pl-1">{title}</span>
    </div>
  );
};

export default RoomCard;
