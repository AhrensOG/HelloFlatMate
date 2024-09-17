"use client";
import NavBarDetails from "@/app/components/user/property-details/header/NavBarDetails";
import SliderItem from "@/app/components/user/property-details/header/slider/SliderItem";
import SliderDetails from "@/app/components/user/property-details/header/SliderDetails";
import AmenitiesSection from "@/app/components/user/property-details/main/AmenitiesSection";
import DescriptionSection from "@/app/components/user/property-details/main/DescriptionSection";
import GuestInfo from "@/app/components/user/property-details/main/GuestInfo";
import LocationSection from "@/app/components/user/property-details/main/LocationSection";
import MoreInfoSection from "@/app/components/user/property-details/main/MoreInfoSection";
import PriceSection from "@/app/components/user/property-details/main/PriceSection";
import ReservationModal from "@/app/components/user/property-details/main/reservation/ReservationModal";
import ReservationButton from "@/app/components/user/property-details/main/ReservationButton";
import RoomSection from "@/app/components/user/property-details/main/RoomSection";
import { Context } from "@/app/context/GlobalContext";
import { plus_jakarta } from "@/font";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function PropertyDetails({ params }) {
  const { state } = useContext(Context);
  const id = params.propertyId;
  const router = useRouter();

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
    if (!state?.user?.id) {
      toast.info("Inicia sesión antes de continuar");
      return router.push("/pages/auth");
    }
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="flex flex-col max-w-screen-sm w-full gap-2 ">
        <header className="w-full space-y-4">
          <div className="w-full">
            <SliderDetails>
              {data.images.map((image, index) => {
                return <SliderItem key={index} img={image} />;
              })}
            </SliderDetails>
          </div>
          <div className="px-3">
            <NavBarDetails />
          </div>
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow text-[#0D171C] w-full px-3`}
        >
          <h1 className="font-bold text-[1.37rem]">{data.name}</h1>
          <h4 className="text-[#000000B2] text-base">
            {data.city + ", " + data.street + " " + data.streetNumber}
          </h4>
          {data.price &&
          (data.category === "HELLO_STUDIO" ||
            data.category === "HELLO_LANDLORD") ? (
            <PriceSection data={data.price} />
          ) : null}
          <div className="flex flex-col gap-6">
            <GuestInfo
              data={[
                { quantity: data.maximunOccupants, type: "Huespedes" },
                { quantity: data.bathrooms, type: "Baños" },
                { quantity: data.bed, type: "Camas" },
              ]}
            />
            {(data.category === "HELLO_STUDIO" ||
              data.category === "HELLO_LANDLORD") &&
              data.leaseOrdersProperty.length < 1 && (
                <ReservationButton callback={handleShowModal} />
              )}
          </div>
          <DescriptionSection data={data.description} />
          <RoomSection data={data.rooms} />
          <AmenitiesSection data={data.amenities} />
          <LocationSection street={data?.street} streetNumber={data?.streetNumber} postalCode={data?.postalCode} city={data?.city} country={"España"} />
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
                price: data.price,
                propertyId: data.id,
                clientId: state?.user?.id,
                ownerId: data.ownerId,
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
