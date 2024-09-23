import EditButton from "../../shared/EditButton";

export default function DescriptionSectionTemplate({ data, action }) {
  return (
    <section>
      <div className="flex justify-between items-center gap-3">
        <h2 className="font-bold text-[1.2rem]">Descripción</h2>
        <EditButton action={action} />
      </div>
      {data.length > 0 ? (
        <ul className="list-disc p-3 pl-[1.6rem]">
          {data.map((item, index) => (
            <li key={index} className="font-normal text-base py-1">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-normal text-normal text-[#979797]">
          Realiza una descripción de su alojamiento
        </p>
      )}
    </section>
  );
}
