import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function SelectContract({ data, setData }) {
  const [showInput, setShowInput] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    "Seleccionar duración del contrato"
  );

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    setData({ ...data, duracion: value });
  };

  return (
    <section className="w-[19.4rem]">
      <div
        className="rounded-lg flex justify-between p-2 items-center shadow-reservation-drop my-2 cursor-pointer bg-white"
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
            className="flex flex-col shadow-reservation-list mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <input
              type="number"
              value={selectedValue}
              onChange={handleValueChange}
              placeholder="Introduce la duración en meses"
              className="border rounded p-2"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
