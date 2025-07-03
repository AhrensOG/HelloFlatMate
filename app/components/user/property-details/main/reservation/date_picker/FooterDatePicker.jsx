export function FooterDatePicker({ cancel, confirm }) {
  return (
    <footer className="flex justify-between gap-2 items-center ">
      <button
        onClick={() => {
          cancel(true);
        }}
        className="text-gray-500 text-sm md:text-lg hover:text-[#0C1660] "
        type="button"
      >
        Cancelar
      </button>
      <button
        onClick={() => {
          confirm();
        }}
        className="text-[#440CAC] font-bold text-sm md:text-lg hover:text-[#440cac]/80 transition-all duration-300"
        type="button"
      >
        Seleccionar
      </button>
    </footer>
  );
}
