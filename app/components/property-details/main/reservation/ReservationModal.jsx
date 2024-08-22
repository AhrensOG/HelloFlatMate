"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { plus_jakarta } from "@/font";
import SelectContract from "./SelectContract";
import ReservationButton from "../ReservationButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import DatePicker from "./date_picker/DatePicker";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function ReservationModal({ callback, data }) {
  const router = useRouter();
  const [info, setInfo] = useState({
    duracion: null,
    fecha: null,
  });
  const [dataReservation, setDataReservation] = useState(data);

  const handleRedirect = () => {
    router.push("/pages/contract");
  };

  const calculateDuration = () => {
    const durationNumber = info.duracion.split(" ")[0];
    return parseInt(durationNumber);
  };
  const formatDate = (date) => {
    console.log(date);

    const dateFormatted = date.toISOString();
    return dateFormatted;
  };

  const calculatePrice = (price, duration) => {
    const total = price * duration;
    return total;
  };

  const calculateEndDate = (date, duration) => {
    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + duration);
    return endDate.toISOString();
  };

  const handleCheckout = async (reservation, user, leaseOrderId) => {
    // Aquí puedes obtener roomId, userEmail y price desde tus datos
    const propertyId = reservation?.propertyId;
    const userEmail = user?.email;
    const price = parseInt(reservation?.price * 100); // Precio en centavos ($50.00)
    const propertyName = reservation?.propertyName; // Precio en centavos ($50.00)
    const roomId = reservation?.roomId || false;

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
          roomId,
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
      console.error(error);
    }
  };

  const handleReservationSubmit = async () => {
    const duration = calculateDuration();
    const price = calculatePrice(data.price, duration);
    const startDate = info.fecha;
    const endDate = calculateEndDate(info.fecha, duration);
    const reservation = {
      ...dataReservation,
      date: new Date().toISOString(),
      startDate: startDate,
      endDate: endDate,
      price: price,
    };
    setDataReservation(reservation);
    try {
      toast.info("Reservando...");
      const response = await axios.post("/api/lease_order", reservation);
      if (response.status === 200) {
        toast.success("Reserva exitosa");
        await handleCheckout(reservation, data?.user, response.data.id);
        return response.data;
      }
      toast.error("Error al realizar la reserva");
    } catch (error) {
      toast.error("Error al realizar la reserva");
    }
  };

  return (
    <AnimatePresence>
      <motion.aside
        className={`${plus_jakarta.className} flex flex-col gap-5 px-4 py-2 fixed bottom-0 inset-x-0 min-h-[30vh] z-50 bg-[#FCFCFC] shadow-lg rounded-t-[1.55rem] `}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex">
          <div className="w-[44%]">
            <button className=" w-8 h-8" onClick={callback}>
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
          {/* Contenido del modal */}
          <SelectContract data={info} setData={setInfo} />
          <DatePicker data={info} setData={setInfo} />
          <div className=" self-center w-[90%]">
            <ReservationButton callback={handleReservationSubmit} />
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
