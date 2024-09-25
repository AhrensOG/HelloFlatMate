import { useState, useEffect } from "react";
import {
  CheckIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PowerIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function TableArticle({ data }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [originalData, setOriginalData] = useState(data); // Estado para los datos originales
  const [filteredData, setFilteredData] = useState(data); // Estado para los datos filtrados
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(true); // Estado para el orden alfabético

  const categories = [
    "HELLO_ROOM",
    "HELLO_STUDIO",
    "HELLO_COLIVING",
    "HELLO_LANDLORD",
  ];
  const statuses = ["FREE", "RESERVED", "OCCUPED"];

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
          `${item.city} ${item.street} ${item.streetNumber}`.includes(
            searchTerm
          );

        return matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        // Si `isActive` es `true`, debe aparecer antes. Si `isActive` es `false`, debe aparecer después.
        if (a.isActive === b.isActive) {
          // Ordenar por nombre si tienen el mismo isActive
          if (alphabeticalOrder) {
            return a.name.localeCompare(b.name); // Ordenar A → Z
          } else {
            return b.name.localeCompare(a.name); // Ordenar Z → A
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
      {/* Header with Add Property Button */}
      <h2 className="text-xl font-bold text-primary">Propiedades</h2>

      {/* Contenedor de botón alfabético y barra de búsqueda */}
      <div className="flex items-center gap-2 w-full max-w-lg mb-4">
        {/* Search bar con ícono de lupa */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar por nombre, serial o ubicación..."
            className="p-2 pl-10 border border-gray-300 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Ícono de lupa dentro del input */}
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {/* Botón de orden alfabético */}
        <button
          onClick={toggleAlphabeticalOrder}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {alphabeticalOrder ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-4 mb-4 w-full justify-start lg:justify-center">
        <h2 className="text-xl font-bold text-primary w-full">Categorías</h2>
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-4 mb-4 w-full justify-start lg:justify-center">
        <h2 className="text-xl font-bold text-primary w-full">Status</h2>
        {statuses.map((status) => (
          <label key={status} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStatus.includes(status)}
              onChange={() => handleStatusChange(status)}
            />
            {status}
          </label>
        ))}
      </div>

      {/* Table */}
      <div className="w-full max-w-full border-2 border-primary rounded-lg overflow-x-auto overflow-y-auto max-h-96">
        <table className="min-w-full bg-white">
          <thead className="bg-[#0e1863ff] text-white sticky top-0 z-5">
            <tr>
              <th className="text-left px-6 py-3 font-medium uppercase tracking-wider">
                Serial
              </th>
              <th className="text-left px-6 py-3 font-medium uppercase tracking-wider">
                Nombre
              </th>
              <th className="text-left px-6 py-3 font-medium uppercase tracking-wider">
                Categoría
              </th>
              <th className="text-left px-6 py-3 font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 font-medium uppercase tracking-wider">
                Locacion
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#21aaccff] hover:text-white transition-all duration-200"
                >
                  <td className="px-6 py-4">{item.serial}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{`${item.city}, ${item.street} ${item.streetNumber}`}</td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        toast.promise(handleDelete(item.id), {
                          loading: "Eliminando...",
                          success: "Eliminado correctamente",
                          error: "Error al eliminar",
                        })
                      }
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      aria-label="Eliminar"
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() =>
                        router.push(
                          `/pages/admin/update/${item.id}/${item.category}`
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      aria-label="Editar"
                    >
                      <PencilIcon className="w-6 h-6" />
                    </button>
                    {/* Botón de Activar/Desactivar */}
                    <button
                      onClick={
                        item.isActive
                          ? () => handleDesactivateProperty(item.id)
                          : () => handleActiveProperty(item.id)
                      } // Función que manejara la activación/desactivación
                      className={`${
                        item.isActive
                          ? "text-green-600 hover:text-green-800"
                          : "text-gray-600 hover:text-gray-800"
                      } transition-colors duration-200`}
                      aria-label={item.isActive ? "Desactivar" : "Activar"}
                    >
                      {item.isActive ? (
                        <PowerIcon className="w-6 h-6 text-green-600 hover:text-green-800" /> // Icono de Desactivar
                      ) : (
                        <PowerIcon className="w-6 h-6 text-red-600 hover:text-red-800" /> // Icono de Activar
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="5">
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
