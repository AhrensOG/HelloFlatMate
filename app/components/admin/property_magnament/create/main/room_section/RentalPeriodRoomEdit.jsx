import { useEffect, useState } from "react";

export default function RentalPeriodRoomEdit({ data, setData, predefineRental, oldRentalPeriods }) {
    console.log(oldRentalPeriods);
    

  const [selectedRentalPeriods, setSelectedRentalPeriods] = useState([]);

  // Inicializar los periodos ya existentes al cargar el componente
  useEffect(() => {
    const existingRentalPeriods = oldRentalPeriods.map(item => ({
      id: item.id,
      startDate: item.startDate,
      endDate: item.endDate,
    }));
    if(existingRentalPeriods.length > 0) {
      setSelectedRentalPeriods(existingRentalPeriods);
    }
  }, []);

  const handleAddPeriod = () => {
    // Añadir un nuevo objeto para representar un nuevo periodo
    setSelectedRentalPeriods((prevPeriods) => [...prevPeriods, { id: null, startDate: null, endDate: null }]);
  };

  const handleRemovePeriod = (index) => {
    // Obtener el periodo que se está eliminando
    const removedPeriod = selectedRentalPeriods[index];
  
    // Eliminar el objeto correspondiente
    setSelectedRentalPeriods((prevPeriods) => {
      const updatedPeriods = prevPeriods.filter((_, i) => i !== index);
      return updatedPeriods;
    });
  
    // Agregar el id al array de periodos borrados
    setData((prevData) => ({
      ...prevData,
      deletedRentalPeriods: [
        ...(prevData.deletedRentalPeriods || []), // Asegurarse de que deletedRentalPeriods sea un array
        removedPeriod.id // Agregar el id del periodo eliminado
      ],
    }));
  };
  
  const handlePeriodChange = (index, value) => {
    const periodId = parseInt(value, 10);
    setSelectedRentalPeriods((prevPeriods) => {
      const updatedPeriods = [...prevPeriods];
      const periodSelected = predefineRental.find(period => period.id == periodId);
      updatedPeriods[index].startDate = periodSelected.startDate;
      updatedPeriods[index].endDate = periodSelected.endDate;
      updatedPeriods[index].id = periodId;
      
      return updatedPeriods;
    });

    // Llenar data con los nuevos periodos elegidos
    const newRentalPeriods = selectedRentalPeriods
      .map((period) => (period.id ? { id: period.id, startDate: period.startDate, endDate: period.endDate } : null))
      .filter(Boolean);

    // Actualizar data con los nuevos periodos
    setData((prevData) => ({
      ...prevData,
      newRentalPeriods: newRentalPeriods,
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-[1.2rem]">Periodos de alquiler</h3>
      <ul className="list-none flex flex-col gap-3">
        {selectedRentalPeriods.map((period, index) => (
          <li
            key={index}
            className="flex gap-3 items-center flex-wrap lg:w-full lg:flex-row lg:justify-between"
          >
            {/* Select para seleccionar el periodo */}
            <select
              value={period.id || ""}
              onChange={(e) => handlePeriodChange(index, e.target.value)}
              className="appearance-none outline-none w-full p-2 border border-gray-300 rounded lg:w-[15rem]"
            >
              <option value="">Selecciona un periodo</option>
              {predefineRental
                .filter(
                  (dateOption) =>
                    dateOption.id !== undefined &&
                    (!selectedRentalPeriods.some((p) => p.id === dateOption.id) || period.id === dateOption.id)
                )
                .map((dateOption) => (
                  <option key={dateOption.id} value={dateOption.id}>
                    {new Date(dateOption.startDate).toLocaleDateString()} -{" "}
                    {new Date(dateOption.endDate).toLocaleDateString()}
                  </option>
                ))}
            </select>

            <button
              type="button"
              onClick={() => handleRemovePeriod(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleAddPeriod}
        className="bg-blue-500 text-white px-2 py-1 rounded w-[10rem] self-start"
      >
        Añadir Periodo
      </button>
    </div>
  );
}
