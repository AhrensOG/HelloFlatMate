import NavBarDetails from "@/app/components/user/property-details/header/NavBarDetails";
import AmenitiesSectionTemplate from "./main/AmenitiesSectionTemplate";
import DescriptionSectionTemplate from "./main/DescriptionSectionTemplate";
import GuestInfoSectionTemplate from "./main/GuestInfoSectionTemplate";
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
import LocationSectionTemplate from "./main/LocationSectionTemplate";
import TypolyAndZoneSection from "./main/TypolyAndZoneSection";
import LinkVideoSection from "./main/LinkVideoSection";
import TagsSection from "./main/TagsSection";
import CalendarSection from "./main/CalendarSection";

const categoryData = {
  HELLO_ROOM: {
    condicionDeRenta: `La reserva

Cuando realizas la reserva de tu estudio, el importe pagado corresponde a tu primer mes de alquiler, según contrato.

Depósito

El día de tu llegada dejarás 300 € en depósito.

La devolución del depósito está 100% garantizada, siempre que se cumplan las condiciones del contrato.

Suministros

El día de tu llegada dejarás 200 € por persona en adelanto para los primeros 5 meses (electricidad, agua, gas). Se regularizará con las facturas reales de las compañías.

Wifi

El día de tu llegada debes entregar 80€ para los primeros 5 meses, es una tasa fija.

Tasa de la agencia

La tasa es de 380€ más iva (459'80€).

Limpieza check out

Junto a la renta del último mes de contrato se abonará la cantidad de 50€ en concepto de limpieza a fondo.

Ropa de cama

En las habitaciones no se incluye el textil: ropa de cama, almohadas ni toallas.
`,
    facturas: `Luz, agua e internet, no incluido. (*Ver condiciones de alquiler).

Seguro de hogar, incluido.

Gastos del edificio, incluidos.`,
    mantenimiento: `¿Ha dejado de funcionar algo? 

No te preocupes, avisa a nuestros agentes a través del grupo de WhatsApp y el personal de mantenimiento irá a solucionarlo.

Así de fácil.`,
    normasDeConvivencia: `No fiestas: Por tu seguridad, la nuestra y la buena convivencia con los vecinos, no está permitido hacer fiestas.

No mascotas: ¡Nos encantan! Pero lamentablemente no podríamos acogerlas a todas.

No se permite fumar.`,
    checkIn: `Check in

De lunes a viernes de 9 a 17 h.

Fuera de este horario podrás recoger las llaves en la consigna de nuestra oficina, sin coste adicional.

Si quieres que uno de nuestros agentes te entregue las llaves fuera del horario en el apartamento, tendrá un coste extra de 30 € hasta las 21 h. Después de las 21h consultar disponibilidad.

Check out

La salida de los inquilinos es antes de las 9 a.m. del día de check out que figura en el contrato.`,
    checkOut: `Disfruta de atención personalizada 365 días al año.

Durante el día podrás contactar con nuestros agentes encargados de hacer vuestra estancia cómoda y placentera.

Fuera de horario laboral (después de las 17h o durante los fines de semana) podéis contactarnos a nuestro teléfono de emergencia.

Más seguridad y más atención imposible.`,
    habitacion: "",
    sobreNosotros: "",
  },
  HELLO_LANDLORD: {
    condicionDeRenta: `La reserva

Cuando realizas la reserva de tu estudio, el importe pagado corresponde a tu primer mes de alquiler, según contrato.

Depósito

El día de tu llegada dejarás 300 € en depósito.

La devolución del depósito está 100% garantizada, siempre que se cumplan las condiciones del contrato.

Suministros

El día de tu llegada dejarás 200 € por persona en adelanto para los primeros 5 meses (electricidad, agua, gas). Se regularizará con las facturas reales de las compañías.

Wifi

El día de tu llegada debes entregar 80€ para los primeros 5 meses, es una tasa fija.

Tasa de la agencia

La tasa es de 380€ más iva (459'80€).

Limpieza check out

Junto a la renta del último mes de contrato se abonará la cantidad de 50€ en concepto de limpieza a fondo.

Ropa de cama

En las habitaciones no se incluye el textil: ropa de cama, almohadas ni toallas.`,
    facturas: `Luz, agua e internet, no incluido. (*Ver condiciones de alquiler).

Seguro de hogar, incluido.

Gastos del edificio, incluidos.`,
    mantenimiento: `El propietario tendrá obligación de pagar sin derecho a subir el alquiler las reparaciones que por ley le obligue.

El inquilino deberá de pagar las pequeñas reparaciones que por LEY obliga.

Mira este artículo sobre las responsabilidades del propietario y del inquilino:

https://www.elconfidencial.com/vivienda/2016-04-15/caseros-versus-inquilinos-quien-paga-que-en-caso-de-reparaciones-y-averias_1183478/`,
    normasDeConvivencia: `No fiestas: Por tu seguridad, la nuestra y la buena convivencia con los vecinos, no está permitido hacer fiestas.

No mascotas: ¡Nos encantan! Pero lamentablemente no podríamos acogerlas a todas.

No se permite fumar.`,
    checkIn: `Check in

De lunes a viernes de 9 a 17 h.

Fuera de este horario podrás recoger las llaves en la consigna de nuestra oficina, sin coste adicional.

Si quieres que uno de nuestros agentes te entregue las llaves fuera del horario en el apartamento, tendrá un coste extra de 30 € hasta las 21 h. Después de las 21h consultar disponibilidad.

Check out

La salida de los inquilinos es antes de las 9 a.m. del día de check out que figura en el contrato.`,
    checkOut: `Servicios que presta la agencia

    - Formalización de contrato entre inquilino y propietario.
    - Entrega de llaves.
    - Atención al inquilino en caso de conflicto con la propiedad.

Servicios que presta la propiedad

    - Atención al inquilino.
    - Informe de consumos (luz, agua, gas).
    - Mediación entre inquilinos en caso de conflicto.
    - Gestión de incidencias de mantenimiento.`,
    habitacion: "",
    sobreNosotros: "",
  },
  HELLO_COLIVING: {
    condicionDeRenta: `La reserva
    
Cuando realizas la reserva de tu estudio, el importe pagado corresponde a tu primer mes de alquiler, según contrato.

Depósito

El día de tu llegada dejarás 500 € en depósito.

La devolución del depósito está 100% garantizada, siempre que se cumplan las condiciones del contrato.

Suministros

El día de tu llegada dejarás 200 € por persona en adelanto para los primeros 5 meses (electricidad, agua, gas). Se regularizará con las facturas reales de las compañías.

Wifi

Incluido.

Tasa de la agencia

La tasa es de 380€ más iva (459'80€).

Limpieza check out

Junto a la renta del último mes de contrato se abonará la cantidad de 50€ en concepto de limpieza a fondo.

Ropa de cama

En las habitaciones se incluye el textil: ropa de cama, almohadas ni toallas.`,
    facturas: `Luz, agua, gas no incluido. (*Ver condiciones de alquiler).

Seguro de hogar, incluido.

Gastos del edificio, incluidos.`,
    mantenimiento: `¿Ha dejado de funcionar algo? 

No te preocupes, avisa a nuestros agentes a través del grupo de WhatsApp y el personal de mantenimiento irá a solucionarlo.

Así de fácil.`,
    normasDeConvivencia: `No fiestas: Por tu seguridad, la nuestra y la buena convivencia con los vecinos, no está permitido hacer fiestas.

No mascotas: ¡Nos encantan! Pero lamentablemente no podríamos acogerlas a todas.

No se permite fumar.`,
    checkIn: `Check in
    
De lunes a viernes de 9 a 17h. Fuera de este horario podrás recoger las llaves en la consigna de nuestra oficina, sin coste adicional.

Si quieres que uno de nuestros agentes te entregue las llaves fuera del horario en el apartamento, tendrá un coste extra de 30 € hasta las 21 h. Después de las 21h consultar disponibilidad.

Check out

La salida de los inquilinos es antes de las 9 a.m. del día de check out que figura en el contrato.
`,
    checkOut: `2 limpiezas semanales de zonas comunes.

Wifi incluido.

Disfruta de atención personalizada 365 días al año.

Durante el día podrás contactar con nuestros agentes encargados de hacer vuestra estancia cómoda y placentera.

Fuera de horario laboral (después de las 17h o durante los fines de semana) podéis contactarnos a nuestro teléfono de emergencia.

Más seguridad y más atención imposible.`,
    habitacion: "",
    sobreNosotros: "",
  },
  HELLO_STUDIO: {
    condicionDeRenta: `La reserva
    
Cuando realizas la reserva de tu estudio, el importe pagado corresponde a tu primer mes de alquiler, según contrato.

Depósito

El día de tu llegada dejarás 500 € en depósito.

La devolución del depósito está 100% garantizada, siempre que se cumplan las condiciones del contrato.

Suministros

El día de tu llegada dejarás 200 € por persona en adelanto para los primeros 5 meses (electricidad, agua, gas). Se regularizará con las facturas reales de las compañías.

Wifi

Incluido.

Tasa de la agencia: La tasa es de 380€ más iva (459'80€).

Limpieza check out

Junto a la renta del último mes de contrato se abonará la cantidad de 50€ en concepto de limpieza a fondo.

Ropa de cama

En las habitaciones se incluye el textil: ropa de cama, almohada y toallas.`,
    facturas: `Luz, agua, gas no incluido. (*Ver condiciones de alquiler).

Seguro de hogar, incluido.

Gastos del edificio, incluidos.`,
    mantenimiento: `¿Ha dejado de funcionar algo? 

No te preocupes, avisa a nuestros agentes a través del grupo de WhatsApp y el personal de mantenimiento irá a solucionarlo.

Así de fácil.`,
    normasDeConvivencia: `No fiestas: Por tu seguridad, la nuestra y la buena convivencia con los vecinos, no está permitido hacer fiestas.

No mascotas: ¡Nos encantan! Pero lamentablemente no podríamos acogerlas a todas.

No se permite fumar.`,
    checkIn: `Check in
    
De lunes a viernes de 9 a 17h. Fuera de este horario podrás recoger las llaves en la consigna de nuestra oficina, sin coste adicional.

Si quieres que uno de nuestros agentes te entregue las llaves fuera del horario en el apartamento, tendrá un coste extra de 30 € hasta las 21 h. Después de las 21h consultar disponibilidad.

Check out

La salida de los inquilinos es antes de las 9 a.m. del día de check out que figura en el contrato.
`,
    checkOut: `2 limpiezas semanales de zonas comunes.

Wifi incluido.

Disfruta de atención personalizada 365 días al año.

Durante el día podrás contactar con nuestros agentes encargados de hacer vuestra estancia cómoda y placentera.

Fuera de horario laboral (después de las 17h o durante los fines de semana) podéis contactarnos a nuestro teléfono de emergencia.

Más seguridad y más atención imposible.`,
    habitacion: "",
    sobreNosotros: "",
  },
};

const getMoreInfoByCategory = (category) => {
  return (
    categoryData[category] || {
      condicionDeRenta: "",
      habitacion: "",
      facturas: "",
      mantenimiento: "",
      sobreNosotros: "",
      normasDeConvivencia: "",
      checkIn: "",
      checkOut: "",
    }
  );
};

export default function NewProperty({ category, handleBack }) {
  const router = useRouter();

  const [owners, setOwners] = useState();

  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
    streetNumber: null,
    postalCode: "",
    floor: null,
    door: "",
  });
  const [guestInfo, setGuestInfo] = useState({
    occupants: null,
    beds: null,
    bathrooms: null,
  });
  const [description, setDescription] = useState([]);
  const [sliderImage, setSliderImage] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [moreInfo, setMoreInfo] = useState(getMoreInfoByCategory(category));
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
  const [predefineRentalPeriod, setPredefineRentalPeriod] = useState([]);
  const [serial, setSerial] = useState("");
  const [typologyAndZone, setTypologyAndZone] = useState({
    typology: "MIXED",
    zone: "",
  });
  const [calendarType, setCalendarType] = useState("SIMPLE");
  const [linkVideo, setLinkVideo] = useState("");
  const [tags, setTags] = useState("");

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
    let rooms;
    if (data[0]?.amountOwner || data[0]?.amountHelloflatmate) {
      rooms = data.map((room) => ({
        name: room?.name || null,
        floor: parseInt(room?.floor) || null,
        door: room?.door || null,
        images: room?.images || null,
        numberBeds: parseInt(room?.numberBeds) || null,
        couple: room?.couple || null,
        bathroom: room?.bathroom || null,
        serial: room?.serial || null,
        price: parseInt(room?.price || 0),
        amountOwner:
          parseInt(room?.price) - parseInt(room?.amountHelloflatmate) || 0,
        amountHelloflatmate: parseInt(room?.amountHelloflatmate) || 0,
        IVA: parseInt(room?.IVA) || 0,
        rentalPeriods: room?.rentalPeriods || null,
        description: room?.description || null,
        typology: room?.typology || "MIXED",
        tags: room?.tags || [],
        linkVideo: room?.linkVideo || null,
        calendar: room?.calendar || "SIMPLE",
      }));
    } else {
      rooms = data.map((room) => ({
        name: room?.name || null,
        images: room?.images || null,
        numberBeds: parseInt(room?.numberBeds || 0),
        couple: room?.couple || null,
        bathroom: room?.bathroom || null,
        serial: room?.serial || null,
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
      throw error;
    }
  };

  let property = {
    name: name || null,
    serial: serial || null,
    city: address.city || null,
    street: address.street || null,
    streetNumber: address.streetNumber || null,
    postalCode: address.postalCode || null,
    floor: address.floor || null,
    door: address.door || null,
    size: parseInt(catAndSize.size) || null,
    roomsCount: dataRoom.length || null,
    bathrooms: parseInt(guestInfo.bathrooms) || null,
    bed: parseInt(guestInfo.beds) || null,
    maximunOccupants: parseInt(guestInfo.occupants) || null,
    amountHelloflatmate: parseInt(price.amountHelloflatmate) || 0,
    amountOwner: parseInt(price.amountOwner) || 0,
    puntuation: [],
    category: catAndSize.category || null,
    amenities: amenities || null,
    description: description || null,
    incomeConditionDescription: moreInfo.condicionDeRenta || null,
    maintenanceDescription: moreInfo.mantenimiento || null,
    roomDescription: moreInfo.habitacion || null,
    feeDescription: moreInfo.facturas || null,
    aboutUs: moreInfo.sobreNosotros || null,
    houseRules: moreInfo.normasDeConvivencia || null,
    checkIn: moreInfo.checkIn || null,
    checkOut: moreInfo.checkOut || null,
    price: parseFloat(price.price) || 0,
    amountHelloflatmate: parseFloat(price.amountHelloflatmate) || 0,
    amountOwner:
      parseFloat(price.price) - parseFloat(price.amountHelloflatmate) || 0,
    offer: parseFloat(price.offer) || 0,
    IVA: parseFloat(price.IVA) || 0,
    ownerId: owners?.find((owner) => owner.email === selectedEmail)?.id || null,
    rentalPeriods: rentalPeriods.newRentalPeriods || null,
    typology: typologyAndZone.typology || null,
    zone: typologyAndZone.zone || null,
    linkVideo: linkVideo || null,
    tags: [tags],
    calendar: calendarType || "SIMPLE",
  };

  const createProperty = async () => {
    try {
      //Guardar Imagenes
      const imagesList = await saveImages(sliderImage);
      property.images = imagesList;

      //Crear habitaciones
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
        router.push(`/pages/admin/update/${propertyId}/${catAndSize.category}`);
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Ocurrió un error");
      throw error;
    }
  };

  useEffect(() => {
    const fetchOwners = async () => {
      const res = await axios.get("/api/admin/user?role=OWNER");
      setOwners(res.data);
    };
    const fetchRentalPeriods = async () => {
      const res = await axios.get("/api/admin/rental_period");
      console.log(res.data);
      
      setPredefineRentalPeriod(res.data.rentalPeriods);
    }
    fetchOwners();
    fetchRentalPeriods();
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
      {/* MOBILE */}
      <div className="flex flex-col w-full md:hidden gap-2 p-2">
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
            <label className="font-bold text-[1.2rem]" htmlFor="serial">
              Código
            </label>
            <input
              type="text"
              id="serial"
              name="serial"
              value={serial || ""}
              placeholder="HH-1"
              onChange={(event) => setSerial(event.target.value)}
              className="border rounded px-2 py-1 w-full appariance-none outline-none break-words"
            />
          </div>
          <TypolyAndZoneSection
            data={typologyAndZone}
            setData={setTypologyAndZone}
            category={category}
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-[1.2rem]">Propietario</h2>
            <SearchEmail owners={owners} onSelect={handleEmailSelect} />{" "}
          </div>
          {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD" && (
            <TagsSection data={tags} setData={setTags} />
          )}
          {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD" && (
            <PriceSection data={price} setData={setPrice} />
          )}
          <SizeAndCategorySection data={catAndSize} setData={setCatAndSize} />
          {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD" && (
            <LinkVideoSection data={linkVideo} setData={setLinkVideo} />
          )}
          <div className="flex flex-col gap-6">
            <GuestInfoSectionTemplate data={guestInfo} setData={setGuestInfo} />
          </div>
          {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD"  && (
            <CalendarSection
              data={calendarType}
              setData={setCalendarType}
              category={category}
            />
          )}
          {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD"  && (
            <RentalPeriodTemplate
              data={rentalPeriods}
              setData={setRentalPeriods}
              predefineRental={predefineRentalPeriod}
            />
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
          <SaveButton
            action={() => {
              toast.promise(createProperty(), {
                loading: "Creando propiedad",
                success: "Propiedad creada",
                error: "Ocurrio un error",
              });
            }}
          />
        </main>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex flex-col w-full gap-2 p-4">
        <header className="w-full space-y-4">
          <NavBarDetails callBack={handleBack} />
        </header>
        <main
          className={`${plus_jakarta.className} flex flex-row gap-10 grow text-[#0D171C]`}
        >
          {/* LEFT SIDE */}
          <div className="space-y-10 flex-1">
            <ImageUploader setImages={setSliderImage} images={sliderImage} />
            <RoomSectionTemplate
              data={dataRoom}
              setData={setRoomData}
              showModal={handleShowRoomEditModal}
              action={handleShowRoomEditModal}
              category={category}
            />
            {/* <LocationSectionTemplate /> */}
            <AmenitiesSectionTemplate data={amenities} setData={setAmenities} />
            <MoreInfoSectionTemplate
              data={moreInfo}
              setData={setMoreInfo}
              action={handleShowMoreInfoModal}
            />
          </div>
          <div className="border" />
          {/* RIGHT SIDE */}
          <div className="space-y-10 flex-1">
            <TitleSectionTemplate
              name={name}
              setName={setName}
              address={address}
              setAdress={setAddress}
              action={handleShowAddressModal}
            />
            {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD" && (
              <TagsSection data={tags} setData={setTags} />
            )}
            <div>
              <label className="font-bold text-[1.2rem]" htmlFor="serial">
                Código
              </label>
              <input
                type="text"
                id="serial"
                name="serial"
                value={serial || ""}
                placeholder="HH-1"
                onChange={(event) => setSerial(event.target.value)}
                className="border rounded px-2 py-1 w-full appariance-none outline-none break-words"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-[1.2rem]">Propietario</h2>
              <SearchEmail owners={owners} onSelect={handleEmailSelect} />{" "}
            </div>
            {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD" && (
              <PriceSection data={price} setData={setPrice} />
            )}
            {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD" && (
              <LinkVideoSection data={linkVideo} setData={setLinkVideo} />
            )}
            <div className="flex flex-col gap-6">
              <GuestInfoSectionTemplate
                data={guestInfo}
                setData={setGuestInfo}
              />
            </div>
            {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD" && (
              <CalendarSection
                data={calendarType}
                setData={setCalendarType}
                category={category}
              />
            )}
            <DescriptionSectionTemplate
              action={handleShowDescriptionModal}
              data={description}
            />

            <TypolyAndZoneSection
              data={typologyAndZone}
              setData={setTypologyAndZone}
              category={category}
            />
            <SizeAndCategorySection data={catAndSize} setData={setCatAndSize} />
            {category !== "HELLO_ROOM" && category !== "HELLO_COLIVING" && category !== "HELLO_LANDLORD" && (
              <RentalPeriodTemplate
                data={rentalPeriods}
                setData={setRentalPeriods}
                predefineRental={predefineRentalPeriod}
              />
            )}
            <SaveButton
              action={() => {
                toast.promise(createProperty(), {
                  loading: "Creando propiedad",
                  success: "Propiedad creada",
                  error: "Ocurrio un error",
                });
              }}
            />
          </div>
        </main>
      </div>
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
          category={category}
        />
      )}
    </div>
  );
}
