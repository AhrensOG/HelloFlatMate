import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import SupplieCard from "./SupplieCard";
import { useRouter } from "next/navigation";

export default function Supplies({ data, user }) {
    const route = useRouter();
    return (
        <main className={`  w-full m-auto`}>
            <section className="flex items-center justify-between w-full  my-7">
                <button onClick={() => route.back()} type="button" className="h-7 w-7 ml-4 opacity-70">
                    <ArrowLeftIcon />
                </button>
                <h1 className="font-semibold text-xl text-[#191B23] grow text-start pl-5">Suministros</h1>
            </section>
            <section className="flex flex-col p-2 gap-4 w-full items-center sm:flex-row sm:flex-wrap sm:justify-evenly">
                {data && data.length > 0 ? (
                    data.map((supplie) => <SupplieCard key={supplie.id} data={supplie} user={user} />)
                ) : (
                    <p className="text-sm text-[#464E5F] font-normal">No tienes suministros</p>
                )}
            </section>
        </main>
    );
}
