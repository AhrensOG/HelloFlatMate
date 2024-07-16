import Amenity from "./amenities_section/Amenity";

export default function AmenitiesSection() {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="font-bold text-[1.37rem]">Que ofrece este lugar</h2>
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
            />
        </section>
    );
}
