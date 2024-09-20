import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function DesktopHero({
  img = "/home/DesktopHero.jpg",
  title = "helloflatmate",
  description = "Simplificamos la forma de compartir tu hogar",
  link = "/pages/select-category",
}) {
  return (
    <section className="w-full">
      {/* Imagen de fondo con gradiente */}
      <div className="relative">
        <div className="relative w-full h-80 md:h-96 lg:h-[420px] z-10">
          <Image
            src={img}
            alt="Fondo de Hero"
            fill
            quality={100}
            className="object-cover"
          />
          <div className="absolute h-full w-full bg-gradient-to-r from-black/50 to-black/80 z-10" />
        </div>
        {/* Contenido del Hero */}
        <div className="absolute w-full inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          {/* Título principal */}
          <h1 className="font-extrabold text-4xl md:text-7xl leading-none tracking-[-1px]">
            {title}
          </h1>

          {/* Subtítulo */}
          <p className="mt-4 font-semibold text-[16px] md:text-[24px] leading-tight">
            {description}
          </p>

          {/* Botón de reserva */}
          <div className="mt-12">
            <Link
              href={link}
              className="font-bold text-2xl md:text-4xl text-white border border-white px-6 py-2 md:py-4 rounded-md hover:bg-white hover:text-resolution-blue transition-all flex flex-row justify-center items-center gap-2"
            >
              Reservar ahora
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
