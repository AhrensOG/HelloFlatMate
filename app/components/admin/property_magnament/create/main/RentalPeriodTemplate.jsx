import { useState } from "react";

export default function RentalPeriodTemplate({ data, setData }) {
  // Manejo de la adición de un nuevo periodo
  const handleAddPeriod = () => {
    setData((prevData) => ({
      ...prevData,
      newRentalPeriods: [
        ...(prevData.newRentalPeriods || []),
        { startDate: "", endDate: "" },
      ],
    }));
  };

  const handleRemovePeriod = (index) => {
    // Combina los periodos existentes y los nuevos
    const combinedPeriods = [
      ...(data.rentalPeriods || []),
      ...(data.newRentalPeriods || []),
    ];

    // Verifica si el índice está dentro del rango combinado
    if (index < combinedPeriods.length) {
      const periodToRemove = combinedPeriods[index];

      // Si es un periodo nuevo
      if (index >= (data.rentalPeriods?.length || 0)) {
        setData((prevData) => ({
          ...prevData,
          newRentalPeriods: prevData.newRentalPeriods.filter(
            (_, i) => i !== index - (data.rentalPeriods?.length || 0)
          ),
        }));
        return;
      }

      // Si es un periodo existente
      if (periodToRemove?.id) {
        setData((prevData) => ({
          ...prevData,
          deleteRentalPeriods: [
            ...(prevData.deleteRentalPeriods || []),
            periodToRemove.id,
          ],
        }));
      }

      // Eliminar el periodo de rentalPeriods
      setData((prevData) => ({
        ...prevData,
        rentalPeriods: prevData.rentalPeriods.filter((_, i) => i !== index),
      }));
    } else {
      console.warn("Índice fuera de rango para periodos combinados");
    }
  };

  const handlePeriodChange = (index, field, value) => {
    // Verifica si el índice es para un periodo existente
    if (data.rentalPeriods && index < data.rentalPeriods.length) {
      const updatedPeriods = data.rentalPeriods.map((period, i) => {
        if (i === index) {
          return {
            ...period,
            [field]: value, // Solo actualiza la propiedad indicada
          };
        }
        return period;
      });
      setData({ ...data, rentalPeriods: updatedPeriods });
    } else {
      // Modificando un nuevo periodo
      const newIndex = index - (data.rentalPeriods?.length || 0); // Ajusta el índice
      const updatedNewPeriods = data.newRentalPeriods.map((period, i) => {
        if (i === newIndex) {
          return {
            ...period,
            [field]: value, // Solo actualiza la propiedad indicada
          };
        }
        return period;
      });
      setData({ ...data, newRentalPeriods: updatedNewPeriods });
    }
  };

  const formatedDate = (date) => {
    if (date !== "") {
      const newDate = new Date(date);
      return newDate.toISOString().slice(0, 10);
    }
    return;
  };

  const combinedPeriods = [
    ...(data.rentalPeriods || []),
    ...(data.newRentalPeriods || []),
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-[1.2rem]">Periodos de alquiler</h3>
      <ul className="list-none flex flex-col gap-3">
        {combinedPeriods.length > 0 ? (
          combinedPeriods.map((period, index) => (
            <li
              key={index}
              className="flex gap-3 items-center flex-wrap lg:w-full lg:flex-row lg:justyfy-between"
            >
              <input
                type="date"
                value={formatedDate(period.startDate) || ""}
                onChange={(e) =>
                  handlePeriodChange(index, "startDate", e.target.value)
                }
                className="appearance-none outline-none w-full p-2 border border-gray-300 rounded lg:w-[10rem]"
              />
              <input
                type="date"
                value={formatedDate(period.endDate) || ""}
                onChange={(e) =>
                  handlePeriodChange(index, "endDate", e.target.value)
                }
                className="appearance-none outline-none w-full p-2 border border-gray-300 rounded lg:w-[10rem]"
              />
              <button
                type="button"
                onClick={() => handleRemovePeriod(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <h2 className="text-center">No hay periodos de alquiler</h2>
        )}
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
