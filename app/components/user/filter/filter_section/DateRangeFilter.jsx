import { useState } from "react";

const DateRangeFilter = ({ onChange, startDate, endDate }) => {
  const [start, setStart] = useState(startDate || "");
  const [end, setEnd] = useState(endDate || "");

  const handleStartDateChange = (e) => {
    setStart(e.target.value);
    onChange("startDate", e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEnd(e.target.value);
    onChange("endDate", e.target.value);
  };

  return (
    <section className="flex flex-col gap-3 px-4 justify-between">
      <h2 className="text-[1.37rem] font-bold text-[#1C1C21]">
        Rango de Fechas
      </h2>
      <div className="flex flex-col gap-2">
        <label className="text-[0.93rem] font-medium">Fecha de inicio</label>
        <input
          type="date"
          className="w-full h-[5vh] px-2 appearance-none outline-none rounded-[0.6rem] bg-[#F5F5F5] border-[1px] border-[#00000033] text-[0.93rem] font-medium"
          value={start}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[0.93rem] font-medium">Fecha de fin</label>
        <input
          type="date"
          className="w-full h-[5vh] px-2 appearance-none outline-none rounded-[0.6rem] bg-[#F5F5F5] border-[1px] border-[#00000033] text-[0.93rem] font-medium"
          value={end}
          onChange={handleEndDateChange}
        />
      </div>
    </section>
  );
};

export default DateRangeFilter;
