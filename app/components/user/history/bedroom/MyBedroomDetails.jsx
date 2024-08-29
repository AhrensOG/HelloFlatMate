import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function MyBedroomDetails() {
  return (
    <section className="flex flex-col gap-5">
      <div className="relative rounded-2xl h-[10.75rem] w-full">
        <Image
          className="rounded-2xl"
          src={"/my_bedrooms/my-bedroom-stock.jfif"}
          fill
          alt="Ilustracion de un cuarto"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <p className="absolute top-0 right-0 z-50 flex items-center justify-center w-[6.7rem] h-[1.88rem] rounded-bl-3xl rounded-tr-2xl bg-[#0C1660] text-white text-xs text-center">
          HelloRoom
        </p>
      </div>
      <div className="flex justify-between flex-wrap items-center gap-1">
        <div className="flex gap-1">
          <span className="h-6 w-5">
            <MapPinIcon />
          </span>
          <h3 className="text-sm font-medium text-[#000000E5]">Direccion</h3>
        </div>
        <p className="text-xs font-normal text-[#828282] pl-2">
          Wifi - Aire acondicionado - Bañera
        </p>
      </div>
      <div className="text-sm flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-light">Vencimiento</p>
          <p className="font-medium">07 Septiembre</p>
        </div>
        <div className="flex justify-between">
          <p className="font-light">Cantidad a pagar</p>
          <p className="font-medium">$128</p>
        </div>
      </div>
      <button
        className="bg-[#0C1660] rounded-xl text-center text-white font-medium text-sm h-11"
        type="button"
      >
        Pagar
      </button>
    </section>
  );
}
