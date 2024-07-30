export default function DayCard({ dayName, dayNumber, isSelected, action }) {
  const selected = "bg-[#B3B8FF]";
  return (
    <button
      type="button"
      onClick={action}
      className={`${
        isSelected ? selected : ""
      } flex flex-col items-center justify-center rounded-xl h-[3.5rem] w-[3.5rem] font-normal text-sm border hover:bg-[#E6EAFF] border-[#283891] text-center p-3}`}
    >
      <p className="font-normal text-[#757575]">{dayName.slice(0, 3)}</p>
      <p className="font-bold text-[#161616]">{dayNumber}</p>
    </button>
  );
}
