export function FooterDatePicker({ cancel, confirm }) {
  return (
    <footer className="flex justify-between gap-2 items-center ">
      <button
        onClick={() => {
          cancel(true);
        }}
        className="text-[#B5BEC6] hover:text-[#0C1660] "
        type="button"
      >
        Cancelar
      </button>
      <button
        onClick={() => {
          confirm();
        }}
        className="text-[#B5BEC6] hover:text-[#0C1660] "
        type="button"
      >
        Seleccionar
      </button>
    </footer>
  );
}
