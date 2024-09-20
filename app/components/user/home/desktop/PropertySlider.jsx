import React, { useEffect, useState } from "react";
import PropertyCard from "./auxiliarComponents/PropertyCard";
import HomeSlider from "./auxiliarComponents/HomeSlider";
import SkeletonPropertyCard from "./auxiliarComponents/SkeletonPropertyCard";

const PropertySlider = ({ data }) => {
  const [properties, setProperties] = useState(null);
  const skeleton = [1, 2, 3];

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setProperties([...data]);
    }
  }, [data]);

  return (
    <section className="p-4 pt-10 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center space-y-2 max-w-screen-xl w-full">
        <h2 className="text-3xl py-10 text-center">Explora nuestras nuevas habitaciones</h2>
        {properties && properties.length > 0 ? (
          <HomeSlider>
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
                      <PropertyCard
                        roomId={room.id}
                        propertyId={item.id}
                        img={room?.images[0]}
                        title={room.name}
                      />
                    </div>
                  ));
              }
              return (
                <div className="mr-4" key={item.id}>
                  <PropertyCard
                    propertyId={item.id}
                    img={item?.images[0]}
                    title={item.name}
                  />
                </div>
              );
            })}
          </HomeSlider>
        ) : (
          <div className="flex flex-row justify-start items-center overflow-x-scroll scrollbar-none">
            {skeleton?.map((idx) => (
              <div className="mr-4" key={idx}>
                <SkeletonPropertyCard />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertySlider;
