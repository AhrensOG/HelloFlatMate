import BarGraphic from "../graphics/BarGraphic";

export default function BarArticle() {
  return (
    <article className="flex flex-col justify-center items-center gap-4 w-full">
      <h2 className="font-medium text-[#000000CC] text-base w-full test-start">
        Ingreso por mes
      </h2>
      <BarGraphic />
    </article>
  );
}
