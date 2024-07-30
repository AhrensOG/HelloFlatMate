import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

export default function SearchChat() {
  return (
    <section className="flex items-center justify-between gap-3">
      <form
        action=""
        className="flex items-center bg-[#F5F5F5] p-2 rounded-2xl grow"
      >
        <label hidden htmlFor="search"></label>
        <div className="h-5 w-5 text-[#B2B2B2]">
          <MagnifyingGlassIcon />
        </div>
        <input
          className="apparance-none outline-none bg-[#F5F5F5] pl-2 w-full"
          type="text"
          placeholder="Buscar..."
          id="search"
        />
      </form>

      <div className="h-8 w-8">
        <AdjustmentsHorizontalIcon />
      </div>
    </section>
  );
}
