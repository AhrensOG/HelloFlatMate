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
import MoreInfoModal from "./main/more_info_section/MoreInfoModal";
import { toast } from "sonner";
import validateData from "./validateData";
import axios from "axios";
import { error } from "pdf-lib";

export default function NewProperty() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
    streetNumber: null,
    postalCode: "",
  });
  const [guestInfo, setGuestInfo] = useState({
    occupants: "",
    beds: "",
    bathrooms: "",
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

  //modal
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
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

  const handleShowMoreInfoModal = () => {
    setShowMoreInfoModal(!showMoreInfoModal);
  };

  //validacion
  const handleSubmit = () => {
    const allData = {
      ...address,
      ...guestInfo,
      ...description,
      ...sliderImage,
      ...amenities,
      ...moreInfo,
    };

    console.log(allData);

    const validationResult = validateData(allData);

    if (!validationResult.isValid) {
      // Maneja el caso en el que los datos no son válidos
      return false;
    } else {
      // Maneja el caso en el que los datos son válidos
      return true;
    }
  };

  const property = {
    name: name,
    city: address.city,
    street: address.street,
    streetNumber: address.streetNumber,
    postalCode: address.postalCode,
    size: "60mt2",
    bedrooms: 5,
    bathrooms: parseInt(guestInfo.bathrooms),
    bed: parseInt(guestInfo.beds),
    maximunOccupants: parseInt(guestInfo.ocupants),
    price: 100,
    puntuation: [],
    isActive: true,
    isBussy: false,
    category: "HELLO_ROOM",
    images: sliderImage,
    amenities: amenities,
  };

  const createProperty = async () => {
    if (handleSubmit()) {
      try {
        const response = await axios.post("/api/property", property);
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    } else {
      toast.error("No dejes datos incompletos");
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
        <div className="flex flex-col gap-6">
          <GuestInfoSectionTemplate data={guestInfo} setData={setGuestInfo} />
        </div>
        <DescriptionSectionTemplate
          action={handleShowDescriptionModal}
          data={description}
        />
        <RoomSectionTemplate />
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
