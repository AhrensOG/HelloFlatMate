"use client";

import Image from "next/image";
import { useState } from "react";
import Tooltip from "./tooltip/Tooltip";
import { ClockIcon } from "@heroicons/react/24/outline";
const { useRouter } = require("next/navigation");

function formatDate(dateString) {
  if (!dateString) return "-"; // Si la fecha no es válida, devuelve "-"
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-"; // Verifica si es una fecha válida

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses van de 0-11
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export default function PropertyCard({
  name,
  images = "/not-image.png",
  property,
  price,
  roomId = false,
  room = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  const handleRedirect = () => {
    let url;
    url = `/pages/property-details/${property.id}/room-details/${roomId}`;

    // Abrir en una nueva pestaña
    window.open(url, "_blank");
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <article
      className={`  flex flex-col max-h-96 h-full gap-3 w-full sm:max-w-72 cursor-pointer border sm:border-none rounded-sm`}>
      <div
        onClick={handleRedirect}
        className="flex sm:flex-col gap-3 sm:gap-0 w-full h-full">
        <div className="relative h-28 w-28 sm:w-72 sm:min-h-60 sm:h-60 rounded-md">
          <Image
            className="rounded-lg"
            src={
              images ||
              property?.property?.images[0] ||
              property?.images[0] ||
              ""
            }
            fill
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 288px, 100vw"
            alt="Imagen de propiedad"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 items-stretch p-2 sm:py-4 gap-2">
          <div className="flex flex-col grow sm:gap-2">
            <span className="flex w-full gap-2 items-center text-xs text-[#000000B2] font-normal">
              {property?.category === "HELLO_ROOM" ||
              property?.category === "HELLO_COLIVING" ||
              property?.category === "HELLO_LANDLORD"
                ? "HABITACION"
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
              <span className="text-xs font-medium text-black/80">
                {(() => {
                  const today = new Date();
                  const futureRentalItems = room?.rentalItems
                    ?.filter(
                      (item) => new Date(item?.rentalPeriod?.startDate) > today
                    )
                    ?.sort(
                      (a, b) =>
                        new Date(a.rentalPeriod.startDate) -
                        new Date(b.rentalPeriod.startDate)
                    );
                  const nextAvailableDate =
                    futureRentalItems?.[0]?.rentalPeriod?.startDate;

                  return nextAvailableDate ? (
                    <div className="flex gap-2">
                      <ClockIcon className="size-4" /> Disponible{" "}
                      {formatDate(new Date(nextAvailableDate))}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <ClockIcon className="size-4" /> ¡Disponible ahora!{" "}
                    </div>
                  );
                })()}
              </span>
            </span>
            <span className="flex w-full gap-2 items-center text-sm text-black/80 font-medium">
              {name || ""}
            </span>
            <p className="flex w-full gap-2 items-center text-xs text-[#000000B2] font-medium">
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
            </p>
            <p className="text-[0.68rem] text-[#828282] font-normal">
              {
                // Si existen `property?.property?.amenities` o `property?.amenities`
                Array.isArray(property?.property?.amenities) &&
                property?.property?.amenities?.length > 0
                  ? property?.property?.amenities
                      ?.slice(0, 3) // Obtener solo los primeros 3 elementos
                      .map(
                        (amenity) =>
                          amenity.charAt(0).toUpperCase() + amenity.slice(1)
                      )
                      .join(", ") +
                    (property?.property?.amenities.length > 3 ? ", ..." : "")
                  : Array.isArray(property?.amenities) &&
                    property?.amenities?.length > 0
                  ? property?.amenities
                      ?.slice(0, 3) // Obtener solo los primeros 3 elementos
                      .map(
                        (amenity) =>
                          amenity.charAt(0).toUpperCase() + amenity.slice(1)
                      )
                      .join(", ") +
                    (property?.amenities.length > 3 ? ", ..." : "")
                  : ""
              }
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
              <p className="text-base text-[#000000B2]">
                {price} € <span className="text-xs text-[#B2B2B2]">/mes</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
