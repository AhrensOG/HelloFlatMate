import EditButton from "../../shared/EditButton";
import AmenityTemplate from "./amenities_section/AmenityTemplate";

export default function AmenitiesSectionTemplate({ data, setData }) {
  const amenities = [
    "wifi",
    "cocina",
    "lavadero",
    "amueblado",
    "aire acondicionado",
    "calefacción",
    "ascensor",
    "nevera",
    "horno",
    "microondas",
    "utensilios de cocina",
    "escritorio",
    "armario empotrado",
    "otros",
  ];

  const handleCheckboxChange = (name, checked) => {
    let newData;
    if (checked) {
      newData = [...data, name];
    } else {
      newData = data.filter((amenity) => amenity !== name);
    }
    setData(newData);
  };

  return (
    <section className="flex flex-col gap-3 w-full">
      <article className="w-full flex justify-between items-center">
        <h2 className="font-bold text-[1.2rem] w-full text-start">
          Que ofrece este lugar
        </h2>
        <EditButton />
      </article>
      <article className="h-[60vh] overflow-y-scroll scrollbar-thin flex flex-col gap-2 w-full lg:flex-wrap lg:flex-row lg:gap-3">
        {amenities.map((amenity) => (
          <AmenityTemplate
            key={amenity}
            checked={data.includes(amenity)}
            name={amenity}
            onChange={handleCheckboxChange}
          />
        ))}
      </article>
    </section>
  );
}
