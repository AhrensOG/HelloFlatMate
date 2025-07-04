import { motion } from "framer-motion";

export default function Day({
  day,
  isCurrentDay = false,
  isDisabled = false,
  callback,
  isSelected = false,
  isStartDate = false,
  isEndDate = false,
  price = null, // ✅ Precio recibido
  isInRange = false,
}) {
  const currentDayStyle =
    "text-[#440CAC] font-bold aspect-square hover:bg-slate-200 cursor-pointer p-1 border-none rounded-full text-sm md:text-base delay-300";
  const normalDayStyle =
    "text-[#4A5660] aspect-square hover:bg-slate-200 hover:text-[#0C1660] cursor-pointer p-1 border-none rounded-full bg-transparent font-normal text-sm md:text-base delay-300";
  const selectedDayStyle =
    "text-white bg-[#0C1660] aspect-square hover:bg-slate-200 hover:text-[#0C1660] cursor-pointer p-1 border-none rounded-full font-normal text-sm md:text-base delay-300";
  const disableDayStyle =
    "text-gray-600 aspect-square bg-transparent cursor-not-allowed border-none p-1 rounded-full font-normal text-sm md:text-base delay-300 opacity-30";
  const startDateStyle =
    "text-white bg-[#66B2FF] aspect-square cursor-pointer border-none p-1 rounded-full font-normal text-sm md:text-base delay-300";
  const endDateStyle =
    "text-white bg-[#440CAC]/80 aspect-square cursor-pointer border-none p-1 rounded-full font-normal text-sm md:text-base delay-300";
  const inRangeStyle =
    "bg-blue-50 text-[#0C1660] aspect-square cursor-pointer border-none p-1 rounded-full font-normal text-sm md:text-base delay-300";

  const getDayStyle = () => {
    if (isDisabled) return disableDayStyle;
    if (isStartDate) return startDateStyle;
    if (isEndDate) return endDateStyle;
    if (isInRange) return inRangeStyle;
    if (isCurrentDay && isSelected) return selectedDayStyle;
    if (isCurrentDay) return currentDayStyle;
    if (isSelected) return selectedDayStyle;
    return normalDayStyle;
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center justify-center">
      <button
        onClick={() => !isDisabled && callback(day)}
        className={getDayStyle()}
        disabled={isDisabled}>
        {day}
      </button>
      {/* ✅ Mostramos el precio si existe y el día no está deshabilitado */}
      {!isDisabled && price !== null && (
        <span className="text-[10px] md:text-[11px] text-[#440CAC] mt-0.5">
          €{price}
        </span>
      )}
    </motion.div>
  );
}
