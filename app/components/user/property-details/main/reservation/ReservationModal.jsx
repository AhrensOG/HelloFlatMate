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
import { sendEmail } from "@/app/context/actions";
import { useTranslations } from "next-intl";
import preReservationTemplate from "@/utils/reservation_templates/preReservation";

export default function ReservationModal({
  callback,
  data,
  category,
  calendarType,
}) {
  const t = useTranslations("reservation_modal");
  const router = useRouter();
  const [info, setInfo] = useState({
    startDate: "",
    endDate: "",
    duration: null,
  });
  const [dataReservation, setDataReservation] = useState(data);
  const [rentalPeriods, setRentalPeriods] = useState(data.rentalPeriods);
  const [clausesAccepted, setClausesAccepted] = useState(false);
  const [clausesReaded, setClausesReaded] = useState(false);
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

  const formatedDate = (date) => {
    if (date) {
      const newDate = new Date(date);
      return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        timeZone: "Europe/Madrid",
      }).format(newDate);
    }
    return "";
  };

  const handleReservationSubmit = async (values) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!clausesAccepted) {
      toast.info(t("terms_and_conditions"));
      setIsSubmitting(false);
      return;
    }
    if (
      info.startDate === "" ||
      info.endDate === "" ||
      !info.endDate ||
      !info.startDate
    ) {
      toast.info(t("rental_period"));
      setIsSubmitting(false);
      return;
    }

    const price = data.calendar === "FULL" ? info.totalPrice : data.price;
    const startDate = info.startDate;
    const endDate = info.endDate;
    const reservation = {
      ...dataReservation,
      ...values,
      date: new Date().toISOString(),
      startDate: startDate,
      endDate: endDate,
      price: price,
      inReview: true,
    };

    setDataReservation(reservation);

    const toastId = toast.loading(t("reservation_submit_process_toast"));

    try {
      await axios.put("/api/user/reservation", reservation);
      await axios.post("/api/lease_order", reservation);
      const startDate = formatedDate(reservation.startDate);
      const endDate = formatedDate(reservation.endDate);
      const address = {
        street: reservation.propertyInfo?.street,
        streetNumber: reservation.propertyInfo?.streetNumber,
        floor: reservation.propertyInfo?.floor,
      };
      const emailData = {
        to: reservation.user?.email,
        subject: `Solicitud de reserva ${reservation.roomSerial}`,
        html: preReservationTemplate(
          reservation.name,
          reservation.lastName,
          reservation.email,
          startDate,
          endDate,
          reservation.price,
          address,
          reservation.roomSerial
        ),
        cc: process.env.NEXT_PUBLIC_HFM_MAIL,
      };

      await sendEmail(emailData);
      toast.success(t("reservation_submit_success_toast"), {
        id: toastId,
      });
      setTimeout(() => setIsSubmitting(false), 1000);
      setTimeout(() => router.push("/pages/user/reservations"), 1000);
    } catch (error) {
      toast.info(t("reservation_submit_error_toast"), {
        id: toastId,
        description: t("reservation_submit_error_toast_2"),
      });
      setIsSubmitting(false);
      console.log(error);
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
        className="relative w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white sm:rounded-md shadow-lg max-h-screen sm:max-h-[90vh] overflow-y-auto scrollbar-none p-6 py-10 flex flex-col"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center sm:justify-start items-center mb-2">
          <button
            className="w-10 h-10 hidden sm:flex items-center justify-center "
            onClick={callback}>
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
        <div className="space-y-5 flex flex-col justify-start items-center grow overflow-y-auto scrollbar-none">
          <div className="w-full">
            <span className="text-sm font-semibold text-[#440CAC] text-custom-gray-600">
              {calendarType === "FULL"
                ? `${t("reservation_total_amount_full_calendar")}: ${
                    info.totalPrice ? info.totalPrice + " €" : "0 €"
                  }`
                : ""}
            </span>
          </div>
          {calendarType === "SIMPLE" ? (
            <SelectRentalPeriod
              data={rentalPeriods.filter(
                (rental) =>
                  rental.isFree &&
                  new Date(rental?.rentalPeriod?.startDate) >
                    new Date("2025-01-01")
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
          <ShowClauses
            mothlyRent={data.price || 500}
            startDate={formatedDate(info.startDate) || "-"}
            endDate={formatedDate(info.endDate) || "-"}
          />
          <ReservationForm
            data={data}
            handleReservationSubmit={handleReservationSubmit}
            clausesAccepted={clausesAccepted}
            setClausesAccepted={setClausesAccepted}
            clausesReaded={clausesReaded}
            setClausesReaded={setClausesReaded}
            isSubmitting={isSubmitting}
          />
        </div>
      </motion.aside>
    </motion.div>
  );
}
