"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";
import OwnerDashboardPaymentCard from "./auxiliarComponents/OwnerDashboardPaymentCard";
import OwnerDashboardIncidenceCard from "./auxiliarComponents/OwnerDashboardIncidenceCard";

const getYearMonthKey = (dateStr) => {
  const date = new Date(dateStr);
  return {
    year: date.getFullYear(),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`,
  };
};

const formatDateToMMYYYY = (dateStr) => {
  const date = new Date(dateStr);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${yyyy}`;
};

const OwnerDashboard = () => {
  const t = useTranslations("owner_panel.dashboard");
  const { state } = useContext(Context);
  const [earningsByYear, setEarningsByYear] = useState({});
  const [expandedYear, setExpandedYear] = useState(null);
  const [expandedMonths, setExpandedMonths] = useState({});
  const [expandedProperties, setExpandedProperties] = useState({});
  const [incidences, setIncidences] = useState([]);

  useEffect(() => {
    if (!state.user || state.user?.role !== "OWNER") return;

    const getData = async () => {
      try {
        const [propertiesRes, incidencesRes] = await Promise.all([
          axios.get(`/api/owner/new_panel/dashboard?ownerId=${state.user?.id}`),
          axios.get(
            `/api/owner/new_panel/dashboard/incidences?ownerId=${state.user?.id}`
          ),
        ]);

        setIncidences(incidencesRes.data);
        processEarnings(propertiesRes.data, incidencesRes.data);
      } catch (error) {
        console.error("Error al obtener propiedades o incidencias:", error);
      }
    };

    getData();
  }, [state]);

  const processEarnings = (properties, incidences) => {
    const yearMap = {};

    properties.forEach((property) => {
      const propertyIncidences = incidences.filter(
        (i) => i.propertyId === property.id
      );

      property.rooms.forEach((room) => {
        room.leaseOrdersRoom.forEach((order) => {
          const client = order.client;
          const periodKey = `${room.serial} | ${formatDateToMMYYYY(
            order.startDate
          )} - ${formatDateToMMYYYY(order.endDate)}`;

          (client.rentPayments || [])
            .filter((payment) => payment.leaseOrderId === order.id)
            .forEach((payment) => {
              const { year, month } = getYearMonthKey(payment.date);

              if (!yearMap[year]) yearMap[year] = {};
              if (!yearMap[year][month]) yearMap[year][month] = {};
              if (!yearMap[year][month][periodKey]) {
                yearMap[year][month][periodKey] = {
                  payments: [],
                  incidences: [],
                };
              }

              yearMap[year][month][periodKey].payments.push({
                amount: room.amountOwner || payment.amount,
                date: formatDateToDDMMYYYY(payment.date),
                concept: payment.description || payment.name,
                clientName: `${client.name} ${client.lastName}`,
              });
            });
        });
      });

      propertyIncidences.forEach((incidence) => {
        const { year, month } = getYearMonthKey(incidence.date);

        if (!yearMap[year]) yearMap[year] = {};
        if (!yearMap[year][month]) yearMap[year][month] = {};
        if (!yearMap[year][month][property.serial]) {
          yearMap[year][month][property.serial] = {
            payments: [],
            incidences: [],
          };
        }

        yearMap[year][month][property.serial].incidences.push({
          ...incidence,
        });
      });
    });

    setEarningsByYear(yearMap);
  };

  const toggleMonth = (year, month) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [year]: { ...prev[year], [month]: !prev[year]?.[month] },
    }));
  };

  const toggleProperty = (year, month, serial) => {
    setExpandedProperties((prev) => ({
      ...prev,
      [year]: {
        ...prev[year],
        [month]: {
          ...prev[year]?.[month],
          [serial]: !prev[year]?.[month]?.[serial],
        },
      },
    }));
  };

  const calculateMonthTotal = (props) => {
    return Object.values(props).reduce((acc, curr) => {
      const payments = curr.payments.reduce((a, c) => a + c.amount, 0);
      const incidences = curr.incidences.reduce((a, c) => a + c.amount, 0);
      return acc + payments - incidences;
    }, 0);
  };

  const calculateYearTotal = (months) => {
    return Object.values(months).reduce(
      (acc, props) => acc + calculateMonthTotal(props),
      0
    );
  };

  return (
    <div className="w-full p-6 bg-white">
      <h1 className="text-xl font-bold text-gray-800 mb-6">{t("title")}</h1>
      {Object.keys(earningsByYear).length === 0 ? (
        <p className="text-sm text-gray-500">{t("p_1")}</p>
      ) : (
        Object.keys(earningsByYear)
          .sort((a, b) => b - a)
          .map((year) => {
            const months = earningsByYear[year];
            const totalYear = calculateYearTotal(months);

            return (
              <motion.div
                onClick={() =>
                  setExpandedYear(expandedYear === year ? null : year)
                }
                key={year}
                className="mb-4 border rounded shadow bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-center p-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      {year}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {t("total_earnings")}: {totalYear.toFixed(2)} €
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedYear === year && (
                    <motion.div
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4">
                      {Object.keys(months)
                        .sort()
                        .map((month) => {
                          const properties = months[month];
                          const monthTotal = calculateMonthTotal(properties);
                          return (
                            <div key={month} className="mb-2">
                              <div
                                className="flex justify-between items-center cursor-pointer bg-white p-3 rounded border mb-1 shadow-sm"
                                onClick={() => toggleMonth(year, month)}>
                                <p className="font-medium text-gray-700">
                                  {month}/{year} | {t("monthly_earnings")}:{" "}
                                  {monthTotal.toFixed(2)} €
                                </p>
                              </div>

                              <AnimatePresence>
                                {expandedMonths[year]?.[month] && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="pl-4">
                                    {Object.keys(properties).map(
                                      (periodKey) => {
                                        const prop = properties[periodKey];
                                        const propTotal =
                                          prop.payments.reduce(
                                            (a, c) => a + c.amount,
                                            0
                                          ) -
                                          prop.incidences.reduce(
                                            (a, c) => a + c.amount,
                                            0
                                          );
                                        return (
                                          <div key={periodKey} className="mb-2">
                                            <div
                                              className="flex justify-between items-center cursor-pointer bg-gray-100 p-2 rounded border"
                                              onClick={() =>
                                                toggleProperty(
                                                  year,
                                                  month,
                                                  periodKey
                                                )
                                              }>
                                              <p className="font-medium">
                                                {periodKey}:{" "}
                                                {propTotal.toFixed(2)} €
                                              </p>
                                            </div>
                                            <AnimatePresence>
                                              {expandedProperties[year]?.[
                                                month
                                              ]?.[periodKey] && (
                                                <motion.div
                                                  initial={{
                                                    opacity: 0,
                                                    height: 0,
                                                  }}
                                                  animate={{
                                                    opacity: 1,
                                                    height: "auto",
                                                  }}
                                                  exit={{
                                                    opacity: 0,
                                                    height: 0,
                                                  }}
                                                  transition={{ duration: 0.2 }}
                                                  className="ml-4 mt-2 space-y-2">
                                                  {prop.payments.map(
                                                    (entry, i) => (
                                                      <OwnerDashboardPaymentCard
                                                        key={i}
                                                        entry={entry}
                                                        t={t}
                                                      />
                                                    )
                                                  )}
                                                  {prop.incidences.length >
                                                    0 && (
                                                    <div className="text-sm bg-red-50 border-red-300 border p-3 rounded">
                                                      <p className="font-semibold text-red-600">
                                                        {t("incidences")}
                                                      </p>
                                                      {prop.incidences.map(
                                                        (inc, i) => (
                                                          <OwnerDashboardIncidenceCard
                                                            key={i}
                                                            inc={inc}
                                                            t={t}
                                                          />
                                                        )
                                                      )}
                                                    </div>
                                                  )}
                                                </motion.div>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        );
                                      }
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
      )}
    </div>
  );
};

export default OwnerDashboard;
