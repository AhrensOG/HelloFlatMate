import { motion } from "framer-motion";

export default function Day({
  day,
  isCurrentDay = false,
  isDisabled = false,
  callback,
  isSelected = false,
}) {
  const currentDayStyle =
    "text-[#0C1660] bg-blue-200 aspect-square hover:bg-slate-200 cursor-pointer border-none rounded-full font-normal text-sm delay-300";
  const normalDayStyle =
    "text-[#4A5660] aspect-square hover:bg-slate-200 hover:text-[#0C1660] cursor-pointer border-none rounded-full bg-transparent font-normal text-sm delay-300";
  const selectedDayStyle =
    "text-white bg-[#0C1660] aspect-square hover:bg-slate-200 hover:text-[#0C1660] cursor-pointer border-none rounded-full font-normal text-sm delay-300";
  const disableDayStyle =
    "text-gray-600 aspect-square bg-transparent cursor-not-allowed border-none rounded-full font-normal text-sm delay-300 opacity-30";

  // Determina si el día actual es el día seleccionado
  const isCurrentAndSelected = isCurrentDay && isSelected;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => !isDisabled && callback(day)}
      className={
        isDisabled
          ? disableDayStyle
          : isCurrentAndSelected
          ? selectedDayStyle
          : isCurrentDay
          ? currentDayStyle
          : isSelected
          ? selectedDayStyle
          : normalDayStyle
      }
      disabled={isDisabled}
    >
      {day}
    </motion.button>
  );
}
