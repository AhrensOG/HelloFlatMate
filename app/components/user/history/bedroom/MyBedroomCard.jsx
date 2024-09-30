import { useState, useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function MyBedroomCard({
  action,
  type,
  location,
  amenities,
  price,
  dueDate, // Objeto con startDate y endDate
  images,
  leaseOrder,
}) {
  const [nextDueDate, setNextDueDate] = useState(null);

  useEffect(() => {
    function calculateNextDueDate(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const nextDue = new Date(start.getFullYear(), start.getMonth() + 2, 1);

      if (nextDue <= end) {
        return nextDue;
      } else {
        return null;
      }
    }

    if (dueDate?.startDate && dueDate?.endDate) {
      const calculatedNextDueDate = calculateNextDueDate(
        dueDate.startDate,
        dueDate.endDate
      );
      setNextDueDate(calculatedNextDueDate);
    }
  }, [dueDate]);

  // Función para formatear la fecha en DD/MM/YY
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 porque los meses comienzan en 0
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  return (
    <article className="flex gap-1 items-center" onClick={action}>
      <div className="relative h-48 min-w-[7.25rem] w-[7.25rem] rounded-2xl">
        <Image
          className="rounded-2xl"
          alt="Ilustracion de un cuarto"
          src={images}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="flex flex-col py-2 pl-1 gap-1.5 grow">
        <p className="text-sm text-white font-medium p-1 text-center bg-[#0E155F] rounded-3xl w-28">
          {type.replace(/_/g, "").toLowerCase()}
        </p>
        <div className="flex items-top">
          <span className="h-5 w-5">
            <MapPinIcon />
          </span>
          <h3 className="text-xs text-[#000000E5] align-text-bottom">
            {`${location.street}, ${location.postalCode} ${location.city}`}
          </h3>
        </div>
        <p className="text-[10px] font-normal text-[#828282]">
          {amenities.slice(0, 3).join(" - ")}
        </p>
        <p className="font-light text-sm flex justify-between">
          {type === "HELLO_STUDIO" ? "Finalización" : "Vencimiento"}
          <span className="font-medium text-sm">
            {type === "HELLO_STUDIO"
              ? formatDate(new Date(dueDate.endDate))
              : nextDueDate
              ? formatDate(nextDueDate)
              : "Sin vencimiento"}
          </span>
        </p>
        <p className="font-light text-sm flex justify-between">
          {type === "HELLO_STUDIO" ? "Total pagado" : "Cantidad a pagar"}
          <span className="font-medium text-sm">
            {type === "HELLO_STUDIO"
              ? `$${leaseOrder.price || 0}`
              : `$${price}`}
          </span>
        </p>
      </div>
    </article>
  );
}
