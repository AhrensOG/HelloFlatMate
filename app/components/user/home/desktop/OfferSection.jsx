import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function OffersSection({
  title = "Descubre nuestros increíbles alojamientos",
  description = "¿Buscas un lugar cómodo y accesible para vivir? En Helloflatmate, ofrecemos habitaciones modernas y bien equipadas que se adaptan a tus necesidades y presupuesto. Con nosotros, tu nuevo hogar está a solo un clic de distancia.",
  link = "/pages/home",
}) {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="relative w-full p-4 pb-16 sm:p-8 flex max-w-screen-xl">
        {/* Imagen de fondo con posición absoluta */}
        <div className="absolute w-1/2 h-80">
          <Image
            src="/home/gif.gif"
            alt="Ofertas en habitaciones"
            fill
            objectFit="cover"
            quality={100}
          />
        </div>

        {/* Contenido del Hero */}
        <div className="relative w-full sm:w-5/6 z-10 flex flex-col items-start justify-center p-6 md:p-12 mt-4 ml-8 md:mt-24 md:ml-32 bg-[#1FAECC] md:text-left md:items-start">
          <div className="flex flex-col w-full sm:w-2/3 md:w-5/6 text-center">
            {/* Título */}
            <h2 className="font-extrabold text-[26px] leading-[30px] tracking-[-1.5px] mb-4 sm:text-3xl md:text-4xl">
              {title}
            </h2>

            {/* Descripción */}
            <p className="font-normal text-[18px] leading-[24px] mb-8 sm:text-2xl md:text-3xl">
              {description}
            </p>
          </div>

          {/* Botón para versión mobile */}
          <Link
            href={link}
            className="absolute -bottom-6 bg-black text-white font-bold text-[20px] leading-[24px] px-6 py-3 rounded hover:bg-gray-800 transition flex flex-row justify-center items-center gap-2 sm:hidden"
          >
            Ver habitaciones
            <ArrowRightIcon className="h-5 w-5" />
          </Link>

          {/* Botón para versión desktop */}
          <div className="hidden sm:block absolute z-20 -right-20">
            <Link
              href={link}
              className="bg-black text-white font-bold text-[20px] leading-[24px] px-6 py-3 rounded hover:bg-gray-800 transition flex flex-row justify-center items-center gap-2"
            >
              Ver habitaciones
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Logo para mobile (abajo a la derecha) */}
          {/* <Image
            src="/home/onlyLogo.svg"
            alt="más en habitaciones"
            width={50}
            height={49}
            quality={100}
            className="absolute bottom-6 right-2 sm:hidden"
          /> */}
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
