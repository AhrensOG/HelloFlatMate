"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import MaintenanceTable from "./MaintenanceTable";
import CreateMaintenanceModal from "./CreateMaintenanceModal";
import { toast } from "sonner";
import axios from "axios";
import EditMaintenanceModal from "./EditMaintenanceModal";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MaintenancePanel = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const {
    data: toDos,
    error: errorToDos,
    isLoading: isLoadingToDos,
    mutate,
  } = useSWR("/api/admin/to_do", fetcher, {
    refreshInterval: 5 * 60 * 1000,
  });

  const {
    data: properties,
    error: errorProperties,
    isLoading: isLoadingProperties,
  } = useSWR("/api/admin/property/simple/toDoPanel", fetcher);

  const {
    data: workers,
    error: errorWorkers,
    isLoading: isLoadingWorkers,
  } = useSWR("/api/admin/user/simple/toDoPanel/worker", fetcher);

  const {
    data: clients,
    error: errorclients,
    isLoading: isLoadingclients,
  } = useSWR("/api/admin/user/simple/toDoPanel/clients", fetcher);

  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    if (!toDos) return [];

    const searchTerm = search.toLowerCase();

    return toDos
      .slice()
      .sort((a, b) => b.id - a.id)
      .filter((task) => {
        const fullName = `${task.client?.name || ""} ${
          task.client?.lastName || ""
        }`.toLowerCase();
        const email = task.client?.email?.toLowerCase() || "";
        const serial = task.property?.serial?.toLowerCase() || "";

        return (
          fullName.includes(searchTerm) ||
          email.includes(searchTerm) ||
          serial.includes(searchTerm)
        );
      });
  }, [toDos, search]);

  const handleDeleteToDo = async (id) => {
    const toastId = toast.loading("Eliminando...");
    try {
      await axios.delete(`/api/admin/to_do?id=${id}`);
      toast.success("Tarea de mantenimiento eliminada", { id: toastId });
      await mutate();
    } catch (error) {
      console.log(error);
      toast.info("Ocurrio un error al eliminar la tarea de mantenimineto", {
        description: "Intenta nuevamente o contacta con el soporte",
        id: toastId,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Mantenimiento</h2>

        <div className="w-full flex gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido, email o propiedad..."
            className="border rounded px-3 py-2 w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-[12rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center">
            Crear mantenimiento
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
        <MaintenanceTable
          tasks={filteredTasks}
          loading={isLoadingToDos}
          error={errorToDos}
          onDelete={(id) => handleDeleteToDo(id)}
          onEdit={(task) => {
            setIsEditModalOpen(true)
            setSelectedTask(task)
          }}
        />
      </div>

      {isCreateModalOpen && (
        <CreateMaintenanceModal
          onClose={() => setIsCreateModalOpen(false)}
          clients={clients}
          workers={workers}
          properties={properties}
          mutate={mutate}
        />
      )}

      {isEditModalOpen && (
        <EditMaintenanceModal
          workers={workers}
          mutate={mutate}
          onClose={() => setIsEditModalOpen(false)}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default MaintenancePanel;
