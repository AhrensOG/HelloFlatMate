"use client";
import NavBar_1 from "../components/public/home/NavBar_1";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      bgColor: "bg-white",
      title: "Busca y elige",
      description:
        "Busca tu casa perfecta. Nuestras visitas guiadas y las descripciones detalladas tanto de la propiedad como del barrio te ayudarán a tomar la mejor decisión. No olvides leer las condiciones de reserva del propietario antes de reservar.",
      subpoints: [
        {
          title: "Verificamos las propiedades",
          description:
            "Ofrecemos fotografías y vídeos reales de las propiedades en lugar de usar materiales de terceros. Si algo no está claro, puedes solicitar información para motivarte a hacer el último esfuerzo de ir a la casa.",
        },
        {
          title: "Descripción detallada",
          description:
            "Encuentra toda la información que necesitas antes de reservar.",
        },
      ],
      icon: "📍", // Usa emojis o un ícono SVG como placeholder
    },
    {
      id: 2,
      bgColor: "bg-white",
      title: "Reserva la propiedad",
      description:
        "Cuando hagas una reserva, el propietario tendrá hasta 24 horas para responder. Una vez que el propietario acepte, tu método de pago se cobrará automáticamente.",
      subpoints: [
        {
          title: "¿Qué estoy pagando?",
          description:
            "Pago inicial: Cubre parte de la estancia y las tasas de reserva de Spotahome. El importe se transferirá al propietario 48 horas después de tu fecha de entrada si no se documenta ningún problema.",
        },
        {
          title: "Confirmación de reserva",
          description:
            "Una vez realizada la reserva, recibirás confirmación inmediata.",
        },
      ],
      icon: "📩",
    },
    {
      id: 3,
      bgColor: "bg-white",
      title: "Confirmación",
      description:
        "Tan pronto como el propietario acepte la reserva, te cargaremos el importe correspondiente de forma automática.",
      subpoints: [
        {
          title: "Estamos aquí para ayudarte",
          description:
            "Nuestro equipo de atención al cliente está disponible para ayudarte en cualquier momento.",
        },
      ],
      icon: "✅",
    },
    {
      id: 4,
      bgColor: "bg-[#f7f5f5]",
      title: "Fecha de entrada",
      description:
        "Si ves todo bien, la casa es tuya. El propietario será tu punto de contacto a partir de ahora. Si tienes algún problema con la comunicación, Spotahome estará aquí para ayudarte.",
      subpoints: [
        {
          title: "Un último consejo",
          description:
            "No olvides que el momento de la firma del contrato es esencial para garantizar tus derechos como inquilino. Sigue las instrucciones y confirma las condiciones con el propietario.",
        },
      ],
      icon: "🔑",
    },
  ];

  return (
    <section className="bg-white w-full">
      <header>
        <NavBar_1 />
      </header>
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-screen-md flex flex-col justify-center items-center px-2 py-10">
          <h1 className="text-center text-4xl font-extrabold mb-10 max-w-96">
            4 PASOS SENCILLOS PARA RESERVAR TU CASA
          </h1>
          <div className="space-y-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex gap-6 items-start ${step.bgColor} p-6 rounded-lg shadow-sm`}
              >
                {/* Icono */}
                <div className="flex items-center justify-center bg-blue-100 rounded-lg w-16 h-16">
                  <span className="text-2xl">{step.icon}</span>
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">{`${step.id}. ${step.title}`}</h2>
                  <p className="text-gray-700 mb-6">{step.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {step.subpoints.map((point, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-900">
                          {point.title}
                        </h3>
                        <hr className="border-t border-gray-300 my-2" />
                        <p className="text-gray-700">{point.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
