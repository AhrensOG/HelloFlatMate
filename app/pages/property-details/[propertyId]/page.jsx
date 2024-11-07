"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import DesktopNavBarDetails from "@/app/components/user/property-details/header/DesktopNavBarDetails";
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
import VideoEmbedSection from "@/app/components/user/property-details/main/VideoEmbedSection";
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
      {/* MOBILE */}
      <div className="flex flex-col max-w-screen-sm sm:hidden w-full gap-2 ">
        <header className="w-full space-y-4">
          <div className="w-full">
            {data.images?.length > 0 ? (
              <SliderDetails>
                {data.images.map((image, index) => {
                  return <SliderItem key={index} img={image} height="h-[23rem]" />;
                })}
              </SliderDetails>
            ) : (
              <div className="h-[23rem] w-full bg-gray-200 animate-pulse" />
            )}
          </div>
          <div className="px-3">
            <NavBarDetails
              callBack={() =>
                router.back() || router.push("/pages/user/filtered")
              }
            />
          </div>
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow text-[#0D171C] w-full px-3`}
        >
          <div className="w-full">
            <h1 className="font-bold text-[1.37rem]">{data.name}</h1>
            <span className="font-light text-slate-400">({data.serial})</span>
            <h4 className="text-[#000000B2] text-base">
              {data.city + ", " + data.street}
            </h4>
          </div>
          {data.price &&
          (data.category === "HELLO_STUDIO") ? (
            <PriceSection data={data.price} />
          ) : null}
          <div className="flex flex-col gap-6">
            <GuestInfo
              data={[
                { quantity: data.maximunOccupants || "-", type: "Huespedes" },
                { quantity: data.bathrooms || "-", type: "Baños" },
                { quantity: data.bed || "-", type: "Camas" },
              ]}
            />
            {data.category === "HELLO_STUDIO" && (
              <ReservationButton callback={handleShowModal} />
            )}
          </div>
          <DescriptionSection data={data.description} />
          <RoomSection data={data.rooms} category={data.category} />
          <AmenitiesSection data={data.amenities} />
          {data.linkVideo ? (
            <VideoEmbedSection videoUrl={data.linkVideo} />
          ) : (
            ""
          )}
          <LocationSection
            street={data?.street}
            streetNumber={data?.streetNumber}
            postalCode={data?.postalCode}
            city={data?.city}
            country={"España"}
          />
          <MoreInfoSection
            data={[
              {
                title: "Características del piso",
                body: data.roomDescription,
              },
              {
                title: "Condiciones del alquiler",
                body: data.incomeConditionDescription,
              },
              { title: "Facturas", body: data.feeDescription },
              {
                title: "Mantenimiento",
                body: data.maintenanceDescription,
              },
              { title: "Check-In / Check out", body: data.checkIn },
              { title: "Opinión del agente", body: data.aboutUs },
              { title: "Normas de convivencia", body: data.houseRules },
              { title: "Otros servicios", body: data.checkOut },
            ]}
          />
          {showModal && (
            <ReservationModal
              callback={handleShowModal}
              category={data.category}
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
                rentalPeriods: data.rentalItems,
                leaseOrdersProperty: data?.leaseOrdersProperty || null,
              }}
            />
          )}
        </main>
      </div>
      {/* DESKTOP */}
      <div className="hidden sm:flex flex-col items-center w-full">
        <header className="w-full space-y-4">
          <NavBar />
          <div className="px-3">
            <DesktopNavBarDetails
              callBack={() =>
                router.back() || router.push("/pages/user/filtered")
              }
            />
          </div>
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-row gap-10 grow p-5 text-[#0D171C] w-full max-w-screen-2xl px-3`}
        >
          {/* LEFT SIDE */}
          <div className="w-full flex flex-col gap-2">
            <div className="w-full">
              {data.images?.length > 0 ? (
                <SliderDetails>
                  {data.images.map((image, index) => {
                    return <SliderItem key={index} img={image} height="h-[30rem]" />;
                  })}
                </SliderDetails>
              ) : (
                <div className="h-[30rem] w-full bg-gray-200 animate-pulse" />
              )}
            </div>
            <RoomSection data={data.rooms} category={data.category} />
            {data.linkVideo ? (
              <VideoEmbedSection videoUrl={data.linkVideo} />
            ) : (
              ""
            )}
            <LocationSection
              street={data?.street}
              streetNumber={data?.streetNumber}
              postalCode={data?.postalCode}
              city={data?.city}
              country={"España"}
            />
          </div>

          <div className="border" />

          {/* RIGHT SIDE */}
          <div className="w-full space-y-4">
            <h1 className="font-bold text-[1.37rem]">{data.name}</h1>
            <span className="font-light text-slate-400">({data.serial})</span>
            <h4 className="text-[#000000B2] text-base">
              {data.city + ", " + data.street}
            </h4>
            {data.price &&
            (data.category === "HELLO_STUDIO") ? (
              <PriceSection data={data.price} />
            ) : null}
            <div className="flex flex-col gap-6">
              <GuestInfo
                data={[
                  { quantity: data.maximunOccupants || "-", type: "Huespedes" },
                  { quantity: data.bathrooms || "-", type: "Baños" },
                  { quantity: data.bed || "-", type: "Camas" },
                ]}
              />
              {data.category === "HELLO_STUDIO" && (
                <ReservationButton callback={handleShowModal} />
              )}
            </div>
            <DescriptionSection data={data.description} />
            <AmenitiesSection data={data.amenities} />
            <MoreInfoSection
              data={[
                {
                  title: "Características del piso",
                  body: data.roomDescription,
                },
                {
                  title: "Condiciones del alquiler",
                  body: data.incomeConditionDescription,
                },
                { title: "Facturas", body: data.feeDescription },
                {
                  title: "Mantenimiento",
                  body: data.maintenanceDescription,
                },
                { title: "Check-In / Check out", body: data.checkIn },
                { title: "Opinión del agente", body: data.aboutUs },
                { title: "Normas de convivencia", body: data.houseRules },
                { title: "Otros servicios", body: data.checkOut },
              ]}
            />
          </div>
          {showModal && (
            <ReservationModal
              calendarType={data.calendar}
              callback={handleShowModal}
              category={data.category}
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
                rentalPeriods: data.rentalItems,
                leaseOrdersProperty: data?.leaseOrdersProperty || null,
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
