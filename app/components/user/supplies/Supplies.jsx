import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import SupplieCard from "./SupplieCard";
import { useRouter } from "next/navigation";
import { plus_jakarta } from "@/font";
import { useContext } from "react";
import { Context } from "@/app/context/GlobalContext";

export default function Supplies() {
  const route = useRouter();
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <main className={`${plus_jakarta.className} w-full m-auto`}>
      {console.log(state)}
      <section className="flex items-center justify-between w-full  my-7">
        <button
          onClick={() => route.back()}
          type="button"
          className="h-7 w-7 ml-4 opacity-70"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className="font-semibold text-xl text-[#191B23] grow text-start pl-5">
          Suministros
        </h1>
      </section>
      <section className="flex flex-col p-2 gap-4 w-full items-center">
        {user.supplies && user.supplies.length > 0 ? (
          user.supplies.map((supplie) => (
            <SupplieCard
              key={supplie.id}
              data={supplie}
              userName={user.name + " " + user.lastName}
            />
          ))
        ) : (
          <p className="text-sm text-[#464E5F] font-normal">
            No tienes suministros
          </p>
        )}
      </section>
    </main>
  );
}
