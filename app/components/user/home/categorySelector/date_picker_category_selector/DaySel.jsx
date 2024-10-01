export default function DaySel({
  day,
  isCurrentDay,
  isSelected,
  callback,
  isDisabled,
}) {
  const handleClick = () => {
    if (!isDisabled) {
      callback();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center w-10 h-10 aspect-square
        ${
          isDisabled
            ? "text-gray-600 bg-transparent cursor-not-allowed border-none rounded-full font-normal text-sm delay-300 opacity-30"
            : ""
        }
        ${
          isSelected
            ? "text-white bg-[#0C1660] hover:bg-slate-200 hover:text-[#0C1660] cursor-pointer border-none rounded-full font-normal text-sm delay-300"
            : ""
        }
        ${
          isCurrentDay
            ? "text-[#0C1660] bg-blue-200 hover:bg-slate-200 cursor-pointer border-none rounded-full font-normal text-sm delay-300"
            : ""
        }
      `}
    >
      {day}
    </div>
  );
}
