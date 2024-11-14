import { UserGroupIcon } from "@heroicons/react/20/solid";
import Image from "next/image"; // Para manejar las imágenes de Next.js
import Link from "next/link";

const CategorySelectorPropertyCard = ({
  img = "/home/featuredRoom.svg",
  location,
  description,
  category,
  roomId,
  propertyId,
}) => {
  // Condicional para definir la ruta de redirección
  const href = roomId
    ? `/pages/property-details/${propertyId}/room-details/${roomId}`
    : `/pages/property-details/${propertyId}`;

  return (
    <div className="min-w-72 max-w-72 rounded overflow-hidden shadow-lg border">
      {/* Imagen */}
      <div className="relative h-48 w-full">
        <Image
          src={img} // Cambia la ruta de la imagen según sea necesario
          alt="Ubicación de la habitación"
          fill
          className="object-cover"
        />
        <div className="absolute w-full h-full hover:bg-black/40 transition duration-500" />
        <span className="absolute bottom-2 left-1 font-bold text-sm text-white">
          {`${location.city}, ${location.street}`}{" "}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <p className="text-gray-700 text-base">
          {description || "Increíble alojamiento"}
        </p>
      </div>

      {/* Footer con logo y botón */}
      <div className="w-full p-4 pb-2 flex justify-between items-center gap-2">
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
        <Link
          href={href}
          className="bg-transparent text-[#1FAECC] font-semibold py-2 px-4 border border-[#1FAECC] rounded hover:bg-[#1FAECC] hover:text-white transition duration-500"
        >
          Más info...
        </Link>
      </div>
    </div>
  );
};

export default CategorySelectorPropertyCard;
