"use client";
import NavBarDetails from "@/app/components/property-details/header/NavBarDetails";
import SliderItem from "@/app/components/property-details/header/slider/SliderItem";
import SliderDetails from "@/app/components/property-details/header/SliderDetails";
import AmenitiesSection from "@/app/components/property-details/main/AmenitiesSection";
import DescriptionSection from "@/app/components/property-details/main/DescriptionSection";
import GuestInfo from "@/app/components/property-details/main/GuestInfo";
import LocationSection from "@/app/components/property-details/main/LocationSection";
import ReservationButton from "@/app/components/property-details/main/ReservationButton";
import RoomSection from "@/app/components/property-details/main/RoomSection";
import { plus_jakarta } from "@/font";

export default function PropertyDetails() {
  return (
    <div className="flex flex-col h-[100vh]">
      <header className="w-full">
        <div className="w-full h-[25vh]">
          <SliderDetails>
            <SliderItem img="/property_details/nav_bar_details/slider/slider-stock-1.svg" />
            <SliderItem img="/property_details/nav_bar_details/slider/slider-stock-1.svg" />
            <SliderItem img="/property_details/nav_bar_details/slider/slider-stock-1.svg" />
          </SliderDetails>
        </div>
        <NavBarDetails />
      </header>
      <main
        className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow m-4 text-[#0D171C]`}
      >
        <h1 className="font-bold text-[1.37rem]">Piso completo vista al mar</h1>
        <h4 className="text-[#000000B2] text-base">
          Ubicacion de la habitacion
        </h4>
        <div className="flex flex-col gap-6">
          <GuestInfo />
          <ReservationButton />
        </div>
        <DescriptionSection />
        <RoomSection />
        <AmenitiesSection />
        <LocationSection />
      </main>
    </div>
  );
}
