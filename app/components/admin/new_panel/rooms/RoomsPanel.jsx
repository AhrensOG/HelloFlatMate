import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function RoomsPanel({ data, filteredOrders, handleApprove, handleReject, handleOpenModal }) {
    console.log(data);

    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/lease_order", fetcher, {
        fallbackData: data,
        refreshInterval: 60000,
    });

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Pre-reservas</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por código, nombre, apellido, email o estado..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-3 py-2 w-[450px]"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Serial</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Nombre</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Precio</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Zona</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Es?</th>
                            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Status</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">Parejas?</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-52">Direccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data &&
                        data?.map((lo) => (
                            <tr
                                key={lo.id}
                                className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => handleOpenModal(lo)}
                            >
                                <td className="border p-2 text-gray-700 text-center">{lo.id}</td>
                                <td className="border p-2 text-gray-700 text-left">{`${lo.client?.name} ${lo.client?.lastName}`}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo.client?.country}</td>
                                <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo.client?.birthDate)}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo.client?.reasonForValencia}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo.room?.serial}</td>
                                <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo.date)}</td>
                                <td className={`${lo.status === "IN_PROGRESS" ? "text-blue-700" : "text-red-700"} border p-2 w-36 text-center`}>
                                    {lo.status === "IN_PROGRESS" ? "En progreso" : "Rechazada"}
                                </td>
                                <td className="border p-2 text-gray-700 text-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleApprove(lo.id, lo.room?.id);
                                        }}
                                        className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                                    >
                                        Aprobar
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleReject(lo.id, lo.room?.id);
                                        }}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Rechazar
                                    </button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
