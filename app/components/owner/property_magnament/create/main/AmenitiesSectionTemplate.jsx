import AmenitiesSection from "@/app/components/property-details/main/AmenitiesSection";
import EditButton from "../../shared/EditButton";
import AmenityTemplate from "./amenities_section/AmenityTemplate";
import { useState } from "react";

export default function AmenitiesSectionTemplate({ data }) {
  const [update, setUpdate] = useState(false);

  const showUpdate = () => {
    setUpdate(!update);
  };
  return (
    <>
      {update ? (
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-[1.37rem]">Que ofrece este lugar</h2>
            <EditButton action={showUpdate} />
          </div>
          <AmenityTemplate name="wifi" />
          <AmenityTemplate name="cocina" />
          <AmenityTemplate name="lavadero" />
          <AmenityTemplate name="piscina" />
          <AmenityTemplate name="amueblado" />
          <AmenityTemplate name="jardin" />
          <AmenityTemplate name="otros" />
        </section>
      ) : (
        <AmenitiesSection
          edit={<EditButton action={showUpdate} data={data} />}
        />
      )}
    </>
  );
}
