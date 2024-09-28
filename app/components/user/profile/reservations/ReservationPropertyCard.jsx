"use client";
import { plus_jakarta } from "@/font";
import Image from "next/image";
import { useState } from "react";
import Tooltip from "../../property/tooltip/Tooltip";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
const { useRouter } = require("next/navigation");

export default function ReservationPropertyCard({ property, leaseOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const [category, setCategory] = useState(
    property?.property?.category || property?.category
  );

  const handleRedirect = () => {
    if (category === "HELLO_ROOM" || category === "HELLO_COLIVING") {
      route.push(
        `/pages/user/property-details/${property.propertyId}/room-details/${property.id}`
      );
    } else {
      route.push(`/pages/user/property-details/${property?.id}`);
    }
  };

  const handleRedirectToContract = () => {
    if (category === "HELLO_ROOM" || category === "HELLO_COLIVING") {
      route.push(
        "/pages/user/contract/sign-contract/" +
          property?.propertyId +
          "?r=" +
          property.id +
          "&lo=" +
          leaseOrder.id
      );
    } else {
      route.push(
        "/pages/user/contract/sign-contract/" +
          property?.id +
          "?lo=" +
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Obtiene el día y lo formatea a 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtiene el mes (agrega 1 porque enero es 0) y lo formatea
    const year = String(date.getFullYear()).slice(-2); // Obtiene los últimos 2 dígitos del año

    return `${day}/${month}/${year}`;
  }

  return (
    <article
      className={`${plus_jakarta.className} max-w-[350px] sm:max-w-60 sm:h-[310px] flex flex-col gap-3 w-full cursor-pointer border p-2 rounded-xl shadow-reservation-drop`}
    >
      <div
        onClick={handleRedirect}
        className="flex sm:flex-col gap-3 w-full sm:grow"
      >
        <div className="relative h-28 w-28 sm:w-[222px] rounded-xl">
          <Image
            className="h-full rounded-xl"
            src={property?.images[0] || ""}
            fill
            alt="Imagen de propiedad"
          />
        </div>
        <div className="flex flex-col justify-between grow gap-2">
          <div className="flex flex-col grow gap-2">
            <div className="flex w-full gap-2 justify-between items-center text-[0.81rem] text-[#000000B2] font-normal">
              <div className="flex gap-1 items-center">
                {category?.split("_").join("").toLowerCase() || ""}
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
              </div>
              <div>
                <h3 className="text-xs text-[#000000B2]">
                  {formatDate(leaseOrder.date)}
                </h3>
              </div>
            </div>
            <h2 className="flex w-full gap-2 items-center text-xs text-[#000000B2] font-medium">
              <span>
                <Image
                  src={"/property-card/location-icon.svg"}
                  width={18}
                  height={18}
                  alt="Icono de Ubicación"
                />
              </span>
              {category === "HELLO_ROOM" || category === "HELLO_COLIVING"
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
            {/* <p className="text-[0.68rem] text-[#828282] font-normal">
              {category === "HELLO_ROOM" || category === "HELLO_COLIVING"
                ? property?.property?.amenities
                    .map(
                      (amenity) =>
                        amenity.charAt(0).toUpperCase() + amenity.slice(1)
                    )
                    .join(", ") || ""
                : property?.amenities
                    .map(
                      (amenity) =>
                        amenity.charAt(0).toUpperCase() + amenity.slice(1)
                    )
                    .join(", ") || ""}
            </p> */}
          </div>
          <div className="flex flex-1 justify-between items-center gap-2">
            <div>
              <h3 className="text-xs text-[#000000B2]">
                Ingreso: {formatDate(leaseOrder.startDate)}
              </h3>
              <h3 className="text-xs text-[#000000B2]">
                Salida: {formatDate(leaseOrder.endDate)}
              </h3>
            </div>
            <div className="flex flex-col justify-end items-end font-medium">
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
      {leaseOrder.isSigned &&
      leaseOrder.status === "APPROVED" &&
      !leaseOrder.inReview ? (
        // Si está firmado, solo mostramos el span si está en revisión
        <span className="text-red-500">Contrato Firmado</span>
      ) : !leaseOrder.isSigned &&
        leaseOrder.status === "READY_TO_SIGN" &&
        !leaseOrder.inReview ? (
        // Si no está en revisión y listo para firmar
        <div className="w-full">
          <button
            onClick={handleRedirectToContract}
            title="Firma tu contrato"
            className="px-4 py-1 rounded-xl bg-resolution-blue text-white sm:w-full"
          >
            Firmar Contrato
          </button>
        </div>
      ) : !leaseOrder.isSigned &&
        leaseOrder.status === "PENDING" &&
        leaseOrder.inReview ? (
        // Si está en revisión y pendiente
        <p
          title="¡Tu solicitud esta bajo revisión. Te notificaremos al finalizar!"
          className="text-resolution-blue font-bold text-center flex justify-center items-center gap-1.5"
        >
          En revisión
          <QuestionMarkCircleIcon
            title="¡Tu solicitud esta bajo revisión. Te notificaremos al finalizar!"
            className="size-4"
          />
        </p>
      ) : (
        ""
      )}
    </article>
  );
}
