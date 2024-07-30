import { MinusIcon } from "@heroicons/react/20/solid";
import ButtonServices from "../ButtonServices";
import DayCard from "./DayCard";
import TimeCard from "./TimeCard";
import { useState } from "react";
import FinishRequest from "./FinishRequest";
import { motion } from "framer-motion";

export default function ModalService({ action, type }) {
  const [infoService, setInfoService] = useState({
    type: type,
    day: null,
    time: null,
  });
  const [nextModal, setNextModal] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null); // Estado para el día seleccionado
  const [selectedTime, setSelectedTime] = useState(null); // Estado para el tiempo seleccionado

  const days = [
    { dayName: "Sabado", dayNumber: 6 },
    { dayName: "Jueves", dayNumber: 11 },
    { dayName: "Viernes", dayNumber: 12 },
  ];
  const times = [{ time: "06:30" }, { time: "07:30" }, { time: "08:30" }];

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setInfoService((prev) => ({ ...prev, day: day }));
    console.log(infoService);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setInfoService((prev) => ({ ...prev, time: time }));
  };

  const handleNextModal = () => {
    setNextModal(nextModal + 1);
  };

  const handlePreviousModal = () => {
    setNextModal(nextModal - 1);
  };

  return (
    <motion.aside
      className="flex flex-col justify-between fixed bottom-0 inset-x-0 items-center rounded-t-xl gap-3 p-3 text-[#161616] bg-[#E0EEF1] h-[20rem]"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <button
        type="button"
        onClick={action}
        className="w-9 h-1 text-[#3C3C434D] cursor-pointer"
      >
        <MinusIcon />
      </button>
      {nextModal === 0 ? (
        <>
          <h2 className="font-semibold text-2xl">
            Selecciona un día y horario
          </h2>
          <div className="flex gap-3 flex-wrap items-center justify-center">
            {days.map((day, index) => (
              <DayCard
                key={index}
                dayName={day.dayName}
                dayNumber={day.dayNumber}
                isSelected={
                  selectedDay &&
                  selectedDay.dayName === day.dayName &&
                  selectedDay.dayNumber === day.dayNumber
                }
                action={() => handleDaySelection(day)}
              />
            ))}
          </div>
          <div className="flex gap-3 flex-wrap items-center justify-center">
            {times.map((time, index) => (
              <TimeCard
                key={index}
                time={time.time}
                isSelected={selectedTime === time.time}
                action={() => handleTimeSelection(time.time)}
              />
            ))}
          </div>
          <ButtonServices
            title={"Solicitar Servicio"}
            action={handleNextModal}
          />
        </>
      ) : nextModal === 1 ? (
        <FinishRequest
          next={handleNextModal}
          prev={handlePreviousModal}
          data={infoService}
        />
      ) : nextModal === 2 ? (
        <motion.h2
          className="text-[#161616] font-normal text-base text-center h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Su solicitud sera analizada por el personal de Helloflatmate y luego
          será notificado del estado del mismo
        </motion.h2>
      ) : (
        <div>hola</div>
      )}
    </motion.aside>
  );
}
