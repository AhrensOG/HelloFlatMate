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
    ? `/pages/property-details/${propertyId}/room-details/${roomId}`
    : `/pages/property-details/${propertyId}`;

  return (
    <div className="relative hover:scale-105 transition duration-500 w-[246px] sm:w-[600px] md:w-[700px] h-[400px] sm:h-[600px] rounded-lg shadow-card-action">
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
      <div className="absolute bottom-0 left-0 p-4 w-full bg-slate-100 border-2 border-t-0 min-h-48 sm:min-h-56">
        {/* Título */}
        <h2 className="font-medium text-sm sm:text-lg text-center mb-2">
          {title}
        </h2>

        {/* Descripción */}
        <p className="text-xs sm:text-base leading-tight text-center text-gray-700 mb-4">
          ¿Buscas una habitación moderna y cómoda? En helloflatmate, ofrecemos
          el mejor espacio para vivir. Comparte tu experiencia con nosotros.
        </p>

        {/* Botón de acción */}
        <div className="flex justify-center">
          <Link href={href} className="flex items-center justify-center border border-black px-6 py-2 rounded-md hover:bg-black hover:text-white transition">
            Mas info...
          </Link>
        </div>
      </div>
    </div>
  );
}
