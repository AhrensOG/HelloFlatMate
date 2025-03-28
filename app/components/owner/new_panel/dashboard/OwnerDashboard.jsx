"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";

const TYPE_LABELS = {
    MONTHLY: "Mensual",
    RESERVATION: "Reserva",
    DEPOSIT: "Depósito",
    AGENCY_FEES: "Tasa de la agencia",
    CLEANUP: "Limpieza check-out",
    GENERAL_SUPPLIES: "Suministros generales (agua, luz, gas)",
    INTERNET: "WIFI",
    OTHERS: "Otros",
};

function getMonthKey(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}`;
}

const OwnerDashboard = () => {
    const { state } = useContext(Context);
    const [propertiesWithTenants, setPropertiesWithTenants] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        const getPropertiesAndTenants = async () => {
            try {
                if (!state.user || state.user?.role !== "OWNER") return;
                const res = await axios.get(
                    "/api/owner/new_panel/property_tenants?ownerId=" +
                        state.user?.id
                );
                setPropertiesWithTenants(res.data);
                processEarnings(res.data);
            } catch (error) {
                console.error("Error en getAllProperties:", error);
            }
        };

        getPropertiesAndTenants();
    }, [state]);

    const processEarnings = (properties) => {
        let earningsMap = {};
        let detailsMap = {};

        properties.forEach((property) => {
            property.rooms.forEach((room) => {
                room.leaseOrdersRoom.forEach((order) => {
                    const client = order.client;
                    const allPayments = [
                        ...(client.rentPayments || []),
                        ...(client.supplies || []),
                    ];
                    try {
                        allPayments.forEach((payment) => {
                            const status = payment.status;
                            if (status === "APPROVED" || status === "PAID") {
                                const key = getMonthKey(payment.date);
                                if (!earningsMap[key] || !detailsMap[key]) {
                                    earningsMap[key] = {
                                        total: 0,
                                        projected: 0,
                                    };
                                    detailsMap[key] = [];
                                }
                                earningsMap[key].total += payment.amount;
                                detailsMap[key].push({
                                    amount: payment.amount,
                                    date: formatDateToDDMMYYYY(payment.date),
                                    type: payment.type || payment.name,
                                    concept:
                                        payment.description || payment.name,
                                    clientName: `${client.name} ${client.lastName}`,
                                });
                            }
                        });

                        if (order.status === "APPROVED" && order.isActive) {
                            const start = new Date(order.startDate);
                            const end = new Date(order.endDate);
                            const months =
                                (end.getFullYear() - start.getFullYear()) * 12 +
                                (end.getMonth() - start.getMonth()) +
                                1;
                            for (let i = 0; i < months; i++) {
                                const date = new Date(start);
                                date.setMonth(date.getMonth() + i);
                                const key = getMonthKey(date);
                                if (!earningsMap[key])
                                    earningsMap[key] = {
                                        total: 0,
                                        projected: 0,
                                    };
                                earningsMap[key].projected += order.price;
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            });
        });

        const sorted = Object.entries(earningsMap)
            .sort()
            .map(([key, value]) => {
                const [year, month] = key.split("-");
                return {
                    monthKey: key,
                    month: `${month}/${year}`,
                    ingresos: parseFloat(value.total.toFixed(2)),
                    proyeccion: parseFloat(value.projected.toFixed(2)),
                    detalles: detailsMap[key] || [],
                };
            });

        setMonthlyData(sorted);
    };

    return (
        <div className="w-full p-6 bg-white">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
                Rendimiento mensual de tus propiedades
            </h1>

            {monthlyData.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No hay ingresos registrados.
                </p>
            ) : (
                <>
                    <div className="w-full h-72 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="ingresos"
                                    fill="#440cac"
                                    name="Ingresos reales"
                                />
                                <Bar
                                    dataKey="proyeccion"
                                    fill="#c4b5fd"
                                    name="Proyección"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {monthlyData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: idx * 0.05,
                                }}
                                className="p-4 rounded-md border border-gray-200 shadow-sm bg-gray-50"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            {item.month}
                                        </p>
                                        <p className="text-lg font-semibold text-[#440cac]">
                                            {item.ingresos.toFixed(2)} €
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Proyección:{" "}
                                            {item.proyeccion.toFixed(2)} €
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setExpanded(
                                                expanded === idx ? null : idx
                                            )
                                        }
                                        className="text-sm text-[#440cac] underline"
                                    >
                                        {expanded === idx
                                            ? "Ocultar"
                                            : "Ver detalle"}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {expanded === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4 border-t pt-3 border-gray-200"
                                        >
                                            <p className="text-sm font-medium text-gray-700 mb-2">
                                                Detalle de ingresos:
                                            </p>
                                            <ul className="text-xs text-gray-600 flex flex-col gap-2">
                                                {item.detalles.map((det, i) => (
                                                    <li
                                                        key={i}
                                                        className="bg-white border rounded p-2 shadow-sm"
                                                    >
                                                        <p>
                                                            <strong>
                                                                Inquilino:
                                                            </strong>{" "}
                                                            {det.clientName}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Concepto:
                                                            </strong>{" "}
                                                            {det.concept}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Tipo:
                                                            </strong>{" "}
                                                            {
                                                                TYPE_LABELS[
                                                                    det.type
                                                                ]
                                                            }
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Fecha:
                                                            </strong>{" "}
                                                            {det.date}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Monto:
                                                            </strong>{" "}
                                                            {det.amount} €
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default OwnerDashboard;
