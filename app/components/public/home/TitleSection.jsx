import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function TitleSection() {
  return (
    <section className="relative flex flex-col gap-8 bg-white items-center justify-around py-10 pb-40 px-2">
      <h1 className="text-3xl font-bold">hello flat mate</h1>
      <h3 className="text-lg text-center">
        Especializados en gestión de alojamientos para estudiantes en Valencia.{" "}
        <br /> ¡Reservas y trámites 100% online, rápido, fácil y sin
        complicaciones!
      </h3>
      <div className="flex items-center justify-between gap-2 border-2 border-gray-300 rounded-full mt-5 w-full max-w-[40rem] mb-64">
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
      <div className="absolute w-44 h-32 sm:w-full sm:h-96 bottom-0 left-0">
        <Image
          src={"/home/new_home/hero4.jpeg"}
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
