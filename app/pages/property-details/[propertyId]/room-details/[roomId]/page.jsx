"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
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
          const hasActiveLeaseOrder = roomData?.leaseOrdersRoom?.some(
            (order) => order.status === "active"
          );

          // Guardar en el estado local si hay alguna leaseOrderRoom con estado "active"
          setIsLeaseOrderActive(hasActiveLeaseOrder || false);

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
            <SliderDetails>
              {allImages.map((image, index) => {
                return <SliderItem key={index} img={image} />;
              })}
            </SliderDetails>
          </div>
          <div className="px-3">
            <NavBarDetails callBack={() => router.back()} />
          </div>
          <span className="px-3 text-lg font-light text-slate-400">
            {roomData.status === "RESERVED" || roomData.status === "OCCUPIED"
              ? "Reservada"
              : ""}
          </span>
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow text-[#0D171C] w-full px-3`}
        >
          <h1 className="font-bold text-[1.37rem]">
            {roomData.name}
            <span className="pl-2 font-light text-slate-400">
              ({roomData.serial})
            </span>
          </h1>
          <h4 className="text-[#000000B2] text-base">
            {data.city + ", " + data.street}
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
            {(data.category === "HELLO_ROOM" ||
              data.category === "HELLO_COLIVING") &&
              roomData.price &&
              !isLeaseOrderActive && (
                <ReservationButton callback={handleShowModal} />
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
          {filteredRooms.length > 0 ? (
            <RoomSection
              data={filteredRooms}
              title="Otras habitaciones en el piso"
            />
          ) : null}

          <AmenitiesSection data={data.amenities} />
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
          {showModal && (
            <ReservationModal
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
                propertyName: data?.name,
                user: state?.user,
                rentalPeriods: roomData.rentalPeriods,
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
          <div className="w-full space-y-4">
            <div className="w-full">
              <SliderDetails>
                {allImages.map((image, index) => {
                  return (
                    <SliderItem key={index} img={image} height="h-[24rem]" />
                  );
                })}
              </SliderDetails>
            </div>
            <span className="px-3 text-lg font-light text-slate-400">
              {roomData.status === "RESERVED" || roomData.status === "OCCUPIED"
                ? "Reservada"
                : ""}
            </span>
            {filteredRooms.length > 0 ? (
              <RoomSection
                data={filteredRooms}
                title="Otras habitaciones en el mismo piso"
                category={data.category}
              />
            ) : null}
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
          </div>

          <div className="border" />

          {/* RIGHT SIDE */}
          <div className="w-full space-y-4">
            <h1 className="font-bold text-[1.37rem]">
              {roomData.name}
              <span className="pl-2 font-light text-slate-400">
                ({roomData.serial})
              </span>
            </h1>
            <h4 className="text-[#000000B2] text-base">
              {data.city + ", " + data.street}
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
              {(data.category === "HELLO_ROOM" ||
                data.category === "HELLO_COLIVING") &&
                roomData.price &&
                roomData.leaseOrdersRoom < 1 && (
                  <ReservationButton callback={handleShowModal} />
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
                propertyName: data?.name,
                user: state?.user,
                rentalPeriods: roomData.rentalPeriods,
                leaseOrdersProperty: roomData.leaseOrdersRoom || null,
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}