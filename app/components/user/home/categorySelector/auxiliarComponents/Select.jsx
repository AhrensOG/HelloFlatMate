import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const Select = ({
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
    setSelectedValue(option);
    setData({ ...data, [name]: option });
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
            className="flex flex-col shadow-reservation-list mt-2 bg-white max-h-28 overflow-y-scroll scrollbar-thin"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleValueChange(option)}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Select;
