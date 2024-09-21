import { useState, useEffect } from "react";

export default function SelectRentalPeriod({ data, setData, info }) {
  console.log(info);

  const [selectedValue, setSelectedValue] = useState(""); // Valor inicial vacío

  const calculateDurationInMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcular la diferencia en años y meses
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();

    // Total de meses
    return yearsDiff * 12 + monthsDiff;
  };

  const handleValueChange = (e) => {
    const selectedId = e.target.value;
    const selectedPeriod = data.find(
      (period) => period.id === parseInt(selectedId)
    );

    if (selectedPeriod) {
      // Actualiza el valor seleccionado
      setSelectedValue(selectedId); // Guarda el ID del periodo seleccionado
      // Actualiza setData con un objeto
      setData(
        selectedPeriod.startDate,
        selectedPeriod.endDate,
        calculateDurationInMonths(
          selectedPeriod.startDate,
          selectedPeriod.endDate
        ),
        selectedPeriod.id
      );
    }
  };

  const formatedDate = (date) => {
    if (date) {
      const newDate = new Date(date);
      return newDate.toISOString().slice(0, 10);
    }
    return "";
  };

  return (
    <section className="w-[19.4rem]">
      <select
        value={selectedValue}
        onChange={handleValueChange}
        className="rounded-lg p-2 border shadow-reservation-drop my-2 w-full"
      >
        <option value="" disabled>
          Selecciona un contrato
        </option>
        {data.map((period) => (
          <option key={period.id} value={period.id}>
            {formatedDate(period.startDate)} / {formatedDate(period.endDate)}
          </option>
        ))}
      </select>
    </section>
  );
}
