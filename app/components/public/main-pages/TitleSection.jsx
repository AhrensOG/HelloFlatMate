import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function TitleSection() {
  return (
    <section className="relative flex flex-col gap-8 bg-white items-center justify-around py-10 px-2">
      <h1 className="text-3xl font-bold">helloroom</h1>
      <h3 id="subtitle" className="text-lg text-center max-w-screen-md">
        son habitaciones equipadas y listas para mudarse desde el primer día,
        con Internet de alta velocidad y todos los servicios activos. Nos
        ocupamos de la gestión y el mantenimiento para que sólo te enfoques en
        estudiar, disfrutar y explorar Valencia. Comparte piso con otros
        estudiantes de edad similar y vive una experiencia única en un entorno
        diseñado para tu estilo de vida.
        <br />
        <br />
        Contigo desde la reserva hasta tu último día en Valencia.
      </h3>
      <div className="flex items-center justify-between gap-2 border-2 border-gray-300 rounded-full mt-5 w-full max-w-[40rem]">
        <label htmlFor="search" hidden></label>
        <input
          type="text"
          name="search"
          id="search"
          className="aparance-none outline-none w-[80%] ml-4 my-3 font-bold text-gray-800"
          placeholder="¿Donde quieres vivir?"
        />
        <button className="h-12 w-12 rounded-full bg-[#FB6E44] flex justify-center items-center m-2">
          <MagnifyingGlassIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}
