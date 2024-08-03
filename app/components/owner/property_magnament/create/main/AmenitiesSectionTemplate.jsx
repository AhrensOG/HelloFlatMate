import EditButton from "../../shared/EditButton";
import AmenityTemplate from "./amenities_section/AmenityTemplate";

export default function AmenitiesSectionTemplate({ data, setData }) {
  const amenities = [
    "wifi",
    "cocina",
    "lavadero",
    "piscina",
    "amueblado",
    "jardin",
    "estacionamiento",
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
        <h2 className="font-bold text-[1.37rem] w-full text-start">
          Que ofrece este lugar
        </h2>
        <EditButton />
      </article>
      <article className="flex flex-col gap-2 w-full">
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
