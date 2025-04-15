"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import MaintenanceTable from "./MaintenanceTable"; // Asegurate de ajustar el path si está en otra carpeta

const fetcher = (url) => fetch(url).then((res) => res.json());

const MaintenancePanel = () => {
  const {
    data: toDos,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/admin/to_do", fetcher, {
    refreshInterval: 5 * 60 * 1000,
  });

  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    if (!toDos) return [];
    return toDos.filter((task) => {
      const fullName = `${task.client?.name || ""} ${
        task.client?.lastName || ""
      }`.toLowerCase();
      const email = task.client?.email?.toLowerCase() || "";
      const serial = task.property?.serial?.toLowerCase() || "";
      const searchTerm = search.toLowerCase();

      return (
        fullName.includes(searchTerm) ||
        email.includes(searchTerm) ||
        serial.includes(searchTerm)
      );
    });
  }, [toDos, search]);

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
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
        <MaintenanceTable
          tasks={filteredTasks}
          loading={isLoading}
          error={error}
          onDelete={(id) => console.log("delete", id)}
          onEdit={(task) => console.log("edit", task)}
        />
      </div>
    </div>
  );
};

export default MaintenancePanel;
