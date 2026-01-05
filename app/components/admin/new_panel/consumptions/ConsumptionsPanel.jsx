import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import CreateConsumptionsModal from "./CreateConsumptionsModal";
import formatDateToDDMMYYYY from "../utils/formatDate";
import EditConsumptionModal from "./EditConsumptionModal";
import Link from "next/link";
import CreatePropertyConsumptionsModal from "./CreatePropertyConsumptionsModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const TYPE_LABELS = {
  GENERAL_SUPPLIES: "Suministros",
  INTERNET: "Wifi",
  WATER: "Agua",
  GAS: "Gas",
  ELECTRICITY: "Electricidad",
  OTHER: "Otro",
};

export default function ConsumptionsPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Nuevo: Para filtro real
  const [page, setPage] = useState(1); // Nuevo: Paginación

  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [createPropertyIsOpen, setCreatePropertyIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedConsumption, setSelectedConsumption] = useState(null);

  // SWR de Consumos con Filtros
  const {
    data: swrData,
    mutate,
    isLoading,
  } = useSWR(
    `/api/admin/consumptions?page=${page}&limit=100${
      selectedUser ? `&userId=${selectedUser.id}` : ""
    }`,
    fetcher,
    { keepPreviousData: true }
  );

  const { data: usersData } = useSWR(
    "/api/admin/user/consumptions_panel",
    fetcher
  );
  const { data: propertiesData } = useSWR(
    "/api/admin/property/consumptions_panel",
    fetcher
  );

  const handleEdit = (consumption) => {
    setSelectedConsumption(consumption);
    setEditIsOpen(true);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Eliminando...");
    try {
      await axios.delete(`/api/admin/consumptions?id=${id}`);
      await mutate();

      toast.success("Consumo eliminado con éxito", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el consumo", { id: toastId });
    }
  };

  const consumptions = swrData?.consumptions || [];

  // Lógica de búsqueda visual para el dropdown
  const filteredUsersSearch =
    searchQuery && !selectedUser
      ? (usersData || []).filter((u) =>
          `${u.name} ${u.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <div className="h-screen w-full flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Consumos</h2>
        <div className="w-full flex gap-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value) setSelectedUser(null);
              }}
              className="border rounded px-3 py-2 w-[450px]"
            />
            {filteredUsersSearch.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border rounded shadow-lg mt-1 max-h-40 overflow-auto">
                {filteredUsersSearch.map((u) => (
                  <li
                    key={u.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedUser(u);
                      setSearchQuery(`${u.name} - ${u.email}`);
                      setPage(1);
                    }}>
                    {u.name} {u.lastName} - {u.email}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setCreateIsOpen(true)}
            className="bg-[#0C1660] text-white px-3 py-2 rounded">
            Crear consumo (Room)
          </button>
          <button
            onClick={() => setCreatePropertyIsOpen(true)}
            className="bg-[#0C1660] text-white px-3 py-2 rounded">
            Crear consumo (Piso)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg bg-white">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white shadow-sm z-10">
            <tr>
              <th className="border-b p-3">Código</th>
              <th className="border-b p-3">Usuario</th>
              <th className="border-b p-3">Valor</th>
              <th className="border-b p-3">Tipo</th>
              <th className="border-b p-3">Factura</th>
              <th className="border-b p-3">Desde</th>
              <th className="border-b p-3">Hasta</th>
              <th className="border-b p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {consumptions.map((consumption) => (
              <tr key={consumption.id} className="hover:bg-gray-50 border-b">
                <td className="p-3 text-center">
                  {consumption?.leaseOrderRoom?.room?.serial || "Piso"}
                </td>
                <td className="p-3 text-center">{`${consumption?.client?.name} ${consumption?.client?.lastName}`}</td>
                <td className="p-3 text-center font-semibold">
                  € {consumption?.amount}
                </td>
                <td className="p-3 text-center">
                  {TYPE_LABELS[consumption?.type]}
                </td>
                <td className="p-3 text-center">
                  {consumption.url ? (
                    <Link
                      href={consumption.url}
                      target="_blank"
                      className="text-blue-600 underline">
                      Ver
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3 text-center">
                  {formatDateToDDMMYYYY(consumption?.startDate)}
                </td>
                <td className="p-3 text-center">
                  {formatDateToDDMMYYYY(consumption?.endDate)}
                </td>
                <td className="p-3">
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleEdit(consumption)}>
                      <PencilIcon className="size-5 text-green-600" />
                    </button>
                    <button
                      onClick={() =>
                        toast("Eliminar?", {
                          action: {
                            label: "SÍ",
                            onClick: () => handleDelete(consumption.id),
                          },
                        })
                      }>
                      <TrashIcon className="size-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER: PAGINACIÓN */}
      <div className="flex items-center justify-center px-4 py-3 bg-white border rounded-lg">
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeftIcon className="size-5" />
          </button>
          <div className="flex items-center px-4 text-sm font-medium">
            Página {page}{" "}
            {swrData?.totalPages ? `de ${swrData.totalPages}` : ""}
          </div>
          <button
            disabled={!swrData?.hasMore}
            onClick={() => setPage((p) => p + 1)}
            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>

      {createIsOpen && (
        <CreateConsumptionsModal
          onClose={() => setCreateIsOpen(false)}
          users={usersData}
          mutate={mutate}
        />
      )}
      {createPropertyIsOpen && (
        <CreatePropertyConsumptionsModal
          onClose={() => setCreatePropertyIsOpen(false)}
          properties={propertiesData}
          mutate={mutate}
        />
      )}
      {editIsOpen && (
        <EditConsumptionModal
          isOpen={editIsOpen}
          onClose={() => setEditIsOpen(false)}
          consumption={selectedConsumption}
          mutate={mutate}
        />
      )}
    </div>
  );
}
