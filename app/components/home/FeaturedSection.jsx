"use client";
import React from "react";
import FeaturedRoomCard from "./auxiliarComponents/FeaturedRoomCard";
import Slider from "./auxiliarComponents/Slider";

const FeaturedSection = () => {
  return (
    <section className="p-4 pt-10 flex justify-center items-center">
      <div className="flex flex-col justify-center items-start space-y-2 max-w-screen-sm w-full">
        <h2 className="text-xl font-bold">Habitaciones destacadas</h2>
        <Slider>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => {
            return (
              <div className="mr-4">
                <FeaturedRoomCard key={e} />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedSection;
