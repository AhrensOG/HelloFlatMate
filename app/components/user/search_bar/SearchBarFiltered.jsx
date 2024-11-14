import { plus_jakarta } from "@/font";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function SearchBarFiltered({
  initialValue,
  showFilters,
  setShowFilters,
  onChange,
  onApplyFilters,
}) {
  const route = useRouter();

  const handleInput = (e) => {
    onChange("word", e.target.value); // Llama a onChange para actualizar el estado del filtro
    onApplyFilters();
  };

  const handleBack = () => {
    route.back();
  };

  return (
    <div className="w-full">
      <div
        className={`${plus_jakarta.className} text-[#A0A09F] w-full flex justify-center items-center`}
        role="search"
      >
        <div className="px-2 flex gap-2 items-center justify-center max-w-screen-sm w-full">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex align-center w-full h-[2.2rem] rounded-[0.6rem] border-[1px] border-[#00000033] gap-2"
          >
            <button
              onClick={handleBack}
              type="button"
              className="self-center ml-2 h-6 w-6"
            >
              <ArrowLeftIcon />
            </button>
            <label htmlFor="search-input" className="text-center hidden">
              Buscar
            </label>
            <input
              id="search-input"
              onChange={handleInput}
              className="rounded-[0.6rem] grow text-[0.93rem] font-medium outline-none text-left text-[#1C1C21] pl-3"
              type="text"
              placeholder="Buscar..."
              value={initialValue || ""} // Asegúrate de que `initialValue` esté correcto
            />
          </form>

          <button
            className="flex font-medium text-base items-center gap-1 min-w-[75px]"
            aria-label="Abrir filtros"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filtros
            <Image
              alt="Abrir filtros"
              src={"/search/filter-arrow.svg"}
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
