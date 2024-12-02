import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function TitleSection() {
  return (
    <section className="relative flex flex-col gap-3 bg-white items-center justify-around py-10 pb-40">
      <h1 className="text-3xl font-bold">hello flat mate</h1>
      <h3 className="text-lg text-center">
        Especializados en gestión de alojamientos para estudiantes en Valencia.{" "}
        <br /> ¡Reservas y trámites 100% online, rápido, fácil y sin
        complicaciones!
      </h3>
      <div className="flex items-center justify-between gap-2 border rounded-full mt-5 w-[40rem]">
        <label htmlFor="search" hidden></label>
        <input
          type="text"
          name="search"
          id="search"
          className="aparance-none outline-none w-[80%] ml-4 my-3 h-full rounded-full font-bold"
          placeholder="¿Donde quieres vivir?"
        />
        <button className="h-12 w-12 rounded-full bg-resolution-blue flex justify-center items-center m-2">
          <MagnifyingGlassIcon className="w-6 h-6 text-white" />
        </button>
      </div>
      <Image
        src={"/home/complejo.png"}
        width={250}
        height={200}
        className="absolute object-cover object-center bottom-0 left-0"
      />
    </section>
  );
}
