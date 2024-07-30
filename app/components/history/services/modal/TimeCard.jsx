export default function TimeCard({ time, isSelected, action }) {
  const selected = "bg-[#B3B8FF] border-[#283891]";
  return (
    <button
      onClick={action}
      type="button"
      className={`${
        isSelected ? selected : ""
      } flex justify-center w-[4rem] h-[1.75rem] rounded-lg font-normal text-sm border hover:bg-[#E6EAFF] hover:border-[#B3B8FF] text-center p-1`}
    >
      <p>{time}</p>
    </button>
  );
}
