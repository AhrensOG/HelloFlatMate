import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function RentCardHistory({ status, title, precio, ubicacion }) {
  return (
    <section className="shadow-profile flex flex-col rounded-3xl m-3">
      <h3 className="border-b-2 border-b-[#F5F5F5] text-[#0C1660] font-semibold text-xs p-3 pl-6">
        {status}
      </h3>
      <article className="flex gap-2 p-6">
        <div className="h-[5.62rem] w-[5.62rem] relative">
          <Image
            className="rounded-lg"
            src={"/history/rent/stock-rent-1.jfif"}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            alt={"Imagen-stock"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="font-medium text-xs">{title}</h5>
          <div className="flex gap-1">
            <span className="w-4 h-4">
              <MapPinIcon />
            </span>{" "}
            <p className="text-sm text-[#000000B2] font-medium">{ubicacion}</p>
          </div>
          <p className="text-lg font-medium text-gris-español">
            {"$"}
            {precio}
          </p>
        </div>
      </article>
    </section>
  );
}
