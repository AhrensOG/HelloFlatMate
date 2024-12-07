"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SelectContract from "./SelectContract";
import ReservationButton from "../ReservationButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ShowClauses from "./ShowClauses";
import SelectRentalPeriod from "./SelectRentalPeriod";
import DatePicker from "./date_picker/DatePicker";
import Link from "next/link";

export default function ReservationModal({
  callback,
  data,
  category,
  calendarType,
}) {
  const router = useRouter();
  const [info, setInfo] = useState({
    startDate: "",
    endDate: "",
    duration: null,
  });
  const [dataReservation, setDataReservation] = useState(data);
  const [rentalPeriods, setRentalPeriods] = useState(data.rentalPeriods);
  const [clausesAccepted, setClausesAccepted] = useState(false); // Estado para el checkbox

  const calculatePrice = (price, duration) => {
    const total = price * duration;
    return total;
  };

  // const handleCheckout = async (reservation, user, leaseOrderId) => {
  //   const propertyId = reservation?.propertyId;
  //   const userEmail = user?.email;
  //   const price = parseInt(reservation?.unitPrice);
  //   const propertyName = reservation?.propertyName;

  //   try {
  //     const response = await fetch("/api/stripe/create-checkout-session", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         propertyId,
  //         userEmail,
  //         price,
  //         propertyName,
  //         leaseOrderId,
  //         roomId: reservation?.roomId || false,
  //         category,
  //       }),
  //     });
  //     const session = await response.json();
  //     const stripe = await stripePromise;

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });

  //     toast.info("Seras redirigido a la pagina de pago");
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  const handleSetDuration = (startDate, endDate, duration, rentalPeriodId) => {
    setInfo({
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      rentalPeriodId: rentalPeriodId,
    });
  };

  const handleReservationSubmit = async () => {
    if (!clausesAccepted) {
      toast.info("Debes aceptar los términos y condiciones");
      return;
    }

    const price = calculatePrice(data.price, info.duration);
    const startDate = info.startDate;
    const endDate = info.endDate;
    const rentalPeriodId = info.rentalPeriodId;
    const reservation = {
      ...dataReservation,
      date: new Date().toISOString(),
      startDate: startDate,
      endDate: endDate,
      price: category === "HELLO_STUDIO" ? price : data.price,
      inReview: true,
    };

    setDataReservation(reservation);

    const toastId = toast.loading("Procesando reservación...");

    try {
      const response = await axios.post("/api/lease_order", reservation);
      if (
        category === "HELLO_ROOM" ||
        category === "HELLO_COLIVING" ||
        category === "HELLO_LANDLORD"
      ) {
        await axios.patch("/api/rental_period", {
          id: rentalPeriodId,
          status: "RESERVED",
        });
      }
      toast.success("Reservación completada con éxito!", { id: toastId });
      return response.data;
    } catch (error) {
      toast.info(
        `Error al procesar la reservación: ${
          error.response?.data?.message || error.message || error
        }`,
        { id: toastId }
      );
      throw error;
    }
  };

  useEffect(() => {}, [calendarType]);

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black bg-opacity-70 flex items-end sm:items-center sm:justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={callback} // Permite cerrar el modal al hacer clic en el fondo
    >
      <motion.aside
        className={`  
          flex flex-col gap-5 px-4 py-2 fixed
          bg-[#FCFCFC] shadow-lg z-50
          sm:relative sm:rounded-lg
          sm:w-[60vw] sm:min-h-[70vh] sm:max-h-[70vh] scrollbar-none sm:scrollbar-thin sm:overflow-y-auto
          bottom-0 inset-x-0 min-h-[30vh] max-h-screen overflow-y-scroll rounded-t-[1.55rem]
        `}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          <div className="w-[44%]">
            <button className="w-8 h-8" onClick={callback}>
              <XMarkIcon />
            </button>
          </div>
          <div className="self-start w-[50%] pr-3 h-3">
            <button onClick={callback}>
              <Image
                src={"/property_details/reservation/close-line-btn.svg"}
                width={36}
                height={5}
                alt="Boton para cerrar"
              />
            </button>
          </div>
        </div>
        <h2 className="font-medium text-[1.75rem]">Estadía</h2>
        <div className="flex flex-col justify-center items-center gap-5">
          {(() => {
            if (calendarType === "SIMPLE") {
              return (
                <SelectRentalPeriod
                  data={rentalPeriods.filter((rental) => rental.isFree)}
                  setData={handleSetDuration}
                  info={info}
                />
              );
            } else if (calendarType === "FULL") {
              return (
                <DatePicker
                  data={info}
                  setData={setInfo}
                  occupedDates={
                    data?.leaseOrdersProperty || data?.leaseOrdersRoom || []
                  }
                  rentalPeriods={rentalPeriods}
                />
              );
            } else {
              return null; // Si calendarType es undefined u otro valor, no muestra nada
            }
          })()}

          <ShowClauses />
          <div className="self-center w-[90%]">
            <label className="flex items-center text-xs lg:text-sm">
              <input
                type="checkbox"
                checked={clausesAccepted}
                onChange={() => setClausesAccepted(!clausesAccepted)}
                className="mr-2"
              />
              <p className="">
                He leído, comprendo y acepto los{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-blue-500 underline ml-1"
                >
                  términos y condiciones
                </Link>
              </p>
            </label>
          </div>
          <div className="self-center w-[90%]">
            <ReservationButton callback={() => handleReservationSubmit()} />
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}
