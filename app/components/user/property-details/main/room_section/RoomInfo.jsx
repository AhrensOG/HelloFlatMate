import Image from "next/image";
import { useRouter } from "next/navigation";
import ModalRomInfo from "./ModalRomInfo";
import { CurrencyEuroIcon } from "@heroicons/react/24/outline";

export default function RoomInfo({ data, action, category }) {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(
      `/pages/property-details/${data.propertyId}/room-details/${data.id}`
    );
  };
  return (
    <article
      onClick={
        category === "HELLO_ROOM" ||
        category === "HELLO_COLIVING" ||
        category === "HELLO_LANDLORD"
          ? handleRedirect
          : () => action(data)
      }
      className={`cursor-pointer flex flex-col gap-2 w-48 items-center justify-between relative`}
    >
      <div className="relative h-32 rounded-sm w-48">
        {data.images[0] ? (
          <Image
            src={data.images[0]}
            alt={data.name}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="rounded-sm"
          />
        ) : (
          <div className="h-32 w-full bg-gray-200 rounded-sm animate-pulse" />
        )}
      </div>
      <h3 className="text-base font-medium break-words p-1">{data.name}</h3>
      <section className="flex gap-2 w-full">
        <h3 className="font-bold">Precio:</h3>
        <h4 className="text-[#000000B2] font-semibold flex gap-1 items-center">
          {data.price}
          {/* <span className="h-4 w-4 flex items-center">
            <CurrencyEuroIcon />
          </span> */}
          <span className="text-sm">€ / mes</span>
        </h4>
      </section>
      <div
        className={`font-normal text-sm text-[#4F7A94] w-full flex justify-start gap-8 items-center p-1 ${
          !data.numberBeds ? "text-gray-500" : "text-black"
        }`}
      >
        {/* <div className="flex flex-row justify-center items-center gap-1">
          {data.bedNumber || ""}
          <Image
            src={"/create-property/bed.png"}
            width={25}
            height={25}
            alt="bed-icon"
          />
        </div> */}
        {/* {data?.couple === false && (
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
        ) : null} */}
      </div>
    </article>
  );
}
