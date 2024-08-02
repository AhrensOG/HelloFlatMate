import NavBarDetails from "@/app/components/property-details/header/NavBarDetails";
import AmenitiesSectionTemplate from "./main/AmenitiesSectionTemplate";
import DescriptionSectionTemplate from "./main/DescriptionSectionTemplate";
import GuestInfoSectionTemplate from "./main/GuestInfoSectionTemplate";
import LocationSectionTemplate from "./main/LocationSectionTemplate";
import MoreInfoSectionTemplate from "./main/MoreInfoSectionTemplate";
import RoomSectionTemplate from "./main/RoomSectionTemplate";
import SaveButton from "../shared/SaveButton";
import { plus_jakarta } from "@/font";
import { useState } from "react";
import TitleSectionTemplate from "./main/TitleSectionTemplate";
import SliderCreateTemplate from "./header/SliderCreateTemplate";

export default function NewProperty() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [guestInfo, setGuestInfo] = useState({
    occupants: "",
    beds: "",
    bathrooms: "",
  });

  return (
    <div className="flex flex-col max-w-screen-sm gap-2 ">
      <header className="w-full space-y-4">
        <div className="w-full">
          <SliderCreateTemplate />
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
        <DescriptionSectionTemplate />
        <RoomSectionTemplate />
        <AmenitiesSectionTemplate />
        <LocationSectionTemplate />
        <MoreInfoSectionTemplate />
        <SaveButton />
      </main>
    </div>
  );
}
