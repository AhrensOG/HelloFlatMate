"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import Footer_1 from "@/app/components/public/home/Footer";
import SeventhSection from "@/app/components/public/home/SeventhSection";
import DesktopNavBarDetails from "@/app/components/user/property-details/header/DesktopNavBarDetails";
import NavBarDetails from "@/app/components/user/property-details/header/NavBarDetails";
import SliderItem from "@/app/components/user/property-details/header/slider/SliderItem";
import SliderDetails from "@/app/components/user/property-details/header/SliderDetails";
import AmenitiesSection from "@/app/components/user/property-details/main/AmenitiesSection";
import DescriptionSection from "@/app/components/user/property-details/main/DescriptionSection";
import LocationSection from "@/app/components/user/property-details/main/LocationSection";
import MoreInfoSection from "@/app/components/user/property-details/main/MoreInfoSection";
import PriceSection from "@/app/components/user/property-details/main/PriceSection";
import ReservationModal from "@/app/components/user/property-details/main/reservation/ReservationModal";
import ReservationButton from "@/app/components/user/property-details/main/ReservationButton";
import RoomSection from "@/app/components/user/property-details/main/RoomSection";
import VideoEmbedSection from "@/app/components/user/property-details/main/VideoEmbedSection";
import GuestInfoRoom from "@/app/components/user/room-details/GuestInfoRoom";
import { Context } from "@/app/context/GlobalContext";

import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
        return "-";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export default function RoomDetails({ params }) {
    const t = useTranslations("room_details");
    const { state } = useContext(Context);
    const { propertyId, roomId } = params;
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const [roomData, setRoomData] = useState();
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const [isLeaseOrderActive, setIsLeaseOrderActive] = useState(true);

    useEffect(() => {
      if (!data) {
          const fetchData = async () => {
              try {
                  const response = await axios.get(`/api/property?id=${propertyId}`);
                  const propertyData = response.data.property;
  
                  setData(propertyData);
  
                  const roomData_1 = propertyData.rooms.find((room) => roomId == room.id);
                  setRoomData(roomData_1);
  
                  const filtered = propertyData.rooms.filter((room) => room.id !== Number(roomId));
                  setFilteredRooms(filtered);
  
                  const propertyImages = propertyData?.images || [];
                  const roomImages = roomData_1?.images || [];
                  setAllImages([...roomImages, ...propertyImages]);
  
                  // 👇 Ahora usamos `roomData_1` directamente (que ya tenemos)
                  const activeLeaseOrder = roomData_1?.leaseOrdersRoom?.find((order) => order.isActive === true);
                  setIsLeaseOrderActive(activeLeaseOrder || false);
  
              } catch (error) {
                  console.error("Error fetching property data:", error);
              }
          };
  
          fetchData();
      }
  }, []);
  

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="flex flex-col justify-center items-center relative w-full">
                    {/* MOBILE */}
                    <div className="flex flex-col justify-center items-center max-w-screen-sm sm:hidden w-full gap-2 h-screen">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                    {/* DESKTOP */}
                    <div className="hidden sm:flex flex-col items-center w-full h-screen">
                        <header className="w-full space-y-4">
                            {/* <NavBar /> */}
                            <NavbarV3 />
                        </header>
                        <div className="w-full grow grid place-items-center">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const handleShowModal = () => {
        if (!state?.user?.id) {
            toast.info("Inicia sesión antes de continuar");
            router.push(`/pages/auth?redirect=${encodeURIComponent(BASE_URL + window.location.pathname)}`)
            return;
        }
        setShowModal(!showModal);
    };

    return (
        <div className="flex flex-col justify-center items-center relative">
            {/* MOBILE */}
            <div className="flex flex-col max-w-screen-sm sm:hidden w-full gap-2 ">
                <header className="w-full space-y-4">
                    <div className="w-full"> 
                      {/* {allImages.length > 0 && (
                            <SliderItem img={allImages[0]} height="h-[23rem]" />
                        )} */}
                        {allImages.length > 0 ? (
                            <SliderDetails>
                                {allImages.map((image, index) => {
                                    return <SliderItem key={index+"mobile"} img={image} height="h-[23rem]" />;
                                })}
                            </SliderDetails>
                        ) : (
                            <div className="h-[23rem] w-full bg-gray-200 animate-pulse" />
                        )}
                        {/* {allImages.length > 0 && <SliderDetails images={allImages} />} */}
                    </div>
                    <div className="px-3">
                        <NavBarDetails callBack={() => router.back()} />
                    </div>
                </header>
                <main className={`flex flex-col gap-[2.5rem] grow text-[#0D171C] w-full px-3`}>
                    <div className="w-full space-y-2 sticky top-0 min-h-56 bg-white z-10 pt-2 pb-1">
                        <h1 className="font-bold text-[1.37rem]">{roomData?.name || data?.name || t("title")}</h1>
                        <h4 className="font-light text-[#000000B2]">
                            ({roomData?.serial} - {data.typology === "ONLY_WOMEN" ? t("only_women") : t("mixed")}){" "}
                        </h4>
                        <h4 className="text-[#000000B2] text-base">{data.city + ", " + data.street}</h4>
                        <h4 className="text-base font-bold text-resolution-blue">{!roomData?.isActive ? t("is_reserved") : ""}</h4>
                        <PriceSection data={roomData?.price} />
                        <ReservationButton callback={handleShowModal} disabled={!roomData?.isActive} />
                    </div>
                    {roomData?.description?.length > 0 ? (
                        <DescriptionSection title={t("desc_sec_title")} data={roomData?.description} category="HELLO_ROOM" />
                    ) : (
                        <DescriptionSection title={t("desc_sec_title")} data={data.description} />
                    )}
                    {/* <GuestInfoRoom
            data={[
              { type: "bed", number: roomData?.numberBeds },
              { type: "bathroom", boolean: roomData?.bathroom },
              { type: "couple", boolean: roomData?.couple },
            ]}
          /> */}
                    {data.amenities && data.amenities?.length > 0 ? <AmenitiesSection data={data.amenities} /> : ""}
                    {/* <AmenitiesSection data={data.amenities} /> */}
                    {roomData?.linkVideo ? <VideoEmbedSection videoUrl={roomData?.linkVideo} /> : ""}
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
                                title: t("more_info.title_1"),
                                body: data.roomDescription,
                            },
                            {
                                title: t("more_info.title_2"),
                                body: data.incomeConditionDescription,
                            },
                            { title: t("more_info.title_3"), body: data.feeDescription },
                            {
                                title: t("more_info.title_4"),
                                body: data.maintenanceDescription,
                            },
                            { title: t("more_info.title_5"), body: data.checkIn },
                            { title: t("more_info.title_6"), body: data.aboutUs },
                            { title: t("more_info.title_7"), body: data.houseRules },
                            { title: t("more_info.title_8"), body: data.checkOut },
                        ]}
                    />
                    {filteredRooms.length > 0 ? <RoomSection data={filteredRooms} title={t("other_rooms_title")} /> : null}
                </main>
                <SeventhSection />
                <Footer_1 />
            </div>
            {/* DESKTOP */}
            <div className="hidden sm:flex flex-col items-center w-full">
                <header className="w-full space-y-4">
                    {/* <NavBar /> */}
                    <NavbarV3 />
                    <div className="px-3">
                        <DesktopNavBarDetails callBack={() => router.back() || router.push("/pages/user/filtered")} />
                    </div>
                </header>
                <main className={`  flex flex-row gap-10 grow text-[#0D171C] w-full max-w-screen-2xl px-2`}>
                    {/* LEFT SIDE */}
                    <div className="w-full space-y-16 max-w-[50%]">
                        <div className="w-full">
                            {allImages.length > 0 ? (
                                <SliderDetails>
                                    {allImages.map((image, index) => {
                                        return <SliderItem key={index+"mobile"} img={image} height="h-[30rem]" />;
                                    })}
                                </SliderDetails>
                            ) : (
                                <div className="h-[30rem] w-full bg-gray-200 animate-pulse" />
                            )}
                        </div>
                        {roomData?.linkVideo ? <VideoEmbedSection videoUrl={roomData?.linkVideo} /> : null}
                        <LocationSection
                            street={data?.street}
                            streetNumber={data?.streetNumber}
                            postalCode={data?.postalCode}
                            city={data?.city}
                            country={"España"}
                        />
                        {filteredRooms.length > 0 ? (
                            <RoomSection data={filteredRooms} title={t("other_rooms_title")} category={data.category} />
                        ) : null}
                    </div>

                    <div className="border" />

                    {/* RIGHT SIDE */}
                    <div className="relative w-full max-w-[50%]">
                        <div className="space-y-2 sticky top-0 min-h-56 bg-white z-10 w-full">
                            <h1 className="font-bold text-[1.37rem]">{roomData?.name}</h1>
                            <h6 className="font-light text-[#000000B2]">
                                ({roomData?.serial} - {data.typology === "ONLY_WOMEN" ? t("only_women") : t("mixed")})
                            </h6>
                            <h6 className="text-[#000000B2] text-base">{data.city + ", " + data.street}</h6>
                            <h6 className="text-base font-bold text-resolution-blue">{!roomData?.isActive ? t("is_reserved") : ""}</h6>
                            <PriceSection data={roomData?.price} />
                            <div className="flex flex-col gap-6">
                                <ReservationButton callback={handleShowModal} disabled={!roomData?.isActive} />
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            {roomData?.description?.length > 0 ? (
                                <DescriptionSection title={t("desc_sec_title")} data={roomData?.description} category="HELLO_ROOM" />
                            ) : (
                                <DescriptionSection title={t("desc_sec_title")} data={data.description} />
                            )}
                            {/* <GuestInfoRoom
                data={[
                  { type: "bed", number: roomData?.numberBeds },
                  { type: "bathroom", boolean: roomData?.bathroom },
                  { type: "couple", boolean: roomData?.couple },
                ]}
              /> */}
                            {data.amenities && data.amenities?.length > 0 ? <AmenitiesSection data={data.amenities} /> : ""}
                            {/* <AmenitiesSection data={data.amenities} /> */}
                            <MoreInfoSection
                                data={[
                                    {
                                        title: t("more_info.title_1"),
                                        body: data.roomDescription,
                                    },
                                    {
                                        title: t("more_info.title_2"),
                                        body: data.incomeConditionDescription,
                                    },
                                    { title: t("more_info.title_3"), body: data.feeDescription },
                                    { title: t("more_info.title_4"), body: data.maintenanceDescription },
                                    { title: t("more_info.title_5"), body: data.checkIn },
                                    { title: t("more_info.title_6"), body: data.aboutUs },
                                    { title: t("more_info.title_7"), body: data.houseRules },
                                    { title: t("more_info.title_8"), body: data.checkOut },
                                ]}
                            />
                        </div>
                    </div>
                </main>
                <SeventhSection />
                <Footer_1 />
            </div>
            <AnimatePresence>
                {showModal && (
                    <ReservationModal
                        calendarType={roomData?.calendar}
                        callback={handleShowModal}
                        category={data.category}
                        data={{
                            date: null,
                            startDate: null,
                            endDate: null,
                            price: roomData?.price,
                            propertyInfo: data,
                            propertyId: data.id,
                            propertySerial: data.serial,
                            clientId: state?.user?.id,
                            ownerId: data.ownerId,
                            roomId: roomData?.id,
                            roomSerial: roomData.serial,
                            calendar: roomData?.calendar,
                            propertyName: roomData?.name,
                            user: state?.user,
                            rentalPeriods: roomData?.rentalItems,
                            leaseOrdersProperty: roomData?.leaseOrdersRoom || null,
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
