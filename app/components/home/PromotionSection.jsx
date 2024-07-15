"use client";
import React from "react";
import PromotionRoomCard from "./auxiliarComponents/PromotionRoomCard";
import Slider from "./auxiliarComponents/Slider";

const PromotionSection = () => {
  return (
    <section className="p-4 flex justify-center items-center">
      <div className="space-y-2 flex flex-col justify-center items-start max-w-screen-sm w-full">
        <h2 className="text-xl font-bold">Promociones</h2>
        <Slider>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => {
            return (
              <div className="mr-4">
                <PromotionRoomCard key={e} />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default PromotionSection;
