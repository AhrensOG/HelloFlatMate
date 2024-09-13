"use client";
import React, { useEffect, useState } from "react";
import PromotionRoomCard from "./auxiliarComponents/PromotionRoomCard";
import Slider from "./auxiliarComponents/Slider";

const PromotionSection = ({ data }) => {
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    if (data) {
      setProperties([...data]); // Almacenar la data en el estado
    }
  }, [data]);

  return (
    <section className="p-4 flex justify-center items-center">
      <div className="space-y-2 flex flex-col justify-center items-start max-w-screen-sm w-full">
        <h2 className="text-xl font-bold">Promociones</h2>
        {properties ? (
          <Slider>
            {properties.map((item) => {
              // Si la categoría es "HELLO_ROOM" o "HELLO_COLIVING", mostrar las tarjetas de las habitaciones
              if (
                item.category === "HELLO_ROOM" ||
                item.category === "HELLO_COLIVING"
              ) {
                return item.rooms
                  .filter((room) => room.status === "FREE") // Filtrar habitaciones con status 'FREE'
                  .map((room) => (
                    <div className="mr-4" key={room.id}>
                      <PromotionRoomCard
                        roomId={room.id}
                        propertyId={item.id}
                        img={room?.images[0]}
                        title={room.name}
                        offer={item.offer}
                      />
                    </div>
                  ));
              }
              return (
                <div className="mr-4" key={item.id}>
                  <PromotionRoomCard
                    propertyId={item.id}
                    img={item?.images[0]}
                    title={item.name}
                    offer={item.offer}
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              Loading...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromotionSection;
