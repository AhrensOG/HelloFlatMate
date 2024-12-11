import Image from "next/image";

const articles = [
  {
    title: "Alojamientos consolidadas",
    description:
      "Nuestros agentes, residentes en Valencia, seleccionan entornos seguros y bien conectados, ideales para tu día a día. Te ayudamos a enfocarte en tus estudios, construir tu futuro y crear nuevas amistades.",
    image: "/home/new_home/dormir.png",
  },
  {
    title: "Contratos",
    description:
      "En helloflatmate garantizamos contratos de alquiler legales y seguros, basados en el Código Civil, que aseguran un equilibrio justo entre arrendadores e inquilinos. Leer aquí",
    image: "/home/new_home/documento.png",
  },
  {
    title: "Soporte",
    description:
      "Nuestra atención al cliente está disponible de lunes a viernes, de 9:00 a 17:00, para resolver cualquier duda o gestión. Además, ofrecemos un servicio de emergencias 24/7, perfecto para situaciones como olvidar las llaves fuera de horario.",
    image: "/home/new_home/robot-de-chat.png",
  },
  {
    title: "Alojamientos preparados",
    description:
      "Nos encargamos de que cada alojamiento esté limpio y revisado antes de tu llegada, para que disfrutes de una bienvenida cómoda y sin preocupaciones desde el primer día.",
    image: "/home/new_home/escritorio.png",
  },
  {
    title: "Mantenimiento propio",
    description:
      "Cuidamos los alojamientos que gestionamos para que siempre estén en buen estado, además siempre revisamos y limpiamos antes de la llegada de nuestros flatmates.",
    image: "/home/new_home/mecanico.png",
  },
  {
    title: "Alta de suministros",
    description:
      "Todos nuestros alojamientos, excepto helloStudios, cuentan con luz, agua e Internet WiFi dados de alta antes de tu llegada, para que no tengas que preocuparte por nada.",
    image: "/home/new_home/lampara-de-escritorio.png",
  },
];

export default function ThirdSection() {
  return (
    <section className=" mt-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mt-4 text-gray-800">
          Mucho más que una habitación
        </h2>
      </div>
      <section className="w-full bg-white flex flex-wrap justify-center items-stretch mt-2 gap-6 px-2 py-10">
        {articles.map(({ title, description, image }, index) => (
          <article
            key={index}
            className="border-2 rounded-2xl flex flex-col items-center justify-between gap-4 p-4 w-full max-w-[500px] hover:scale-[1.025] hover:shadow-reservation-list duration-300 transition"
          >
            <div className="w-full space-y-4">
              <h1 className="text-3xl font-bold text-center">{title}</h1>
              <h2 className="text-lg text-center">{description}</h2>
            </div>
            <Image src={image} width={150} height={150} alt={title}/>
          </article>
        ))}
      </section>
    </section>
  );
}
