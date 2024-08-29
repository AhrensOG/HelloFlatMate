"use client";
import React from "react";
import PromotionRoomCard from "./auxiliarComponents/PromotionRoomCard";
import Slider from "./auxiliarComponents/Slider";

const PromotionSection = ({ data }) => {
  return (
    <section className="p-4 flex justify-center items-center">
      <div className="space-y-2 flex flex-col justify-center items-start max-w-screen-sm w-full">
        <h2 className="text-xl font-bold">Promociones</h2>
        <Slider>
          {data.map((item, index) => {
            return (
              <div className="mr-4">
                <PromotionRoomCard
                  key={index}
                  img={item?.images[0]}
                  id={item.id}
                  offer={item.offer}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default PromotionSection;
