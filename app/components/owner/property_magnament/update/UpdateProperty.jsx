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
import { useEffect, useState } from "react";
import SliderUpdateTemplate from "./header/SliderUpdateTemplate";
import DescriptionModal from "../create/main/description_section/DescriptionModal";
import SliderModal from "../create/header/slider/SliderModal";
import AddressModal from "../create/main/address_modal/AddressModal";
import AmenitiesModalEdit from "../create/main/amenities_section/AmenitiesModalEdit";
import AmenitiesSection from "@/app/components/property-details/main/AmenitiesSection";
import EditButton from "../shared/EditButton";
import axios from "axios";
import { toast } from "sonner";
import validateData from "../create/validateData";
import { useRouter } from "next/navigation";

export default function UpdateProperty() {
  const router = useRouter();
  // Establecer valores predeterminados
  const [property, setProperty] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
    streetNumber: "",
    postalCode: "",
  });
  const [guestInfo, setGuestInfo] = useState({
    ocupants: "1",
    beds: "1",
    bathrooms: "1",
  });
  const [sliderImage, setSliderImage] = useState([]);
  const [description, setDescription] = useState(["12", "12", "222"]);
  const [amenities, setAmenities] = useState([]);
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
  const [roomImages, setRoomImages] = useState([
    "/owner/room/room-stock-1.jfif",
    "/owner/room/room-stock-2.png",
  ]);

  // Estado para modales
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);

  useEffect(() => {
    console.log("Fetching property data...");
    axios
      .get(`/api/property?id=16`)
      .then((res) => {
        console.log("Data fetched successfully:", res.data);
        setProperty(res.data);
        setName(res.data.name || "");
        setAddress({
          city: res.data.city || "",
          street: res.data.street || "",
          streetNumber: res.data.streetNumber || "",
          postalCode: res.data.postalCode || "",
        });
        setSliderImage(res.data.images || []);
        setDescription(res.data.description || []);
        setAmenities(res.data.amenities || []);
        setGuestInfo({
          ocupants: res.data.maximunOccupants || "",
          beds: res.data.bed || "",
          bathrooms: res.data.bathrooms || "",
        });
        // Actualizar moreInfo si hay datos disponibles
        // setMoreInfo(res.data.moreInfo || {});
      })
      .catch((err) => console.error("Error fetching property data:", err));
  }, []);

  // Manejadores de modales
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
  };

  const handleSliderImage = (data) => {
    setSliderImage(data);
    if (property) {
      setProperty({ ...property, images: data });
    }
  };

  const handleAddressInfo = (data) => {
    setAddress(data);
    if (property) {
      setProperty({
        ...property,
        city: data.city,
        street: data.street,
        streetNumber: data.streetNumber,
        postalCode: data.postalCode,
      });
    }
  };

  const handleAmenitiesInfo = (data) => {
    setAmenities(data);
    if (property) {
      setProperty({ ...property, facilities: data });
    }
  };

  // Validación
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
      return false;
    } else {
      return true;
    }
  };

  const updateProperty = () => {
    console.log(property);

    if (handleSubmit()) {
      axios
        .put(`/api/property?id=16`, {
          id: 16,
          name: "Apartment Beatifull",
          city: "New York",
          street: address.street,
          streetNumber: parseInt(address.streetNumber),
          postalCode: address.postalCode,
          size: "95 mt2",
          bedrooms: 2,
          bathrooms: parseInt(guestInfo.bathrooms),
          bed: parseInt(guestInfo.beds),
          maximunOccupants: parseInt(guestInfo.ocupants),
          price: 200,
          puntuation: [],
          category: "HELLO_ROOM",
          images: [
            "https://th.bing.com/th/id/OIP.wJLz7YmzEq7__L9ccwr_WQHaE8?rs=1&pid=ImgDetMain",
            "https://th.bing.com/th/id/OIP.wJLz7YmzEq7__L9ccwr_WQHaE8?rs=1&pid=ImgDetMain",
          ],
          amenities: amenities,
        })
        .then((res) => {
          console.log("Property data updated successfully:", res.data);
          toast.success("Propiedad actualizada correctamente");
          router.push("/pages/owner/update");
        })
        .catch((err) => {
          console.error("Error updating property data:", err);
          toast.error("Error al actualizar la propiedad");
        });
    } else {
      toast.error("No dejes datos incompletos");
    }
  };

  if (!property) {
    return <h1></h1>;
  }

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
          setAddress={setAddress}
          action={handleShowAddressModal}
        />
        <div className="flex flex-col gap-6">
          <GuestInfoSectionTemplate data={guestInfo} setData={setGuestInfo} />
        </div>
        <DescriptionSectionTemplate
          data={description} // Actualiza aquí para usar el estado description
          action={handleShowDescriptionModal}
        />
        <RoomSectionTemplate data={roomImages} />
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
        <SaveButton action={updateProperty} />
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
          setData={handleAddressInfo}
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
