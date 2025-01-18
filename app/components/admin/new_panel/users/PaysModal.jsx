import React, { useState } from "react";

export default function PaysModal({ data, onClose }) {
    console.log(data);

    const [pays, setPays] = useState(data);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Estado"); // Estado inicial

    // Función de formato de fecha (ejemplo)
    function formatDateToDDMMYYYY(date) {
        if (!date) return "";
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
            default:
                setSelectedStatus("Estado");
                break;
        }
        setDropdownOpen(false);
        if (status !== "ALL") {
            setPays(data.filter((lo) => lo.status === status));
        } else {
            setPays(data);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
            <div
                className="bg-white w-full mx-auto rounded shadow p-6 relative text-sm z-50 max-h-[90%] max-w-[80%] overflow-y-auto my-10 min-h-[30rem]"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    X
                </button>

                <table className="w-full border-collapse mt-6 rounded-xl">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Usuario</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Propiedad</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Check In</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Check Out</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Precio</th>
                            <th className="border border-t-0 p-2 w-36 text-center font-semibold text-gray-700 relative">
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
                                            onClick={() => handleStatusChange("REJECTED")}
                                            className="block w-full text-left p-2 hover:bg-gray-100"
                                        >
                                            Rechazado
                                        </button>
                                    </div>
                                )}
                            </th>
                            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Revisado?</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">Firmado?</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {pays.length > 0 ? (
                            pays.map((lo) => (
                                <tr
                                    key={lo.id}
                                    className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => console.log(`Selected order ID: ${lo.id}`)} // Reemplaza esto con tu lógica
                                >
                                    <td className="border p-2 text-gray-700 text-center">{lo.id}</td>
                                    <td className="border p-2 text-gray-700 text-left">{`${lo.client?.name} ${lo.client?.lastName}`}</td>
                                    <td className="border p-2 text-gray-700 text-center">{lo.property.serial}</td>
                                    <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo.startDate)}</td>
                                    <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo.endDate)}</td>
                                    <td className="border p-2 text-gray-700 text-center">{lo.price}</td>
                                    <td
                                        className={`${
                                            lo.status === "IN_PROGRESS"
                                                ? "text-blue-700"
                                                : lo.status === "APPROVED"
                                                ? "text-green-700"
                                                : "text-red-700"
                                        } border p-2 w-auto text-center`}
                                    >
                                        {lo.status === "IN_PROGRESS" ? "En progreso" : lo.status === "APPROVED" ? "Aprobado" : "Rechazado"}
                                    </td>
                                    <td className="border p-2 text-gray-700 text-center">{lo.inReview ? "Si" : "No"}</td>
                                    <td className="border p-2 text-gray-700 text-center">{lo.signed ? "Si" : "No"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="border p-2 text-gray-700 text-center">
                                    No se encontraron reservas
                                </td>
                            </tr>
                        )}
                    </tbody> */}
                </table>
            </div>
        </div>
    );
}
