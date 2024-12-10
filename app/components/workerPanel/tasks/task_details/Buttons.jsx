export default function Buttons({ action }) {
    return (
        <article className="flex flex-col gap-2 w-full m-3 lg:flex-row lg:justify-center lg:gap-[10rem]">
            <button
                onClick={() => action("finish")}
                className="w-full h-12 bg-[#0C1660] text-[#F7FAFA] text-base font-bold rounded-lg lg:w-[15rem]"
                type="button"
            >
                Terminar tarea
            </button>
            <button
                onClick={() => action("problem")}
                className="w-full h-12 bg-[#DCD8D8] text-black text-base font-bold rounded-lg lg:w-[15rem]"
                type="button"
            >
                Reportar problemas
            </button>
        </article>
    );
}
