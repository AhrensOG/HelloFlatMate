"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
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
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

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

          const roomData = propertyData.rooms.find((room) => roomId == room.id);
          setRoomData(roomData);

          // Filtramos las habitaciones que no son la actual
          const filtered = propertyData.rooms.filter(
            (room) => room.id !== Number(roomId)
          );
          setFilteredRooms(filtered);

          // Verificar si la habitación tiene alguna leaseOrderRoom con estado "active"
          const activeLeaseOrder = roomData?.leaseOrdersRoom?.find(
            (order) => order.isActive === true
          );

          // Guardar en el estado local si hay alguna leaseOrderRoom con estado "active"
          setIsLeaseOrderActive(activeLeaseOrder || false);

          // Obtenemos las imágenes de la propiedad y de la habitación actual
          const propertyImages = propertyData?.images || [];
          const roomImages = roomData?.images || [];

          // Combinamos ambos arrays de imágenes en uno solo
          const allImages = [...roomImages, ...propertyImages];

          // Aquí puedes hacer lo que necesites con el array de imágenes combinado (e.g., guardarlo en un estado)
          setAllImages(allImages);
        } catch (error) {
          console.error("Error fetching property data:", error);
        }
      };

      fetchData();
    }
  }, [data, propertyId]);

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
              <NavBar />
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
            {allImages.length > 0 ? (
              <SliderDetails>
                {allImages.map((image, index) => {
                  return (
                    <SliderItem key={index} img={image} height="h-[23rem]" />
                  );
                })}
              </SliderDetails>
            ) : (
              <div className="h-[23rem] w-full bg-gray-200 animate-pulse" />
            )}
          </div>
          <div className="px-3">
            <NavBarDetails callBack={() => router.back()} />
          </div>
        </header>
        <main
          className={`flex flex-col gap-[2.5rem] grow text-[#0D171C] w-full px-3`}
        >
          <div className="w-full space-y-2 sticky top-0 min-h-56 bg-white z-10 pt-2 pb-1">
            <h1 className="font-bold text-[1.37rem]">{roomData.name}</h1>
            <h4 className="font-light text-[#000000B2]">
              ({roomData.serial} -{" "}
              {data.typology === "ONLY_WOMEN"
                ? "Piso solo para chicas"
                : "Piso mixto"}
              ){" "}
            </h4>
            <h4 className="text-[#000000B2] text-base">
              {data.city + ", " + data.street}
            </h4>
            {/* <h4 className="text-base font-bold text-resolution-blue">
              {isLeaseOrderActive
                ? `Habitacion libre a partir de ${formatDateToDDMMYYYY(
                    isLeaseOrderActive.endDate
                  )}`
                : ""}
            </h4> */}
            {roomData.price && <PriceSection data={roomData.price} />}
            {(data.category === "HELLO_ROOM" ||
              data.category === "HELLO_COLIVING" ||
              data.category === "HELLO_LANDLORD") &&
              roomData.price && (
                <ReservationButton
                  callback={handleShowModal}
                  // disabled={isLeaseOrderActive || false}
                />
              )}
          </div>
          {roomData?.description?.length > 0 ? (
            <DescriptionSection
              title="Descripción"
              data={roomData.description}
              category="HELLO_ROOM"
            />
          ) : (
            <DescriptionSection title="Descripción" data={data.description} />
          )}
          {/* <GuestInfoRoom
            data={[
              { type: "bed", number: roomData.numberBeds },
              { type: "bathroom", boolean: roomData.bathroom },
              { type: "couple", boolean: roomData.couple },
            ]}
          /> */}
          {data.amenities && data.amenities?.length > 0 ? (
            <AmenitiesSection data={data.amenities} />
          ) : (
            ""
          )}
          {/* <AmenitiesSection data={data.amenities} /> */}
          {roomData.linkVideo ? (
            <VideoEmbedSection videoUrl={roomData.linkVideo} />
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
          {filteredRooms.length > 0 ? (
            <RoomSection
              data={filteredRooms}
              title="Otras habitaciones en el mismo piso"
            />
          ) : null}
          {/* {showModal && (
            <ReservationModal
              calendarType={roomData.calendar}
              callback={handleShowModal}
              category={data.category}
              data={{
                date: null,
                startDate: null,
                endDate: null,
                price: roomData.price,
                propertyId: data.id,
                clientId: state?.user?.id,
                ownerId: data.ownerId,
                roomId: roomData.id,
                propertyName: roomData?.name,
                user: state?.user,
                rentalPeriods: roomData.rentalItems,
                leaseOrdersProperty: roomData.leaseOrdersRoom || null,
                room: { roomData },
              }}
            />
          )} */}
        </main>
        <SeventhSection />
        <Footer_1 />
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
          className={`  flex flex-row gap-10 grow text-[#0D171C] w-full max-w-screen-2xl px-2`}
        >
          {/* LEFT SIDE */}
          <div className="w-full space-y-16 max-w-[50%]">
            <div className="w-full">
              {allImages.length > 0 ? (
                <SliderDetails>
                  {allImages.map((image, index) => {
                    return (
                      <SliderItem key={index} img={image} height="h-[30rem]" />
                    );
                  })}
                </SliderDetails>
              ) : (
                <div className="h-[30rem] w-full bg-gray-200 animate-pulse" />
              )}
            </div>
            {roomData.linkVideo ? (
              <VideoEmbedSection videoUrl={roomData.linkVideo} />
            ) : null}
            <LocationSection
              street={data?.street}
              streetNumber={data?.streetNumber}
              postalCode={data?.postalCode}
              city={data?.city}
              country={"España"}
            />
            {filteredRooms.length > 0 ? (
              <RoomSection
                data={filteredRooms}
                title="Otras habitaciones en el mismo piso"
                category={data.category}
              />
            ) : null}
          </div>

          <div className="border" />

          {/* RIGHT SIDE */}
          <div className="relative w-full max-w-[50%]">
            <div className="space-y-2 sticky top-0 min-h-56 bg-white z-10 w-full">
              <h1 className="font-bold text-[1.37rem]">{roomData.name}</h1>
              <h6 className="font-light text-[#000000B2]">
                ({roomData.serial} -{" "}
                {data.typology === "ONLY_WOMEN"
                  ? "Piso solo para chicas"
                  : "Piso mixto"}
                )
              </h6>
              <h6 className="text-[#000000B2] text-base">
                {data.city + ", " + data.street}
              </h6>
              {/* <h6 className="text-base font-bold text-resolution-blue">
                {isLeaseOrderActive
                  ? `Habitacion libre a partir de ${formatDateToDDMMYYYY(
                      isLeaseOrderActive.endDate
                    )}`
                  : ""}
              </h6> */}
              {roomData.price && <PriceSection data={roomData.price} />}
              <div className="flex flex-col gap-6">
                {(data.category === "HELLO_ROOM" ||
                  data.category === "HELLO_COLIVING" ||
                  data.category === "HELLO_LANDLORD") &&
                  roomData.price && (
                    <ReservationButton
                      callback={handleShowModal}
                      // disabled={isLeaseOrderActive || false}
                    />
                  )}
              </div>
            </div>

            <div className="w-full space-y-4">
              {roomData?.description?.length > 0 ? (
                <DescriptionSection
                  title="Descripción"
                  data={roomData.description}
                  category="HELLO_ROOM"
                />
              ) : (
                <DescriptionSection
                  title="Descripción"
                  data={data.description}
                />
              )}
              {/* <GuestInfoRoom
                data={[
                  { type: "bed", number: roomData.numberBeds },
                  { type: "bathroom", boolean: roomData.bathroom },
                  { type: "couple", boolean: roomData.couple },
                ]}
              /> */}
              {data.amenities && data.amenities?.length > 0 ? (
                <AmenitiesSection data={data.amenities} />
              ) : (
                ""
              )}
              {/* <AmenitiesSection data={data.amenities} /> */}
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
                  { title: "Mantenimiento", body: data.maintenanceDescription },
                  { title: "Check-In / Check out", body: data.checkIn },
                  { title: "Opinión del agente", body: data.aboutUs },
                  { title: "Normas de convivencia", body: data.houseRules },
                  { title: "Otros servicios", body: data.checkOut },
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
            calendarType={roomData.calendar}
            callback={handleShowModal}
            category={data.category}
            data={{
              date: null,
              startDate: null,
              endDate: null,
              price: roomData.price,
              propertyId: data.id,
              clientId: state?.user?.id,
              ownerId: data.ownerId,
              roomId: roomData.id,
              propertyName: roomData?.name,
              user: state?.user,
              rentalPeriods: roomData.rentalItems,
              leaseOrdersProperty: roomData.leaseOrdersRoom || null,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
