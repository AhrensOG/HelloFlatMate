"use client";

import React from "react";
import { FaWater, FaBolt, FaFire, FaWifi, FaFileInvoice } from "react-icons/fa";
import { useTranslations } from "next-intl";
import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";
import Link from "next/link";

const ICONS = {
  WATER: <FaWater className="text-blue-500 size-6" />,
  ELECTRICITY: <FaBolt className="text-yellow-500 size-6" />,
  GAS: <FaFire className="text-red-500 size-6" />,
  INTERNET: <FaWifi className="text-green-500 size-6" />,
  GENERAL_SUPPLIES: <FaFileInvoice className="text-gray-500 size-6" />,
};

const TenantConsumption = ({ order, isOld = false }) => {
  const t = useTranslations("owner_panel.consumption_card");
  const { client } = order;

  const consumptions = client.consumptions || [];
  const supplies = (client.supplies || []).filter(
    (s) => s.type === "GENERAL_SUPPLIES" || s.type === "INTERNET"
  );

  const grouped = {
    "1Q": { consumptions: [], supplies: [] },
    "2Q": { consumptions: [], supplies: [] },
  };

  consumptions.forEach((c) => {
    const period = c.period === "2Q" ? "2Q" : "1Q";
    grouped[period].consumptions.push(c);
  });

  supplies.forEach((s) => {
    let period = "1Q";
    if (s.name.includes("2Q")) period = "2Q";
    grouped[period].supplies.push(s);
  });

  return (
    <div
      className={`w-full lg:w-[48%] border ${
        isOld ? "border-gray-200" : "border-[#440cac]"
      } p-4 rounded-lg shadow-sm bg-white`}>
      <h4 className="text-[#440cac] font-semibold text-sm md:text-lg mb-4">
        {t("title")}
      </h4>

      {["1Q", "2Q"].map((period) => {
        const internetSupply = grouped[period].supplies.find(
          (s) => s.type === "INTERNET"
        );
        const generalSupply = grouped[period].supplies.find(
          (s) => s.type === "GENERAL_SUPPLIES"
        );

        const internetConsumption = grouped[period].consumptions
          .filter((c) => c.type === "INTERNET")
          .reduce((acc, c) => acc + c.amount, 0);

        const generalConsumption = grouped[period].consumptions
          .filter((c) => c.type !== "INTERNET")
          .reduce((acc, c) => acc + c.amount, 0);

        return (
          <div key={period} className="mb-6">
            <p className="text-sm md:text-base font-semibold text-gray-700 mb-2">
              {t("quarter")}: {period}
            </p>

            {/* Aportes */}
            <h5 className="text-xs md:text-sm font-semibold text-gray-600 mb-1">
              {t("total_paid")}:
            </h5>
            {internetSupply && (
              <p className="text-sm md:text-base text-gray-600">
                <strong>Wifi:</strong> €{internetSupply.amount.toFixed(2)}
              </p>
            )}
            {generalSupply && (
              <p className="text-sm md:text-base text-gray-600">
                <strong>Suministros:</strong> €{generalSupply.amount.toFixed(2)}
              </p>
            )}
            {!internetSupply && !generalSupply && (
              <p className="text-xs md:text-sm text-gray-500 mb-2">
                {t("no_supplies")}
              </p>
            )}

            {/* Consumos */}
            <h5 className="text-xs md:text-sm font-semibold text-gray-600 mt-4 mb-1">
              {t("total_consumed")}:
            </h5>
            {grouped[period].consumptions.length > 0 ? (
              grouped[period].consumptions.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm md:text-base text-gray-700 border p-2 rounded mt-2 bg-gray-50">
                  {ICONS[c.type] || (
                    <FaFileInvoice className="text-gray-400 mt-1" />
                  )}
                  <div>
                    <p className="font-medium">
                      {t("consumption_types." + c.type.toUpperCase()) ||
                        t("other")}
                    </p>
                    <p className="font-medium">
                      {t("amount")}: {c.amount.toFixed(2)} €
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {t("consumption_startDate")}:{" "}
                      {formatDateToDDMMYYYY(c.startDate)}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {t("consumption_endDate")}:{" "}
                      {formatDateToDDMMYYYY(c.endDate)}
                    </p>
                    {c.url && (
                      <Link
                        href={c.url}
                        target="_blank"
                        className="text-[#440cac] underline text-xs md:text-sm">
                        {t("bill_link")}
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                {t("no_consumptions")}
              </p>
            )}

            {/* Balance final */}
            <h5 className="text-xs md:text-sm font-semibold text-gray-600 mt-4">
              {t("difference")}:
            </h5>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Wifi:</strong> €
              {((internetSupply?.amount || 0) - internetConsumption).toFixed(2)}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Suministros:</strong> €
              {((generalSupply?.amount || 0) - generalConsumption).toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TenantConsumption;
