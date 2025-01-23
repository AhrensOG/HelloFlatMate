import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        return value === null || value === undefined ? "--" : value;
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
            <div
                className="bg-white w-full mx-auto rounded shadow p-6 relative text-sm z-50 max-h-[90%] max-w-[90%] overflow-y-auto my-10 min-h-[30rem]"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    X
                </button>

                <table className="w-full border-collapse mt-6 rounded-xl">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[6rem]">ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Monto</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Fecha</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 relative ml-4 w-[7rem]">
                                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center justify-center w-full">
                                    {selectedStatus} <span className="ml-1">▼</span>
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
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Room</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[14rem]">Descripción</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[8rem]">Nombre</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Fecha de Expiración</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Fecha de Pago</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[10rem]">Referencia</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-[7rem]">Descuento</th>
                        </tr>
                    </thead>

                    <AnimatePresence>
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
                                                    Lease Order ID: {handleNullValue(group[0]?.leaseOrderId)} / Room ID:{" "}
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
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <td className="border p-2 text-gray-700 text-center">{handleNullValue(item.id)}</td>
                                                            <td className="border p-2 text-gray700">{handleNullValue(item.amount)}</td>
                                                            <td className="border p-2 text-gray700">{formatDateToDDMMYYYY(item.date)}</td>
                                                            <td
                                                                className={`border p-2 text-center ${
                                                                    item.status === "APPROVED" || item.status === "PAID"
                                                                        ? "text-green-700"
                                                                        : "text-yellow-700"
                                                                }`}
                                                            >
                                                                {handleNullValue(
                                                                    item.status === "PAID" || item.status === "APPROVED" ? "PAGADO" : "PENDIENTE"
                                                                )}
                                                            </td>
                                                            <td className="border p-2 text-center">{handleNullValue(item.type)}</td>
                                                            <td className="border p-2 text-center">
                                                                {handleNullValue(
                                                                    calculateMonthsBetweenDatesAndNames(
                                                                        item.leaseOrderInfo.startDate,
                                                                        item.leaseOrderInfo.endDate
                                                                    ).months[item.quotaNumber - 1]
                                                                )}
                                                            </td>
                                                            <td className="border p-2 text-center">
                                                                {handleNullValue(item.leaseOrderInfo.room.serial)}
                                                            </td>
                                                            <td className="border p-2 text-center">{handleNullValue(item.description)}</td>
                                                            <td className="border p-2 text-center">{handleNullValue(item.name)}</td>
                                                            <td className="border p-2 text-center">{formatDateToDDMMYYYY(item.expirationDate)}</td>
                                                            <td className="border p-2 text-center">{formatDateToDDMMYYYY(item.paymentDate)}</td>
                                                            <td className="border p-2 text-center">{handleNullValue(item.reference)}</td>
                                                            <td className="border p-2 text-center">{handleNullValue(item.discount)}</td>
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
                    </AnimatePresence>
                </table>
            </div>
        </div>
    );
}
