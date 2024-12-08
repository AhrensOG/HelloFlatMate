"use client";
import React, { Suspense, useEffect, useState } from "react";
import FeaturedRoomCard from "./auxiliarComponents/FeaturedRoomCard";
import Slider from "./auxiliarComponents/Slider";

const FeaturedSection = ({ data }) => {
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
                            // Si la categoría es "HELLO_ROOM" o "HELLO_COLIVING", mostrar las tarjetas de las habitaciones
                            if (item.category.name === "HELLO_ROOM" || item.category.name === "HELLO_COLIVING") {
                                return item.rooms
                                    .filter((room) => room.status === "FREE") // Filtrar habitaciones con status 'FREE'
                                    .map((room) => (
                                        <div className="mr-4" key={room.id}>
                                            <FeaturedRoomCard roomId={room.id} propertyId={item.id} img={room?.images[0]} title={room.name} />
                                        </div>
                                    ));
                            }
                            return (
                                <div className="mr-4" key={item.id}>
                                    <FeaturedRoomCard propertyId={item.id} img={item?.images[0]} title={item.name} />
                                </div>
                            );
                        })}
                    </Slider>
                ) : (
                    <div className="flex flex-col items-center justify-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedSection;
