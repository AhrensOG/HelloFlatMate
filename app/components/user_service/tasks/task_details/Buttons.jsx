export default function Buttons({ action }) {
  return (
    <article className="flex flex-col gap-2 w-full m-3">
      <button
        onClick={() => action("finish")}
        className="w-full h-12 bg-[#0C1660] text-[#F7FAFA] text-base fonte-bold rounded-lg"
        type="button"
      >
        Terminar tarea
      </button>
      <button
        onClick={() => action("problem")}
        className="w-full h-12 bg-[#DCD8D8] text-black text-base fonte-bold rounded-lg"
        type="button"
      >
        Reportar problemas
      </button>
    </article>
  );
}
