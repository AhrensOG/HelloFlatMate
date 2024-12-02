import Image from "next/image";

// components/Garantias.js
export default function FifthSection() {
  const garantias = [
    {
      icon: "/home/new_home/bell.svg",
      title: "Ningún problema sin solución",
      description:
        "Si el propietario cancela tu reserva en el último minuto, nos hacemos cargo de tu estancia en un hotel mientras buscamos otra alternativa.",
    },
    {
      icon: "/home/new_home/clock.svg",
      title: "¿Cambio de planes? Cancelación flexible",
      description:
        "Cancela sin coste antes de que el propietario responda a tu solicitud o si encuentras alguna tarifa que no cuadre con lo acordado.",
    },
    {
      icon: "/home/new_home/medal.svg",
      title: "Solo propietarios verificados",
      description:
        "Verificamos minuciosamente a cada propietario por ti y garantizamos que solo reciba el pago una vez hayas confirmado que todo está bien.",
    },
    {
      icon: "/home/new_home/inlove.svg",
      title: "Garantía de amor a primera vista",
      description:
        "Tienes 24 horas para comprobar que todo está como en el anuncio. Si no, estamos aquí para ayudarte a encontrar una solución.",
    },
  ];

  return (
    <section className="py-12 bg-[#E3F0FB] w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Todo bajo control con nuestra garantía
        </h2>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-stretch gap-6 px-2 w-full ">
        {garantias.map((garantia, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 max-w-[500px] w-full flex flex-col justify-start items-center gap-3"
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
