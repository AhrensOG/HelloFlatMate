import Image from "next/image";
import DetailsModal from "./details_modal/DetailsModal";

export default function Room({ title, image, callback }) {
  return (
    <article className="h-[13rem] relative" onClick={callback}>
      <div className="absolute inset-0 w-full h-full bg-type-room-gradient z-10"></div>
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="flex justify-center items-center absolute inset-0 z-20">
        <h3 className="text-white font-extrabold text-4xl text-center">
          {title}
        </h3>
      </div>
    </article>
  );
}
