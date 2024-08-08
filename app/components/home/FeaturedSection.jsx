"use client";
import React, { Suspense, useEffect, useState } from "react";
import FeaturedRoomCard from "./auxiliarComponents/FeaturedRoomCard";
import Slider from "./auxiliarComponents/Slider";

const FeaturedSection = ({ data }) => {
  console.log(data);

  const [properties, setProperties] = useState(null);

  useEffect(() => {
    setProperties([...data]);
  }, [data]);

  return (
    <section className="p-4 pt-10 flex justify-center items-center">
      <div className="flex flex-col justify-center items-start space-y-2 max-w-screen-sm w-full">
        <h2 className="text-xl font-bold">Habitaciones destacadas</h2>
        {properties ? (
          <Slider>
            {properties.map((item) => {
              return (
                <div className="mr-4">
                  <FeaturedRoomCard
                    key={item.id}
                    id={item.id}
                    img={item.images[0]}
                    title={item.name}
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
