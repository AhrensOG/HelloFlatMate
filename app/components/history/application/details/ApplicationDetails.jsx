import { plus_jakarta } from "@/font";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ApplicationDetails({
  type,
  tittle,
  location,
  status,
  body,
}) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`${plus_jakarta.className} flex flex-col gap-4 items-center justify-center px-6 my-5`}
    >
      <div className="flex justify-center items-center h-[6.63rem] w-[6.63rem] bg-[#0E165C] rounded-full">
        {type == "REPAIR" ? (
          <Image
            src={"/history/application/repair-icon.svg"}
            alt={`Icono de limpieza`}
            width={68}
            height={68}
          />
        ) : (
          <Image
            src={"/history/application/clean-icon.svg"}
            alt={`Icono de reparacion`}
            width={68}
            height={68}
          />
        )}
      </div>
      <h2 className="font-extrabold text-base ">{tittle}</h2>
      <div className="text-[#000000B2] font-medium text-center flex gap-1">
        <span className="h-6 w-6">
          <MapPinIcon />
        </span>{" "}
        <h4 className="text-sm">{location}</h4>
      </div>
      <h3 className="font-bold text-sm text-black">
        Estado:{" "}
        {status == "COMPLETED" ? (
          <span className="text-[#214802]">Completado</span>
        ) : status == "IN_PROGRESS" ? (
          <span className="text-[#0E165C]">En proceso</span>
        ) : (
          <span className="text-[#FF0000]">Pendiente</span>
        )}
      </h3>
      <p className="font-normal text-sm text-gris-español px-4">{body}</p>
    </motion.main>
  );
}
