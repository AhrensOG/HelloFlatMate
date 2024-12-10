import Image from "next/image";
import ButtonReadAndSingContract from "./ButtonReadAndSingContract";
import TitleSection from "./TitleSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function ContractCheckIn({ handleContinue, handleBack }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");

  const handleSave = async () => {
    if (!checkInDate || !checkInTime) {
      toast.error("Por favor, completa la fecha y la hora de ingreso.");
      return;
    }

    const checkInInfo = { date: checkInDate, time: checkInTime };

    try {
      // Llamada a la API para guardar la información
      const response = await axios.post("/api/check-in", checkInInfo);

      if (response.status === 200) {
        toast.success("Información de Check-In guardada correctamente.");
        handleContinue(); // Proceder a la siguiente etapa
      } else {
        throw new Error("Error al guardar los datos");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Hubo un problema al guardar la información. Inténtalo de nuevo."
      );
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-7 p-4"
    >
      <TitleSection
        title={"Fecha y Hora de Check-In"}
        action={() => handleBack()}
      />
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full max-w-screen-sm">
          <h2 className="text-lg font-semibold text-center mb-4">
            Selecciona la fecha y hora de tu llegada al alojamiento
          </h2>
          <div className="flex flex-col gap-4">
            {/* Campo de Fecha */}
            <label htmlFor="checkInDate" className="text-sm font-medium">
              Fecha de Check-In
            </label>
            <input
              id="checkInDate"
              type="date"
              className="border border-gray-300 rounded-lg p-2 text-sm"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />

            {/* Campo de Hora */}
            <label htmlFor="checkInTime" className="text-sm font-medium">
              Hora de Check-In
            </label>
            <input
              id="checkInTime"
              type="time"
              className="border border-gray-300 rounded-lg p-2 text-sm"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
            />

            <p className="text-sm text-gray-600">
              Asegúrate de ingresar la información correctamente para coordinar
              tu llegada al alojamiento. Si tienes dudas, contáctanos antes de
              tu llegada.
            </p>
          </div>
          <div className="mt-6">
            <ButtonReadAndSingContract
              action={handleSave}
              title={"Guardar y Continuar"}
              isChecked={true}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
