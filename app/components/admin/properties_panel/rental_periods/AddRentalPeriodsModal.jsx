import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddRentalPeriodsModal({ onClose }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newRentalPeriods, setNewRentalPeriods] = useState([]);
  const [oldRentalPeriods, setOldRentalPeriods] = useState([]);

  const getPeriods = async () => {
    try {
      const data = await axios.get("/api/admin/rental_period");
      setOldRentalPeriods(data.data?.rentalPeriods);
    } catch (error) {
      toast.warning("Ocurrió un error al obtener los periodos");
    }
  };

  useEffect(() => {
    getPeriods();
  }, []);

  const formatDateInput = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length <= 2) {
      return cleanedValue;
    } else if (cleanedValue.length <= 4) {
      return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    } else {
      return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(
        2,
        4
      )}/${cleanedValue.slice(4, 8)}`;
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(formatDateInput(e.target.value));
  };

  const handleEndDateChange = (e) => {
    setEndDate(formatDateInput(e.target.value));
  };

  const formatISODate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };
  const handleAddPeriod = () => {
    if (startDate && endDate) {
      const newPeriod = { startDate, endDate };
      setNewRentalPeriods([...newRentalPeriods, newPeriod]);
      setStartDate("");
      setEndDate("");
    }
  };

  const handleDeletePeriod = (index) => {
    setNewRentalPeriods(newRentalPeriods.filter((_, i) => i !== index));
  };

  const handleDeleteOldPeriods = async (id) => {
    const toastId = toast.loading("Eliminando periodo de alquiler...");

    try {
      await axios.delete(`/api/admin/rental_period?id=${id}`);
      await getPeriods();

      toast.success("Periodo de alquiler eliminado con éxito", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Error al eliminar el periodo de alquiler", { id: toastId });
      console.error("Error al eliminar el periodo de alquiler", error);
    }
  };

  const handleSubmitPeriods = async () => {
    const formatNewRentalPeriodsToISO = newRentalPeriods.map((period) => {
      return {
        startDate: formatISODate(period.startDate),
        endDate: formatISODate(period.endDate),
      };
    });

    const toastId = toast.loading("Creando periodo de alquiler...");

    try {
      const response = await axios.post(
        "/api/admin/rental_period",
        formatNewRentalPeriodsToISO
      );
      setNewRentalPeriods([]);
      await getPeriods();

      toast.success("Periodo de alquiler creado con éxito", { id: toastId });
    } catch (error) {
      toast.error("Error al crear el periodo de alquiler.", { id: toastId });
      console.error("Error al crear los períodos de alquiler", error);
    }
  };

  const handleCancel = () => {
    setStartDate("");
    setEndDate("");
    setNewRentalPeriods([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Periodos de alquiler</h2>
        {oldRentalPeriods.length > 0 ? (
          <div className="mb-4">
            <ul className="list-disc list-inside space-y-1">
              {oldRentalPeriods.map((period, index) => {
                const formatDate = (isoDate) => {
                  const date = new Date(isoDate);
                  const day = String(date.getDate()).padStart(2, "0");
                  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son base 0
                  const year = date.getFullYear();
                  return `${day}/${month}/${year}`;
                };

                return (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {formatDate(period.startDate)} -{" "}
                      {formatDate(period.endDate)}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteOldPeriods(period.id)}
                    >
                      Borrar
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="mb-4">
            <h2>No hay periodos de alquiler</h2>
          </div>
        )}

        <h2 className="text-lg font-bold mb-4">Agregar periodo de alquiler</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Inicio
          </label>
          <input
            type="text"
            value={startDate}
            onChange={handleStartDateChange}
            placeholder="dd/mm/aaaa"
            maxLength="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Finalización
          </label>
          <input
            type="text"
            value={endDate}
            onChange={handleEndDateChange}
            placeholder="dd/mm/aaaa"
            maxLength="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-end space-x-2 mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
            onClick={handleAddPeriod}
          >
            Agregar
          </button>
        </div>
        {newRentalPeriods.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">
              Nuevos periodos agregados:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {newRentalPeriods.map((period, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {period.startDate} - {period.endDate}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeletePeriod(index)}
                  >
                    Borrar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-between space-x-2 ">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 w-full"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
            onClick={handleSubmitPeriods}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
