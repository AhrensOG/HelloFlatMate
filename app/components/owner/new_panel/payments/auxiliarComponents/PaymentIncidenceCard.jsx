"use client";

import React from "react";
import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Link from "next/link";

const getStatusStyles = (status) => {
  if (status === "APPROVED") {
    return {
      bg: "bg-green-100 text-green-700",
      icon: <CheckCircleIcon className="w-5 h-5 text-green-700" />,
    };
  }

  return {
    bg: "bg-yellow-100 text-yellow-700",
    icon: <ExclamationCircleIcon className="w-5 h-5 text-yellow-700" />,
  };
};

const PaymentIncidenceCard = ({ incidence, onPayClick }) => {
  const t = useTranslations("owner_panel.payments_panel");
  const { bg, icon } = getStatusStyles(incidence.status);

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all mb-3">
      <div className="flex items-start gap-3 text-left">
        {icon}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-800">
            {incidence.title}
          </h3>
          <p className="text-xs text-gray-500">
            {formatDateToDDMMYYYY(incidence.date)} ·{" "}
            {incidence.property?.serial}
          </p>
          {incidence.description && (
            <p className="text-xs text-gray-600 italic">
              {incidence.description}
              {incidence.toDo?.id && (
                <Link
                  href={`/pages/owner/incidences?id=${incidence.toDo?.id}`}
                  className="text-xs text-[#440CAC] underline italic line-clamp-2">
                  {t("payment_card.view_incidence") + " " + incidence.toDo?.id}
                </Link>
              )}
            </p>
          )}
          <p className="text-sm font-bold text-gray-800">
            {Number(incidence.amount).toFixed(2)} €
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm px-3 py-1 rounded-full font-bold ${bg}`}>
          {incidence.status === "APPROVED"
            ? t("payment_card.status.approved")
            : t("payment_card.status.pending")}
        </span>
        {incidence.status === "PENDING" && (
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 text-sm font-semibold px-3 py-1 rounded shadow"
            onClick={() => onPayClick?.(incidence)}>
            {t("payment_card.pay")}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentIncidenceCard;
