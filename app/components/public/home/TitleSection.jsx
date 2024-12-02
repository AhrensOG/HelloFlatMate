import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function TitleSection() {
    return (
        <section className="flex flex-col gap-3 bg-white items-center justify-around h-[30vh]">
            <h1 className="text-3xl font-bold">Encuentra y reserva tu lugar ideal durante meses</h1>
            <h3 className="text-lg">Alquila propiedades de calidad con todas las garantías, 100% online</h3>
            <div className="flex items-center justify-between gap-2 border rounded-full h-[4rem] w-[40rem]">
                <label htmlFor="search" hidden></label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="aparance-none outline-none w-[80%] ml-4 my-3 h-full rounded-full font-bold"
                    placeholder="¿Donde quieres vivir?"
                />
                <button className="h-12 w-12 rounded-full bg-resolution-blue flex justify-center items-center m-2">
                    <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                </button>
            </div>
        </section>
    );
}
