import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative w-full bg-[#1FAECC] flex flex-col items-center justify-center p-6 py-16 gap-6">
      {/* Título principal */}
      <h2 className="font-medium text-xl sm:text-3xl text-center text-black max-w-screen-sm">
        Registrate hoy y disfruta de nuestros increíbles servicios
      </h2>

      {/* Contenedor del formulario */}
      <div className="w-full max-w-lg flex flex-col items-center justify-center">
        {/* Botón de registro */}
        <Link href={"/pages/auth"} className="flex items-center px-6 py-1.5 text-black rounded-lg transition">
          <span className="text-[18px] font-medium">Regístrate</span>
          <ArrowRightIcon className="w-6 h-6" />
        </Link>
        {/* Divider */}
        <hr className="w-full border-t border-black" />
      </div>
    </section>
  );
}
