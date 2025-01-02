import Image from "next/image";
import UploadFileButton from "./UploadFileButton";
import { Context } from "@/app/context/GlobalContext";
import { useContext, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function DocumentsSection({
  id,
  img,
  description,
  width,
  height,
  setNext,
}) {
  const { state } = useContext(Context);
  const documents = state.reservationInfo || {};
  const check = documents[id] || false;

  useEffect(() => {}, [state]);

  return (
    <div className="flex flex-col justify-between items-center gap-3 my-[2rem]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-[8.5rem] h-[8.5rem] p-2 bg-[#D9D9D9] rounded-xl flex items-center justify-center">
          {check ? (
            <CloudArrowUpIcon className="size-16 animate-bounce" />
          ) : (
            <Image
              src={img}
              alt={description}
              width={width}
              height={height}
              className="rounded-xl"
            />
          )}
        </div>
        <h3 className="text-sm font-normal text-center">{description}</h3>
      </div>
      <UploadFileButton
        description={check ? check.length : "Seleccionar archivo"}
        id={id}
        setNext={setNext}
      />
    </div>
  );
}
