import { useEffect, useState } from "react";

export default function RentalPeriodTemplate({ data, setData, predefineRental }) {
  console.log(predefineRental);
 // Inicializar selectedPeriodIds con los IDs de predefineRental
 const [selectedPeriodIds, setSelectedPeriodIds] = useState([]);

 useEffect(() => {
   if (predefineRental) {
     // Si predefineRental tiene periodos, establecer los IDs en selectedPeriodIds
     setSelectedPeriodIds(predefineRental.map(period => period.id));
   }
 }, []);

 const handleAddPeriod = () => {
   setData((prevData) => ({
     ...prevData,
     newRentalPeriods: [
       ...(prevData.newRentalPeriods || []),
       { startDate: "", endDate: "" },
     ],
   }));
   setSelectedPeriodIds((prevIds) => [...prevIds, null]);
 };

 const handleRemovePeriod = (index) => {
   setSelectedPeriodIds((prevIds) => prevIds.filter((_, i) => i !== index));
   setData((prevData) => ({
     ...prevData,
     newRentalPeriods: prevData.newRentalPeriods.filter((_, i) => i !== index),
   }));
 };

 const handlePeriodChange = (index, value) => {
   const periodId = predefineRental.find((date) => date.id === parseInt(value))?.id;

   if (periodId) {
     setSelectedPeriodIds((prevIds) => {
       const updatedIds = [...prevIds];
       updatedIds[index] = periodId;
       return updatedIds;
     });

     setData((prevData) => ({
       ...prevData,
       newRentalPeriods: [
         ...(prevData.newRentalPeriods || []),
         { id: periodId }, // Agregar el nuevo período seleccionado
       ],
     }));
   }
 };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-[1.2rem]">Periodos de alquiler</h3>
      <ul className="list-none flex flex-col gap-3">
        {selectedPeriodIds.map((_, index) => (
          <li
            key={index}
            className="flex gap-3 items-center flex-wrap lg:w-full lg:flex-row lg:justify-between"
          >
            {/* Select para seleccionar el periodo */}
            <select
              value={selectedPeriodIds[index] || ""}
              onChange={(e) => handlePeriodChange(index, e.target.value)}
              className="appearance-none outline-none w-full p-2 border border-gray-300 rounded lg:w-[15rem]"
            >
              <option value="">Selecciona un periodo</option>
              {predefineRental
                .filter((dateOption) =>
                  dateOption.id !== undefined && // Asegúrate de que id está definido
                  (!selectedPeriodIds.includes(dateOption.id) ||
                  (selectedPeriodIds[index] === dateOption.id))
                )
                .map((dateOption) => (
                  <option key={dateOption.id} value={dateOption.id}>
                    {new Date(dateOption.startDate).toLocaleDateString()} - {new Date(dateOption.endDate).toLocaleDateString()}
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
