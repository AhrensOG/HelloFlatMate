import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function OffersSection({
  title = "¡Bienvenid@s a VLC bienveni@s a hello flat mate!",
  description = "Desde 2011 helloflatmate ofrecemos  alojamientos a estudiantes en Valencia, con opciones de habitaciones y estudios gestionados por nosotros (hellorooms) o por propietarios de confianza.(hellolandord).",
  description2 = "Descubre también nuestro hellocoliving si lo que buscas es mayor privacidad y atención.",
  link = "/pages/select-category",
}) {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="relative w-full p-4 pb-16 sm:p-8 flex max-w-screen-xl">
        {/* Imagen de fondo con posición absoluta */}
        <div className="absolute w-72 h-32 overflow-visible top-24 left-[12px] hidden md:block">
          <Image
            src="/home/avion.gif"
            alt="Ofertas en habitaciones"
            fill
            className="object-cover object-center overflow-visible"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Contenido del Hero */}
        <div className="relative w-full z-10 flex flex-col items-start justify-center p-6 md:p-12 mt-4 md:mt-48 bg-[#1FAECC] md:text-left md:items-start">
          <div className="flex flex-col w-full text-center">
            {/* Título */}
            <h2 className="font-extrabold text-[26px] leading-[30px] tracking-[-1.5px] mb-4 sm:text-2xl md:text-3xl">
              {title}
            </h2>

            {/* Descripción */}
            <p className="font-normal text-[18px] leading-[24px] sm:text-xl md:text-2xl">
              Desde 2011, en helloflatmate ofrecemos alojamiento especializado
              para estudiantes en Valencia. Contamos con una variedad de
              opciones adaptadas a tus necesidades:{" "}
              <span className="font-bold">hellorooms</span>, habitaciones
              gestionadas directamente por nuestro equipo, y{" "}
              <span className="font-bold">hellolandlord</span>, habitaciones en
              colaboración con propietarios de confianza. Además, descubre
              nuestro <span className="font-bold">hellocoliving</span> para una
              experiencia de mayor privacidad y atención personalizada.
            </p>

            {/* Descripción2 */}
            {/* <p className="font-normal text-[18px] leading-[24px] mb-8 sm:text-2xl md:text-3xl">
              {description2}
            </p> */}
          </div>

          {/* Botón para versión mobile
          <Link
            href={link}
            className="absolute -bottom-6 bg-black text-white font-bold text-[20px] leading-[24px] px-6 py-3 rounded hover:bg-gray-800 transition flex flex-row justify-center items-center gap-2 sm:hidden"
          >
            Ver habitaciones
            <ArrowRightIcon className="h-5 w-5" />
          </Link> */}

          {/* Botón para versión desktop
          <div className="hidden sm:block absolute z-20 -right-20">
            <Link
              href={link}
              className="bg-black text-white font-bold text-[20px] leading-[24px] px-6 py-3 rounded hover:bg-gray-800 transition flex flex-row justify-center items-center gap-2"
            >
              Ver habitaciones
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div> */}

          {/* Logo para mobile (abajo a la derecha) */}
          {/* <Image
            src="/home/onlyLogo.svg"
            alt="más en habitaciones"
            width={50}
            height={49}
            quality={100}
            className="absolute bottom-6 right-2 sm:hidden"
          /> */}
          {/* <div className="absolute w-52 h-52 overflow-visible bottom-0 right-2 z-30 xl:block hidden">
            <Image
              src="/home/complejo.png"
              alt="Picture"
              fill
              className="object-cover object-center"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div> */}
        </div>
        {/* Logo para desktop (arriba a la derecha) */}
        {/* <Image
          src="/home/onlyLogo.svg"
          alt="más en habitaciones"
          width={50}
          height={49}
          quality={100}
          className="hidden sm:block absolute top-6 right-6"
        /> */}
      </div>
    </section>
  );
}
