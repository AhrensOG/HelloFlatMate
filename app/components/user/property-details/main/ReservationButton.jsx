export default function ReservationButton({ callback, disabled = false }) {
  return (
    <button
      disabled={disabled}
      className={`${disabled ? "bg-gray-300" : "bg-[#0C1660]" } text-white rounded-lg px-4 py-2 w-full`}
      onClick={() => callback()}
      type="submit"
    >
      Reservar
    </button>
  );
}
