import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import RoomEditModal from "./RoomEditModal";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronDownIcon, PencilIcon, TrashIcon, WrenchIcon } from "@heroicons/react/24/outline";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const TYPOLOGY_LABELS = {
    MIXED: "Mixto",
    ONLY_WOMEN: "Solo chicas",
    ONLY_MEN: "Solo chicos",
};

export default function RoomsPanel() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("Estado");

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/room", fetcher, {
        refreshInterval: 600000,
    });

    const {
      data: rentalPeriods,
      error: rentalPeriodsError,
      isLoading: rentalPeriodsLoading,
  } = useSWR("/api/admin/rental_period", fetcher);

    const handleOpenModal = (room) => {
        setSelectedRoom(room);
        setIsOpen(true);
    };

    const filteredData = swrData
    ?.filter((room) => {
      const matchesSearch = [room.id, room.serial, room.name, room.zone, room.type]
        .map((field) => field?.toString().toLowerCase())
        .some((field) => field?.includes(searchQuery.toLowerCase()));
  
      const matchesStatus =
        selectedStatusFilter === "all"
          ? true
          : selectedStatusFilter === "active"
          ? room.isActive === true
          : selectedStatusFilter === "inactive"
          ? room.isActive === false
          : true;
  
      return matchesSearch && matchesStatus;
    })
    ?.sort((a, b) => (a.serial || "").localeCompare(b.serial || ""));  

    const handleOnsave = async (data) => {
      const toastId = toast.loading("Guardando cambios...");
      const { selectedRentalPeriodIds = [], ...roomData } = data;
    
      try {
        await axios.put(`/api/admin/room/new_panel?id=${selectedRoom.id}`, roomData);
    
        if (selectedRentalPeriodIds.length > 0) {
          const rentalItems = selectedRentalPeriodIds.map((rentalPeriodId) => ({
            relatedId: selectedRoom.id,
            relatedType: "ROOM",
            rentalPeriodId,
          }));
    
          await axios.post("/api/admin/rental_item", rentalItems);
        }
    
        toast.success("Cambios guardados", { id: toastId });
        await mutate();
        setIsOpen(false);
      } catch (e) {
        toast.info("Error al guardar los cambios", { id: toastId });
        throw e;
      }
    };

    const handleDeleteRentalItem = async (id) => {
      const toastId = toast.loading("Eliminando...");  
      try {
            await axios.delete(`/api/admin/rental_item?`, { data: id });
            toast.success("Periodo de alquiler eliminado con éxito", { id: toastId });
            await mutate();
            setIsOpen(false)
        } catch (error) {
            console.error("Error deleting rental item:", error);
            toast.info("Error al eliminar el periodo de alquiler", { id: toastId });
        }
    };

    const handleDelete = async (id) => {
      const toastId = toast.loading("Eliminado habitación...")
        try {
            await axios.delete(`/api/admin/room?`, { data: id });
            const updatedData = swrData.filter((item) => item.id !== id);
            await mutate(updatedData);
            toast.success("Habitación eliminada correctamente", { id: toastId })
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.info("Ocurrio un error al eliminar la habitación", { description: "Intenta nuevamente o contacta al soporte.", id: toastId })
        }
    };

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Habitaciones</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por código, nombreo o estado..."
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
                            {/* <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th> */}
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Código</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Precio</th>
                            <th className="border border-t-0 p-2 w-48 text-center font-semibold text-gray-700">Inquilino</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700 relative">
                                <div className="w-full h-full flex items-center justify-center gap-1">
                                    ¿Activo?
                                    <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
                                        <ChevronDownIcon className="size-4" />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute left-0 top-9 mt-1 w-full bg-white border rounded shadow-lg z-10">
                                            <button
                                                onClick={() => {
                                                    setSelectedStatusFilter("all");
                                                    setDropdownOpen(false);
                                                }}
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                            >
                                                Todos
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedStatusFilter("active");
                                                    setDropdownOpen(false);
                                                }}
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                            >
                                                Activo
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedStatusFilter("inactive");
                                                    setDropdownOpen(false);
                                                }}
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                            >
                                                Inactivo
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Zona</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Tipo</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-52">Direccion</th>
                            <th className="border border-t-0 p-2 w-40 text-center font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredData &&
                        filteredData.map((room) => {
                          const hasPendingOrInProgressOrder = room.leaseOrdersRoom?.some(
                            (order) => order.status === "IN_PROGRESS" || order.status === "PENDING"
                          );

                          const order = room.leaseOrdersRoom?.length > 0 && room.leaseOrdersRoom?.find((order) => order.isActive);

                          const rowClass = room.isActive
                            ? hasPendingOrInProgressOrder
                              ? "bg-yellow-100" // activo con orden pendiente o en progreso
                              : "bg-green-100" // activo sin orden pendiente
                            : "bg-red-50"; // inactivo

                          return (
                            <tr
                              key={room.id}
                              className={`${rowClass} hover:bg-gray-100 transition-colors cursor-pointer`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenModal(room);
                              }}
                            >
                              {/* <td className="border p-2 text-gray-700 text-center">{room.id}</td> */}
                              <td className="border p-2 text-gray-700 text-center">
                                {room.serial}
                              </td>
                              <td className="border p-2 text-gray-700 text-center">
                                €{room.price}
                              </td>
                              <td className="border p-2 text-gray-700 text-left break-words">
                                {order && order.client ? `${order.client?.name} ${order.client?.lastName} - ${order.client?.email}` : "Sin inquilino"}
                              </td>
                              <td className="border p-2 text-gray-700 text-center">
                                {room.isActive ? "Si" : "No"}
                              </td>
                              <td className="border p-2 text-gray-700 text-center">
                                {room.property?.zone}
                              </td>
                              <td className="border p-2 text-gray-700 text-center">
                                {TYPOLOGY_LABELS[room.property?.typology]}
                              </td>
                              <td className="border p-2 text-gray-700 text-center">
                                {`${room.property?.street} ${room.property?.streetNumber}, ${room.property?.city}`}
                              </td>
                              <td className="border p-2 text-gray-700 text-center">
                                <div className="w-full h-full flex gap-2 items-center justify-around">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenModal(room);
                                    }}
                                  >
                                    <PencilIcon
                                      title="Edición rapida"
                                      className="size-6 text-green-500"
                                    />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toast("Eliminar habitación", {
                                        action: {
                                          label: "Confirmar",
                                          onClick: () => handleDelete(room.id)
                                        }
                                      })
                                    }}
                                  >
                                    <TrashIcon
                                      title="Eliminar"
                                      className="size-6 text-red-500"
                                    />
                                  </button>
                                  <Link
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                    href={`/pages/admin/update/${room.property?.id}/${room.property?.category}`}
                                    target="_blank"
                                  >
                                    <WrenchIcon
                                      title="Edición completa"
                                      className="size-6 text-blue-500"
                                    />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                </table>
                {isOpen && <RoomEditModal isOpen={isOpen} onClose={() => setIsOpen(false)} data={selectedRoom} onSave={handleOnsave} deleteRentalItem={handleDeleteRentalItem} rentalPeriodsData={{ rentalPeriods: rentalPeriods.rentalPeriods || [], rentalPeriodsError, rentalPeriodsLoading }} />}
            </div>
        </div>
    );
}
