import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export default function FourthSection() {
  return (
    <section className="flex flex-col gap-3 bg-white items-center justify-around my-10 px-2">
      <div className="relative space-y-2">
        <h1 className="text-3xl font-bold">
          Dicen que nuestro servicio al cliente es el mejor
        </h1>
        <div className="flex gap-4 justify-end w-full">
          <button className="text-gray-400 cursor-default " disabled>
            <ArrowLeftCircleIcon className="w-[2rem] h-[2rem]" />
          </button>
          <button className="cursor-pointer">
            <ArrowRightCircleIcon className="w-[2rem] h-[2rem]" />
          </button>
        </div>
      </div>
      <div className="flex gap-4 my-10">
        <article className="flex flex-col gap-2 w-full max-w-[47vw] bg-[#F7F7F7] rounded-2xl p-4 text-center text-gray-600">
          <div className="flex gap-2 justify-center">
            <StarIcon className="w-8 h-8 text-orange-500" />
            <StarIcon className="w-8 h-8 text-orange-500" />
            <StarIcon className="w-8 h-8 text-orange-500" />
            <StarIcon className="w-8 h-8 text-orange-500" />
            <StarIcon className="w-8 h-8 text-orange-500" />
          </div>
          <p>
            Fue la primera vez que usé la plataforma y me pareció muy
            profesional y fácil. Incluso me contactó alguien del staff para
            ayudarme a completar los pasos requeridos. Totalmente recomendable.
          </p>
          <p>Luise Aymar</p>
          <p className="flex gap-1  self-center">
            <span className="text-black self-center">
              <MapPinIcon className="w-4 h-4 mb-1" />
            </span>{" "}
            Germany
          </p>
        </article>
        <article className="flex flex-col gap-2 w-full max-w-[47vw] bg-[#F7F7F7] rounded-2xl p-4 text-center text-gray-600">
          <div className="flex gap-2 justify-center">
            <StarIcon className="w-8 h-8 text-orange-500" />
            <StarIcon className="w-8 h-8 text-orange-500" />
            <StarIcon className="w-8 h-8 text-orange-500" />
            <StarIcon className="w-8 h-8 text-orange-500" />
            <StarIcon className="w-8 h-8 text-orange-500" />
          </div>
          <p>
            Fue la primera vez que usé la plataforma y me pareció muy
            profesional y fácil. Incluso me contactó alguien del staff para
            ayudarme a completar los pasos requeridos. Totalmente recomendable.
          </p>
          <p>Luise Aymar</p>
          <p className="flex gap-1  self-center">
            <span className="text-black self-center">
              <MapPinIcon className="w-4 h-4 mb-1" />
            </span>{" "}
            Germany
          </p>
        </article>
        {/* <article className="flex flex-col gap-2 w-[47vw] bg-[#F7F7F7] rounded-2xl p-4 text-center text-gray-600">
                    <div className="flex gap-2 justify-center">
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <StarIcon className="w-8 h-8 text-orange-500" />
                    </div>
                    <p>
                        Fue la primera vez que usé la plataforma y me pareció muy profesional y fácil. Incluso me contactó alguien del staff para
                        ayudarme a completar los pasos requeridos. Totalmente recomendable.
                    </p>
                    <p>Luise Aymar</p>
                    <p className="flex gap-1  self-center">
                        <span className="text-black self-center">
                            <MapPinIcon className="w-4 h-4 mb-1" />
                        </span>{" "}
                        Germany
                    </p>
                </article>
                <article className="flex flex-col gap-2 w-[47vw] bg-[#F7F7F7] rounded-2xl p-4 text-center text-gray-600">
                    <div className="flex gap-2 justify-center">
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <StarIcon className="w-8 h-8 text-orange-500" />
                    </div>
                    <p>
                        Fue la primera vez que usé la plataforma y me pareció muy profesional y fácil. Incluso me contactó alguien del staff para
                        ayudarme a completar los pasos requeridos. Totalmente recomendable.
                    </p>
                    <p>Luise Aymar</p>
                    <p className="flex gap-1  self-center">
                        <span className="text-black self-center">
                            <MapPinIcon className="w-4 h-4 mb-1" />
                        </span>{" "}
                        Germany
                    </p>
                </article> */}
      </div>
    </section>
  );
}
