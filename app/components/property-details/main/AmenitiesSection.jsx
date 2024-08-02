import EditButton from "../../owner/property_magnament/shared/EditButton";
import Amenity from "./amenities_section/Amenity";

export default function AmenitiesSection({ edit = null, data = null }) {
  return (
    <section className="flex flex-col gap-3">
      {edit ? (
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[1.37rem]">Que ofrece este lugar</h2>
          {edit}
        </div>
      ) : (
        <h2 className="font-bold text-[1.37rem]">Que ofrece este lugar</h2>
      )}
      {data ? (
        data.map((item) => (
          <Amenity
            key={item}
            name={item}
            image={`/property_details/amenities/${item}-icon.svg`}
          />
        ))
      ) : (
        <>
          <Amenity
            name="Piscina disponible"
            image={"/property_details/amenities/pool-icon.svg"}
          />
          <Amenity
            name="Wifi"
            image={"/property_details/amenities/wifi-icon.svg"}
          />
          <Amenity
            name="Estacionamiento"
            image={"/property_details/amenities/parking-icon.svg"}
          />{" "}
        </>
      )}
    </section>
  );
}
