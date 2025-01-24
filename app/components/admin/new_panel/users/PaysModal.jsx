import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const SUPPLY_TYPE_LABELS = {
    WATER: "Agua",
    GAS: "Gas",
    ELECTRICITY: "Electricidad",
    EXPENSES: "Expensas",
    INTERNET: "WIFI",
    AGENCY_FEES: "Tasa de la agencia",
    CLEANUP: "Limpieza check-out",
    OTHERS: "Otros",
    DEPOSIT: "Depósito",
    GENERAL_SUPPLIES: "Suministros generales (agua, luz, gas)",
    MONTHLY: "Mensual",
    RESERVATION: "Reserva",
  };

export default function PaysModal({ data, onClose }) {
    const [pays, setPays] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Estado");
    const [expandedGroups, setExpandedGroups] = useState({}); // Estado para manejar grupos expandidos

    // Secionar los pagos dependiendo de la leasOrder
    const groupPaysByLeaseOrder = (pays) => {
        const grouped = pays.reduce((acc, pay) => {
            const key = pay.leaseOrderId;
            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(pay);
            return acc;
        }, {});
        return Object.values(grouped);
    };

    // Orden de prioridad para los tipos
    const orderPriority = ["DEPOSIT", "AGENCY_FEES", "GENERAL_SUPPLIES", "INTERNET", "RESERVATION", "MONTHLY", "CLEANUP"];

    useEffect(() => {
        const sortedData = groupPaysByLeaseOrder(sortPays(data));
        setPays(sortedData);

        // Inicializar todos los grupos como expandidos por defecto
        const initialExpandedGroups = sortedData.reduce((acc, _, index) => {
            acc[index] = true;
            return acc;
        }, {});
        setExpandedGroups(initialExpandedGroups);
    }, [data]);

    const handleGroupToggle = (groupIndex) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupIndex]: !prev[groupIndex],
        }));
    };

    // Función para manejar valores nulos o inexistentes
    const handleNullValue = (value) => {
        return value === null || value === undefined ? "-" : value;
    };

    // Nombres de meses en español
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Función para calcular meses y actualizar el estado con los nombres de los meses
    const calculateMonthsBetweenDatesAndNames = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        let current = new Date(start);
        const monthsArray = [];

        while (current <= end) {
            monthsArray.push(monthNames[current.getMonth()]);
            current.setMonth(current.getMonth() + 1);
        }

        return {
            months: monthsArray,
            monthsCount: monthsArray.length,
        };
    };

    // Función para ordenar los pagos según el criterio
    const sortPays = (pays) => {
        const quotaNumber = pays.reduce((acc, item) => {
            if (item.quotaNumber) {
                return (acc += 1);
            }
            return acc;
        }, 0);

        // Dividir pagos en dos grupos: primer período y 2Q
        const firstPeriod = pays
            .filter((item) => {
                if (item?.quotaNumber) {
                    return item.quotaNumber <= quotaNumber / 2;
                } else if (!item.name?.includes("2Q") && item.type !== "CLEANUP") {
                    return item;
                }
            })
            .sort((a, b) => a?.quotaNumber - b?.quotaNumber);

        const secondPeriod = pays
            .filter((item) => {
                if (item?.quotaNumber) {
                    return item.quotaNumber > quotaNumber / 2;
                } else if (item.name?.includes("2Q")) {
                    return item;
                }
            })
            .sort((a, b) => a?.quotaNumber - b?.quotaNumber);
        // Ordenar cada grupo según la prioridad
        const sortedFirstPeriod = firstPeriod.sort((a, b) => {
            const priorityA = orderPriority.indexOf(a.type);
            const priorityB = orderPriority.indexOf(b.type);
            return priorityA - priorityB;
        });

        const sortedSecondPeriod = secondPeriod.sort((a, b) => {
            const priorityA = orderPriority.indexOf(a.type);
            const priorityB = orderPriority.indexOf(b.type);
            return priorityA - priorityB;
        });

        return [...sortedFirstPeriod, ...sortedSecondPeriod];
    };

    // Función para manejar el cambio de estado
    const handleStatusChange = (status) => {
        switch (status) {
            case "APPROVED":
                setSelectedStatus("Aprobado");
                break;
            case "PENDING":
                setSelectedStatus("Pendiente");
                break;
            case "PAID":
                setSelectedStatus("Pagado");
                break;
            default:
                setSelectedStatus("Estado");
                break;
        }
        setDropdownOpen(false);

        if (status !== "ALL") {
            setPays(data.filter((lo) => lo.status === status));
        } else {
            setPays(sortPays(data)); // Reordenar y mostrar todos los pagos si se selecciona "Todos"
        }
    };

    // Función para formatear fechas
    const formatDateToDDMMYYYY = (date) => {
        if (!date) return "--";
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex  justify-center items-center" onClick={onClose}>
            <div
                className="flex justify-center items-start bg-white w-full rounded shadow p-6 text-sm z-50 max-h-[90%] max-w-[90%] h-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-1 right-1 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center">
                    X
                </button>
                <div className="flex-1 h-full overflow-auto overflow-y-scroll border rounded-lg contain-inline-size">
                    <table className="min-w-full border-collapse rounded-xl relative">
                        <thead>
                            <tr className="sticky top-0 bg-white">
                                <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Room</th>
                                <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Fecha</th>
                                <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Importe</th>
                                <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 relative ml-4 w-[7rem]">
                                    <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center justify-center w-full gap-2">
                                        {selectedStatus} <ChevronDownIcon className="size-3"/>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute left-0 mt-1 w-32 bg-white border rounded shadow-lg z-10">
                                            <button onClick={() => handleStatusChange("ALL")} className="block w-full text-left p-2 hover:bg-gray-100">
                                                Todos
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange("APPROVED")}
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                            >
                                                Aprobado
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange("PENDING")}
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                            >
                                                Pendiente
                                            </button>
                                            <button onClick={() => handleStatusChange("PAID")} className="block w-full text-left p-2 hover:bg-gray-100">
                                                Pagado
                                            </button>
                                        </div>
                                    )}
                                </th>
                                <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[11rem]">Tipo</th>
                                <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Mes</th>
                                {/* <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[14rem]">Descripción</th> */}
                                <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[8rem]">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pays.length > 0 ? (
                                pays.map((group, groupIndex) => {
                                    return (
                                        <React.Fragment key={groupIndex}>
                                            {/* Fila de encabezado del grupo */}
                                            <tr
                                                onClick={() => handleGroupToggle(groupIndex)} // Alternar el estado del despliegue
                                                className="bg-gray-200 cursor-pointer"
                                            >
                                                <td colSpan={13} className="border p-2 text-gray-700 text-center font-bold">
                                                    Orden Nº:{" "} {handleNullValue(group[0]?.leaseOrderId)} / Room:{" "}
                                                    {handleNullValue(group[0]?.leaseOrderInfo.room.serial)}
                                                </td>
                                            </tr>

                                            {/* Filas animadas de pagos del grupo */}
                                            <AnimatePresence>
                                                {expandedGroups[groupIndex] &&
                                                    group.map((item, itemIndex) => (
                                                        <motion.tr
                                                            key={item.id} // Usa un ID único para evitar conflictos
                                                            className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <td className="border p-2 text-center">
                                                                {handleNullValue(item.leaseOrderInfo.room.serial)}
                                                            </td>
                                                            <td className="border p-2 text-center text-gray700">{formatDateToDDMMYYYY(item.date)}</td>
                                                            <td className="border p-2 text-center text-gray700">{handleNullValue(item.amount)} €</td>
                                                            <td
                                                                className={`border p-2 text-center font-bold ${
                                                                    item.status === "APPROVED" || item.status === "PAID"
                                                                        ? "text-green-700"
                                                                        : "text-yellow-700"
                                                                }`}
                                                            >
                                                                {handleNullValue(
                                                                    item.status === "PAID" || item.status === "APPROVED" ? "Pagado" : "Pendiente"
                                                                )}
                                                            </td>
                                                            <td className="border p-2 text-center">{SUPPLY_TYPE_LABELS[handleNullValue(item.type)] || "-"}</td>
                                                            <td className="border p-2 text-center">
                                                                {handleNullValue(
                                                                    calculateMonthsBetweenDatesAndNames(
                                                                        item.leaseOrderInfo.startDate,
                                                                        item.leaseOrderInfo.endDate
                                                                    ).months[item.quotaNumber - 1]
                                                                )}
                                                            </td>
                                                            {/* <td className="border p-2 text-center">{handleNullValue(item.description)}</td> */}
                                                            <td className="border p-2 text-center">{handleNullValue(item.name)}</td>
                                                        </motion.tr>
                                                    ))}
                                            </AnimatePresence>
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={15} className="border p-2 text-gray-700 text-center">
                                        No se encontraron registros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
