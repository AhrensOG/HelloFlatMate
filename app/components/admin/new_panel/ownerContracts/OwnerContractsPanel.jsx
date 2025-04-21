"use client";

import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import CreateOwnerContractModal from "./CreateOwnerContractModal";
import OwnerContractsTable from "./OwnerContractsTable";
import OwnerContractDetailModal from "./OwnerContractDetailModal";
import OwnerContractEditModal from "./OwnerContractEditModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const OwnerContractsPanel = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const { data: owners } = useSWR(
    "/api/admin/user/simple/OwnerContractsPanel/owners",
    fetcher
  );

  const {
    data: contracts,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/admin/ownerContracts", fetcher);

  return (
    <div className="h-screen flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Contratos con propietarios</h2>

        <div className="w-full flex gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido, email o propiedad..."
            className="border rounded px-3 py-2 w-96"
          />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-[12rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center">
            Crear contrato
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
        <OwnerContractsTable
          contracts={contracts}
          onDelete={(id) => console.log(id)}
          onEdit={(contract) => {
            setSelectedContract(contract);
            setIsEditModalOpen(true);
          }}
          isLoading={isLoading}
          error={error}
          selectedContract={setSelectedContract}
        />
      </div>

      {isCreateModalOpen && owners && (
        <CreateOwnerContractModal
          owners={owners}
          onClose={() => setIsCreateModalOpen(false)}
          mutate={mutate}
        />
      )}

      {selectedContract && (
        <OwnerContractDetailModal
          onClose={() => setSelectedContract(null)}
          contract={selectedContract}
        />
      )}

      {isEditModalOpen && (
        <OwnerContractEditModal
          contract={selectedContract}
          mutate={mutate}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedContract(null);
          }}
        />
      )}
    </div>
  );
};

export default OwnerContractsPanel;
