export default function ButtonReadAndSingContract({
  action,
  title,
  isChecked,
}) {
  return (
    <button
      disabled={!isChecked}
      onClick={action}
      className={`${!isChecked ? "bg-gray-300" : "bg-[#0C1660]"} transition duration-300 self-center justify-self-center w-full max-w-screen-sm h-[2.56rem] rounded-[10px] font-bold text-sm text-[#FFFFFF]`}
      alt="Leer y firmar"
    >
      {title}
    </button>
  );
}
