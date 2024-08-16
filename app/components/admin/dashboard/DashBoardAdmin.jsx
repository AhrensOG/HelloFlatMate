import { plus_jakarta } from "@/font";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import ButtonsDashBoardAdmin from "./ButtonsDashBoardAdmin";
import BarGraphic from "../graphics/BarGraphic";
import PieGraphic from "../graphics/PieGraphic";
import BarArticle from "./BarArticle";
import PieArticle from "./PieArticle";
import LineGraphic from "../graphics/LineGraphic";
export default function DashBoardAdmin() {
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col gap-5 p-2 items-center`}
    >
      <TitleAdminPanel title={"Tus propiedades"} />
      <section className="w-full flex items-center justify-center">
        <ButtonsDashBoardAdmin />
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-5">
        <BarArticle />
        <PieArticle />
        <article className="flex w-full flex-col justify-center items-center gap-2">
          <div className="w-full">
            <div className="flex gap-1 justify-start items-center">
              <p className="text-[#0D171C] font-bold text-lg">Є21.400</p>
              <h2 className="text-[#A3AED0] font-medium text-sm h-full">
                Ingresos totales
              </h2>
            </div>
          </div>
          <LineGraphic />
        </article>
      </section>
    </main>
  );
}