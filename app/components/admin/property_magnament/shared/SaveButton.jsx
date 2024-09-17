export default function SaveButton({ action }) {
  return (
    <button
      onClick={() => action()}
      className="w-full h-14 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center lg:w-[25rem] lg:mb-5"
      type="button"
    >
      Guardar
    </button>
  );
}
