import DescriptionItem from "./description_section/DescriptionItem";

export default function DescriptionSection({ data }) {
  return (
    <section>
      <h2 className="font-bold text-[1.37rem]">Descripcion</h2>
      <ul className="list-disc p-3 pl-[1.6rem]">
        {data.map((item, index) => (
          <DescriptionItem key={index} body={item} />
        ))}
      </ul>
    </section>
  );
}