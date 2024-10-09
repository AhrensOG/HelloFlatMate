import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import HeaderDatePicker from "./date_picker_category_selector/HeaderDatePicker";
import Month from "./date_picker_category_selector/Month";

export default function DatePickerCategorySelector({ data, setData, type }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  // Seleccionar fecha
  const handleStartDate = (selectedDate) => {
    setData({ ...data, startDate: selectedDate.toISOString() });
    setSelectedDate(selectedDate);
    setShowDatePicker(false); // Cerrar el DatePicker…
  };

  const handleEndDate = (selectedDate) => {
    setData({ ...data, endDate: selectedDate.toISOString() });
    setSelectedDate(selectedDate);
    setShowDatePicker(false); // Cerrar el DatePicker   de seleccionar la fecha
  };

  return (
    <section className="w-[18rem] relative md:static">
      {" "}
      {/* Usamos relative para mobile y static para escritorio */}
      <div
        className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
        onClick={() => setShowDatePicker(!showDatePicker)}
      >
        {selectedDate
          ? selectedDate.toLocaleDateString()
          : type === "start"
          ? "Ingreso"
          : "Egreso"}
        <span
          className={`flex justify-center items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
            showDatePicker ? "bg-[#1C8CD65E] rotate-180" : ""
          }`}
        >
          <ChevronUpIcon />
        </span>
      </div>
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            className="md:absolute md:z-10 flex flex-col shadow-reservation-list mt-2 bg-white p-4 rounded-md max-w-[18rem]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Header */}
            <HeaderDatePicker
              year={{ year, setYear }}
              month={{ month, setMonth }}
            />

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-x-4 my-3">
              <span className="text-[#B5BEC6] text-sm text-center">Dom</span>
              <span className="text-[#B5BEC6] text-sm text-center">Lun</span>
              <span className="text-[#B5BEC6] text-sm text-center">Mar</span>
              <span className="text-[#B5BEC6] text-sm text-center">Mié</span>
              <span className="text-[#B5BEC6] text-sm text-center">Jue</span>
              <span className="text-[#B5BEC6] text-sm text-center">Vie</span>
              <span className="text-[#B5BEC6] text-sm text-center">Sáb</span>
            </div>

            {/* Mes */}
            <Month
              year={year}
              month={month}
              currentDay={date.getDate()}
              callback={type === "start" ? handleStartDate : handleEndDate}
              selectedDate={selectedDate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
