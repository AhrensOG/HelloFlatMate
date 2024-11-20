import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function DesktopHero({
  img = "https://www.youtube.com/watch?v=TbgLp9EpTyI",
  title = "helloflatmate",
  description = "Alojamientos para estudiantes en Valencia",
  link = "/pages/select-category",
}) {
  return (
    <section className="w-full">
      {/* Imagen de fondo con gradiente */}
      <div className="relative">
        <div className="relative w-full h-80 md:h-[750px] z-10">
          {img.includes("youtube.com") ? (
            // Si es un video de YouTube, extraer el ID y usar la URL de inserción
            <iframe
              src={`https://www.youtube.com/embed/${
                img.split("v=")[1]
              }?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${
                img.split("v=")[1]
              }`}
              title="YouTube Video"
              className="w-full h-full object-cover"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ) : img.includes("vimeo.com") ? (
            // Si es un video de Vimeo, extraer el ID y usar la URL de inserción
            <iframe
              src={`https://player.vimeo.com/video/${img
                .split("/")
                .pop()}?autoplay=1&muted=1&loop=1&background=1`}
              title="Vimeo Video"
              className="w-full h-full object-cover"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ) : (
            // Si es una imagen
            <Image
              src={img}
              alt="Fondo de Hero"
              fill
              quality={100}
              className="object-cover"
            />
          )}
          <div className="absolute top-0 h-full w-full bg-gradient-to-r from-black/50 to-black/50 z-10" />
        </div>
        {/* <div className="relative w-full h-80 md:h-96 lg:h-[420px] z-10">
          <Image
            src={img}
            alt="Fondo de Hero"
            fill
            quality={100}
            className="object-cover"
          />
          <div className="absolute h-full w-full bg-gradient-to-r from-black/50 to-black/80 z-10" />
        </div> */}
        {/* Contenido del Hero */}
        <div className="absolute w-full inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <div className="w-2/3 flex flex-col items-center justify-center gap-20 sm:gap-24 md:gap-44">
            {/* Título principal */}
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-extrabold text-4xl md:text-7xl leading-none tracking-[-1px]">
                {title}
              </h1>

              {/* Subtítulo */}
              <p className="mt-4 font-semibold text-[16px] md:text-[24px] leading-tight">
                {description}
              </p>
            </div>

            {/* Botón de reserva */}
            <div>
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
      </div>
    </section>
  );
}
