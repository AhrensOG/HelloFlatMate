import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import SliderDetails from "../../property-details/header/SliderDetails";
import SliderItem from "../../property-details/header/slider/SliderItem";
import Link from "next/link";
import { toast } from "sonner";

export default function MyBedroomDetails({ room }) {
  const {
    type,
    location,
    dueDate,
    price,
    amenities,
    images,
    property,
    leaseOrder,
  } = room;
  const [nextDueDate, setNextDueDate] = useState(null);
  const [totalPayments, setTotalPayments] = useState(0);
  console.log(totalPayments);

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

    function calculateTotalPayments(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Calcular la diferencia de meses entre inicio y finalización
      let monthsDifference =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      // Si el contrato comienza el primer día del mes, ya se ha hecho el primer pago
      if (start.getDate() === 1) {
        monthsDifference += 1; // Incluir el pago de la reserva
      }

      return monthsDifference;
    }

    if (dueDate?.startDate && dueDate?.endDate) {
      const calculatedNextDueDate = calculateNextDueDate(
        dueDate.startDate,
        dueDate.endDate
      );
      setNextDueDate(calculatedNextDueDate);

      const calculatedTotalPayments = calculateTotalPayments(
        dueDate.startDate,
        dueDate.endDate
      );
      setTotalPayments(calculatedTotalPayments);
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
    <section className="w-full flex flex-col gap-5">
      <div className="relative rounded-2xl h-[250px] w-full">
        <SliderDetails rounded="rounded-2xl">
          {images.map((image, index) => {
            return (
              <SliderItem
                rounded="rounded-2xl"
                height="h-[250px]"
                key={index}
                img={image}
              />
            );
          })}
        </SliderDetails>
        <p className="absolute top-0 right-0 z-50 flex items-center justify-center w-[6.7rem] h-[1.88rem] rounded-bl-3xl rounded-tr-2xl bg-[#0C1660] text-white text-xs text-center">
          {type.replace(/_/g, "").toLowerCase()}
        </p>
      </div>
      <div className="flex flex-wrap justify-between items-start gap-1">
        <div className="flex gap-1">
          <span className="h-6 w-5">
            <MapPinIcon />
          </span>
          <h3 className="text-sm font-medium text-[#000000E5]">
            {`${location.street}, ${location.postalCode} ${location.city}`}
          </h3>
        </div>
        <p className="text-xs font-normal text-[#828282] pl-2">
          {amenities.join(" - ")}
        </p>
      </div>
      <div className="text-sm flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-light">
            {type === "HELLO_STUDIO" ? "Finalización" : "Vencimiento"}
          </p>
          <p className="font-medium">
            {type === "HELLO_STUDIO"
              ? formatDate(new Date(dueDate.endDate))
              : nextDueDate
              ? formatDate(nextDueDate)
              : "Sin vencimiento"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-light">
            {type === "HELLO_STUDIO" ? "Total pagado" : "Cantidad a pagar"}
          </p>
          <p className="font-medium">
            {type === "HELLO_STUDIO"
              ? `$${leaseOrder.price || 0}`
              : `$${price}`}
          </p>
        </div>
      </div>
      {type === "HELLO_STUDIO" ? (
        <Link
          href={`/pages/user/property-details/${property.id}`}
          className="bg-[#0C1660] rounded-xl text-center flex items-center justify-center text-white font-medium text-sm h-11"
          type="button"
        >
          Nueva Reserva
        </Link>
      ) : (
        <button
          onClick={() =>
            toast.info("¡Días antes del vencimiento podrás pagar!")
          }
          className="bg-[#0C1660] rounded-xl text-center text-white font-medium text-sm h-11"
          type="button"
        >
          Pagar
        </button>
      )}
    </section>
  );
}
