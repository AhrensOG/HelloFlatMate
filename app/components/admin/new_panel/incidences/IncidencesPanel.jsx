"use client";

import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import CreateIncidenceModal from "./CreateIncidenceModal";
import IncidencesTable from "./IncidencesTable";
import { toast } from "sonner";
import EditIncidenceModal from "./EditIncidenceModal";

const fetcher = (url) => fetch(url).then((res) => res.json());

const IncidencesPanel = () => {
    const [owners, setOwners] = useState([]);
    const [properties, setProperties] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedIncidence, setSelectedIncidence] = useState(null);

    const {
        data: incidencesData,
        error,
        isLoading,
    } = useSWR("/api/admin/incidences", fetcher, {
        refreshInterval: 5 * 60 * 1000,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ownersRes, propertiesRes] = await Promise.all([
                    fetch("/api/admin/user/simple/incidencesPanel/owner"),
                    fetch("/api/admin/property/simple/incidencesPanel"),
                ]);

                if (!ownersRes.ok || !propertiesRes.ok) {
                    throw new Error("Error en la carga de datos");
                }

                const ownersData = await ownersRes.json();
                const propertiesData = await propertiesRes.json();

                setOwners(ownersData);
                setProperties(propertiesData);
            } catch (err) {
                console.error("Error al cargar datos del panel:", err);
                toast.info(
                    "Ocurrio un error al obtener las propiedades y los propietarios",
                    {
                        description:
                            "ES posible que experimente errores al intentar crear una incidencia",
                    }
                );
            }
        };

        fetchData();
    }, []);

    const handleDeleteIncidence = async (id) => {
        const toastId = toast.loading("Eliminando...");
        try {
            await fetch(`/api/admin/incidence/${id}`, {
                method: "DELETE",
            });
            toast.success("Incidencia eliminada exitosamente", { id: toastId });
        } catch (error) {
            console.error("Error al eliminar la incidencia:", error);
            toast.error("Error al eliminar la incidencia", { id: toastId });
        }
    };

    const handleEditIncidence = (incidence) => {
        setSelectedIncidence(incidence);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedIncidence(null);
        setIsEditModalOpen(false);
    };

    return (
        <div className="h-screen flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Chats</h2>

                <div className="w-full flex gap-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido, email o room..."
                        className="border rounded px-3 py-2 w-96"
                    />
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-[11rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center"
                    >
                        Crear incidencia
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
                <IncidencesTable
                    incidences={incidencesData || []}
                    loading={isLoading}
                    error={error}
                    onDelete={handleDeleteIncidence}
                    onEdit={handleEditIncidence}
                />
            </div>
            {isCreateModalOpen && (
                <CreateIncidenceModal
                    owners={owners}
                    properties={properties}
                    onClose={() => setIsCreateModalOpen(false)}
                    mutate={mutate}
                />
            )}

            {isEditModalOpen && (
                <EditIncidenceModal
                    onClose={handleCloseEditModal}
                    incidence={selectedIncidence}
                    mutate={mutate}
                />
            )}
        </div>
    );
};

export default IncidencesPanel;
