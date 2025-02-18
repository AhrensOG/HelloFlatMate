import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import formatDateToDDMMYYYY from "../utils/formatDate";
import RentalPeriodModal from "./RentalPeriodModal";
import CreateRentalPeriodModal from "./CreateRentalModal";
import { PencilIcon } from "@heroicons/react/24/outline";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function RentalPeriodsPanel({ data }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [isOpenCreate, setIsOpenCreate] = useState(false);

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/rental_period", fetcher, {
        fallbackData: data,
        refreshInterval: 600000,
    });

    const handleOpenModal = (period) => {
        setSelectedPeriod(period);
        setIsOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/document?id=${id}`);
            const updatedData = swrData.filter((item) => item.id !== id);
            mutate(updatedData);
        } catch (error) {
            throw error;
        }
    };

    const handleEdit = async (period) => {
        try {
            const enstarDate = new Date(period.startDate);
            const endDate = new Date(period.endDate);
            const response = await axios.put(`/api/admin/rental_period`, {
                id: period.id,
                startDate: enstarDate,
                endDate: endDate,
            });

            if (response.status === 200) {
                // Actualizar la cache de SWR directamente
                const updatedData = swrData?.rentalPeriods?.map((item) =>
                    item.id === period.id
                        ? {
                              ...item,
                              startDate: period.startDate,
                              endDate: period.endDate,
                          }
                        : item
                );
                mutate(updatedData, false);
            } else {
                toast.error("Error al actualizar el periodo de renta.");
            }
        } catch (error) {
            toast.error("Error al actualizar el periodo de renta.");
        } finally {
            setIsOpen(false);
        }
    };

    const handleCreate = async (period) => {
        try {
            const response = await axios.post(`/api/admin/rental_period`, [
                {
                    startDate: period.startDate,
                    endDate: period.endDate,
                },
            ]);

            if (response.status === 200) {
                // Invalidar la cache para forzar una nueva petición
                mutate();
                toast.success("Periodo de renta creado correctamente!");
            } else {
                toast.error("Error al crear el periodo de renta.");
            }
        } catch (error) {
            toast.error("Error al crear el periodo de renta.");
            console.error("Error al crear el periodo de renta:", error);
        } finally {
            setIsOpenCreate(false);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Periodos de renta</h2>
                <button className="bg-[#0C1660] text-white px-4 py-2 rounded" onClick={() => setIsOpenCreate(true)}>
                    Crear nuevo periodo
                </button>
            </div>
            <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Fecha de inicio</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Fecha de finalizacion</th>
                            <th className="border border-t-0 p-2 w-24 text-center font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {swrData?.rentalPeriods &&
                            swrData?.rentalPeriods?.map((period) => (
                                <tr
                                    key={period.id}
                                    className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => {
                                        if (period.type === "CONTRACT") {
                                            window.open(period.url, "_blank");
                                        } else if (period.type === "ROSTER") {
                                            window.open(period.urls[0], "_blank");
                                        }
                                    }}
                                >
                                    <td className="border p-2 text-gray-700 text-center">{period.id}</td>
                                    <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(period.startDate)}</td>
                                    <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(period.endDate)}</td>
                                    <td className="border p-2 text-gray-700 text-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenModal(period);
                                            }}
                                        >
                                            <PencilIcon title="Editar" className="size-6 text-green-500"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {isOpen && <RentalPeriodModal data={selectedPeriod} isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleEdit} />}
            {isOpenCreate && <CreateRentalPeriodModal isOpen={isOpenCreate} onClose={() => setIsOpenCreate(false)} onSave={handleCreate} />}
        </div>
    );
}
