import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import SliderDetails from "../../property-details/header/SliderDetails";
import SliderItem from "../../property-details/header/slider/SliderItem";

export default function MyBedroomDetails({ room }) {
  const { type, location, dueDate, price, amenities, images } = room;
  console.log(room);

  const [nextDueDate, setNextDueDate] = useState(null);

  useEffect(() => {
    function calculateNextDueDate(startDate, endDate) {
      const currentDate = new Date();
      let nextDueDate = new Date(startDate);

      // El primer vencimiento debe ser un mes después del startDate
      nextDueDate.setMonth(nextDueDate.getMonth() + 1);

      // Incrementar la fecha mensual hasta que sea posterior a la fecha actual
      while (nextDueDate <= currentDate) {
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      }

      // Si el próximo vencimiento es después de endDate, usar endDate como el último pago
      const end = new Date(endDate);
      if (nextDueDate > end) {
        return end;
      }

      return nextDueDate;
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
          <p className="font-light">Vencimiento</p>
          <p className="font-medium">
            {nextDueDate ? formatDate(nextDueDate) : "Sin vencimiento"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-light">Cantidad a pagar</p>
          <p className="font-medium">${price}</p>
        </div>
      </div>
      <button
        className="bg-[#0C1660] rounded-xl text-center text-white font-medium text-sm h-11"
        type="button"
      >
        Pagar
      </button>
    </section>
  );
}
