export default function RentalPeriodTemplate({ data, setData }) {
  // Manejo de fechas de inicio y fin
  const handleAddPeriod = () => {
    setData([...data, { startDate: "", endDate: "" }]);
  };

  const handleRemovePeriod = (index) => {
    const updatedPeriods = data.filter((_, i) => i !== index);
    setData(updatedPeriods);
  };

  const handlePeriodChange = (index, field, value) => {
    const updatedPeriods = data.map((period, i) =>
      i === index ? { ...period, [field]: value } : period
    );
    setData(updatedPeriods);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-bold text-[1.37rem] w-full text-start">
        Periodos de alquiler
      </h3>
      {data.map((period, index) => (
        <div key={index} className="flex gap-2 flex-wrap mb-2 justify-between">
          <input
            type="date"
            value={period.startDate}
            onChange={(e) =>
              handlePeriodChange(index, "startDate", e.target.value)
            }
            className=" p-2 border border-gray-300 rounded w-[45%]"
          />
          <input
            type="date"
            value={period.endDate}
            onChange={(e) =>
              handlePeriodChange(index, "endDate", e.target.value)
            }
            className=" p-2 border border-gray-300 rounded w-[45%]"
          />
          {data.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemovePeriod(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
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
