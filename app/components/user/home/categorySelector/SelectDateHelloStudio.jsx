import { useState } from "react";
import DatePickerCategoySelector from "./DatePickerCategoySelector";

const SelectDateHelloStudio = ({ title, data, setData }) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Funciones para abrir y cerrar los DatePickers
  const handleStartClick = () => setShowStartPicker(!showStartPicker);
  const handleEndClick = () => setShowEndPicker(!showEndPicker);

  // Funciones para manejar la selección de fecha
  const handleSelectStartDate = (date) => {
    setData({ ...data, startDate: date.toISOString() });
    setShowStartPicker(false);
  };

  const handleSelectEndDate = (date) => {
    setData({ ...data, endDate: date.toISOString() });
    setShowEndPicker(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-[18rem]">
        <div
          className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
          onClick={handleStartClick}
        >
          {data.startDate
            ? `Fecha de inicio: ${new Date(
                data.startDate
              ).toLocaleDateString()}`
            : "Seleccione fecha de inicio"}
        </div>
        {showStartPicker && (
          <DatePickerCategoySelector data={data} setData={setData} />
        )}
      </div>

      <div className="w-[18rem]">
        <div
          className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
          onClick={handleEndClick}
        >
          {data.endDate
            ? `Fecha de fin: ${new Date(data.endDate).toLocaleDateString()}`
            : "Seleccione fecha de fin"}
        </div>
        {showEndPicker && (
          <DatePickerCategoySelector data={data} setData={setData} />
        )}
      </div>
    </div>
  );
};

export default SelectDateHelloStudio;
