import { plus_jakarta } from "@/font";
import Image from "next/image";

export default function Offers() {
  return (
    <section
      className={`${plus_jakarta.className} w-full bg-offers flex flex-col gap-3 pt-3`}
    >
      <h2 className="font-bold text-[22px] m-3 text-center">
        Oferta/Promoción
      </h2>
      <div className="flex flex-col py-3">
        <article className="flex relative bg-transparent items-start text-[#171412] justify-between">
          <div className="w-[14rem] h-[12rem] z-50 mt-5 object-fill drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] -mr-6 relative">
            <Image
              src="/guest_home/offerts/oferta-1.png"
              alt="Oferta 1"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <p className="text-2xl font-medium text-start bg-[#D9D9D9] py-4 pl-10 text-[#171412] w-[60%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            10% de <br />
            descuento <br />
            en tu <br />
            primera <br />
            reserva
          </p>
        </article>
        <article className="flex justify-between items-start bg-transparent relative">
          <p className="text-xl text-[#000000] font-medium text-start pt-6 pb-3 pl-6 pr-3 bg-transparent w-[50%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] -mr-[6rem]">
            Promoción de <br />
            verano,
            <br />
            habitaciones <br />
            desde €500
          </p>

          <div className="w-[11.7rem] h-[10.25rem] object-cover drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <Image
              src="/guest_home/offerts/oferta-2.png"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
