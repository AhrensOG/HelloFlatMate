"use client";
import NavBarDetails from "@/app/components/property-details/header/NavBarDetails";
import SliderItem from "@/app/components/property-details/header/slider/SliderItem";
import SliderDetails from "@/app/components/property-details/header/SliderDetails";
import AmenitiesSection from "@/app/components/property-details/main/AmenitiesSection";
import DescriptionSection from "@/app/components/property-details/main/DescriptionSection";
import GuestInfo from "@/app/components/property-details/main/GuestInfo";
import LocationSection from "@/app/components/property-details/main/LocationSection";
import MoreInfoSection from "@/app/components/property-details/main/MoreInfoSection";
import ReservationModal from "@/app/components/property-details/main/reservation/ReservationModal";
import ReservationButton from "@/app/components/property-details/main/ReservationButton";
import RoomSection from "@/app/components/property-details/main/RoomSection";
import { Context } from "@/app/context/GlobalContext";
import { plus_jakarta } from "@/font";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function PropertyDetails({ params }) {
  const { state } = useContext(Context);
  const id = params.id;
  console.log(id, state.properties);

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(
    state.properties
      ? state.properties.find((property) => id === property.id)
      : null
  );

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const data = await axios.get(`/api/property?id=${id}`);
          setData(data.data.property);
          console.log(data.data.property);
        } catch (error) {
          console.error("Error fetching property data:", error);
        }
      };
      fetchData();
    }
  }, [data, id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="flex flex-col max-w-screen-sm gap-2 ">
        <header className="w-full space-y-4">
          <div className="w-full">
            <SliderDetails>
              {data.images.map((image, index) => {
                return <SliderItem key={index} img={image} />;
              })}
            </SliderDetails>
          </div>
          <NavBarDetails />
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow m-4 text-[#0D171C]`}
        >
          <h1 className="font-bold text-[1.37rem]">{data.name}</h1>
          <h4 className="text-[#000000B2] text-base">
            {data.city + ", " + data.street + " " + data.streetNumber}
          </h4>
          <div className="flex flex-col gap-6">
            <GuestInfo
              data={[
                { quantity: data.maximunOccupants, type: "Huespedes" },
                { quantity: data.bathrooms, type: "Baños" },
                { quantity: data.bed, type: "Camas" },
              ]}
            />
            <ReservationButton callback={handleShowModal} />
          </div>
          <DescriptionSection data={data.description} />
          <RoomSection data={data.rooms} />
          <AmenitiesSection data={data.amenities} />
          <LocationSection />
          <MoreInfoSection
            data={[
              {
                title: "Condicion del alquiler",
                body: data.incomeConditionDescription,
              },
              { title: "Mantenimiento", body: data.maintenanceDescription },
              { title: "Habitación", body: data.roomDescription },
              { title: "Facturas", body: data.feeDescription },
              { title: "Sobre nosotros", body: data.aboutUs },
              { title: "Normas de convivencia", body: data.houseRules },
              { title: "Check-In", body: data.checkIn },
              { title: "Check-Out", body: data.checkOut },
            ]}
          />
          {showModal && <ReservationModal callback={handleShowModal} />}
        </main>
      </div>
    </div>
  );
}
