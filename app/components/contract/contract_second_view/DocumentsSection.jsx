import Image from "next/image";
import UploadFileButton from "./UploadFileButton";
import { Context } from "@/app/context/GlobalContext";
import { useContext } from "react";

export default function DocumentsSection({
  id,
  img,
  description,
  width,
  height,
}) {
  const { state } = useContext(Context);
  const imageUrls = state.imageUrls || {};
  const imageUrl = imageUrls[id] || img;

  return (
    <div className="flex flex-col justify-between items-center gap-3 my-[2rem]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-[8.5rem] h-[8.5rem] bg-[#D9D9D9] rounded-[11px] flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={description}
            width={width}
            height={height}
          />
        </div>
        <h3 className="text-sm font-normal text-center">{description}</h3>
      </div>
      <UploadFileButton description={"Seleccionar archivo"} id={id} />
    </div>
  );
}
