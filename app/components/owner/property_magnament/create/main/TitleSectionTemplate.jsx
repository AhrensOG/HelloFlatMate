import EditButton from "../../shared/EditButton";

export default function TitleSectionTemplate({ data, setData }) {
  const handleEditName = (newData) => {
    setData.name(newData);
  };

  const handleEditLocation = (newData) => {
    setData.location(newData);
  };

  return (
    <section className="flex flex-col gap-2">
      <article className="flex justify-between items-center">
        <label htmlFor="name" hidden></label>
        <input
          onChange={(e) => handleEditName(e.target.value)}
          className="font-bold text-[1.2rem] appearance-none outline-none w-full"
          type="text"
          value={data.name}
          placeholder="Nombre de la habitacion"
          name="name"
          id="name"
        />
        <EditButton />
      </article>
      <article className="flex justify-between items-center pl-2">
        <input
          onChange={(e) => handleEditLocation(e.target.value)}
          className="text-[#0D171C] font-normal text-base appearance-none outline-none w-full"
          type="text"
          value={data.location}
          placeholder="Ubicacion"
          name="location"
          id="location"
        />
        <EditButton />
      </article>
    </section>
  );
}
