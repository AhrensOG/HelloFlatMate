"use client";
import DescriptionSection from "@/app/components/history/services/DescriptionSection";
import NavBarDetails from "@/app/components/property-details/header/NavBarDetails";
import SliderItem from "@/app/components/property-details/header/slider/SliderItem";
import SliderDetails from "@/app/components/property-details/header/SliderDetails";
import AmenitiesSection from "@/app/components/property-details/main/AmenitiesSection";
import GuestInfo from "@/app/components/property-details/main/GuestInfo";
import LocationSection from "@/app/components/property-details/main/LocationSection";
import MoreInfoSection from "@/app/components/property-details/main/MoreInfoSection";
import PriceSection from "@/app/components/property-details/main/PriceSection";
import ReservationModal from "@/app/components/property-details/main/reservation/ReservationModal";
import ReservationButton from "@/app/components/property-details/main/ReservationButton";
import RoomSection from "@/app/components/property-details/main/RoomSection";
import GuestInfoRoom from "@/app/components/room-details/GuestInfoRoom";
import PropertyInfo from "@/app/components/room-details/PropertyInfo";
import PropertySection from "@/app/components/room-details/PropertySection";
import { Context } from "@/app/context/GlobalContext";
import { plus_jakarta } from "@/font";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function RoomDetails({ params }) {
  const { state } = useContext(Context);
  const { propertyId, roomId } = params;
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(
    state.properties
      ? state.properties.find((property) => propertyId === property.id)
      : null
  );
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const data = await axios.get(`/api/property?id=${propertyId}`);
          setData(data.data.property);
          setRoomData(
            data.data.property.rooms.find((room) => roomId == room.id)
          );
        } catch (error) {
          console.error("Error fetching property data:", error);
        }
      };
      fetchData();
    }
  }, [data, propertyId]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  const handleShowModal = () => {
    if (!state?.user?.id) {
      toast.info("Inicia sesión antes de continuar");
      return router.push("/pages/auth");
    }
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      {console.log(roomData)}

      <div className="flex flex-col max-w-screen-sm gap-2 ">
        <header className="w-full space-y-4">
          <div className="w-full">
            <SliderDetails>
              {roomData.images.map((image, index) => {
                return <SliderItem key={index} img={image} />;
              })}
            </SliderDetails>
          </div>
          <div className="px-3">
            <NavBarDetails link={`/pages/property-details/${propertyId}`} />
          </div>
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow text-[#0D171C] w-screen px-3`}
        >
          <h1 className="font-bold text-[1.37rem]">{roomData.name}</h1>
          <h4 className="text-[#000000B2] text-base">
            {data.city + ", " + data.street + " " + data.streetNumber}
          </h4>
          {roomData.price && <PriceSection data={roomData.price} />}
          <div className="flex flex-col gap-6">
            <GuestInfoRoom
              data={[
                { type: "bed", number: roomData.numberBeds },
                { type: "bathroom", boolean: roomData.bathroom },
                { type: "couple", boolean: roomData.couple },
              ]}
            />
            {(roomData.price && roomData.leaseOrdersRoom < 1) && (
              <ReservationButton callback={handleShowModal} />
            )}
          </div>
          <DescriptionSection data={data.description} />
          <PropertySection
            data={{ id: data.id, name: data.name, image: data.images[0] }}
          />
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
          {showModal && (
            <ReservationModal
              callback={handleShowModal}
              data={{
                date: null,
                startDate: null,
                endDate: null,
                price: roomData.price,
                propertyId: data.id,
                clientId: state?.user?.id,
                ownerId: data.ownerId,
                roomId: roomData.id,
                propertyName: data?.name,
                user: state?.user,
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
