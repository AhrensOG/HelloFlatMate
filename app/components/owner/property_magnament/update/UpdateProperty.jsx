import NavBarDetails from "@/app/components/property-details/header/NavBarDetails";
import SliderTemplate from "../create/header/SliderCreateTemplate";
import AmenitiesSectionTemplate from "../create/main/AmenitiesSectionTemplate";
import DescriptionSectionTemplate from "../create/main/DescriptionSectionTemplate";
import GuestInfoSectionTemplate from "../create/main/GuestInfoSectionTemplate";
import LocationSectionTemplate from "../create/main/LocationSectionTemplate";
import MoreInfoSectionTemplate from "../create/main/MoreInfoSectionTemplate";
import RoomSectionTemplate from "../create/main/RoomSectionTemplate";
import TitleSectionTemplate from "../create/main/TitleSectionTemplate";
import SaveButton from "../shared/SaveButton";
import { plus_jakarta } from "@/font";
import { useState } from "react";
import SliderUpdateTemplate from "./header/SliderUpdateTemplate";

export default function UpdateProperty() {
  const property = {
    name: "Jardines del eden",
    city: "",
    street: "",
    streetNumber: null,
    postalCode: "",
    size: "",
    bedrooms: null,
    bathrooms: null,
    bed: null,
    maximunOccupants: null,
    price: null,
    puntuation: [],
    isActive: false,
    isBussy: false,
    category: "",
    images: [""],
    facilities: ["wifi", "pool", "parking"],
    roomImages: [
      "/owner/room/room-stock-1.jfif",
      "/owner/room/room-stock-2.png",
    ],
    description: [
      "2 Habitaciones dobles, con decoración sencilla y armoniosa.",
      "El tamaño es de unos 11 - 12 m2 aproximadamente. Cuentan con un armario para organizar todo tu equipaje.",
      "Queremos resaltar que la mayoría del mobiliario es totalmente nuevo a estrenar.",
    ],
  };

  const [name, setName] = useState(property.name);
  const [location, setLocation] = useState("Los jazmines 700");
  const [guestInfo, setGuestInfo] = useState({
    ocupants: "4",
    beds: "2",
    bathrooms: "2",
  });

  return (
    <div className="flex flex-col max-w-screen-sm gap-2 ">
      <header className="w-full space-y-4">
        <div className="w-full">
          <SliderUpdateTemplate />
        </div>
        <NavBarDetails />
      </header>
      <main
        className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow m-4 text-[#0D171C]`}
      >
        <TitleSectionTemplate
          data={{ name: name, location: location }}
          setData={{ name: setName, location: setLocation }}
        />
        <div className="flex flex-col gap-6">
          <GuestInfoSectionTemplate data={guestInfo} setData={setGuestInfo} />
        </div>
        <DescriptionSectionTemplate data={property.description} />
        <RoomSectionTemplate data={property.roomImages} />
        <AmenitiesSectionTemplate data={property.facilities} />
        <LocationSectionTemplate data={"hola"} />
        <MoreInfoSectionTemplate />
        <SaveButton />
      </main>
    </div>
  );
}
