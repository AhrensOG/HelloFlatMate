import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function MyBedroomCard({
  action,
  type,
  location,
  amenities,
  price,
  dueDate,
}) {
  return (
    <article className="flex gap-1 items-center h-36" onClick={action}>
      <div className="relative h-[100%] w-[7.25rem] rounded-2xl">
        <Image
          className="rounded-2xl"
          alt="Ilustracion de un cuarto"
          src={"/my_bedrooms/my-bedroom-stock.jpg"}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="flex flex-col py-2 pl-1 gap-1 grow">
        <p className="text-sm text-white font-medium p-1 text-center bg-[#0E155F] rounded-3xl w-24">
          {type}
        </p>
        <div className="flex">
          <span className="h-5 w-5">
            <MapPinIcon />
          </span>
          <h3 className="text-sm text-[#000000E5] align-text-bottom">
            {location}
          </h3>
        </div>
        <p className="text-xs font-normal text-[#828282]">{amenities}</p>
        <p className="font-light text-sm flex justify-between">
          Vencimiento <span className="font-medium text-sm">{dueDate}</span>
        </p>
        <p className="font-light text-sm flex justify-between">
          Cantidad a pagar <span className="font-medium text-sm">${price}</span>
        </p>
      </div>
    </article>
  );
}
