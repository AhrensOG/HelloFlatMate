import NavBarDetails from "@/app/components/user/property-details/header/NavBarDetails";
import AmenitiesSectionTemplate from "./main/AmenitiesSectionTemplate";
import DescriptionSectionTemplate from "./main/DescriptionSectionTemplate";
import GuestInfoSectionTemplate from "./main/GuestInfoSectionTemplate";
import LocationSectionTemplate from "./main/LocationSectionTemplate";
import MoreInfoSectionTemplate from "./main/MoreInfoSectionTemplate";
import RoomSectionTemplate from "./main/RoomSectionTemplate";
import SaveButton from "../shared/SaveButton";
import { plus_jakarta } from "@/font";
import { useEffect, useState } from "react";
import TitleSectionTemplate from "./main/TitleSectionTemplate";
import DescriptionModal from "./main/description_section/DescriptionModal";
import AddressModal from "./main/address_modal/AddressModal";
import { toast } from "sonner";
import validateData from "./validateData";
import axios from "axios";
import RoomAddModal from "./main/room_section/RoomAddModal";
import { useRouter } from "next/navigation";
import ImageUploader from "@/app/components/admin/drag-and-drop/ImageUploader";
import SizeAndCategorySection from "./main/SizeAndCategorySection";
import PriceSection from "./main/PriceSection";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import SearchEmail from "./main/SearchEmail";
import RentalPeriodTemplate from "./main/RentalPeriodTemplate";

export default function NewProperty({ category, handleBack }) {
  console.log(category);

  const router = useRouter();

  const [owners, setOwners] = useState();

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
  const [amenities, setAmenities] = useState([]);
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
  const [catAndSize, setCatAndSize] = useState({
    category: category,
    size: null,
  });
  const [dataRoom, setDataRoom] = useState([]);
  const [price, setPrice] = useState({
    price: 0,
    amountOwner: 0,
    amountHelloflatmate: 0,
    offer: 0,
    IVA: 0,
  });
  const [rentalPeriods, setRentalPeriods] = useState([]);
  const [serial, setSerial] = useState("");

  const setRoomData = (data) => {
    setDataRoom(data);
  };
  //Email search
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
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
      name: name,
      city: address.city,
      street: address.street,
      streetNumber: address.streetNumber,
      postalCode: address.postalCode,
      size: catAndSize.size,
      roomsCount: dataRoom.length,
      bathrooms: guestInfo.bathrooms,
      bed: guestInfo.beds,
      maximunOccupants: guestInfo.occupants,
      price: price.price,
      amountHelloflatmate: price.amountHelloflatmate,
      amountOwner: price.amountOwner,
      category: catAndSize.category,
      amenities: amenities,
      description: description,
      checkIn: moreInfo.checkIn,
      checkOut: moreInfo.checkOut,
      images: sliderImage.map((image) => image.url), // Asegúrate de tener URLs aquí
      offer: price.offer,
      IVA: price.IVA,
    };

    const validationResult = validateData(allData);

    if (!validationResult.isValid) {
      toast.error(validationResult.message);
      return false;
    }
    return true;
  };

  const saveImages = async (images) => {
    if (images.length > 0) {
      const prevImages = images.map((image) => image.fileData);
      try {
        const response = await uploadFiles(prevImages);
        if (response instanceof Error) {
          toast.error("Error al cargar archivos");
          return;
        } else {
          const imagesUrl = response.map((file) => file.url);
          toast.success("Imagenes cargadas correctamente");
          return imagesUrl;
        }
      } catch (error) {
        toast.error("Error al cargar archivos");
      }
    }
  };

  const submitRoom = async (data) => {
    console.log(data);

    let rooms;
    if (data[0].amountOwner || data[0].amountHelloflatmate) {
      rooms = data.map((room) => ({
        name: room.name,
        images: room.images,
        numberBeds: parseInt(room.numberBeds),
        couple: room.couple,
        bathroom: room.bathroom,
        serial: room.serial,
        price: parseInt(room.price),
        amountOwner: parseInt(room.price) - parseInt(room.amountHelloflatmate),
        amountHelloflatmate: parseInt(room.amountHelloflatmate),
        IVA: parseInt(room.IVA),
        rentalPeriod: room.rentalPeriod,
        description: room.description,
      }));
    } else {
      rooms = data.map((room) => ({
        name: room.name,
        images: room.images,
        numberBeds: parseInt(room.numberBeds),
        couple: room.couple,
        bathroom: room.bathroom,
        serial: room.serial,
      }));
    }

    try {
      const response = await axios.post("/api/admin/room", rooms); // Cambia rooms por response para evitar la redeclaración
      toast.success("Habitación/es creada/s con éxito");
      return response; // Devuelve el response si todo va bien
    } catch (error) {
      toast.error("Error en la creación de habitaciones");
      throw error; // Propaga el error para que se capture en el catch externo
    }
  };
  const setProperty = (data, id) => {
    console.log(data, id);

    const ids = data.map((room) => room.id);
    try {
      const response = axios.patch(`/api/admin/room`, {
        ids: ids,
        propertyId: id,
      });
      if (response) {
        toast.success("Habitación/es asignada/s con exito");

        return response.data;
      }
      toast.error("Error en la asignacion de la habitaciones");
    } catch (error) {
      toast.error("Error en la creación de habitaciones");
    }
  };

  let property = {
    name: name,
    serial: serial,
    city: address.city,
    street: address.street,
    streetNumber: address.streetNumber,
    postalCode: address.postalCode,
    size: parseInt(catAndSize.size),
    roomsCount: dataRoom.length,
    bathrooms: parseInt(guestInfo.bathrooms),
    bed: parseInt(guestInfo.beds),
    maximunOccupants: parseInt(guestInfo.occupants),
    amountHelloflatmate: parseInt(price.amountHelloflatmate),
    amountOwner: parseInt(price.amountOwner),
    puntuation: [],
    category: catAndSize.category,
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
    price: parseFloat(price.price) || 0,
    amountHelloflatmate: parseFloat(price.amountHelloflatmate) || 0,
    amountOwner:
      parseFloat(price.price) - parseFloat(price.amountHelloflatmate) || 0,
    offer: parseFloat(price.offer) || 0,
    IVA: parseFloat(price.IVA) || 0,
    ownerId: owners?.find((owner) => owner.email === selectedEmail)?.id,
    rentalPeriod: rentalPeriods,
  };

  const createProperty = async () => {
    if (handleSubmit()) {
      try {
        //Guardar Imagenes
        const imagesList = await saveImages(sliderImage);
        property.images = imagesList;

        //Crear habitaciones
        console.log(dataRoom);

        const rooms = await submitRoom(dataRoom);

        // Crear propiedad
        const propertyResponse = await axios.post(
          "/api/admin/property",
          property
        );
        const propertyId = propertyResponse.data.property.id;

        // Asignar habitaciones
        const roomsResponse = await setProperty(rooms.data, propertyId);

        // Redirigir después de un retraso
        setTimeout(() => {
          router.push(
            `/pages/admin/update/${propertyId}/${catAndSize.category}`
          );
        }, 1000);
      } catch (error) {
        toast.error("Ocurrió un error");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchOwners = async () => {
      const res = await axios.get("/api/admin/user?role=OWNER");
      setOwners(res.data);
    };
    fetchOwners();
  }, []);

  if (!owners) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-screen-sm gap-2 p-1">
        <header className="w-full space-y-4">
          <ImageUploader setImages={setSliderImage} images={sliderImage} />
          <NavBarDetails callBack={handleBack} />
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-col gap-[2.5rem] grow text-[#0D171C]`}
        >
          <TitleSectionTemplate
            name={name}
            setName={setName}
            address={address}
            setAdress={setAddress}
            action={handleShowAddressModal}
          />

          <div>
            <label className="block text-sm mb-1" htmlFor="serial">
              Código
            </label>
            <input
              type="text"
              id="serial"
              name="serial"
              value={serial || ""}
              onChange={(event) => setSerial(event.target.value)}
              className="appearance-none outline-none w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-[1.37rem]">Propietario</h2>
            <SearchEmail owners={owners} onSelect={handleEmailSelect} />{" "}
          </div>
          {category === "HELLO_ROOM" || category === "HELLO_COLIVING" ? (
            ""
          ) : (
            <PriceSection data={price} setData={setPrice} />
          )}
          <SizeAndCategorySection data={catAndSize} setData={setCatAndSize} />
          <div className="flex flex-col gap-6">
            <GuestInfoSectionTemplate data={guestInfo} setData={setGuestInfo} />
          </div>
          {category === "HELLO_STUDIO" || category === "HELLO_LANDLORD" ? (
            <RentalPeriodTemplate
              data={rentalPeriods}
              setData={setRentalPeriods}
            />
          ) : (
            ""
          )}
          <DescriptionSectionTemplate
            action={handleShowDescriptionModal}
            data={description}
          />
          <RoomSectionTemplate
            data={dataRoom}
            setData={setRoomData}
            showModal={handleShowRoomEditModal}
            action={handleShowRoomEditModal}
            category={category}
          />
          <AmenitiesSectionTemplate data={amenities} setData={setAmenities} />
          {/* <LocationSectionTemplate /> */}
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
        {showRoomEditModal && (
          <RoomAddModal
            data={dataRoom}
            setData={setRoomData}
            showModal={handleShowRoomEditModal}
            category={catAndSize.category}
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
    </div>
  );
}
