import { data } from "@/app/components/guest-home/type_rooms/typesRoomsData";
import Image from "next/image";

export default function RoomInfo({ data }) {
  return (
    <article className="flex flex-col gap-2 min-w-[8.7rem] max-w-[10rem] items-center justify-between relative">
      <div className="relative h-24 rounded-xl w-full">
        <Image
          src={data.images[0]}
          alt={data.name}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="rounded-xl"
        />
      </div>
      <h3 className="text-base font-medium break-words p-1">{data.name}</h3>
      <div
        className={`font-normal text-sm text-[#4F7A94] w-full flex justify-start gap-8 items-center p-1 ${
          !data.numberBeds ? "text-gray-500" : "text-black"
        }`}
      >
        {data?.numberBeds ? (
          <div className="flex flex-row justify-center items-center gap-1">
            {data.bedNumber}
            <Image
              src={"/create-property/bed.png"}
              width={25}
              height={25}
              alt="bed-icon"
            />
          </div>
        ) : (
          "Número de camas"
        )}
        {data?.couple === false && (
          <div className="flex flex-row justify-center items-center">
            <Image
              src={"/create-property/singleman.png"}
              width={20}
              height={20}
              alt="bed-icon"
            />
          </div>
        )}
        {data?.couple === true && (
          <div className="flex flex-row justify-center items-center">
            <Image
              src={"/create-property/couple.png"}
              width={20}
              height={20}
              alt="bed-icon"
            />
          </div>
        )}
        {data?.bathroom ? (
          <div className="flex flex-row justify-center items-center">
            <Image
              src={"/create-property/toilet.png"}
              width={20}
              height={20}
              alt="bed-icon"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
