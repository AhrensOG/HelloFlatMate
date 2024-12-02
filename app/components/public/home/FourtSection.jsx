import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function FourtSection() {
    return (
        <section className="flex flex-col gap-3 bg-white items-center justify-around h-[40vh] my-10">
            <h1 className="text-3xl font-bold">Dicen que nuestro servicio al cliente es el mejor</h1>
            <div className="flex gap-4 w-[65vh] justify-end">
                <button className="text-gray-400 cursor-default " disabled>
                    <ArrowLeftCircleIcon className="w-[3rem] h-[3rem]" />
                </button>
                <button className="cursor-pointer">
                    <ArrowRightCircleIcon className="w-[3rem] h-[3rem]" />
                </button>
            </div>
            <div className="flex gap-6 my-10">
                <article className="flex flex-col gap-2 w-[47vw] h-[15rem] bg-gris-español rounded-2xl p-4 text-center text-white">
                    <div className="flex gap-2 justify-center">
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
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
                <article className="flex flex-col gap-2 w-[47vw] h-[15rem] bg-gris-español rounded-2xl p-4 text-center text-white">
                    <div className="flex gap-2 justify-center">
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
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
                {/* <article className="flex flex-col gap-2 w-[47vw] h-[15rem] bg-gris-español rounded-2xl p-4 text-center text-white">
                    <div className="flex gap-2 justify-center">
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
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
                <article className="flex flex-col gap-2 w-[47vw] h-[15rem] bg-gris-español rounded-2xl p-4 text-center text-white">
                    <div className="flex gap-2 justify-center">
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
                        <StarIcon className="w-10 h-10 text-orange-500" />
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
