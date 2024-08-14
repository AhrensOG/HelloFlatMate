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
import DescriptionModal from "./main/description_section/DescriptionModal";
import SliderModal from "./header/slider/SliderModal";
import AddressModal from "./main/address_modal/AddressModal";
import { toast } from "sonner";
import validateData from "./validateData";
import axios from "axios";
import RoomAddModal from "./main/room_section/RoomAddModal";
import { useRouter } from "next/navigation";
import SizeAndCategorySection from "./main/SizeAndCategorySection";
import PriceSection from "./main/PriceSection";

export default function NewProperty() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
    streetNumber: null,
    postalCode: "",
  });
  const [guestInfo, setGuestInfo] = useState({
    occupants: null,
    beds: null,
    bathrooms: null,
  });
  const [description, setDescription] = useState([]);
  const [sliderImage, setSliderImage] = useState([]);
  const [amenities, setAmenities] = useState(["wifi", "otros"]);
  const [moreInfo, setMoreInfo] = useState({
    condicionDeRenta: "",
    habitacion: "",
    facturas: "",
    mantenimiento: "",
    sobreNosotros: "",
    normasDeConvivencia: "",
    checkIn: "",
    checkOut: "",
  });
  const [catAndSize, setCatAndSize] = useState({});
  const [dataRoom, setDataRoom] = useState([]);
  const [price, setPrice] = useState({
    price: null,
    priceOwner: null,
    priceHelloflatmate: null,
  });

  const setRoomData = (data) => {
    setDataRoom(data);
  };

  // Modal states
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [showRoomEditModal, setShowRoomEditModal] = useState(false);

  // Modal handlers
  const handleShowDescriptionModal = () =>
    setShowDescriptionModal(!showDescriptionModal);
  const handleShowSliderModal = () => setShowSliderModal(!showSliderModal);
  const handleShowAddressModal = () => setShowAddressModal(!showAddressModal);
  const handleShowMoreInfoModal = () => {
    setShowMoreInfoModal(!showMoreInfoModal);
  };
  const handleShowRoomEditModal = () => {
    setShowRoomEditModal(!showRoomEditModal);
  };

  // Validation and submission
  const handleSubmit = () => {
    const allData = {
      ...address,
      ...guestInfo,
      ...description,
      ...sliderImage,
      ...amenities,
      ...moreInfo,
    };
    const validationResult = validateData(allData);

    if (!validationResult.isValid) {
      toast.error("No dejes datos incompletos");
      return false;
    }
    return true;
  };

  const property = {
    name: name,
    city: address.city,
    street: address.street,
    streetNumber: address.streetNumber,
    postalCode: address.postalCode,
    size: parseInt(catAndSize.size),
    roomsCount: dataRoom.length,
    bathrooms: parseInt(guestInfo.bathrooms),
    bed: parseInt(guestInfo.beds),
    maximunOccupants: parseInt(guestInfo.occupants),
    price: parseInt(price.price),
    puntuation: [],
    isActive: true,
    category: catAndSize.category,
    images: sliderImage,
    amenities: amenities,
    description: description,
    incomeConditionDescription: moreInfo.condicionDeRenta,
    maintenanceDescription: moreInfo.mantenimiento,
    roomDescription: moreInfo.habitacion,
    feeDescription: moreInfo.facturas,
    aboutUs: moreInfo.sobreNosotros,
    houseRules: moreInfo.normasDeConvivencia,
    checkIn: moreInfo.checkIn,
    checkOut: moreInfo.checkOut,
  };

  const createProperty = async () => {
    console.log(price, catAndSize);
    if (handleSubmit()) {
      try {
        // Crear propiedad
        const propertyResponse = await axios.post("/api/property", property);
        const propertyId = propertyResponse.data.property.id;
        console.log(propertyResponse.data.property.id);

        // Crear habitaciones
        const rooms = dataRoom.map((room) => ({
          name: room.name,
          image: room.image,
          numberBeds: parseInt(room.numberBeds),
          couple: room.couple,
          bathroom: room.bathroom,
          serial: room.serial,
          propertyId: propertyId,
        }));
        console.log(rooms);

        try {
          await axios.post("/api/room", rooms);
          toast.success("Habitación/es creada/s con éxito");
        } catch (error) {
          toast.error("Error en la creación de habitaciones");
          throw error; // Propagar el error para que se capture en el catch externo
        }

        toast.success("Propiedad creada con éxito");

        // Redirigir después de un retraso
        setTimeout(() => {
          router.push(`/pages/owner/update/${propertyId}`);
        }, 1000);
      } catch (error) {
        toast.error("Ocurrió un error");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-screen-sm gap-2 ">
      <header className="w-full space-y-4">
        <div className="w-full">
          <SliderCreateTemplate
            action={handleShowSliderModal}
            img={sliderImage[0]}
          />
        </div>
        <NavBarDetails />
      </header>
      <main
        className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow m-4 text-[#0D171C]`}
      >
        <TitleSectionTemplate
          name={name}
          setName={setName}
          address={address}
          setAdress={setAddress}
          action={handleShowAddressModal}
        />
        <PriceSection data={price} setData={setPrice} />
        <SizeAndCategorySection data={catAndSize} setData={setCatAndSize} />
        <div className="flex flex-col gap-6">
          <GuestInfoSectionTemplate data={guestInfo} setData={setGuestInfo} />
        </div>
        <DescriptionSectionTemplate
          action={handleShowDescriptionModal}
          data={description}
        />
        <RoomSectionTemplate
          data={dataRoom}
          setData={setRoomData}
          showModal={handleShowRoomEditModal}
          action={handleShowRoomEditModal}
        />
        <AmenitiesSectionTemplate data={amenities} setData={setAmenities} />
        <LocationSectionTemplate />
        <MoreInfoSectionTemplate
          data={moreInfo}
          setData={setMoreInfo}
          action={handleShowMoreInfoModal}
        />
        <SaveButton action={createProperty} />
      </main>
      {showDescriptionModal && (
        <DescriptionModal
          data={description}
          setData={setDescription}
          showModal={handleShowDescriptionModal}
        />
      )}
      {showSliderModal && (
        <SliderModal
          data={sliderImage}
          setData={setSliderImage}
          showModal={handleShowSliderModal}
        />
      )}
      {showRoomEditModal && (
        <RoomAddModal
          data={dataRoom}
          setData={setRoomData}
          showModal={handleShowRoomEditModal}
        />
      )}
      {showAddressModal && (
        <AddressModal
          data={address}
          setData={setAddress}
          showModal={handleShowAddressModal}
        />
      )}
    </div>
  );
}
