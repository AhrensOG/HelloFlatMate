import React, { useState } from "react";

export default function PaysModal({ data, onClose }) {
    const [pays, setPays] = useState(data);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Estado"); // Estado inicial

    // Función para manejar valores nulos o inexistentes
    const handleNullValue = (value) => {
        return value === null || value === undefined ? "--" : value;
    };

    // Función para formatear fechas
    function formatDateToDDMMYYYY(date) {
        if (!date) return "--"; // Devuelve "--" si no hay fecha
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    }

    // Función para manejar el cambio de estado
    const handleStatusChange = (status) => {
        switch (status) {
            case "IN_PROGRESS":
                setSelectedStatus("En progreso");
                break;
            case "APPROVED":
                setSelectedStatus("Aprobado");
                break;
            case "REJECTED":
                setSelectedStatus("Rechazado");
                break;
            case "PENDING":
                setSelectedStatus("Pendiente");
                break;
            case "PAID":
                setSelectedStatus("Pagado");
                break;
            case "NOT_PAID":
                setSelectedStatus("No Pagado");
                break;
            case "CANCELED":
                setSelectedStatus("Cancelado");
                break;
            default:
                setSelectedStatus("Estado");
                break;
        }
        setDropdownOpen(false);

        // Filtrar los pagos según el estado seleccionado
        if (status !== "ALL") {
            setPays(data.filter((lo) => lo.status === status));
        } else {
            setPays(data); // Mostrar todos los pagos si se selecciona "Todos"
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
            <div
                className="bg-white w-full mx-auto rounded shadow p-6 relative text-sm z-50 max-h-[90%] max-w-[80%] overflow-y-auto my-10 min-h-[30rem]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cierre en la esquina superior derecha */}
                <button onClick={onClose} className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    X
                </button>

                <table className="w-full border-collapse mt-6 rounded-xl">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Monto</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Fecha</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 relative">
                                {/* Filtro por estado en el encabezado */}
                                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center justify-center">
                                    {selectedStatus} <span className="ml-1">▼</span>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute left-0 mt-1 w-32 bg-white border rounded shadow-lg z-10">
                                        <button onClick={() => handleStatusChange("ALL")} className="block w-full text-left p-2 hover:bg-gray-100">
                                            Todos
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange("IN_PROGRESS")}
                                            className="block w-full text-left p-2 hover:bg-gray-100"
                                        >
                                            En progreso
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
                                        <button
                                            onClick={() => handleStatusChange("REJECTED")}
                                            className="block w-full text-left p-2 hover:bg-gray-100"
                                        >
                                            Rechazado
                                        </button>
                                        <button onClick={() => handleStatusChange("PAID")} className="block w-full text-left p-2 hover:bg-gray-100">
                                            Pagado
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange("NOT_PAID")}
                                            className="block w-full text-left p-2 hover:bg-gray-100"
                                        >
                                            No Pagado
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange("CANCELED")}
                                            className="block w-full text-left p-2 hover:bg-gray-100"
                                        >
                                            Cancelado
                                        </button>
                                    </div>
                                )}
                            </th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Tipo</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Cuota</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Room ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-40">Descripción</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">ID Propietario</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">ID Cliente</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Nombre</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Fecha de Expiración</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Fecha de Pago</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Referencia</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Descuento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pays.length > 0 ? (
                            pays.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer">
                                    <td className="border p-2 text-gray-700 text-center">{handleNullValue(item.id)}</td>
                                    <td className="border p-2 text-gray700">{handleNullValue(item.amount)}</td>
                                    <td className="border p-2 text-gray700">{formatDateToDDMMYYYY(item.date)}</td>
                                    <td
                                        className={`border p-2 text-center ${
                                            item.status === "APPROVED"
                                                ? "text-green-700"
                                                : item.status === "REJECTED"
                                                ? "text-red-700"
                                                : item.status === "IN_PROGRESS"
                                                ? "text-blue-700"
                                                : item.status === "PENDING"
                                                ? "text-yellow-700"
                                                : item.status === "PAID"
                                                ? "text-green-700"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {handleNullValue(item.status)}
                                    </td>
                                    <td className="border p-2 text-center">{handleNullValue(item.type)}</td>
                                    <td className="border p-2 text-center">{handleNullValue(item.quotaNumber)}</td>
                                    <td className="border p-2 text-center">{handleNullValue(item.paymentableId)}</td>
                                    <td className="border p-2 text-center">{handleNullValue(item.description)}</td>
                                    <td className="border p-2 text-center">{handleNullValue(item.ownerId)}</td>
                                    <td className="border p-2 text-center">{handleNullValue(item.clientId)}</td>
                                    <td className="border p-2 text-center">{handleNullValue(item.name)}</td>
                                    <td className="border p-2 text-center">{formatDateToDDMMYYYY(item.expirationDate)}</td>
                                    <td className="border p-2 text-center">{formatDateToDDMMYYYY(item.paymentDate)}</td>
                                    <td className="border p-2 text-center">{handleNullValue(item.reference)}</td>
                                    <td className="border p-2 text-center">{handleNullValue(item.discount)}</td>
                                </tr>
                            ))
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
    );
}
