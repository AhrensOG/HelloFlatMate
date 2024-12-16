import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import CategorySelector from "../main-pages/CategorySelector";

export default function TitleSection({
  properties,
  helloRoomProperties,
  helloColivingProperties,
  helloLandlordProperties,
  helloStudioProperties,
}) {
  return (
    <section className="relative flex flex-col gap-8 bg-white items-center justify-around py-10 pb-40 px-2">
      <h1 className="text-3xl font-bold">helloflatmate</h1>
      <h3 className="text-lg text-center">
        Especializados en gestión de alojamientos para estudiantes en Valencia.{" "}
        <br /> ¡Reservas y trámites 100% online, rápido, fácil y sin
        complicaciones!
      </h3>
      <div className="mb-64 w-full">
        <CategorySelector
          helloRoomProperties={helloRoomProperties}
          helloColivingProperties={helloColivingProperties}
          helloStudioProperties={helloStudioProperties}
          helloLandlordProperties={helloLandlordProperties}
          allProperties={properties}
        />
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
