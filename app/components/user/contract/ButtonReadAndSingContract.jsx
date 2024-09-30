export default function ButtonReadAndSingContract({ action, title }) {
  return (
    <button
      onClick={action}
      className="self-center justify-self-center w-full max-w-screen-sm h-[2.56rem] bg-[#0C1660] rounded-[10px] font-bold text-sm text-[#FFFFFF] mt-[2rem]"
      alt="Leer y firmar"
    >
      {title}
    </button>
  );
}
