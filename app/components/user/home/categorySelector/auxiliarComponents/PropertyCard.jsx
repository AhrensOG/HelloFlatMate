import Image from "next/image";
import Link from "next/link";

export default function PropertyCard(
  {
    img = "/home/featuredRoom.svg",
    title = "Cerca de la estación de tren",
    roomId,
    propertyId,
  },
  ref
) {
  // Condicional para definir la ruta de redirección
  const href = roomId
    ? `/pages/user/property-details/${propertyId}/room-details/${roomId}`
    : `/pages/user/property-details/${propertyId}`;

  return (
    <div className="relative w-[246px] sm:w-[300px] md:w-[400px] h-[400px] rounded-lg shadow-lg mt-10">
      {/* Imagen de fondo */}
      <div className="relative w-full h-52 sm:h-96 ">
        <Image
          src={img} // Reemplaza con la ruta correcta de tu imagen
          alt="Habitación"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="absolute bottom-0 left-0 p-4 w-full bg-white min-h-48 sm:min-h-56">
        {/* Título */}
        <h2 className="font-medium text-sm sm:text-lg text-center mb-2">
          {title}
        </h2>

        {/* Descripción */}
        <p className="text-xs sm:text-base leading-tight text-center text-gray-700 mb-4">
          ¿Buscas una habitación moderna y cómoda? En Helloflatmate, ofrecemos
          el mejor espacio para vivir. Comparte tu experiencia con nosotros.
        </p>

        {/* Botón de acción */}
        <div className="flex justify-center">
          <Link href={href} className="flex items-center justify-center border border-black px-6 py-2 rounded-md hover:bg-black hover:text-white transition">
            Rentar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
