import EditButton from "../../shared/EditButton";

export default function TitleSectionTemplate({
  name,
  setName,
  address,
  setAddress,
  action,
}) {
  const handleEditName = (newData) => {
    setName(newData);
  };

  const handleEditLocation = (newData) => {
    setAddress(newData);
  };

  const formatAddress = (address) => {
    if (address?.street.length === 0) {
      return "Direccion";
    }
    return `${
      address?.street.charAt(0).toUpperCase() + address?.street.slice(1)
    }${" "}${address?.streetNumber}`;
  };

  return (
    <section className="flex flex-col gap-2">
      <article className="flex justify-between items-center">
        <label htmlFor="name" hidden></label>
        <input
          onChange={(e) => handleEditName(e.target.value)}
          className="font-bold text-[1.2rem] appearance-none outline-none w-full"
          type="text"
          value={name}
          placeholder="Nombre de la habitacion"
          name="name"
          id="name"
        />
        <EditButton />
      </article>
      <article className="flex justify-between items-center pl-2">
        <button
          onClick={action}
          className={`${
            address?.street.length === 0 ? "text-[#9da4b0ff]" : "text-[#0D171C]"
          }  font-normal text-base w-full text-start `}
          type="button"
        >
          {formatAddress(address)}
        </button>
        <EditButton action={action} />
      </article>
    </section>
  );
}
