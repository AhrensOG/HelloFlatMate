export default function SaveButton({ action }) {
  return (
    <button
      onClick={() => action()}
      className="w-full h-14 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center"
      type="button"
    >
      Guardar
    </button>
  );
}
