import Image from "next/image";
import { useRouter } from "next/router";

// components/Garantias.js
export default function FifthSection() {
  let router;
  try {
    router = useRouter();
  } catch (error) {
    console.warn("El enrutador no está montado.");
  }

  const garantias = [
    {
      icon: "/home/new_home/mesa-de-ayuda.png",
      title: "Agentes especializados",
      description:
        "Con un equipo de agentes residentes en Valencia, te ayudamos a encontrar la habitación perfecta dentro de nuestra oferta de alojamientos. Además, estaremos contigo durante toda tu estancia, asegurándonos de que todo funcione como debe para que vivas con tranquilidad.",
    },
    {
      icon: "/home/new_home/blindaje.png",
      title: "Atención personalizada",
      description:
        "helloflatmate es una agencia que gestiona únicamente 160 habitaciones dado que nos gusta dar una buena atención y gestión de la estancia de nuestros flatmates.",
    },
    {
      icon: "/home/new_home/facil.png",
      title: "Accesible",
      description: "En helloflatmate, entendemos tus necesidades. Por eso, nuestros alojamientos se ajustan a la duración del curso universitario, evitando que tengas que comprometerte o pagar durante los meses estivales. Disfruta de contratos flexibles de 5, 10, o 11 meses, y si optas por nuestro formato",
    },
    {
      icon: "/home/new_home/compras.png",
      title: "Reserva 100% online",
      description:
        "Con nuestro sistema online, realiza tu reserva y organiza tu check-in de forma rápida. Como gestionamos directamente los alojamientos, garantizamos fotos actualizadas y viviendas en perfecto estado para una llegada cómoda y sin complicaciones.",
    },
    {
      icon: "/home/new_home/reiniciar.png",
      title: "Flexibilidad que se adapta a ti",
      description:
        "Sabemos que los planes pueden cambiar, por eso ofrecemos una política de cancelaciones flexible. Y si cancelas a pocos días de tu check-in, no te preocupes: te ayudamos a encontrar otro estudiante que sustituya tu contrato, para que puedas recuperar tu reserva total o parcial. En helloflatmate, siempre buscamos soluciones para ti.",
    },
    {
      icon: "/home/new_home/confianza.png",
      title: "Mediación entre inquilinos",
      description:
        "En helloflatmate, nos comprometemos a apoyar una convivencia armoniosa. Por eso, ofrecemos un servicio de mediación entre inquilinos para resolver cualquier conflicto o malentendido que pueda surgir, promoviendo un ambiente cómodo y respetuoso para todos.",
      onClick: () => window.open("/clausulas", "_blank"),
    },
  ];

  return (
    <section className="py-12 bg-violet-100 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          ¿Por qué escoger helloflatmate?
        </h2>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-stretch gap-6 px-2 w-full ">
        {garantias.map((garantia, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 max-w-[500px] w-full flex flex-col justify-start items-center gap-3 hover:scale-[1.025] hover:shadow-reservation-list duration-300 transition"
            onClick={garantia.onClick ? garantia.onClick : undefined}
          >
            <Image
              src={garantia.icon}
              width={100}
              height={100}
              alt={garantia.title}
              unoptimized
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              {garantia.title}
            </h3>
            <p className="text-gray-600 text-center">{garantia.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
