import PieGraphic from "../graphics/PieGraphic";

export default function PieArticle() {
  return (
    <article className="flex w-full flex-col justify-center items-center gap-2">
      <h2 className="font-medium text-[#000000CC] text-base w-full test-start">
        Ocupacion
      </h2>
      <div className="w-[14rem] h-[14rem]">
        <PieGraphic />
      </div>
      <div className="flex gap-4 justify-between w-[11rem]">
        <div>
          <div className="flex gap-1 items-center">
            <span className="h-1 w-1 rounded-full bg-[#0E1863]"></span>
            <p className="text-[#A3AED0] text-xs font-medium">Ocupado</p>
          </div>
          <p className="font-bold text-base text-[#2B3674] text-center">80%</p>
        </div>
        <div>
          <div className="flex gap-1 items-center">
            <span className="h-1 w-1 rounded-full bg-[#21ABCC]"></span>
            <p className="text-[#A3AED0] text-xs font-medium">Disponible</p>
          </div>
          <p className="font-bold text-base text-[#2B3674] text-center">20%</p>
        </div>
      </div>
    </article>
  );
}
