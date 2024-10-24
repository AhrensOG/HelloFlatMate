import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function SelectRentalPeriod({ data, setData }) {
  const [selectedValue, setSelectedValue] = useState(""); // Valor inicial vacío
  const [showOptions, setShowOptions] = useState(false); // Para mostrar u ocultar las opciones

  const calculateDurationInMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcular la diferencia en años y meses
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();

    // Total de meses
    return yearsDiff * 12 + monthsDiff;
  };

  const handleValueChange = (id) => {
    const selectedId = id;
    const selectedPeriod = data.find(
      (period) => period.id === parseInt(selectedId)
    );

    if (selectedPeriod) {
      // Actualiza el valor seleccionado
      setSelectedValue(selectedId); // Guarda el ID del periodo seleccionado
      // Actualiza setData con un objeto
      setData(
        selectedPeriod.rentalPeriod?.startDate,
        selectedPeriod.rentalPeriod?.endDate,
        calculateDurationInMonths(
          selectedPeriod.rentalPeriod?.startDate,
          selectedPeriod.rentalPeriod?.endDate
        ),
        selectedPeriod.id
      );
      // Cierra el selector al seleccionar una opción
      setShowOptions(false);
    }
  };

  const formatedDate = (date) => {
    if (date) {
      const newDate = new Date(date);
      return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "2-digit",
      }).format(newDate);
    }
    return "";
  };

  return (
    <section className="w-[19.4rem]">
      <div
        className="rounded-lg flex justify-between p-2 items-center shadow-reservation-drop my-2 cursor-pointer bg-white"
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedValue
          ? `Del ${formatedDate(
              data.find((period) => period.id === parseInt(selectedValue)).rentalPeriod?.startDate
            )} al ${formatedDate(
              data.find((period) => period.id === parseInt(selectedValue)).rentalPeriod?.endDate
            )}`
          : "Selecciona un contrato"}
        <span
          className={`flex justify-center items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
            showOptions ? "bg-[#1C8CD65E] rotate-180" : ""
          }`}
        >
          <ChevronUpIcon />
        </span>
      </div>
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="flex flex-col shadow-reservation-list mt-2 bg-white rounded-lg max-h-44 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {data.map((period) => (
              <div
                key={period.id}
                onClick={() => handleValueChange(period.id)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {`Del ${formatedDate(period.rentalPeriod?.startDate)} al ${formatedDate(
                  period.rentalPeriod?.endDate
                )}`}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
