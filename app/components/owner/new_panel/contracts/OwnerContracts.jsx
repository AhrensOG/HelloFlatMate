"use client";

import React, { useContext, useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import OwnerContractCard from "./auxiliarComponents/OwnerContractCard";
import { Context } from "@/app/context/GlobalContext";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  ACTIVE: "Activo",
  FINISHED: "Finalizado",
  CANCELLED: "Cancelado",
};

const OwnerContracts = () => {
  const { state } = useContext(Context);
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        console.log(state);
        if (!state.user || state.user?.role !== "OWNER") return;
        const res = await fetch(
          "/api/owner/new_panel/contracts?ownerId=" + state.user?.id
        );
        const data = await res.json();
        setContracts(data);
        setIsLoading(false);
      } catch (err) {
        setError("Error al cargar contratos");
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, [state.user]);

  const groupedByStatus = {
    PENDING: [],
    IN_PROGRESS: [],
    ACTIVE: [],
    FINISHED: [],
    CANCELLED: [],
  };

  contracts.forEach((c) => {
    if (groupedByStatus[c.status]) {
      groupedByStatus[c.status].push(c);
    }
  });

  return (
    <div className="w-full flex flex-col items-center px-0 md:px-6 pb-10 bg-white">
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Mis contratos
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          En este apatado puedes revisar tus contratos y gestionarlos.
        </p>
      </div>

      {isLoading && (
        <p className="text-center text-gray-500 mt-4">Cargando contratos...</p>
      )}

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {!isLoading &&
        !error &&
        Object.entries(groupedByStatus).map(
          ([status, list]) =>
            list.length > 0 && (
              <div key={status} className="w-full max-w-screen-lg mt-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {STATUS_LABELS[status]}
                </h2>
                <div className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg flex items-center gap-2">
                  <InformationCircleIcon className="w-6 h-6" />
                  <p className="text-sm">
                    Aquí verás tus contratos en estado{" "}
                    <strong>{STATUS_LABELS[status]}</strong>.
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  {list.map((contract) => (
                    <OwnerContractCard key={contract.id} data={contract} />
                  ))}
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default OwnerContracts;
