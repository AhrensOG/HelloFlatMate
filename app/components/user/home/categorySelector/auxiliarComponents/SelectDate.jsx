import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const SelectDate = ({ title = "Seleccionar una opción", data, setData }) => {
  const [showInput, setShowInput] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedValue, setSelectedValue] = useState(title);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" }); // Estado para guardar el objeto {startDate, endDate}

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleValueChange = () => {
    // Formatear las fechas si están seleccionadas
    const formattedStartDate = startDate
      ? new Intl.DateTimeFormat("es-ES", {
          day: "numeric",
          month: "numeric",
          year: "2-digit",
        }).format(new Date(startDate))
      : "";

    const formattedEndDate = endDate
      ? new Intl.DateTimeFormat("es-ES", {
          day: "numeric",
          month: "numeric",
          year: "2-digit",
        }).format(new Date(endDate))
      : "";

    const dateRangeObject = { startDate, endDate };
    setDateRange(dateRangeObject); // Guardar el objeto { startDate, endDate }

    // Actualizar el valor visual mostrado
    const displayRange =
      startDate && endDate
        ? `Del ${formattedStartDate} al ${formattedEndDate}`
        : title;
    setSelectedValue(displayRange);

    // Actualizar el estado global con las fechas seleccionadas (pueden estar vacías)
    setData({ ...data, startDate, endDate });

    setShowInput(false); // Cerrar el dropdown después de seleccionar las fechas
  };

  return (
    <section className="w-[18rem]">
      <div
        className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
        onClick={handleClick}
      >
        {selectedValue}{" "}
        <span
          className={`flex justify-center items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
            showInput ? "bg-[#1C8CD65E] rotate-180" : ""
          }`}
        >
          <ChevronUpIcon />
        </span>
      </div>
      <AnimatePresence>
        {showInput && (
          <motion.div
            className="flex flex-col shadow-reservation-list mt-2 bg-white p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <label className="block text-sm mb-2">Fecha de inicio:</label>
            <input
              type="date"
              className="p-2 mb-4 border rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label className="block text-sm mb-2">Fecha de fin:</label>
            <input
              type="date"
              className="p-2 mb-4 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <button
              onClick={handleValueChange}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Seleccionar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SelectDate;
