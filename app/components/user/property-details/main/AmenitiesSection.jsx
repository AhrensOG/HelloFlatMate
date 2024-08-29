import { QuestionMarkCircleIcon, WifiIcon } from "@heroicons/react/24/outline";
import EditButton from "../../../admin/property_magnament/shared/EditButton";
import Amenity from "./amenities_section/Amenity";
import { FireIcon, SunIcon } from "@heroicons/react/20/solid";

export default function AmenitiesSection({ edit = null, data = null }) {
  const handleIcon = (name) => {
    switch (name) {
      case "wifi":
        return <WifiIcon className="h-8 w-8" />;
      case "cocina":
        return <FireIcon className="h-8 w-8" />;
      case "jardin":
        return <SunIcon className="h-8 w-8" />;

      default:
        return <QuestionMarkCircleIcon className="h-8 w-8" />;
    }
  };

  return (
    <section className="flex flex-col gap-3">
      {edit ? (
        <div className="w-full flex justify-between items-center">
          <h2 className="font-bold text-[1.37rem]">Que ofrece este lugar</h2>
          {edit}
        </div>
      ) : (
        <h2 className="font-bold text-[1.37rem]">Que ofrece este lugar</h2>
      )}
      {data ? (
        data.map((item) => (
          <Amenity key={item} name={item} icon={handleIcon(item)} />
        ))
      ) : (
        <>
          <Amenity name="Piscina disponible" icon={handleIcon("jardin")} />
          <Amenity name="Wifi" icon={handleIcon("wifi")} />
          <Amenity
            name="Estacionamiento"
            icon={handleIcon("estacionamiento")}
          />
        </>
      )}
    </section>
  );
}
