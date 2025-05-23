import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { toast } from "sonner";
import EditPropertyModal from "./EditPropertyModal";
import { PencilIcon, TrashIcon, WrenchIcon } from "@heroicons/react/24/outline";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const TYPOLOGY_LABELS = {
  MIXED: "Mixto",
  ONLY_WOMEN: "Solo chicas",
  ONLY_MEN: "Solo chicos",
};

export default function PropertiesPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const {
    data: swrData,
    error,
    mutate,
  } = useSWR("/api/admin/property?simple=true", fetcher, {
    refreshInterval: 600000,
  });

  const filteredData = (swrData || [])?.filter((property) =>
    [property.id, property.serial, property.name, property.zone]
      .map((field) => field?.toString().toLowerCase())
      .some((field) => field?.includes(searchQuery.toLowerCase()))
  );

  const handleOpenModal = (room) => {
    setSelectedProperty(room);
    setIsOpen(true);
  };

  const handleOnsave = async (data) => {
    const toastId = toast.loading("Actualizando propiedad");
    try {
      await axios.patch(`/api/admin/property?simple=true`, data);
      await mutate();
      toast.success("Propiedad actualizada correctamente", { id: toastId });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.info("Ocurrió un error al actualizar la propiedad", {
        description: "Intenta nuevamente o contacta al soporte",
        id: toastId,
      });
    }
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Eliminando propiedad...");
    try {
      await axios.delete(`/api/admin/property?type=del&id=${id}`, { data: id });
      const updatedData = swrData.filter((item) => item.id !== id);
      await mutate(updatedData);
      toast.success("Propiedad eliminada correctamente", { id: toastId });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.success("Ocurrió un error al eliminar la propiedad", {
        description: "Intenta nuevamente o contacta al soporte",
        id: toastId,
      });
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Propiedades</h2>
        <div className="w-full">
          <input
            type="text"
            placeholder="Buscar por ID, serial, nombre o zona..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-3 py-2 w-[450px]"
          />
          <Link
            href="/pages/admin/create"
            target="_blank"
            className="bg-[#0C1660] text-white px-3 py-3 rounded ml-5">
            Crear Propiedad
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr>
              {/* <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th> */}
              <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                Código
              </th>
              <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                Nombre
              </th>
              <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                Ciudad
              </th>
              <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                Zona
              </th>
              <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">
                Tipo
              </th>
              {/* <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">Activo?</th> */}
              <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-52">
                Direccion
              </th>
              <th className="border border-t-0 p-2 w-40 text-center font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData?.map((property) => (
                <tr
                  key={property.id}
                  className="hover:bg-gray-100 even:bg-gray-50 transition-colors">
                  {/* <td className="border p-2 text-gray-700 text-center">{property.id}</td> */}
                  <td className="border p-2 text-gray-700 text-center">
                    {property.serial}
                  </td>
                  <td className="border p-2 text-gray-700 text-center">
                    {property.name}
                  </td>
                  <td className="border p-2 text-gray-700 text-center">
                    {property.city}
                  </td>
                  <td className="border p-2 text-gray-700 text-center">
                    {property.zone}
                  </td>
                  <td className="border p-2 text-gray-700 text-center">
                    {TYPOLOGY_LABELS[property.typology]}
                  </td>
                  {/* <td className="border p-2 text-gray-700 text-center">{property.isActive ? "Si" : "No"}</td> */}
                  <td className="border p-2 text-gray-700 text-center">{`${property.street} ${property.streetNumber}, ${property.city}`}</td>
                  <td className="border p-2 text-gray-700 text-center">
                    <div className="w-full h-full flex gap-2 items-center justify-around">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(property);
                        }}
                        className="h-full">
                        <PencilIcon
                          title="Edición rapida"
                          className="size-6 text-green-500"
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast("Eliminar propiedad", {
                            action: {
                              label: "Confirmar",
                              onClick: () => handleDelete(property.id),
                            },
                          });
                        }}
                        className="h-full">
                        <TrashIcon
                          title="Eliminar"
                          className="size-6 text-red-500"
                        />
                      </button>
                      <Link
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="h-full"
                        href={`/pages/admin/update/${property.id}/${property.category}`}
                        target="_blank">
                        <WrenchIcon
                          title="Edición completa"
                          className="size-6 text-blue-500"
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isOpen && (
          <EditPropertyModal
            onClose={() => setIsOpen(false)}
            data={selectedProperty}
            onSave={handleOnsave}
          />
        )}
      </div>
    </div>
  );
}
