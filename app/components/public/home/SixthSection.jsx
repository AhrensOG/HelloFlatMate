import Image from "next/image";

// components/SixthSection.js
export default function SixthSection() {
  const alojamientos = [
    {
      title: "hello landlord",
      description: `Habitaciones en piso compartido gestionadas directamente por propietarios seleccionados por hello flat mate. Cada propietario sigue nuestro modelo de contrato y gestión, brindando seguridad y tranquilidad a los estudiantes.

      ¡Comparte con estudiantes como tú!`,
      imageUrl: "/home/new_home/apartments.jpg", // Ruta de ejemplo para la imagen
    },
    {
      title: "hello rooms",
      description: `Habitaciones de media estancia en Valencia, gestionadas por el equipo de hello flat mate para ofrecer a estudiantes una experiencia cómoda y sin complicaciones. 
      
      ¡Vive con otros estudiantes como tú!`,
      imageUrl: "/home/new_home/privateRoom.jpg",
    },
    {
      title: "hello studios",
      description:
        "Alojamiento de larga estancia en estudios equipados, gestionados tanto por helloflatmate como por landlords confiables.  Ideal para estudiantes y nómadas digitales que buscan comodidad y privacidad.",
      imageUrl: "/home/new_home/studio.jpg",
    },
    {
      title: "hello coliving",
      description:
        "Espacios de coliving para estudiantes en Valencia, con ambiente comunitario, servicio de limpieza y gestión de estancia por helloflatmate para una experiencia cómoda y seguro.",
      imageUrl: "/home/new_home/sharedRoom.jpg",
    },
  ];

  return (
    <section className="py-12 w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl text-center mb-12">
          <strong>4</strong> tipos de alojamiento con toda la seguridad para
          estudiantes
        </h2>
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {alojamientos.map((alojamiento, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200 max-w-64 w-full space-y-4"
            >
              <div className="relative w-full h-48">
                <Image
                  src={alojamiento.imageUrl}
                  alt={alojamiento.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="">
                <span className="bg-pink-200 px-3 py-2 rounded-full text-xs font-semibold">
                  {alojamiento.title}
                </span>
                <p className="mt-2 text-gray-600 text-sm">
                  {alojamiento.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}