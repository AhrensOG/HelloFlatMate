import Image from "next/image";

export default function ThirdSection() {
  return (
    <section className="w-full bg-white flex flex-wrap justify-around items-center mt-10 gap-6">
      <article className="border rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-8 px-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
          Estamos contigo en esto
        </h1>
        <h2 className="text-lg text-center">
          Recibe ayuda de un agente en tu idioma, para resolver dudas, ayudarte
          a encontrar casa y gestionar todo el papeleo.
        </h2>
        <Image
          src="/home/new_home/first.svg"
          width={100}
          height={100}
          alt="bot"
        />
      </article>

      <article className="border rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-8 px-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
          Estamos contigo en esto
        </h1>
        <h2 className="text-lg text-center">
          Recibe ayuda de un agente en tu idioma, para resolver dudas, ayudarte
          a encontrar casa y gestionar todo el papeleo.
        </h2>
        <Image
          src="/home/new_home/second.svg"
          width={100}
          height={100}
          alt="bot"
        />
      </article>

      <article className="border rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-8 px-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
          Estamos contigo en esto
        </h1>
        <h2 className="text-lg text-center">
          Recibe ayuda de un agente en tu idioma, para resolver dudas, ayudarte
          a encontrar casa y gestionar todo el papeleo.
        </h2>
        <Image
          src="/home/new_home/third.svg"
          width={100}
          height={100}
          alt="bot"
        />
      </article>

      <article className="border rounded-2xl flex flex-col items-center justify-center h-[25rem] gap-8 px-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center">
          Estamos contigo en esto
        </h1>
        <h2 className="text-lg text-center">
          Recibe ayuda de un agente en tu idioma, para resolver dudas, ayudarte
          a encontrar casa y gestionar todo el papeleo.
        </h2>
        <Image
          src="/home/new_home/fourth.svg"
          width={100}
          height={100}
          alt="bot"
        />
      </article>
    </section>
  );
}
