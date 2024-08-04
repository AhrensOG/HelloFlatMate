import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import EyeButton from "../documents_panel/EyeButton";
import { plus_jakarta } from "@/font";

export default function PaymentHistoryPanel() {
  return (
    <main
      className={`${plus_jakarta.className} relative flex flex-col justify-center items-center p-2 gap-6 mt-3`}
    >
      <TitleAdminPanel title={"Historial de pagos"} />
      <section className="flex flex-col py-6 gap-3 w-full">
        <article className="flex items-center justify-between gap-3 h-16 w-full">
          <div className="h-14 w-14 rounded-full bg-[#21ABCC4D] flex items-center justify-center text-[#0E155F]">
            <CurrencyEuroIcon className="h-10 w-10" />
          </div>
          <div className="grow flex flex-col gap-2 justify-center h-11 ">
            <h2 className="font-semibold text-base">Pago recibido</h2>
            <p className="font-medium text-sm text-[#A5A2A1]">Villa eden</p>
          </div>
          <div className="flex flex-col gap-2 justify-center h-11 ">
            <h2 className="font-semibold text-base text-[#34A853]">+€400</h2>
            <p className="font-medium text-sm text-[#A5A2A1]">02 de agosto</p>
          </div>
          <div>
            <EyeButton action={() => {}} />
          </div>
        </article>
      </section>
    </main>
  );
}
