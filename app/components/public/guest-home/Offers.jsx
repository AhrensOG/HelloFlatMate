import { bebas_neue, plus_jakarta } from "@/font";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Offers() {
  return (
    <section className={`  w-full`}>
      <div className="grid grid-cols-2 grid-rows-2 place-items-center">
        <div className="h-48 w-full relative ">
          <Image
            priority={true}
            src={"/guest_home/offerts/oferta-1.svg"}
            fill
            alt="First Offer"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center items-center max-h-48 h-full w-full">
          <div className="bg-[#E09122] p-2 w-full min-h-16">
            <h2 className="text-xs font-bold text-end">
              Descubre nuestros alojamientos disponibles
            </h2>
          </div>
          <Link
            href={"/pages/auth"}
            className={`bg-black flex justify-center items-center text-white w-full p-2 gap-2 ${bebas_neue.className}`}
          >
            Ver Ofertas
            <ArrowRightIcon className="size-4" />
          </Link>
          <div className="relative w-full h-[87px]">
            <Image
              priority={true}
              src={"/guest_home/offerts/oferta-2.svg"}
              fill
              alt="First Offer"
              className="object-cover"
            />
          </div>
        </div>
        <div className="max-h-48 h-full bg-[#0273EB] grid place-items-center">
          <h2
            className={`${bebas_neue.className} text-4xl text-center text-white`}
          >
            Mucho mas que una habitacion
          </h2>
        </div>
        <div className="h-48 w-full relative ">
          <Image
            priority={true}
            src={"/guest_home/offerts/oferta-3.svg"}
            fill
            alt="First Offer"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
