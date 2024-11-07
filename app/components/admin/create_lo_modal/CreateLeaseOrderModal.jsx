import { useEffect, useState } from "react";
import axios from "axios";
import { uploadContractPDF } from "@/app/firebase/uploadFiles";

export default function CreateLeaseOrderModal({ data, onClose }) {
  const [propertiesData, setPropertiesData] = useState(data?.properties || []);
  const [usersData, setUsersData] = useState(data?.users || []);
  const [rentalItemsData, setRentalItemsData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);

  const [propertySearch, setPropertySearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(false); // Estado para la propiedad seleccionada
  const [document, setDocument] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [selectedRentalItem, setSelectedRentalItem] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [price, setPrice] = useState(0);

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handlePropertySearchChange = (event) => {
    const value = event.target.value;
    setPropertySearch(value);
    const filtered = filterProperties(value);
    setFilteredProperties(filtered);
  };

  const handleUserChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const filtered = filterUsers(value);
    setFilteredUsers(filtered);
    setUser(filtered[0]);
  };

  const filterUsers = (value) => {
    if (!value) return data?.users || [];
    return data?.users.filter((user) =>
      user.email.toLowerCase().includes(value.toLowerCase())
    );
  };

  const filterProperties = (value) => {
    if (!value) return data?.properties || [];

    return data?.properties.filter((property) => {
      const lowerCaseValue = value.toLowerCase();
      return (
        property.name.toLowerCase().includes(lowerCaseValue) ||
        property.serial.toLowerCase().includes(lowerCaseValue) // Asegúrate de que "serial" sea la propiedad correcta
      );
    });
  };

  const handleRentalItemChange = (event) => {
    const rentalItemId = event.target.value;

    const rentalItem = rentalItemsData.find((item) => item.id == rentalItemId);

    setSelectedRentalItem(rentalItemId);

    if (rentalItem) {
      setStartDate(rentalItem.rentalPeriod.startDate);
      setEndDate(rentalItem.rentalPeriod.endDate);
    }
  };

  const handleRoomChange = (event) => {
    const selectedRoomId = event.target.value;
    const room = roomsData.find((room) => room.id == selectedRoomId);

    setSelectedRoom(selectedRoomId);

    if (room) {
      setRentalItemsData(room.rentalItems || []);
      setPrice(room.price || 0);
    } else {
      setRentalItemsData([]);
    }
  };

  const handleSelectProperty = (property) => {
    setPropertySearch(property.name);
    setSelectedProperty(property); // Guardar la propiedad seleccionada
    setFilteredProperties([]);

    // Filtrar habitaciones
    const rooms = property.rooms || [];
    const filteredRooms = rooms.filter(
      (room) =>
        property.category === "HELLO_COLIVING" ||
        property.category === "HELLO_ROOM" ||
        property.category === "HELLO_LANDLORD"
    );
    setRoomsData(filteredRooms);
    if (property.category === "HELLO_STUDIO") {
      setRentalItemsData(property.rentalItems || []);
      setPrice(property.price || 0);
    } else {
      setRentalItemsData([]);
    }
  };

  useEffect(() => {
    setUsersData(data?.users || []);
    setPropertiesData(data?.properties || []);
  }, [data]);

  function formatDate(data) {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, "0"); // Asegura que el día tenga dos dígitos
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript van de 0 a 11, por eso se suma 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const createLeaseOrder = async () => {
    try {
      const leaseOrderData = {
        propertyId: selectedProperty.id, // Utiliza selectedProperty en lugar de propertySearch
        date: new Date(),
        startDate: startDate,
        endDate: endDate,
        itemRentalId: selectedRentalItem?.id || null,
        clientId: user.id,
        price: price,
        ownerId: selectedProperty.owner.id, // Utiliza selectedProperty para obtener el ownerId
        status: "APPROVED",
        isActive: true,
        isSigned: true,
      };

      // Si la propiedad no es de tipo HELLO_STUDIO, incluir roomId
      if (selectedProperty.category !== "HELLO_STUDIO" && selectedRoom) {
        leaseOrderData.roomId = selectedRoom;
      }

      const res = await axios.post("/api/lease_order/manualCreate", leaseOrderData);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadedContract = async () => {
    try {
      const uploadedContract = await uploadContractPDF(
        document,
        user.name + " " + user.lastName
      );
      const res = await axios.post(
        "/api/contract",
        selectedRoom
          ? {
              propertyId: selectedProperty.id, // Usa selectedProperty
              roomId: selectedRoom,
              clientId: user.id,
              ownerId: selectedProperty.owner.id, // Usa selectedProperty
              name: uploadedContract.name,
              url: uploadedContract.url,
            }
          : {
              propertyId: selectedProperty.id, // Usa selectedProperty
              clientId: user.id,
              ownerId: selectedProperty.owner.id,
              name: uploadedContract.name,
              url: uploadedContract.url,
            }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    await createLeaseOrder();
    // await uploadedContract();
  };

  const clearForm = () => {
    setPropertySearch("");
    setDocument("");
    setStartDate("");
    setEndDate("");
    setUser("");
    setSelectedRentalItem("");
    setSelectedRoom("");
    setSelectedProperty(null);
    setFilteredProperties([]);
    setFilteredUsers([]);
    setRentalItemsData([]);
    setRoomsData([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">
          Buscar Propiedad y Subir Documento
        </h2>

        {/* Input para buscar propiedades */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar Propiedad
          </label>
          <input
            type="text"
            value={propertySearch}
            onChange={handlePropertySearchChange}
            placeholder="Nombre o ID de la propiedad"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          {filteredProperties.length > 0 && (
            <ul className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
              {filteredProperties.map((property) => (
                <li
                  key={property.id}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                  onClick={() => handleSelectProperty(property)}
                >
                  {`${property.serial} - ${property.name}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Select para elegir la habitación */}
        {selectedProperty !== false &&
          selectedProperty?.category !== "HELLO_STUDIO" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seleccionar Habitación
              </label>
              <select
                value={selectedRoom}
                onChange={handleRoomChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              >
                {roomsData.length > 0 ? (
                  <>
                    <option value="">Seleccione una habitación</option>
                    {roomsData.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.serial}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="">No hay habitaciones disponibles</option>
                )}
              </select>
            </div>
          )}

        {/* Select para elegir Rental Item */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seleccionar Período de Alquiler
          </label>
          <select
            value={selectedRentalItem}
            onChange={handleRentalItemChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            {rentalItemsData.length > 0 ? (
              <>
                <option value="">Seleccione un ítem de alquiler</option>
                {rentalItemsData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {`${formatDate(item.rentalPeriod.startDate)} a ${formatDate(
                      item.rentalPeriod.endDate
                    )}`}
                  </option>
                ))}
              </>
            ) : (
              <option value="">No hay items de alquiler disponibles</option>
            )}
          </select>
        </div>

        {/* Input para buscar usuario */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar Usuario
          </label>
          <input
            type="text"
            value={email}
            onChange={handleUserChange}
            placeholder="Nombre o ID del usuario"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          {filteredUsers.length > 0 && (
            <ul className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setEmail(user.email);
                    setFilteredUsers([]);
                  }}
                >
                  {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input para el precio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ingrese el precio"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 number-input-no-appearance"
          />
        </div>

        {/* Input para subir el contrato */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subir Contrato (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setDocument(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div> */}

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600"
          >
            Crear Orden de Alquiler
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg shadow-sm hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
