import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import SupplieCard from "./SupplieCard";
import { useRouter } from "next/navigation";

export default function Supplies() {
  const route = useRouter();

  return (
    <main>
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
      <section className="flex flex-col p-2 gap-3">
        <SupplieCard
          status={"pending"}
          name={"Agua"}
          image={"/supplies/whater.svg"}
          date={"Abril 9, 2024"}
          users={"Tamara Garcia / Astur Ramos"}
          price={"7,9"}
        />
        <SupplieCard
          status={"completed"}
          name={"Gas"}
          image={"/supplies/gas.svg"}
          date={"Abril 9, 2024"}
          users={"Tamara Garcia / Astur Ramos"}
          price={"7,9"}
        />
        <SupplieCard
          status={"in_process"}
          name={"Internet"}
          image={"/supplies/wifi.svg"}
          date={"Abril 9, 2024"}
          users={"Tamara Garcia / Astur Ramos"}
          price={"7,9"}
        />
        <SupplieCard
          status={"pending"}
          name={"Tasas"}
          image={"/supplies/tax.svg"}
          date={"Abril 9, 2024"}
          users={"Tamara Garcia / Astur Ramos"}
          price={"7,9"}
        />
      </section>
    </main>
  );
}
