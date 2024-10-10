import { UserGroupIcon } from "@heroicons/react/20/solid";
import Image from "next/image"; // Para manejar las imágenes de Next.js

const CategorySelectorPropertyCard = ({
  img = "/home/featuredRoom.svg",
  location,
  description,
  category,
  roomId,
  propertyId,
}) => {
  return (
    <div className="max-w-xs w-full rounded overflow-hidden shadow-lg border">
      {/* Header con el estado */}
      {/* <div className="bg-indigo-900 text-white text-center py-2">
        <span className="text-sm font-bold">Disponible</span>
      </div> */}

      {/* Imagen */}
      <div className="relative h-48 w-full">
        <Image
          src={img} // Cambia la ruta de la imagen según sea necesario
          alt="Ubicación de la habitación"
          fill
          className="object-cover"
        />
        <div className="absolute w-full h-full hover:bg-black/40 transition duration-500"/>
        <span className="absolute bottom-2 left-1 font-bold text-sm text-white">
          {`${location.city}, ${location.street}`}{" "}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <p className="text-gray-700 text-base">
          {" "}
          {description[0] || "Increíble alojamiento"}{" "}
        </p>
      </div>

      {/* Footer con logo y botón */}
      <div className="p-4 pb-2 flex justify-between items-center gap-2">
        <div className="flex items-center">
          {/* <Image
            src="/images/logo.png" // Cambia la ruta del logo según sea necesario
            alt="hellostudio"
            width={24}
            height={24}
          /> */}
          <UserGroupIcon className="size-5" />
          <span className="ml-2 text-gray-700 text-xs">
            {category.split("_").join("").toLowerCase() || "hellostudio"}
          </span>
        </div>
        <button className="bg-transparent text-[#1FAECC] font-semibold py-2 px-4 border border-[#1FAECC] rounded hover:bg-[#1FAECC] hover:text-white transition duration-500">
          Rentar ahora
        </button>
      </div>
    </div>
  );
};

export default CategorySelectorPropertyCard;
