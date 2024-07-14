import React from "react";
import RoomCard from "./auxiliarComponents/RoomCard";

const FeaturedRooms = () => {
  return (
    <section
      className="p-4 py-10 space-y-2 flex flex-col justify-center items-start"
    >
      <h2 className="text-xl font-bold">Habitaciones destacadas</h2>
      <div className="flex gap-4 overflow-x-scroll w-full">
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
    </section>
  );
};

export default FeaturedRooms;
