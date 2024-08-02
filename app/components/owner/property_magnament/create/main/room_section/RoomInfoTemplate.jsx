import {
  PencilIcon,
  PencilSquareIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function RoomInfoTemplate({ data, room, bed }) {
  const [showPencil, setShowPencil] = useState(false);

  return (
    <article className="flex flex-col gap-1 min-w-[8.7rem] max-w-[10rem]">
      <div
        onMouseMove={() => setShowPencil(true)}
        onMouseLeave={() => setShowPencil(false)}
        className="relative  h-[5.63rem] bg-[#d6d6d6ff] rounded-lg"
      >
        {data ? (
          <div className="absolute inset-0 flex justify-center items-center w-full h-full">
            <div className="relative w-full h-full">
              <Image
                className="rounded-lg"
                src={data}
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
          <div
            className={`${
              showPencil ? "" : "hidden"
            }  flex justify-center items-center ${
              data ? "h-16 w-16 rounded-full bg-[#82828266]" : "w-full h-full"
            }`}
          >
            <PencilSquareIcon className="w-9 h-9 text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="bed" hidden></label>
        <input
          value={room}
          className="text-base font-medium pl-2 appearance-none outline-none w-full"
          type="text"
          name="room"
          id="room"
          placeholder="Habitacion N°"
        />
        <label htmlFor="bedNumber" hidden></label>
        <input
          value={bed}
          className="font-normal text-sm text-[#4F7A94] pl-2 appearance-none outline-none"
          type="text"
          id="bedNumber"
          placeholder="Número de camas"
        />
      </div>
    </article>
  );
}
