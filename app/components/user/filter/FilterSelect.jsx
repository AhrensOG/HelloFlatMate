import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon, CheckIcon } from "@heroicons/react/24/outline";

const FilterSelect = ({
  name = "rentalPeriod",
  options = [], // Aquí recibirás los rentalPeriods
  data,
  setData,
  title = "Seleccionar un período",
}) => {
  const [showInput, setShowInput] = useState(false);
  const [selectedValue, setSelectedValue] = useState(data[name] || title);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleValueChange = (option) => {
    if (option) {
      setSelectedValue(option);
      setData({ ...data, [name]: option }); // Actualiza el filtro con el rentalPeriod seleccionado
    }
    setShowInput(false); // Cierra el dropdown después de seleccionar
  };

  return (
    <section className="w-full relative">
      <div
        className="rounded-lg flex justify-between p-2 items-center h-[5vh] cursor-pointer bg-white border-2 text-xs lg:text-sm"
        onClick={handleClick}
      >
        {selectedValue}
        <span
          className={`flex justify-start items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
            showInput ? "bg-[#1C8CD65E] rotate-180" : ""
          }`}
        >
          <ChevronUpIcon />
        </span>
      </div>
      <AnimatePresence>
        {showInput && (
          <motion.div
            className="absolute w-full z-10 flex flex-col shadow-reservation-list bg-white max-h-28 overflow-y-auto scrollbar-thin border rounded-md"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                onClick={() => handleValueChange(option)}
              >
                {/* Checkbox Visual */}
                <div
                  className={`w-4 h-4 mr-2 border rounded-sm flex items-center justify-center ${
                    selectedValue === option
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-400"
                  }`}
                >
                  {selectedValue === option && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FilterSelect;
