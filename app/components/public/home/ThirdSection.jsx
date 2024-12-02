import Image from "next/image";

export default function ThirdSection() {
  return (
    <section className="w-full bg-white flex flex-wrap justify-center items-center mt-10 gap-6 px-2 py-10">
      <article className="border-2 rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-4 p-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
          Alojamientos en zonas consolidadas
        </h1>
        <h2 className="text-lg text-center">
          Recibe ayuda de un agente en tu idioma, para resolver dudas, ayudarte
          a encontrar casa y gestionar todo el papeleo.
        </h2>
        <Image
          src="/home/new_home/dormir.gif"
          width={200}
          height={200}
          alt="bot"
        />
      </article>

      <article className="border-2 rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-4 p-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
        Contratos
        </h1>
        <h2 className="text-lg text-center">
        Tener un contrato de alquiler es esencial para garantizar una residencia legal y segura. En hello flat mate, todos nuestros alojamientos se rigen por un modelo contractual basado en el Código Civil, asegurando un equilibrio justo de derechos y responsabilidades tanto para arrendadores como para arrendatarios.  
        </h2>
        <Image
          src="/home/new_home/documento.gif"
          width={200}
          height={200}
          alt="bot"
        />
      </article>

      <article className="border-2 rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-4 p-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
        Soporte
        </h1>
        <h2 className="text-lg text-center">
        Nuestra atención al cliente está disponible de lunes a viernes, de 9:00 a 17:00, para resolver cualquier duda o gestión. Además, ofrecemos un servicio de emergencias 24/7, perfecto para situaciones como olvidar las llaves fuera de horario.
        </h2>
        <Image
          src="/home/new_home/robot-de-chat.gif"
          width={200}
          height={200}
          alt="bot"
        />
      </article>

      <article className="border-2 rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-4 p-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
        Alojamientos preparados
        </h1>
        <h2 className="text-lg text-center">
        Nos encargamos de que cada alojamiento esté limpio y revisado antes de tu llegada, para que disfrutes de una bienvenida cómoda y sin preocupaciones desde el primer día.  
        </h2>
        <Image
          src="/home/new_home/escritorio.gif"
          width={200}
          height={200}
          alt="bot"
        />
      </article>

      <article className="border-2 rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-4 p-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
        Mantenimiento propio
        </h1>
        <h2 className="text-lg text-center">
        Cuidamos los alojamientos que gestionamos para que siempre estén en buen estado, además siempre revisamos y limpiamos antes de la llegada de nuestros flatmates.
        </h2>
        <Image
          src="/home/new_home/mecanico.gif"
          width={200}
          height={200}
          alt="bot"
        />
      </article>

      <article className="border-2 rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-4 p-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
        Alta de suministros
        </h1>
        <h2 className="text-lg text-center">
        Todos nuestros alojamientos, excepto hello Studios, cuentan con luz, agua e Internet WiFi dados de alta antes de tu llegada, para que no tengas que preocuparte por nada. 
        </h2>
        <Image
          src="/home/new_home/lampara-de-escritorio.gif"
          width={200}
          height={200}
          alt="bot"
        />
      </article>
    </section>
  );
}
