import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SelectContract from "./SelectContract";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ShowClauses from "./ShowClauses";
import SelectRentalPeriod from "./SelectRentalPeriod";
import DatePicker from "./date_picker/DatePicker";
import ReservationForm from "./ReservationForm";

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
  const [clausesAccepted, setClausesAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = (price, duration) => {
    const total = price * duration;
    return total;
  };

  const handleSetDuration = (startDate, endDate, duration, rentalPeriodId) => {
    setInfo({
      startDate,
      endDate,
      duration,
      rentalPeriodId,
    });
  };

  const handleReservationSubmit = async (values) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!clausesAccepted) {
      toast.info("Debes aceptar los términos y condiciones");
      setIsSubmitting(false);
      return;
    }
    if (
      info.startDate === "" ||
      info.endDate === "" ||
      !info.endDate ||
      !info.startDate
    ) {
      toast.info("Recuerda seleccionar un periodo de alquiler");
      setIsSubmitting(false);
      return;
    }

    const price = calculatePrice(data.price, info.duration);
    const startDate = info.startDate;
    const endDate = info.endDate;
    const rentalPeriodId = info.rentalPeriodId;
    const reservation = {
      ...dataReservation,
      ...values,
      date: new Date().toISOString(),
      startDate: startDate,
      endDate: endDate,
      price: category === "HELLO_STUDIO" ? price : data.price,
      inReview: true,
    };

    setDataReservation(reservation);

    const toastId = toast.loading("Procesando reserva...");

    try {
      await axios.put("/api/user/reservation", reservation);
      const response = await axios.post("/api/lease_order", reservation);
      if (
        ["HELLO_ROOM", "HELLO_COLIVING", "HELLO_LANDLORD"].includes(category)
      ) {
        await axios.patch("/api/rental_period", {
          id: rentalPeriodId,
          status: "RESERVED",
        });
      }
      toast.success("Reserva completada con éxito!", {
        id: toastId,
        description: "Seras redirigido.",
      });
      setTimeout(() => setIsSubmitting(false), 1000);
      setTimeout(() => router.push("/pages/user/my-reservations"), 1000);
    } catch (error) {
      toast.info(`Error al procesar la reserva`, {
        id: toastId,
        description: "Intenta nuevamente o contacta al soporte",
      });
      setIsSubmitting(false);
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
      // onClick={callback}
    >
      <motion.aside
        className="relative w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white sm:rounded-md shadow-lg max-h-screen sm:max-h-[95vh] overflow-y-auto scrollbar-none p-6 py-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center sm:justify-start items-center mb-2">
          <button
            className="w-10 h-10 hidden sm:flex items-center justify-center "
            onClick={callback}
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
          <Image
            src="/property_details/reservation/close-line-btn.svg"
            width={36}
            height={5}
            alt="Cerrar"
            onClick={callback}
            className="sm:hidden block"
          />
        </div>
        <h2 className="text-xl font-semibold mb-4 w-full text-center">
          Datos de solicitud para reserva
        </h2>
        <div className="space-y-5">
          {calendarType === "SIMPLE" ? (
            <SelectRentalPeriod
              data={rentalPeriods.filter(
                (rental) =>
                  rental.isFree &&
                  new Date(rental?.rentalPeriod?.startDate) > new Date()
              )}
              setData={handleSetDuration}
              info={info}
            />
          ) : calendarType === "FULL" ? (
            <DatePicker
              data={info}
              setData={setInfo}
              occupedDates={
                data?.leaseOrdersProperty || data?.leaseOrdersRoom || []
              }
              rentalPeriods={rentalPeriods}
            />
          ) : null}
          <ShowClauses />
          <ReservationForm
            data={data}
            handleReservationSubmit={handleReservationSubmit}
            clausesAccepted={clausesAccepted}
            setClausesAccepted={setClausesAccepted}
            isSubmitting={isSubmitting}
          />
        </div>
      </motion.aside>
    </motion.div>
  );
}
