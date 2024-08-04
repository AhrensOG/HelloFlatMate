import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function PropertyCard({ image, name, date, body, status }) {
  const verifiyStatus = (status) => {
    switch (status) {
      case "avaible":
        return (
          <button
            type="button"
            className="bg-[#52B46B] py-2 px-4 text-center rounded-2xl text-white text-sm font-medium"
          >
            Disponible
          </button>
        );
      case "reserved":
        return (
          <button
            type="button"
            className="bg-[#21ABCC] py-2 px-4 text-center rounded-2xl text-white text-sm font-medium"
          >
            Reservado
          </button>
        );
      case "rented":
        return (
          <button
            type="button"
            className="bg-[#0E155F] py-2 px-4 text-center rounded-2xl text-white text-sm font-medium"
          >
            Alquilado
          </button>
        );
      default:
        return "";
    }
  };

  return (
    <article className="w-[19rem] flex flex-col gap-3 shadow-supplie-card rounded-lg p-4">
      <div className="flex gap-2 items-center">
        <div className=" flex justify-center items-center w-11 h-11 rounded-lg shadow-supplie-card bg-[#ECF0F3]">
          <Image src={image} width={30} height={30} alt={name} />
        </div>
        <div className="flex flex-col gap-1 py-1">
          <h3 className="text-[#222B45] text-base font-medium ">{name}</h3>
          <p className="text-sm text-[#464E5F66] font-normal">{date}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-sm text-[#464E5F66] font-normal">
        <p>{body}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center">
          {verifiyStatus(status)}
        </div>
        <div className="flex gap-3">
          <button className="h-9 w-9 border border-[#DDDFE1] text-[#0E155F] flex justify-center items-center">
            <PencilIcon className="h-6 w-6" />
          </button>
          <button className="h-9 w-9 border border-[#DDDFE1] text-[#0E155F] flex justify-center items-center">
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </article>
  );
}
