"use client";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaWater, FaBolt, FaFire, FaWifi, FaFileInvoice } from "react-icons/fa";
import { Context } from "@/app/context/GlobalContext";
import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ICONS = {
    WATER: <FaWater className="text-blue-500" />,
    ELECTRICITY: <FaBolt className="text-yellow-500" />,
    GAS: <FaFire className="text-red-500" />,
    INTERNET: <FaWifi className="text-green-500" />,
    GENERAL_SUPPLIES: <FaFileInvoice className="text-gray-500" />,
};

const SuppliesV2 = () => {
    const { state } = useContext(Context);
    const user = state.user;
    const [groupedData, setGroupedData] = useState({});
    const t = useTranslations("user_profile_v2.supplies");

    const LABELS = {
        WATER: t("water"),
        ELECTRICITY: t("electricity"),
        GAS: t("gas"),
        INTERNET: t("internet"),
        GENERAL_SUPPLIES: t("general_supplies"),
        OTHER: t("others"),
    };

    useEffect(() => {
        if (!user) return;

        const roomsData = {};
        user.consumptions.forEach((consumption) => {
            const { amount, url, type, period, leaseOrderRoomId, startDate, endDate } = consumption;
            const leaseOrder = user.leaseOrdersRoom.find((order) => order.id === leaseOrderRoomId);
            if (!leaseOrder) return;

            const roomSerial = leaseOrder.room.serial;
            if (!roomsData[roomSerial]) roomsData[roomSerial] = { consumptions: {}, supplies: {} };

            if (!roomsData[roomSerial].consumptions[period]) roomsData[roomSerial].consumptions[period] = [];
            roomsData[roomSerial].consumptions[period].push({
                amount,
                url,
                type,
                startDate,
                endDate,
            });
        });

        user.supplies.forEach((supply) => {
            if (["GENERAL_SUPPLIES", "INTERNET"].includes(supply.type)) {
                const leaseOrder = user.leaseOrdersRoom.find((order) => order.id === supply.leaseOrderId);
                if (!leaseOrder) return;

                const roomSerial = leaseOrder.room.serial;
                if (!roomsData[roomSerial]) roomsData[roomSerial] = { consumptions: {}, supplies: {} };

                const period = supply.name.includes("1Q") ? "1Q" : "2Q";
                if (!roomsData[roomSerial].supplies[period]) roomsData[roomSerial].supplies[period] = [];
                roomsData[roomSerial].supplies[period].push(supply);
            }
        });

        setGroupedData(roomsData);
    }, [user]);

    return (
        <div className="space-y-8 bg-white p-6">
            <div>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">{t("h1")}</h1>
                <p className="text-gray-600 mb-6 text-sm">{t("p_1")}</p>
            </div>
            {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map((serial) => (
                    <motion.div
                        key={serial}
                        className="bg-white hover:shadow-md duration-300 rounded-xl p-8 border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-lg font-semibold text-[#440cac] mb-4">
                            {t("code")} {serial}
                        </h2>

                        {Object.keys(groupedData[serial].supplies).map((period) => (
                            <div key={period} className="mb-8 p-6 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-[#440cac] mb-4">
                                    {t("period")} {period}
                                </h3>

                                <h4 className="font-semibold mb-2">{t("h4")}</h4>
                                {groupedData[serial].supplies[period].length > 0 ? (
                                    groupedData[serial].supplies[period].map((supply, idx) => (
                                        <p key={idx} className="text-sm font-medium">
                                            {supply.name}: €{supply.amount.toFixed(2)}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">{t("p_2")}</p>
                                )}

                                <h4 className="font-semibold mt-6 mb-2">{t("h4_2")}</h4>
                                {groupedData[serial].consumptions[period]?.length > 0 ? (
                                    groupedData[serial].consumptions[period].map((consumption, idx) => (
                                        <div key={idx} className="p-4 border rounded-lg flex items-center gap-4 bg-white shadow-sm mb-2">
                                            {ICONS[consumption.type] || <FaFileInvoice className="text-gray-400" />}
                                            <div>
                                                <p className="text-sm font-semibold">{LABELS[consumption.type]}</p>
                                                <p className="text-sm text-gray-600">
                                                    {t("from")} {formatDateToDDMMYYYY(consumption.startDate)} - {t("to")}{" "}
                                                    {formatDateToDDMMYYYY(consumption.endDate)}
                                                </p>
                                                <p className="font-bold text-[#440cac]">€{consumption.amount.toFixed(2)}</p>
                                                {consumption.url && (
                                                    <Link
                                                        href={consumption.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 text-sm underline"
                                                    >
                                                        {t("show_bill")}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">{t("p_3")}</p>
                                )}

                                <h4 className="font-semibold mt-6 mb-2">{t("h4_3")}</h4>
                                {groupedData[serial].supplies[period].map((supply) => {
                                    const totalConsumption =
                                        groupedData[serial].consumptions[period]
                                            ?.filter(
                                                (c) =>
                                                    (c.type === "INTERNET" && supply.type === "INTERNET") ||
                                                    (c.type !== "INTERNET" && supply.type === "GENERAL_SUPPLIES")
                                            )
                                            .reduce((acc, curr) => acc + curr.amount, 0) || 0;

                                    return (
                                        <p key={supply.name} className="text-sm font-semibold text-[#440cac]">
                                            {supply.name}: €{(supply.amount - totalConsumption).toFixed(2)}
                                        </p>
                                    );
                                })}
                            </div>
                        ))}
                    </motion.div>
                ))
            ) : (
                <div className="text-center text-gray-500 p-8">{t("p_4")}</div>
            )}
        </div>
    );
};

export default SuppliesV2;
