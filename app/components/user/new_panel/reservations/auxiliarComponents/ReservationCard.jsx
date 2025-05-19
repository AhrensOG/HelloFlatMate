"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Link from "next/link";

function generateDsOrder(leaseOrderId) {
  const baseStr = String(leaseOrderId);
  const timePart = Date.now().toString().slice(-4);
  const randomDigit = Math.floor(Math.random() * 10).toString();
  let dsOrder = baseStr + timePart + randomDigit;
  if (dsOrder.length > 12) {
    dsOrder = dsOrder.slice(0, 12);
  }
  return dsOrder;
}
const ReservationCard = ({ data, user }) => {
  const t = useTranslations("user_history.card");

  const [redsysData, setRedsysData] = useState(null);
  const formRef = useRef(null);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Fecha inválida");
      }
      const days = [
        t("short_days.7"),
        t("short_days.1"),
        t("short_days.2"),
        t("short_days.3"),
        t("short_days.4"),
        t("short_days.5"),
        t("short_days.6"),
      ];
      const months = [
        t("short_months.1"),
        t("short_months.2"),
        t("short_months.3"),
        t("short_months.4"),
        t("short_months.5"),
        t("short_months.6"),
        t("short_months.7"),
        t("short_months.8"),
        t("short_months.9"),
        t("short_months.10"),
        t("short_months.11"),
        t("short_months.12"),
      ];
      const dayOfWeek = days[date.getUTCDay()];
      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();
      return `${dayOfWeek}, ${day} ${month} ${year}`;
    } catch (error) {
      console.error("Error al formatear la fecha:", error.message);
      return "Fecha inválida";
    }
  };
  const getStatusBadge = () => {
    if (data.status === "IN_PROGRESS") {
      return (
        <span className="max-w-32 flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1.5 mb-2 text-[10px] uppercase font-semibold rounded-full">
          <ClockIcon className="w-4 h-4" />{" "}
          {t("reservation_status.IN_PROGRESS")}
        </span>
      );
    } else if (
      (data.status === "PENDING" || data.status === "APPROVED") &&
      data.isActive &&
      !data.isSigned &&
      !data.inReview
    ) {
      return (
        <span className="max-w-32 flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 mb-2 text-[10px] uppercase font-semibold rounded-full">
          <PencilIcon className="w-4 h-4" />{" "}
          {t("reservation_status.INCOMPLETE")}
        </span>
      );
    } else if (data.status === "FINISHED") {
      return (
        <span className="max-w-32 flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 mb-2 text-[10px] uppercase font-semibold rounded-full">
          <CheckCircleIcon className="w-4 h-4" />{" "}
          {t("reservation_status.FINISHED")}
        </span>
      );
    } else {
      return (
        <span className="max-w-32 flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 mb-2 text-[10px] uppercase font-semibold rounded-full">
          <CheckCircleIcon className="w-4 h-4" />{" "}
          {t("reservation_status.COMPLETE")}
        </span>
      );
    }
  };

  const handleRedsysCheckout = async () => {
    const toastId = toast.loading(t("info.loading"));
    try {
      const property = data.room?.property;
      const room = data.room;
      const order = generateDsOrder(data.id);
      const body = {
        amount: data.price * 100,
        order,
        paymentMetaData: {
          order,
          paymentType: "reservation",
          price: data.price,
          category: property?.category,
          leaseOrderId: data?.id,
          roomId: room.id,
          propertyId: property.id,
          userEmail: user?.email || "",
          merchantName: `Alojamiento ${room.serial}`,
          merchantDescription: `Reserva - Alojamiento ${room.serial} (${user?.name} ${user?.lastName})`,
          merchantUrlOk: `/pages/user/contractv2?p=${property.id}&r=${room.id}&lo=${data.id}`,
          merchantUrlkO: `/pages/user/reservations`,
        },
      };

      const res = await fetch("/api/redsys/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const responseData = await res.json();

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      setRedsysData(responseData);
      setTimeout(() => {
        formRef.current.submit();
      }, 500);

      toast.success("Success" ,{ id: toastId });
    } catch (error) {
      console.error(t("error.error"), error.message);
      toast.error(t("error.info"), { id: toastId });
    }
  };

  const redsysForm = redsysData && (
    <form
      ref={formRef}
      name="redsysForm"
      action={redsysData.redsysUrl}
      method="POST"
      target="_blank"
      style={{ display: "none" }}>
      <input
        type="hidden"
        name="Ds_SignatureVersion"
        value={redsysData.Ds_SignatureVersion}
      />
      <input
        type="hidden"
        name="Ds_MerchantParameters"
        value={redsysData.Ds_MerchantParameters}
      />
      <input
        type="hidden"
        name="Ds_Signature"
        value={redsysData.Ds_Signature}
      />
    </form>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="w-full bg-white shadow-md border border-gray-200 rounded-lg mt-6 p-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col justify-between w-full">
          <div>
            <div>{getStatusBadge()}</div>
            <h3 className="text-xl font-semibold text-gray-900">
              {t("code")}: {data.room?.serial || "Habitación sin nombre"}
            </h3>
            <p className="text-gray-800 font-bold text-xl">
              {data.price ? `${data.price} €` : "Precio no disponible"}{" "}
              <span className="text-base text-gray-500">/ {t("month")}</span>
            </p>
            <p className="text-gray-600 text-sm">
              {data.room?.property?.street +
                " " +
                data.room?.property?.streetNumber +
                ", " +
                data.room?.property?.postalCode || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              {formatDate(data.startDate)} - {formatDate(data.endDate)}
            </p>
          </div>

          {data.status === "PENDING" ? (
            <button
              onClick={handleRedsysCheckout}
              className="mt-4 bg-[#440cac] text-center text-white font-semibold py-2 px-4 rounded-md hover:bg-[#440cac]/80 transition">
              Pagar mi reserva
            </button>
          ) : data.status === "APPROVED" &&
            data.isActive &&
            !data.isSigned &&
            !data.inReview ? (
            <Link
              href={`/pages/user/contractv2?p=${data?.propertyId}&r=${data.room?.id}&lo=${data.id}`}
              className="mt-4 bg-[#440cac] text-center text-white font-semibold py-2 px-4 rounded-md hover:bg-[#440cac]/80 transition">
              Firmar contrato
            </Link>
          ) : null}
        </div>
      </motion.div>

      {redsysForm}
    </>
  );
};

export default ReservationCard;
