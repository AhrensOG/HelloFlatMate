import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function TitleSection() {
  return (
    <section className="relative flex flex-col gap-8 bg-white items-center justify-around pt-10 px-2">
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
    </section>
  );
}
