"use client";
import { plus_jakarta } from "@/font";
import Image from "next/image";
import { useState } from "react";
import Tooltip from "../../property/tooltip/Tooltip";
const { useRouter } = require("next/navigation");

export default function ReservationPropertyCard({ property, leaseOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  const handleRedirect = () => {
    if (property.category) {
      route.push("/pages/user/property-details/" + property?.id);
    } else {
      route.push("/pages/user/property-details/" + property?.propertyId);
    }
  };

  const handleRedirectToContract = () => {
    if (property.category) {
      route.push(
        "/pages/user/contract/sign-contract/" +
          property?.id +
          "?lo=" +
          leaseOrder.id
      );
    } else {
      route.push(
        "/pages/user/contract/sign-contract/" +
          property?.propertyId +
          "?r=" +
          property.id +
          "&lo=" +
          leaseOrder.id
      );
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
      className={`${plus_jakarta.className} flex flex-col gap-3 w-full cursor-pointer border p-2 rounded-xl shadow-reservation-drop`}
    >
      <div onClick={handleRedirect} className="flex gap-3 w-full">
        <div className="relative h-28 w-28 rounded-xl">
          <Image
            className="h-full rounded-xl"
            src={property?.property?.images[0] || property?.images[0] || ""}
            fill
            alt="Imagen de propiedad"
          />
        </div>
        <div className="flex flex-col justify-between h-28 grow">
          <div className="flex flex-col grow gap-2">
            <h4 className="flex w-full gap-2 items-center text-[0.81rem] text-[#000000B2] font-normal">
              {property?.property?.category ||
                property?.category
                  .split("_")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ") ||
                ""}{" "}
              <button
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
              </button>
            </h4>
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
                ? property?.property?.city +
                  ", " +
                  property?.property?.street +
                  " " +
                  property?.property?.streetNumber
                : property?.city +
                    ", " +
                    property?.street +
                    " " +
                    property?.streetNumber || ""}
            </h2>
            <p className="text-[0.68rem] text-[#828282] font-normal">
              {property?.property?.amenities ||
                property?.amenities
                  .map(
                    (amenity) =>
                      amenity.charAt(0).toUpperCase() + amenity.slice(1)
                  )
                  .join(", ") ||
                ""}
            </p>
          </div>
          <div className="flex flex-1 justify-between gap-2">
            <span className="flex items-center gap-2 self-end text-[#000000B2] font-medium">
              <Image
                className=""
                src={"/property-card/star.svg"}
                width={13}
                height={13}
                alt="Icono de Estrella"
              />{" "}
              4.9
            </span>
            <div className="flex flex-col justify-end items-end font-medium">
              {property?.property?.offer > 0 || property?.offer > 0 ? (
                <span className="text-xs text-[#171412] h-[1.06rem] bg-[#FFF06D] px-1">
                  {property?.property?.offer || property?.offer} OFF
                </span>
              ) : null}

              {property?.price > 0 && (
                <h3 className="text-base text-[#000000B2]">
                  {property?.price}{" "}
                  <span className="text-xs text-[#B2B2B2]">/mes</span>
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      {leaseOrder.isSigned ? (
        // Si está firmado, solo mostramos el span si está en revisión
        leaseOrder.isReview ? (
          <span className="text-red-500">En revisión</span>
        ) : null
      ) : // Si no está firmado
      leaseOrder.status === "PENDING" ? (
        leaseOrder.isReview ? (
          // Si está en revisión y pendiente
          <span className="text-red-500">En revisión</span>
        ) : (
          // Si no está en revisión y pendiente
          <div className="w-full">
            <button
              onClick={handleRedirectToContract}
              title="Firma tu contrato"
              className="px-4 py-1 rounded-xl bg-resolution-blue text-white"
            >
              Firmar Contrato
            </button>
          </div>
        )
      ) : null}
    </article>
  );
}
