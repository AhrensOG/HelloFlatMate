import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function RoomInfoTemplate({
  img,
  name,
  bedNumber,
  showModal,
  type,
}) {
  const [showPencil, setShowPencil] = useState(false);

  return (
    <article className="flex flex-col gap-1 min-w-[8.7rem] max-w-[10rem]">
      <div
        onMouseMove={() => setShowPencil(true)}
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
          {!type === "empty" ? (
            <div onClick={() => showModal()} className="w-9 h-9 text-white">
              <PencilSquareIcon />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" hidden></label>
        <input
          value={name}
          className="text-base font-medium pl-2 appearance-none outline-none w-full"
          type="text"
          name="name"
          id="name"
          placeholder="Habitacion N°"
        />
        <label htmlFor="bedNumber" hidden></label>
        <input
          value={bedNumber}
          className="font-normal text-sm text-[#4F7A94] pl-2 appearance-none outline-none"
          type="text"
          id="bedNumber"
          placeholder="Número de camas"
        />
      </div>
    </article>
  );
}
