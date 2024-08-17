import { XMarkIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function RoomInfoTemplate({
  img,
  name,
  bedNumber,
  showModal,
  type,
  onDelete,
  info,
}) {
  const [showPencil, setShowPencil] = useState(false);
  console.log(info);
  return (
    <article className="flex flex-col gap-1 min-w-[8.7rem] max-w-[10rem] relative">
      <div
        onMouseEnter={() => setShowPencil(true)}
        onMouseLeave={() => setShowPencil(false)}
        className="relative  h-[5.63rem] bg-[#d6d6d6ff] rounded-lg"
      >
        {img ? (
          <div className="absolute inset-0 flex justify-center items-center w-full h-full">
            <div className="relative w-full h-full">
              <Image
                className="rounded-lg"
                src={img}
                alt="Imagen"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        ) : (
          <div
            className={`${
              showPencil ? "hidden" : ""
            } absolute inset-0 flex justify-center items-center w-full h-full`}
          >
            <div className="w-9 h-9 text-white">
              <PhotoIcon />
            </div>
          </div>
        )}
        <div className="absolute inset-0 w-full h-full flex justify-center items-center z-50">
          {!(type === "empty") ? (
            <div onClick={() => showModal()} className="w-9 h-9 text-white">
              <PencilSquareIcon />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {/* Nombre */}
        <div
          className={`text-base font-medium pl-2 w-full ${
            !name ? "text-gray-500" : "text-black"
          }`}
        >
          {name || "Habitacion N°"}
        </div>

        {/* Número de camas */}
        <div
          className={`font-normal text-sm text-[#4F7A94] w-full flex justify-start gap-8 items-center ${
            !bedNumber ? "text-gray-500" : "text-black"
          }`}
        >
          {bedNumber ? (
            <div className="flex flex-row justify-center items-center gap-1">
              {bedNumber}
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
          {info?.couple === false && (
            <div className="flex flex-row justify-center items-center">
              <Image
                src={"/create-property/singleman.png"}
                width={20}
                height={20}
                alt="bed-icon"
              />
            </div>
          )}
          {info?.couple === true && (
            <div className="flex flex-row justify-center items-center">
              <Image
                src={"/create-property/couple.png"}
                width={20}
                height={20}
                alt="bed-icon"
              />
            </div>
          )}
          {info?.bathroom ? (
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
      </div>
      {onDelete ? (
        <button
          className="absolute z-50 top-0 right-0 bg-red-500 text-white rounded-full p-1"
          onClick={() => onDelete()}
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      ) : (
        ""
      )}
    </article>
  );
}
