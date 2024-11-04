import { useState } from "react";

const DateRangeFilter = ({ onChange, startDate, endDate }) => {
  // Mueve la función formatDate arriba para evitar el error de inicialización
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [start, setStart] = useState(startDate ? formatDate(startDate) : "");
  const [end, setEnd] = useState(endDate ? formatDate(endDate) : "");

  const handleDateChange = (value, setDate, onDateChange, key) => {
    const formattedDate = formatInput(value);
    setDate(formattedDate);

    if (isValidDate(formattedDate)) {
      onDateChange(key, toDate(formattedDate));
    }
  };

  const formatInput = (value) => {
    const cleaned = value.replace(/\D+/g, "");
    let formatted = cleaned;

    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`;
    }

    return formatted;
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date && date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
  };

  const toDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  return (
    <section className="flex flex-col gap-3 px-4 sm:px-0 justify-between">
      <h2 className="text-[1.37rem] font-bold text-[#1C1C21]">Rango de Fechas</h2>
      <div className="flex flex-col gap-2">
        <label className="text-[0.93rem] font-medium">Fecha de inicio</label>
        <input
          type="text"
          className="w-full h-[5vh] px-2 appearance-none outline-none rounded-[0.6rem] bg-[#F5F5F5] border-[1px] border-[#00000033] text-[0.93rem] font-medium"
          placeholder="DD-MM-YYYY"
          value={start}
          onChange={(e) => handleDateChange(e.target.value, setStart, onChange, "startDate")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[0.93rem] font-medium">Fecha de fin</label>
        <input
          type="text"
          className="w-full h-[5vh] px-2 appearance-none outline-none rounded-[0.6rem] bg-[#F5F5F5] border-[1px] border-[#00000033] text-[0.93rem] font-medium"
          placeholder="DD-MM-YYYY"
          value={end}
          onChange={(e) => handleDateChange(e.target.value, setEnd, onChange, "endDate")}
        />
      </div>
    </section>
  );
};

export default DateRangeFilter;
