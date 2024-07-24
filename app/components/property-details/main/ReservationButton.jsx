export default function ReservationButton({ callback }) {
  return (
    <button
      className="text-white bg-[#0C1660] rounded-lg px-4 py-2 w-full"
      onClick={callback}
    >
      Reservar
    </button>
  );
}
