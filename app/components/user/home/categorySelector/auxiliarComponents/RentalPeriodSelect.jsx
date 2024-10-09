import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon, CheckIcon } from "@heroicons/react/24/outline";

const RentalPeriodSelect = ({
  name = false,
  options,
  data,
  setData,
  title = "Seleccionar una opción",
}) => {
  const [showInput, setShowInput] = useState(false);
  const [selectedValue, setSelectedValue] = useState(title);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleValueChange = (option) => {
    if (option) {
      // Validar que la opción no esté vacía
      setSelectedValue(option);
      setData({ ...data, [name]: option });
    }
    setShowInput(false); // Cerrar el dropdown después de seleccionar una opción
  };

  return (
    <section className="w-[18rem]">
      <div
        className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
        onClick={handleClick}
      >
        {selectedValue}{" "}
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
            className="flex flex-col shadow-reservation-list mt-2 bg-white max-h-28 overflow-y-scroll scrollbar-thin"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {options
              .filter((option) => option) // Filtrar las opciones vacías
              .map((option, index) => (
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

export default RentalPeriodSelect;
