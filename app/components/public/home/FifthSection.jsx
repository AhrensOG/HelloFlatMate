import Image from "next/image";

// components/Garantias.js
export default function FifthSection() {
  const garantias = [
    {
      icon: "/home/new_home/mesa-de-ayuda.gif",
      title: "Nuestros agentes locales, siempre a tu lado",
      description:
        "Con un equipo de agentes residentes en Valencia, te ayudamos a encontrar la habitación perfecta dentro de nuestra oferta de alojamientos. Además, estaremos contigo durante toda tu estancia, asegurándonos de que todo funcione como debe para que vivas con tranquilidad.",
    },
    {
      icon: "/home/new_home/blindaje.gif",
      title: "Seguridad ante todo",
      description:
        "hello flat mate es una agencia que gestiona únicamente 160 habitaciones dado que nos gusta dar una buena atención y gestión de la estancia de nuestros flatmates.",
    },
    {
      icon: "/home/new_home/facil.gif",
      title: "Accesible",
      description: "Contratos de 5 y 10 meses Desde 290€/mes",
    },
    {
      icon: "/home/new_home/compras.gif",
      title: "Reserva 100% online y check-in fácil en 3 pasos",
      description:
        "Con nuestro sistema online, realiza tu reserva y organiza tu check-in de forma rápida. Como gestionamos directamente los alojamientos, garantizamos fotos actualizadas y viviendas en perfecto estado para una llegada cómoda y sin complicaciones.",
    },
    {
      icon: "/home/new_home/reiniciar.gif",
      title: "Flexibilidad que se adapta a ti",
      description:
        "Sabemos que los planes pueden cambiar, por eso ofrecemos una política de cancelaciones flexible. Y si cancelas a pocos días de tu check-in, no te preocupes: te ayudamos a encontrar otro estudiante que sustituya tu contrato, para que puedas recuperar tu reserva total o parcial. En hello flat mate, siempre buscamos soluciones para ti.",
    },
    {
      icon: "/home/new_home/confianza.gif",
      title: "Seguridad y confianza en cada paso",
      description:
        "En hello flat mate, priorizamos la atención personalizada y la calidad en la gestión. Por eso, gestionamos únicamente 160 habitaciones, asegurándonos de brindar un servicio cercano, seguro y adaptado a las necesidades de cada flatmate durante toda su estancia. Tu tranquilidad es nuestra prioridad.",
    },
  ];

  return (
    <section className="py-12 bg-[#E3F0FB] w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          ¿Por qué escoger hello flat mate?
        </h2>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-stretch gap-6 px-2 w-full ">
        {garantias.map((garantia, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 max-w-[500px] w-full flex flex-col justify-start items-center gap-3 hover:scale-[1.025] hover:shadow-reservation-list duration-300 transition"
          >
            {/* <div className="flex items-center justify-center mb-4 text-5xl">
              {garantia.icon}
            </div> */}
            <Image
              src={garantia.icon}
              width={100}
              height={100}
              alt={garantia.title}
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              {garantia.title}
            </h3>
            <p className="text-gray-600">{garantia.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
