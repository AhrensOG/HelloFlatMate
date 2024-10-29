import { useState, useEffect } from "react";
import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PowerIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import CreateLeaseOrderModal from "../create_lo_modal/CreateLeaseOrderModal";
import AddRentalPeriodsModal from "../properties_panel/rental_periods/AddRentalPeriodsModal";

export default function TableArticle({ data, role = "ADMIN" }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [originalData, setOriginalData] = useState(data.properties); // Estado para los datos originales
  const [filteredData, setFilteredData] = useState(data.properties); // Estado para los datos filtrados
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(true); // Estado para el orden alfabético
  const [showLeaseOrderModal, setShowLeaseOrderModal] = useState(false);
  const [showRentalPeriodModal, setShowRentalPeriodModal] = useState(false);

  const categories = [
    "HELLO_ROOM",
    "HELLO_STUDIO",
    "HELLO_COLIVING",
    "HELLO_LANDLORD",
  ];
  const statuses = ["FREE", "RESERVED", "OCCUPIED"];

  useEffect(() => {
    // Filtra los datos cada vez que cambian los filtros o el término de búsqueda
    const filtered = originalData
      .filter((item) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(item.category);
        const matchesStatus =
          selectedStatus.length === 0 || selectedStatus.includes(item.status);
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${item.city} ${item.street} ${item.streetNumber}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        // Si `isActive` es `true`, debe aparecer antes. Si `isActive` es `false`, debe aparecer después.
        if (a.isActive === b.isActive) {
          // Ordenar por nombre si tienen el mismo isActive
          if (alphabeticalOrder) {
            return a.serial.localeCompare(b.serial); // Ordenar A → Z
          } else {
            return b.serial.localeCompare(a.serial); // Ordenar Z → A
          }
        }
        return a.isActive ? -1 : 1; // `true` primero, `false` después
      });

    setFilteredData(filtered); // Actualiza los datos filtrados
  }, [
    searchTerm,
    selectedCategories,
    selectedStatus,
    originalData,
    alphabeticalOrder,
  ]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleStatusChange = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/property?id=${id}&type=del`);
      // Actualizar el estado con los datos originales eliminando el ítem
      const updatedData = originalData.filter((item) => item.id !== id);
      setOriginalData(updatedData); // Actualiza los datos originales
    } catch (error) {
      throw error;
    }
  };

  const handleDesactivateProperty = async (id) => {
    try {
      await axios.delete(`/api/admin/property?id=${id}`);
      // Actualizar el estado con los datos originales eliminando el ítem
      const updatedData = originalData.map((item) => {
        if (item.id === id) {
          return { ...item, isActive: false };
        }
        return item;
      });
      setOriginalData(updatedData); // Actualiza los datos originales
    } catch (error) {
      throw error;
    }
  };

  const handleActiveProperty = async (id) => {
    try {
      await axios.patch(`/api/admin/property?type=activate&id=${id}`);
      // Actualizar el estado con los datos originales eliminando el ítem
      const updatedData = originalData.map((item) => {
        if (item.id === id) {
          return { ...item, isActive: true };
        }
        return item;
      });
      setOriginalData(updatedData); // Actualiza los datos originales
    } catch (error) {
      throw error;
    }
  };

  // Función para alternar el orden alfabético
  const toggleAlphabeticalOrder = () => {
    setAlphabeticalOrder((prev) => !prev);
  };

  return (
    <article className="flex flex-col justify-center items-center gap-4 w-full p-4">
      {/* Contenedor de botón alfabético y barra de búsqueda */}
      <div
        className={
          role === "OWNER"
            ? "flex flex-wrap items-center gap-2 w-full max-w-screen-lg mb-4 justify-center"
            : "flex flex-wrap items-center gap-2 w-full max-w-screen-lg mb-4"
        }
      >
        {role === "ADMIN" && (
          <>
            <button
              onClick={() => setShowRentalPeriodModal(!showRentalPeriodModal)}
              className="border border-resolution-blue px-5 py-2 max-w-[12rem] text-center w-full rounded-md bg-resolution-blue text-white font-medium"
            >
              Periodo de alquiler
            </button>
            <button
              onClick={() => setShowLeaseOrderModal(!showLeaseOrderModal)}
              className="border border-resolution-blue px-5 py-2 max-w-[12rem] text-center w-full rounded-md bg-resolution-blue text-white font-medium"
            >
              Orden de alquiler
            </button>
            <Link
              href={"/pages/admin/create"}
              className="border border-resolution-blue px-5 py-2 max-w-[12rem] text-center w-full rounded-md bg-resolution-blue text-white font-medium"
            >
              Nueva Propiedad
            </Link>
          </>
        )}
        {/* Search bar con ícono de lupa */}
        <div
          className={
            role === "OWNER"
              ? "relative flex-grow max-w-[40rem] w-full self-center flex justify-center"
              : "relative flex-grow max-w-[12rem] w-full"
          }
        >
          <input
            type="text"
            placeholder="Buscar por nombre, código o ubicación..."
            className="p-2 pl-10 border border-gray-300 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Ícono de lupa dentro del input */}
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {role === "ADMIN" && (
          <>
            {/* Botón de orden alfabético */}
            <button
              onClick={toggleAlphabeticalOrder}
              className="p-2 bg-blue-500 text-white rounded"
            >
              {alphabeticalOrder ? "A → Z" : "Z → A"}
            </button>
          </>
        )}
      </div>
      {/* Category filters */} {/* Status filters */}
      <div className="flex flex-wrap gap-4 mb-4 w-full justify-start lg:justify-center">
        <h2 className="text-xl font-bold text-primary w-full">
          Categorías y estados
        </h2>
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category.replace(/_/g, "").toLowerCase()}
          </label>
        ))}
        |
        {statuses.map((status) => (
          <label key={status} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStatus.includes(status)}
              onChange={() => handleStatusChange(status)}
            />
            {status === "FREE"
              ? "Disponibles"
              : status === "RESERVED"
              ? "Pendientes"
              : "Reservados"}
          </label>
        ))}
      </div>
      {/* Table */}
      <div className="w-full max-w-full border-2 border-primary rounded-lg overflow-x-auto overflow-y-auto max-h-[35rem]">
        <table className="relative min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-[#0e1863ff] text-white sticky top-0 z-10">
            <tr>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Código
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Nombre
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Categoría
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Estado
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Dirección
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Código Postal
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Zona
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Tipología
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Superficie M2
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Habitaciones
              </th>
              <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                Baños
              </th>
              {role === "ADMIN" && (
                <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                  Propietario
                </th>
              )}
              {role === "ADMIN" && (
                <th className="text-sm text-center px-3 py-4 font-medium uppercase tracking-wider border-b border-gray-200">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    role === "ADMIN"
                      ? `${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition-colors duration-300 ease-in-out`
                      : `${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition-colors duration-300 ease-in-out cursor-pointer`
                  }
                  onClick={
                    role === "OWNER"
                      ? () => router.push(`/pages/property-details/${item.id}`)
                      : null
                  }
                >
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.serial}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.category.replace(/_/g, "").toLowerCase()}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.status}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">{`${item.street} ${item.streetNumber}, ${item.city}`}</td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.postalCode}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.zone}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.typology
                      ? item.typology === "ONLY_MEN"
                        ? "Solo hombres"
                        : item.typology === "ONLY_WOMEN"
                        ? "Solo mujeres"
                        : "Mixto"
                      : ""}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.size}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.rooms?.length || 0}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.bathrooms}
                  </td>
                  <td className="px-4 py-4 text-center text-sm border-r">
                    {item.owner?.email}
                  </td>
                  {role === "ADMIN" && (
                    <td className="px-4 py-4 text-center">
                      <div className="flex gap-6 items-center justify-center">
                        {/* Botón de Activar/Desactivar */}
                        <div className="relative group inline-block">
                          <button
                            onClick={() =>
                              toast.promise(
                                item.isActive
                                  ? handleDesactivateProperty(item.id)
                                  : handleActiveProperty(item.id),
                                {
                                  loading: item.isActive
                                    ? "Desactivando..."
                                    : "Activando...",
                                  success: item.isActive
                                    ? "Desactivado correctamente"
                                    : "Activado correctamente",
                                  error: item.isActive
                                    ? "Error al desactivar"
                                    : "Error al activar",
                                }
                              )
                            }
                            className={`${
                              item.isActive
                                ? "text-green-600 hover:text-green-800"
                                : "text-gray-600 hover:text-gray-800"
                            } transition-colors duration-200`}
                            aria-label={
                              item.isActive ? "Desactivar" : "Activar"
                            }
                          >
                            {item.isActive ? (
                              <PowerIcon className="w-6 h-6 text-green-600" />
                            ) : (
                              <PowerIcon className="w-6 h-6 text-red-600" />
                            )}
                          </button>
                          {/* Tooltip personalizado */}
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2">
                            {item.isActive ? "Desactivar" : "Activar"}
                          </span>
                        </div>

                        {/* Botón Editar */}
                        <div className="relative group inline-block">
                          <button
                            onClick={() =>
                              router.push(
                                `/pages/admin/update/${item.id}/${item.category}`
                              )
                            }
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            aria-label="Editar"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          {/* Tooltip personalizado */}
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2">
                            Editar
                          </span>
                        </div>

                        {/* Botón Eliminar */}
                        <div className="relative group inline-block">
                          <button
                            onClick={() =>
                              toast.custom((t) => (
                                <div className="bg-white p-6 rounded-lg shadow-card-action border-2 max-w-md mx-auto text-center">
                                  <p className="text-gray-800 mb-4 font-medium">
                                    ¿Estás seguro de que deseas eliminar esta
                                    propiedad?
                                  </p>
                                  <div className="flex justify-center gap-4">
                                    <button
                                      onClick={() => {
                                        toast.dismiss(t.id); // Cierra el toast actual
                                        toast.promise(handleDelete(item.id), {
                                          loading: "Eliminando...",
                                          success: "Eliminado correctamente",
                                          error: "Error al eliminar",
                                        });
                                      }}
                                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                                    >
                                      Confirmar
                                    </button>
                                    <button
                                      onClick={() => toast.dismiss(t.id)} // Cierra el toast sin hacer nada
                                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-300"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              ))
                            }
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                            aria-label="Eliminar"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>

                          {/* Tooltip personalizado */}
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2">
                            Eliminar
                          </span>
                        </div>

                        {/* Botón de Ver Órdenes */}
                        <div className="relative group inline-block">
                          <button
                            onClick={() =>
                              router.push(`/pages/admin/lease_order/${item.id}`)
                            }
                            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                            aria-label="Ver Órdenes"
                          >
                            <DocumentMagnifyingGlassIcon className="w-5 h-5" />
                          </button>
                          {/* Tooltip personalizado */}
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2">
                            Ver Órdenes
                          </span>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-4 text-center text-gray-500"
                  colSpan="13"
                >
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showLeaseOrderModal && (
        <CreateLeaseOrderModal
          data={data}
          onClose={() => setShowLeaseOrderModal(false)}
        />
      )}
      {showRentalPeriodModal && (
        <AddRentalPeriodsModal
          onClose={() => setShowRentalPeriodModal(false)}
        />
      )}
    </article>
  );
}
