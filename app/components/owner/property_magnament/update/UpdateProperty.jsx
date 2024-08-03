import NavBarDetails from "@/app/components/property-details/header/NavBarDetails";
import SliderTemplate from "../create/header/SliderCreateTemplate";
import AmenitiesSectionTemplate from "../create/main/AmenitiesSectionTemplate";
import DescriptionSectionTemplate from "../create/main/DescriptionSectionTemplate";
import GuestInfoSectionTemplate from "../create/main/GuestInfoSectionTemplate";
import LocationSectionTemplate from "../create/main/LocationSectionTemplate";
import MoreInfoSectionTemplate from "../create/main/MoreInfoSectionTemplate";
import RoomSectionTemplate from "../create/main/RoomSectionTemplate";
import TitleSectionTemplate from "../create/main/TitleSectionTemplate";
import SaveButton from "../shared/SaveButton";
import { plus_jakarta } from "@/font";
import { useState } from "react";
import SliderUpdateTemplate from "./header/SliderUpdateTemplate";
import DescriptionModal from "../create/main/description_section/DescriptionModal";
import SliderModal from "../create/header/slider/SliderModal";
import AddressModal from "../create/main/address_modal/AddressModal";
import AmenitiesModalEdit from "../create/main/amenities_section/AmenitiesModalEdit";
import AmenitiesSection from "@/app/components/property-details/main/AmenitiesSection";
import EditButton from "../shared/EditButton";

export default function UpdateProperty() {
  const property = {
    name: "Jardines del eden",
    city: "Formosa",
    street: "Coronel bogado",
    streetNumber: 155,
    postalCode: 3600,
    size: "",
    bedrooms: null,
    bathrooms: null,
    bed: null,
    maximunOccupants: null,
    price: null,
    puntuation: [],
    isActive: false,
    isBussy: false,
    category: "",
    images: [
      "/property_details/nav_bar_details/slider/slider-stock-1.svg",
      "/property_details/nav_bar_details/slider/slider-stock-1.svg",
      "/property_details/nav_bar_details/slider/slider-stock-1.svg",
    ],
    facilities: ["wifi", "piscina", "estacionamiento"],
    roomImages: [
      "/owner/room/room-stock-1.jfif",
      "/owner/room/room-stock-2.png",
    ],
    description: [
      "2 Habitaciones dobles, con decoración sencilla y armoniosa.",
      "El tamaño es de unos 11 - 12 m2 aproximadamente. Cuentan con un armario para organizar todo tu equipaje.",
      "Queremos resaltar que la mayoría del mobiliario es totalmente nuevo a estrenar.",
    ],
  };

  const [name, setName] = useState(property.name);
  const [address, setAddress] = useState({
    city: property.city,
    street: property.street,
    streetNumber: property.streetNumber,
    postalCode: property.postalCode,
  });
  const [guestInfo, setGuestInfo] = useState({
    ocupants: "4",
    beds: "2",
    bathrooms: "2",
  });
  const [sliderImage, setSliderImage] = useState(property.images);
  const [description, setDescription] = useState(property.description);
  const [amenities, setAmenities] = useState(property.facilities);
  const [moreInfo, setMoreInfo] = useState({
    condicionDeRenta: "Informacion",
    habitacion: "Informacion",
    facturas: "Informacion",
    mantenimiento: "Informacion",
    sobreNosotros: "Informacion",
    normasDeConvivencia: "Informacion",
    checkIn: "Informacion",
    checkOut: "Informacion",
  });

  //modal
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);

  const handleShowDescriptionModal = () => {
    setShowDescriptionModal(!showDescriptionModal);
  };

  const handleShowSliderModal = () => {
    setShowSliderModal(!showSliderModal);
  };

  const handleShowAddressModal = () => {
    setShowAddressModal(!showAddressModal);
  };

  const handleShowAmenitiesModal = () => {
    setShowAmenitiesModal(!showAmenitiesModal);
  };

  const handleShowMoreInfoModal = () => {
    setShowMoreInfoModal(!showMoreInfoModal);
  };

  const handleDescriptionInfo = (data) => {
    setDescription(data);
    property.description = data;
  };

  const handleSliderImage = (data) => {
    setSliderImage(data);
    property.images = data;
  };

  const handleAdrressInfo = (data) => {
    setAddress(data);
    property.city = data.city;
    property.street = data.street;
    property.streetNumber = data.streetNumber;
    property.postalCode = data.postalCode;
  };

  const handleAmenitiesInfo = (data) => {
    setAmenities(data);
    property.facilities = data;
  };

  //validacion
  const handleSubmit = () => {
    // Combina todos los datos en un solo objeto
    const allData = {
      ...address,
      ...guestInfo,
      ...description,
      ...sliderImage,
      ...amenities,
      ...moreInfo, // assuming moreInfo is an array with one object
    };

    const validationResult = validateData(allData);

    if (!validationResult.isValid) {
      // Maneja el caso en el que los datos no son válidos
      console.log(validationResult.message);
      toast.error("No dejes datos incompletos");
    } else {
      // Maneja el caso en el que los datos son válidos
      console.log(allData);
      toast.success("Propiedad creada correctamente");
      // Aquí iría la lógica para enviar los datos
    }
  };

  return (
    <div className="flex flex-col max-w-screen-sm gap-2 ">
      <header className="w-full space-y-4">
        <div className="w-full">
          <SliderUpdateTemplate
            data={sliderImage}
            action={handleShowSliderModal}
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
        <div className="flex flex-col gap-6">
          <GuestInfoSectionTemplate data={guestInfo} setData={setGuestInfo} />
        </div>
        <DescriptionSectionTemplate
          data={description} // Actualiza aquí para usar el estado description
          action={handleShowDescriptionModal}
        />
        <RoomSectionTemplate data={property.roomImages} />
        <AmenitiesSection
          data={amenities}
          edit={<EditButton action={handleShowAmenitiesModal} />}
        />
        <LocationSectionTemplate data={"hola"} />
        <MoreInfoSectionTemplate
          data={moreInfo}
          setData={setMoreInfo}
          action={handleShowMoreInfoModal}
        />
        <SaveButton />
      </main>
      {showDescriptionModal && (
        <DescriptionModal
          data={description} // Pasa el estado description aquí
          setData={handleDescriptionInfo}
          showModal={handleShowDescriptionModal}
        />
      )}
      {showSliderModal && (
        <SliderModal
          data={sliderImage}
          setData={handleSliderImage}
          showModal={handleShowSliderModal}
        />
      )}
      {showAddressModal && (
        <AddressModal
          data={address}
          setData={handleAdrressInfo}
          showModal={handleShowAddressModal}
        />
      )}
      {showAmenitiesModal && (
        <AmenitiesModalEdit
          data={amenities}
          setData={handleAmenitiesInfo}
          showModal={handleShowAmenitiesModal}
        />
      )}
    </div>
  );
}
