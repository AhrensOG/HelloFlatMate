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
import { Suspense, useEffect, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import FinalModal from "../create/main/FinalModal";

export default function UpdateProperty({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  console.log(data);

  // Establecer valores predeterminados
  const [property, setProperty] = useState(data);
  const [name, setName] = useState(data.name);
  const [address, setAddress] = useState({
    city: data.city,
    street: data.street,
    streetNumber: data.streetNumber,
    postalCode: data.postalCode,
  });
  const [guestInfo, setGuestInfo] = useState({
    occupants: data.maximunOccupants,
    beds: data.bed,
    bathrooms: data.bathrooms,
  });
  const [sliderImage, setSliderImage] = useState(data.images);
  const [description, setDescription] = useState(data.description);
  const [amenities, setAmenities] = useState(data.amenities);
  const [moreInfo, setMoreInfo] = useState({
    condicionDeRenta: data.incomeConditionDescription || "Informacion",
    habitacion: data.roomDescription || "Informacion",
    facturas: data.billDescription || "Informacion",
    mantenimiento: data.maintenanceDescription || "Informacion",
    sobreNosotros: data.aboutUs || "Informacion",
    normasDeConvivencia: data.houseRules || "Informacion",
    checkIn: data.checkIn || "Informacion",
    checkOut: data.checkOut || "Informacion",
  });
  const [roomImages, setRoomImages] = useState(data.rooms);
  const [finalData, setFinalData] = useState({
    price: data.price || 0,
    size: data.size || 0,
    category: data.category || "",
  });

  //funcion para manejar la edicion de habitaciones
  const handleRoomUpdate = (updatedRoom) => {
    const updatedRooms = rooms.map((room) =>
      room.id === updatedRoom.id ? updatedRoom : room
    );
    setRooms(updatedRooms);
  };

  // Estado para modales
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [editRoomsModal, setEditRoomsModal] = useState(false);

  // useEffect(() => {
  //   console.log("Fetching property data...");
  //   axios
  //     .get(`/api/property?id=${id}`)
  //     .then((res) => {
  //       const data = res.data.property;
  //       // Asegúrate de que la estructura de res.data coincide con lo que esperas
  //       setProperty(data);
  //       setName(data.name || "");
  //       setAddress({
  //         city: data.city || "",
  //         street: data.street || "",
  //         streetNumber: data.streetNumber || "",
  //         postalCode: data.postalCode || "",
  //       });
  //       setSliderImage(data.images || []);
  //       setDescription(data.description || []);
  //       setAmenities(data.amenities || []);
  //       setGuestInfo({
  //         occupants: data.maximunOccupants || "1",
  //         beds: data.bed || "1",
  //         bathrooms: data.bathrooms || "1",
  //       });
  //       setFinalData({
  //         price: data.price || 0,
  //         size: data.size || 0,
  //         category: data.category || "",
  //       });
  //       setMoreInfo(
  //         data.moreInfo || {
  //           condicionDeRenta: "Informacion",
  //           habitacion: "Informacion",
  //           facturas: "Informacion",
  //           mantenimiento: "Informacion",
  //           sobreNosotros: "Informacion",
  //           normasDeConvivencia: "Informacion",
  //           checkIn: "Informacion",
  //           checkOut: "Informacion",
  //         }
  //       );
  //       setRoomImages(data.rooms);
  //       // Si es necesario, actualiza el estado con más datos
  //     })
  //     .catch((err) => console.error("Error fetching property data:", err));
  // }, []);
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
  const handleShowFinalModal = () => setShowFinalModal(!showFinalModal);

  const handleEditRoomsModal = () => setEditRoomsModal(!editRoomsModal);

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
      setProperty({ ...property, amenities: data });
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

  const updateProperty = async () => {
    console.log(finalData);

    if (handleSubmit()) {
      try {
        const response = await axios.put(`/api/property?id=${id}`, {
          name: name,
          city: address.city,
          street: address.street,
          streetNumber: parseInt(address.streetNumber),
          postalCode: address.postalCode,
          size: parseInt(finalData.size),
          roomsCount: property.roomsCount,
          bathrooms: parseInt(guestInfo.bathrooms),
          bed: parseInt(guestInfo.beds),
          maximunOccupants: parseInt(guestInfo.occupants),
          price: parseInt(finalData.price),
          puntuation: [],
          category: finalData.category,
          images: sliderImage,
          amenities: amenities,
          description: description,
          incomeConditionDescription: moreInfo.condicionDeRenta,
          maintanceDescription: moreInfo.mantenimiento,
          roomDescription: moreInfo.habitacion,
          billDescription: moreInfo.facturas,
          aboutUs: moreInfo.sobreNosotros,
          houseRules: moreInfo.normasDeConvivencia,
          checkIn: moreInfo.checkIn,
          checkOut: moreInfo.checkOut,
        });
        console.log("Property data updated successfully:", response.data);
        toast.success("Propiedad actualizada correctamente");
        router.push(`/pages/owner/update?id=${id}`);
      } catch (error) {
        console.error("Error updating property data:", error);
        toast.error("Error al actualizar la propiedad");
      }
    } else {
      toast.error("No dejes datos incompletos");
    }
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <RoomSectionTemplate
            data={roomImages}
            onEditRoom={handleRoomUpdate}
            setData={setRoomImages}
          />
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
          <SaveButton action={handleShowFinalModal} />
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
        {showFinalModal && (
          <FinalModal
            action={updateProperty}
            showModal={handleShowFinalModal}
            setData={setFinalData}
            data={finalData}
          />
        )}
      </div>
    </Suspense>
  );
}
