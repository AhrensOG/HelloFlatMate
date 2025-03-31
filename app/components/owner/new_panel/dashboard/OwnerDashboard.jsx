"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import formatDate from "@/app/components/admin/new_panel/utils/formatDate";
import { useTranslations } from "next-intl";

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

const OwnerDashboard = () => {
    const t = useTranslations("owner_panel.dashboard");
    const { state } = useContext(Context);
    const [earningsByYear, setEarningsByYear] = useState({});
    const [expandedYear, setExpandedYear] = useState(null);
    const [expandedMonths, setExpandedMonths] = useState({});

    useEffect(() => {
        if (!state.user || state.user?.role !== "OWNER") return;

        const getData = async () => {
            try {
                const { data } = await axios.get(
                    `/api/owner/new_panel/property_tenants?ownerId=${state.user?.id}`
                );
                processEarnings(data);
            } catch (error) {
                console.error("Error al obtener propiedades:", error);
            }
        };

        getData();
    }, [state]);

    const processEarnings = (properties) => {
        const yearMap = {};

        properties.forEach((property) => {
            property.rooms.forEach((room) => {
                room.leaseOrdersRoom.forEach((order) => {
                    const client = order.client;
                    (client.rentPayments || []).forEach((payment) => {
                        if (
                            payment.status === "APPROVED" ||
                            payment.status === "PAID"
                        ) {
                            if (payment.type !== "MONTHLY") return;

                            const { year, month } = getYearMonthKey(
                                payment.date
                            );
                            if (!yearMap[year]) yearMap[year] = {};
                            if (!yearMap[year][month])
                                yearMap[year][month] = [];

                            yearMap[year][month].push({
                                amount: payment.amount,
                                date: formatDate(payment.date),
                                concept: payment.description || payment.name,
                                clientName: `${client.name} ${client.lastName}`,
                            });
                        }
                    });
                });
            });
        });

        setEarningsByYear(yearMap);
    };

    const toggleMonth = (year, month) => {
        setExpandedMonths((prev) => ({
            ...prev,
            [year]: {
                ...prev[year],
                [month]: !prev[year]?.[month],
            },
        }));
    };

    const calculateMonthTotal = (payments) =>
        payments.reduce((acc, curr) => acc + curr.amount, 0);

    const calculateYearTotal = (months) =>
        Object.values(months)
            .flat()
            .reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="w-full p-6 bg-white">
            <h1 className="text-xl font-bold text-gray-800 mb-6">
                {t("title")}
            </h1>

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
                                    setExpandedYear(
                                        expandedYear === year ? null : year
                                    )
                                }
                                key={year}
                                className="mb-4 border rounded shadow bg-gray-50 cursor-pointer"
                            >
                                <div className="flex justify-between items-center p-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700">
                                            {year}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {t("total_earnings")}:{" "}
                                            {totalYear.toFixed(2)}{" "}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setExpandedYear(
                                                expandedYear === year
                                                    ? null
                                                    : year
                                            )
                                        }
                                        className="text-sm text-[#440cac] underline"
                                    >
                                        {expandedYear === year
                                            ? t("hide")
                                            : t("show")}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {expandedYear === year && (
                                        <motion.div
                                            onClick={(e) => e.stopPropagation()}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-4 pb-4"
                                        >
                                            {Object.keys(months)
                                                .sort()
                                                .map((month) => {
                                                    const monthTotal =
                                                        calculateMonthTotal(
                                                            months[month]
                                                        );
                                                    return (
                                                        <div
                                                            key={month}
                                                            className="mb-2"
                                                        >
                                                            <div
                                                                className="flex justify-between items-center cursor-pointer bg-white p-3 rounded border mb-1 shadow-sm"
                                                                onClick={() =>
                                                                    toggleMonth(
                                                                        year,
                                                                        month
                                                                    )
                                                                }
                                                            >
                                                                <p className="font-medium text-gray-700">
                                                                    {month}/
                                                                    {year} |{" "}
                                                                    {t(
                                                                        "monthly_earnings"
                                                                    )}
                                                                    :{" "}
                                                                    {monthTotal.toFixed(
                                                                        2
                                                                    )}{" "}
                                                                    €
                                                                </p>
                                                                <span className="text-sm text-[#440cac] underline">
                                                                    {expandedMonths[
                                                                        year
                                                                    ]?.[month]
                                                                        ? t(
                                                                              "hide"
                                                                          )
                                                                        : t(
                                                                              "show"
                                                                          )}
                                                                </span>
                                                            </div>

                                                            <AnimatePresence>
                                                                {expandedMonths[
                                                                    year
                                                                ]?.[month] && (
                                                                    <motion.ul
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
                                                                        transition={{
                                                                            duration: 0.2,
                                                                        }}
                                                                        className="text-sm text-gray-700 space-y-2 ml-4"
                                                                    >
                                                                        {months[
                                                                            month
                                                                        ].map(
                                                                            (
                                                                                entry,
                                                                                i
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className="bg-gray-100 p-3 rounded border"
                                                                                >
                                                                                    <p>
                                                                                        <strong>
                                                                                            {t(
                                                                                                "p_3"
                                                                                            )}
                                                                                        </strong>{" "}
                                                                                        {
                                                                                            entry.clientName
                                                                                        }
                                                                                    </p>
                                                                                    <p>
                                                                                        <strong>
                                                                                            {t(
                                                                                                "p_4"
                                                                                            )}
                                                                                        </strong>{" "}
                                                                                        {
                                                                                            entry.concept
                                                                                        }
                                                                                    </p>
                                                                                    <p>
                                                                                        <strong>
                                                                                            {t(
                                                                                                "p_6"
                                                                                            )}
                                                                                        </strong>{" "}
                                                                                        {
                                                                                            entry.date
                                                                                        }
                                                                                    </p>
                                                                                    <p>
                                                                                        <strong>
                                                                                            {t(
                                                                                                "p_7"
                                                                                            )}
                                                                                        </strong>{" "}
                                                                                        {entry.amount.toFixed(
                                                                                            2
                                                                                        )}{" "}
                                                                                        €
                                                                                    </p>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </motion.ul>
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
