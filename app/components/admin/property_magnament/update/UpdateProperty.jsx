import NavBarDetails from "@/app/components/user/property-details/header/NavBarDetails";
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
import AmenitiesSection from "@/app/components/user/property-details/main/AmenitiesSection";
import EditButton from "../shared/EditButton";
import axios from "axios";
import { toast } from "sonner";
import validateData from "../create/validateData";
import { useRouter } from "next/navigation";
import RoomAddModal from "../create/main/room_section/RoomAddModal";
import PriceSection from "../create/main/PriceSection";
import SizeAndCategorySection from "../create/main/SizeAndCategorySection";
import SearchEmail from "../create/main/SearchEmail";

export default function UpdateProperty({ data = false, category, handleBack }) {
  console.log(data);

  const [property, setProperty] = useState(data ? data : null);

  const router = useRouter();

  const [owners, setOwners] = useState();
  //Email search
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  // Estados para los diferentes datos de la propiedad
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [guestInfo, setGuestInfo] = useState();
  const [sliderImage, setSliderImage] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [description, setDescription] = useState();
  const [amenities, setAmenities] = useState();
  const [moreInfo, setMoreInfo] = useState();
  const [dataRooms, setDataRooms] = useState();
  const [deleteRooms, setDeleteRooms] = useState([]);
  const [catAndSize, setCatAndSize] = useState();
  const [price, setPrice] = useState();

  // Estado para modales
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [editRoomsModal, setEditRoomsModal] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);

  //Asignacion de datos
  useEffect(() => {
    const fetchOwners = async () => {
      const res = await axios.get("/api/admin/user?role=OWNER");
      const ownerEmail = res.data.find(
        (owner) => (owner.id = property?.ownerId)
      );
      setSelectedEmail(ownerEmail?.email);
      setOwners(res.data);
      console.log(res.data);
    };
    if (property) {
      setName(property?.name || "");
      setDescription(property?.description || "");
      setSliderImage(property?.images || []);
      setGuestInfo({
        occupants: property?.maximunOccupants,
        beds: property?.bed,
        bathrooms: property?.bathrooms,
      });
      setAddress({
        city: property?.city,
        street: property?.street,
        streetNumber: property?.streetNumber,
        postalCode: property?.postalCode,
      });
      setAmenities(property?.amenities || []);
      setMoreInfo({
        condicionDeRenta: property?.incomeConditionDescription || "Informacion",
        habitacion: property?.roomDescription || "Informacion",
        facturas: property?.feeDescription || "Informacion",
        mantenimiento: property?.maintenanceDescription || "Informacion",
        sobreNosotros: property?.aboutUs || "Informacion",
        normasDeConvivencia: property?.houseRules || "Informacion",
        checkIn: property?.checkIn || "Informacion",
        checkOut: property?.checkOut || "Informacion",
      });
      setDataRooms(property?.roomsWithPrice || property?.rooms || []);
      setCatAndSize({
        category: category || "",
        size: property?.size || 0,
      });
      setPrice({
        price: property?.price || 0,
        amountOwner: property?.amountOwner || 0,
        amountHelloflatmate: property?.amountHelloflatmate || 0,
        offer: property?.offer || 0,
        IVA: property?.IVA || 0,
      });
    }
    fetchOwners();
  }, [property]);

  //funcion para manejar la edicion de habitaciones
  const handleRoomUpdate = (updatedRoom) => {
    const updatedRooms = rooms.map((room) =>
      room.id === updatedRoom.id ? updatedRoom : room
    );
    setRooms(updatedRooms);
  };

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

  const handleAddRoomModal = () => setShowAddRoom(!showAddRoom);

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
    const allData = {
      name: name,
      city: address.city,
      street: address.street,
      streetNumber: address.streetNumber,
      postalCode: address.postalCode,
      size: catAndSize.size,
      roomsCount: dataRooms.length,
      bathrooms: guestInfo.bathrooms,
      bed: guestInfo.beds,
      maximunOccupants: guestInfo.occupants,
      price: price.price,
      offer: price.offer,
      IVA: price.IVA,
      amountHelloflatmate: price.amountHelloflatmate,
      amountOwner: price.amountOwner,
      category: catAndSize.category,
      amenities: amenities,
      description: description,
      checkIn: moreInfo.checkIn,
      checkOut: moreInfo.checkOut,
      images: sliderImage.map((image) => image.url), // Asegúrate de tener URLs aquí
    };

    const validationResult = validateData(allData);

    if (!validationResult.isValid) {
      toast.error(validationResult.message);
      return false;
    }
    return true;
  };

  const updateProperty = async () => {
    if (handleSubmit()) {
      try {
        try {
          if (deleteRooms.length > 0) {
            await axios.delete(`/api/admin/room`, {
              data: {
                rooms: deleteRooms,
              },
            });
            setDeleteRooms([]);
            toast.success("Habitaciones eliminadas");
          }
        } catch (error) {
          toast.error("Error en la eliminación de habitaciones");
          throw error;
        }

        try {
          const newRooms = dataRooms.filter(
            (room) => !room.hasOwnProperty("id")
          );

          const roomsFormated = newRooms.map((room) => {
            return {
              ...room,
              propertyId: property?.id,
            };
          });
          console.log(roomsFormated);

          if (newRooms.length > 0) {
            const createdRooms = await axios.post(
              "/api/admin/room",
              roomsFormated
            );
            toast.success("Habitaciones creadas");
          }
        } catch (err) {
          toast.error("Error en la creación de habitaciones");
          throw err;
        }
        {
          console.log(dataRooms);
        }
        //UpdateRooms
        try {
          if (category === "HELLO_STUDIO" || category === "HELLO_LANDLORD") {
            const roomsUpdate = dataRooms.map((room) => {
              return {
                ...room,
                price: 0,
                amountOwner: 0,
                amountHelloflatmate: 0,
                IVA: 0,
                propertyId: property?.id,
              };
            });
            await axios.put("/api/admin/room", roomsUpdate);
            toast.success("Habitaciones actualizadas");
          }
        } catch (error) {
          toast.error("Error en la actualización de habitaciones");
          throw error;
        }

        //DATOS DE LA PROPIEDAD
        let updateDataProperty = {
          name: name,
          city: address.city,
          street: address.street,
          streetNumber: parseInt(address.streetNumber),
          postalCode: address.postalCode,
          size: parseInt(catAndSize.size),
          roomsCount: property.roomsCount,
          bathrooms: parseInt(guestInfo.bathrooms),
          bed: parseInt(guestInfo.beds),
          maximunOccupants: parseInt(guestInfo.occupants),
          puntuation: [],
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
          price: parseFloat(price.price),
          amountHelloflatmate: parseFloat(price.amountHelloflatmate) || 0,
          amountOwner:
            parseFloat(price.price) - parseFloat(price.amountHelloflatmate) ||
            0,
          offer: parseFloat(price.offer) || 0,
          IVA: parseFloat(price.IVA) || 0,
          ownerId: owners?.find((owner) => owner.email === selectedEmail)?.id,
        };

        console.log(owners, selectedEmail);

        const response = await axios.put(
          `/api/admin/property?id=${data.id}`,
          updateDataProperty
        );
        toast.success("Propiedad actualizada correctamente");
      } catch (error) {
        console.error("Error updating property data:", error);
        toast.error("Error al actualizar la propiedad");
      }
    } else {
      toast.error("No dejes datos incompletos");
    }
  };

  if (!data || !owners || !property) {
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
          <NavBarDetails link="/pages/admin/properties" callBack={handleBack} />
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow m-4 text-[#0D171C]`}
        >
          <TitleSectionTemplate
            name={name || ""}
            setName={setName}
            address={
              address || {
                street: property.street,
                streetNumber: property.streetNumber,
                postalCode: property.postalCode,
                city: property.city,
              }
            }
            setAddress={setAddress}
            action={handleShowAddressModal}
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-[1.37rem]">Dueño</h2>
            <SearchEmail
              owners={owners}
              onSelect={handleEmailSelect}
              email={selectedEmail || property.owner?.email || ""}
            />{" "}
          </div>
          {(category === "HELLO_STUDIO" || category === "HELLO_LANDLORD") && (
            <PriceSection data={price || property.price} setData={setPrice} />
          )}
          <SizeAndCategorySection
            data={
              catAndSize || { size: property.size, category: property.category }
            }
            setData={setCatAndSize}
          />
          <div className="flex flex-col gap-6">
            <GuestInfoSectionTemplate
              data={
                guestInfo || {
                  occupants: property.maximunOccupants,
                  beds: property.bed,
                  bathrooms: property.bathrooms,
                }
              }
              setData={setGuestInfo}
            />
          </div>
          <DescriptionSectionTemplate
            data={description || property.description}
            action={handleShowDescriptionModal}
          />
          <RoomSectionTemplate
            data={dataRooms || property.rooms}
            onEditRoom={handleRoomUpdate}
            setData={setDataRooms}
            action={handleAddRoomModal}
            deleteRooms={deleteRooms}
            setDeleteRooms={setDeleteRooms}
            category={category}
          />
          <AmenitiesSection
            data={amenities || property.amenities}
            edit={<EditButton action={handleShowAmenitiesModal} />}
          />
          <LocationSectionTemplate data={"hola"} />
          <MoreInfoSectionTemplate
            data={
              moreInfo || {
                condicionDeRenta:
                  property.incomeConditionDescription || "Informacion",
                habitacion: property.roomDescription || "Informacion",
                facturas: property.feeDescription || "Informacion",
                mantenimiento: property.maintenanceDescription || "Informacion",
                sobreNosotros: property.aboutUs || "Informacion",
                normasDeConvivencia: property.houseRules || "Informacion",
                checkIn: property.checkIn || "Informacion",
                checkOut: property.checkOut || "Informacion",
              }
            }
            setData={setMoreInfo}
            action={handleShowMoreInfoModal}
          />
          <SaveButton action={updateProperty} />
        </main>
        {showDescriptionModal && (
          <DescriptionModal
            data={description || property.description} // Pasa el estado description aquí
            setData={handleDescriptionInfo}
            showModal={handleShowDescriptionModal}
          />
        )}
        {showSliderModal && (
          <SliderModal
            initialImages={sliderImage}
            setNewImages={handleSliderImage}
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
        {showAddRoom && (
          <RoomAddModal
            data={dataRooms}
            setData={setDataRooms}
            showModal={handleAddRoomModal}
            propertyId={property.id}
            category={catAndSize.category || property.category}
          />
        )}
      </div>
    </Suspense>
  );
}
