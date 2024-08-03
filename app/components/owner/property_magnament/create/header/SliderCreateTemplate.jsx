import { PhotoIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function SliderCreateTemplate({ action, img }) {
  const [showPencil, setShowPencil] = useState(false);

  const handleShowPencil = () => {
    setShowPencil(!showPencil);
  };

  return (
    <div className="relative w-full h-40">
      <div className="absolute inset-0 bg-gradient-to-t from-custom-light to-custom-light"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-custom-dark to-transparent"></div>
      <div
        onMouseEnter={handleShowPencil}
        onMouseLeave={handleShowPencil}
        className="relative z-10 flex justify-center items-center w-full h-full"
      >
        <div className="absolute inset-0 flex justify-center items-center">
          {img ? (
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt="slider-img"
                layout="responsive"
                width={200}
                height={200}
              />
            </div>
          ) : (
            <div className={`${showPencil ? "hidden" : ""}`}>
              <div className="w-20 h-20 text-white">
                <PhotoIcon />
              </div>
            </div>
          )}
          <div
            className={`${
              showPencil ? "" : "hidden"
            } absolute inset-0 flex justify-center items-center w-full h-full`}
          >
            <button
              onClick={action}
              type="button"
              className="w-full h-full flex justify-center items-center text-white"
            >
              <PencilSquareIcon className="w-14 h-14" />
            </button>
          </div>
        </div>
        {!img && (
          <div className="absolute bottom-4 flex gap-2 justify-center items-center">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            <span className="h-2 w-2 rounded-full bg-white"></span>
            <span className="h-2 w-2 rounded-full bg-white"></span>
            <span className="h-2 w-2 rounded-full bg-white"></span>
            <span className="h-2 w-2 rounded-full bg-white"></span>
          </div>
        )}
      </div>
    </div>
  );
}
