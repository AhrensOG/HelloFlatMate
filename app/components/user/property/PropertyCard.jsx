"use client";
import { plus_jakarta } from "@/font";
import Image from "next/image";
import { useState } from "react";
import Tooltip from "./tooltip/Tooltip";
import { ClockIcon } from "@heroicons/react/24/outline";
const { useRouter } = require("next/navigation");

export default function PropertyCard({
  name,
  images,
  property,
  price,
  roomId = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  console.log(property);

  const handleRedirect = () => {
    if (
      (property.category === "HELLO_ROOM" ||
        property.category === "HELLO_COLIVING") &&
      roomId
    ) {
      route.push(
        `/pages/property-details/${property.id}/room-details/${roomId}`
      );
    } else {
      route.push("/pages/property-details/" + property?.id);
    }
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <article
      className={`${plus_jakarta.className} flex flex-col max-h-96 h-full gap-3 w-full sm:max-w-72 cursor-pointer border sm:border-0 rounded-sm shadow-reservation-drop`}
    >
      <div
        onClick={handleRedirect}
        className="flex sm:flex-col gap-3 sm:gap-0 w-full h-full"
      >
        <div className="relative h-28 w-28 sm:w-72 sm:h-80 rounded-md">
          <Image
            className="h-full rounded-sm"
            src={
              images ||
              property?.property?.images[0] ||
              property?.images[0] ||
              ""
            }
            fill
            alt="Imagen de propiedad"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 items-stretch p-2 sm:py-4 sm:border sm:border-t-0 gap-2">
          <div className="flex flex-col grow sm:gap-2">
            <h4 className="flex w-full gap-2 items-center text-xs text-[#000000B2] font-normal">
              {property?.category === "HELLO_ROOM" ||
              property?.category === "HELLO_COLIVING"
                ? "HABTITACION"
                : property?.category.toLowerCase().split("_").join("")}
              {/* <button
                type="button"
                className="relative"
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
              >
                <Image
                  src={"/property-card/gray-question-icon.svg"}
                  width={17}
                  height={17}
                  alt="Más Información"
                />
                <Tooltip isOpen={isOpen} />
              </button> */}
              <ClockIcon className="size-4" />
              <span className="text-xs font-medium text-black/80">
                Disponible 01 Junio 2025
              </span>
            </h4>
            <h2 className="flex w-full gap-2 items-center text-sm text-black/80 font-medium">
              {name|| ""}
            </h2>
            <h2 className="flex w-full gap-2 items-center text-xs text-[#000000B2] font-medium">
              <span>
                <Image
                  src={"/property-card/location-icon.svg"}
                  width={18}
                  height={18}
                  alt="Icono de Ubicación"
                />
              </span>
              {property?.property
                ? property?.property?.city + ", " + property?.property?.street
                : property?.city + ", " + property?.street || ""}
            </h2>
            <p className="text-[0.68rem] text-[#828282] font-normal">
              {(property?.property?.amenities ||
                property?.amenities
                  .slice(0, 3) // Obtener solo los primeros 3 elementos
                  .map(
                    (amenity) =>
                      amenity.charAt(0).toUpperCase() + amenity.slice(1)
                  )
                  .join(", ")) +
                (property?.amenities.length > 3 ? ", ..." : "") || ""}
            </p>
          </div>
          <div className="flex flex-1 justify-end items-center gap-2">
            {/* <span className="flex items-center gap-2 self-end text-[#000000B2] font-medium">
              <Image
                className=""
                src={"/property-card/star.svg"}
                width={13}
                height={13}
                alt="Icono de Estrella"
              />{" "}
              4.9
            </span> */}
            <div className="flex justify-end items-end font-medium">
              {/* {property?.property?.offer > 0 || property?.offer > 0 ? (
                <span className="text-xs text-[#171412] h-[1.06rem] bg-[#FFF06D] px-1">
                  {property?.property?.offer || property?.offer} OFF
                </span>
              ) : null}

              {property?.price > 0 && (
                ""
              )} */}
              <h3 className="text-base text-[#000000B2]">
                € {price} <span className="text-xs text-[#B2B2B2]">/mes</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
