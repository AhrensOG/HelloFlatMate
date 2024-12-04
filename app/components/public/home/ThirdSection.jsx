import Image from "next/image";

const articles = [
  {
    title: "Alojamientos en zonas consolidadas",
    description:
      "Recibe ayuda de un agente en tu idioma, para resolver dudas, ayudarte a encontrar casa y gestionar todo el papeleo.",
    image: "/home/new_home/dormir.gif",
  },
  {
    title: "Contratos",
    description:
      "Tener un contrato de alquiler es esencial para garantizar una residencia legal y segura. En hello flat mate, todos nuestros alojamientos se rigen por un modelo contractual basado en el Código Civil, asegurando un equilibrio justo de derechos y responsabilidades tanto para arrendadores como para arrendatarios.",
    image: "/home/new_home/documento.gif",
  },
  {
    title: "Soporte",
    description:
      "Nuestra atención al cliente está disponible de lunes a viernes, de 9:00 a 17:00, para resolver cualquier duda o gestión. Además, ofrecemos un servicio de emergencias 24/7, perfecto para situaciones como olvidar las llaves fuera de horario.",
    image: "/home/new_home/robot-de-chat.gif",
  },
  {
    title: "Alojamientos preparados",
    description:
      "Nos encargamos de que cada alojamiento esté limpio y revisado antes de tu llegada, para que disfrutes de una bienvenida cómoda y sin preocupaciones desde el primer día.",
    image: "/home/new_home/escritorio.gif",
  },
  {
    title: "Mantenimiento propio",
    description:
      "Cuidamos los alojamientos que gestionamos para que siempre estén en buen estado, además siempre revisamos y limpiamos antes de la llegada de nuestros flatmates.",
    image: "/home/new_home/mecanico.gif",
  },
  {
    title: "Alta de suministros",
    description:
      "Todos nuestros alojamientos, excepto hello Studios, cuentan con luz, agua e Internet WiFi dados de alta antes de tu llegada, para que no tengas que preocuparte por nada.",
    image: "/home/new_home/lampara-de-escritorio.gif",
  },
];

export default function ThirdSection() {
  return (
    <section className="w-full bg-white flex flex-wrap justify-center items-stretch mt-10 gap-6 px-2 py-10">
      {articles.map(({ title, description, image }, index) => (
        <article
          key={index}
          className="border-2 rounded-2xl flex flex-col items-center justify-stretch gap-4 p-4 w-full max-w-[500px] hover:scale-[1.025] hover:shadow-reservation-list duration-300 transition"
        >
          <h1 className="text-3xl font-bold text-center">{title}</h1>
          <h2 className="text-lg text-center">{description}</h2>
          <Image src={image} width={150} height={150} alt={title} />
        </article>
      ))}
    </section>
  );
}
