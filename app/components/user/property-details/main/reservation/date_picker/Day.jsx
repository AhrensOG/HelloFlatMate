import { motion } from "framer-motion";

export default function Day({
  day,
  isCurrentDay = false,
  isDisabled = false,
  callback,
  isSelected = false,
  isStartDate = false,
  isEndDate = false,
}) {
  const currentDayStyle =
    "text-[#440CAC] font-bold aspect-square hover:bg-slate-200 cursor-pointer border-none rounded-full text-sm md:text-base delay-300";
  const normalDayStyle =
    "text-[#4A5660] aspect-square hover:bg-slate-200 hover:text-[#0C1660] cursor-pointer border-none rounded-full bg-transparent font-normal text-sm md:text-base delay-300";
  const selectedDayStyle =
    "text-white bg-[#0C1660] aspect-square hover:bg-slate-200 hover:text-[#0C1660] cursor-pointer border-none rounded-full font-normal text-sm md:text-base delay-300";
  const disableDayStyle =
    "text-gray-600 aspect-square bg-transparent cursor-not-allowed border-none rounded-full font-normal text-sm md:text-base delay-300 opacity-30";

  // Ajustando a variaciones más suaves y fuertes de azul
  const startDateStyle =
    "text-white bg-[#66B2FF] aspect-square cursor-pointer border-none rounded-full font-normal text-sm md:text-base delay-300"; // Azul más suave
  const endDateStyle =
    "text-white bg-[#440CAC]/80 aspect-square cursor-pointer border-none rounded-full font-normal text-sm md:text-base delay-300"; // Azul más fuerte

  // Determina el estilo a aplicar
  const getDayStyle = () => {
    if (isDisabled) return disableDayStyle;
    if (isStartDate) return startDateStyle;
    if (isEndDate) return endDateStyle;
    if (isCurrentDay && isSelected) return selectedDayStyle;
    if (isCurrentDay) return currentDayStyle;
    if (isSelected) return selectedDayStyle;
    return normalDayStyle;
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => !isDisabled && callback(day)}
      className={getDayStyle()}
      disabled={isDisabled}
    >
      {day}
    </motion.button>
  );
}
