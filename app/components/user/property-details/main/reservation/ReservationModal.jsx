"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { plus_jakarta } from "@/font";
import SelectContract from "./SelectContract";
import ReservationButton from "../ReservationButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import ShowClauses from "./ShowClauses";
import SelectRentalPeriod from "./SelectRentalPeriod";
import DatePicker from "./date_picker/DatePicker";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function ReservationModal({ callback, data, category }) {
  const router = useRouter();
  const [info, setInfo] = useState({
    startDate: "",
    endDate: "",
    duration: null,
  });
  const [dataReservation, setDataReservation] = useState(data);
  const [rentalPeriods, setRentalPeriods] = useState(data.rentalPeriods);
  const [clausesAccepted, setClausesAccepted] = useState(false); // Estado para el checkbox

  const handleRedirect = () => {
    router.push("/pages/contract");
  };

  const calculatePrice = (price, duration) => {
    const total = price * duration;
    return total;
  };

  const handleCheckout = async (reservation, user, leaseOrderId) => {
    const propertyId = reservation?.propertyId;
    const userEmail = user?.email;
    const price = parseInt(reservation?.unitPrice * 100);
    const propertyName = reservation?.propertyName;

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          userEmail,
          price,
          propertyName,
          leaseOrderId,
          roomId: reservation?.roomId || false,
        }),
      });
      const session = await response.json();
      const stripe = await stripePromise;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      toast.info("Seras redirigido a la pagina de pago");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSetDuration = (startDate, endDate, duration, rentalPeriodId) => {
    console.log(startDate, endDate, duration);
    setInfo({
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      rentalPeriodId: rentalPeriodId,
    });
  };

  const handleReservationSubmit = async () => {
    if (!clausesAccepted) {
      throw new Error("Debes aceptar los términos y condiciones");
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
      price: price,
    };
    setDataReservation(reservation);

    try {
      const response = await axios.post("/api/lease_order", reservation);
      if (
        data.category === "HELLO_ROOM" ||
        data.category === "HELLO_COLIVING" ||
        data.category === "HELLO_LANDLORD"
      ) {
        await axios.patch("/api/rental_period", {
          id: rentalPeriodId,
          status: "RESERVED",
        });
      }
      reservation.unitPrice = data.price;
      await handleCheckout(reservation, data?.user, response.data.id);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <AnimatePresence>
      <motion.aside
        className={`${plus_jakarta.className} flex flex-col gap-5 px-4 py-2 fixed bottom-0 inset-x-0 min-h-[30vh] max-h-screen overflow-y-scroll z-50 bg-[#FCFCFC] shadow-lg rounded-t-[1.55rem]`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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
          {(category === "HELLO_ROOM" ||
            category === "HELLO_COLIVING" ||
            category === "HELLO_LANDLORD") && (
            <SelectRentalPeriod
              data={rentalPeriods.filter((rental) => rental.status === "FREE")}
              setData={handleSetDuration}
              info={info}
            />
          )}
          {category === "HELLO_STUDIO" && (
            <DatePicker
              data={info}
              setData={setInfo}
              occupedDates={data?.leaseOrdersProperty}
            />
          )}
          <ShowClauses />
          <div className="self-center w-[90%]">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={clausesAccepted}
                onChange={() => setClausesAccepted(!clausesAccepted)}
                className="mr-2"
              />
              He leído y comprendo las cláusulas
            </label>
          </div>
          <div className="self-center w-[90%]">
            <ReservationButton
              callback={() => {
                toast.promise(handleReservationSubmit(), {
                  loading: "Reservando...",
                  success: "Reservado!",
                  error: "Error al reservar",
                });
              }}
            />
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
