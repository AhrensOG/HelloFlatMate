import { useEffect, useState } from "react";
import axios from "axios";
import { uploadContractPDF } from "@/app/firebase/uploadFiles";

export default function CreateLeaseOrderModal({ data, onClose }) {
  const [propertiesData, setPropertiesData] = useState(data?.properties || []);
  const [usersData, setUsersData] = useState(data?.users || []);
  const [rentalItemsData, setRentalItemsData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  
  const [propertySearch, setPropertySearch] = useState("");
  const [document, setDocument] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState("");
  const [selectedRentalItem, setSelectedRentalItem] = useState("");
  
  // Estado para seleccionar la habitación
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Estado para coincidencias
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handlePropertySearchChange = (event) => {
    const value = event.target.value;
    setPropertySearch(value);
    const filtered = filterProperties(value);
    setFilteredProperties(filtered);

    // Cargar rentalItems correspondientes al seleccionar una propiedad
    if (filtered.length === 1) {
      setRentalItemsData(filtered[0].rentalItems || []);
      
      // Filtrar habitaciones según la categoría
      const rooms = filtered[0].rooms || [];
      const filteredRooms = rooms.filter(room => 
        filtered[0].category === "HELLO_COLIVING" || 
        filtered[0].category === "HELLO_ROOM"
      );
      setRoomsData(filteredRooms); // Guardar habitaciones filtradas
    } else {
      setRentalItemsData([]);
      setRoomsData([]); // Limpiar habitaciones si no hay coincidencias
    }
  };

  const handleUserChange = (event) => {
    const value = event.target.value;
    setUser(value);
    const filtered = filterUsers(value);
    setFilteredUsers(filtered);
  };

  const filterUsers = (value) => {
    if (!value) return data?.users || [];
    return data?.users.filter((user) =>
      user.email.toLowerCase().includes(value.toLowerCase())
    );
  };

  const filterProperties = (value) => {
    if (!value) return data?.properties || [];
    return data?.properties.filter((property) =>
      property.id === value ||
      property.name.toLowerCase().includes(value.toLowerCase()) ||
      property.serial.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleRentalItemChange = (event) => {
    const rentalItemId = event.target.value;
    const rentalItem = rentalItemsData.find(item => item.id === rentalItemId);
    
    setSelectedRentalItem(rentalItemId);

    if (rentalItem) {
      setStartDate(rentalItem.startDate);
      setEndDate(rentalItem.endDate);
    }
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value); // Guardar habitación seleccionada
  };

  useEffect(() => {
    setUsersData(data?.users || []);
    setPropertiesData(data?.properties || []);
  }, [data]);

  function calculateDurationInMonths(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();

    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;

    return yearDifference * 12 + monthDifference;
  }

  const createLeaseOrder = async () => {
    try {
      const res = await axios.post("/api/lease_order", {
        propertyId: propertySearch.id,
        date: new Date(),
        startDate: startDate,
        endDate: endDate,
        userId: user.id,
        ownerId: propertySearch.owner.id,
        duration: calculateDurationInMonths(startDate, endDate),
        roomId: selectedRoom.id || null, // Incluir el ID de la habitación seleccionada
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadedContract = async () => {
    try {
      const uploadedContract = await uploadContractPDF(document, user.name + " "+ user.lastName);
      const res = await axios.post("/api/contract", selectedRoom ? ({
        roomId: selectedRoom.id,
        userId: user.id,
        ownerId: propertySearch.owner.id,
        name: uploadedContract.name,
        url: uploadedContract.url,
      }):({
        propertyId: propertySearch.id,
        userId: user.id,
        ownerId: propertySearch.owner.id,
        name: uploadedContract.name,
        url: uploadedContract.url,
      }))
      console.log(res.data);
    }catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    await createLeaseOrder();
    await uploadedContract();
    clearForm();
    handleClose();
  };

  const clearForm = () => {
    setPropertySearch("");
    setDocument("");
    setStartDate("");
    setEndDate("");
    setUser("");
    setSelectedRentalItem("");
    setSelectedRoom("");
    setFilteredProperties([]);
    setFilteredUsers([]);
    setRentalItemsData([]);
    setRoomsData([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Buscar Propiedad y Subir Documento</h2>

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
          {/* Desplegable para mostrar coincidencias de propiedades */}
          {filteredProperties.length > 0 && (
            <ul className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
              {filteredProperties.map((property) => (
                <li
                  key={property.id}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setPropertySearch(property.name);
                    setFilteredProperties([]);
                    setRentalItemsData(property.rentalItems || []);
                    
                    // Filtrar habitaciones
                    const rooms = property.rooms || [];
                    const filteredRooms = rooms.filter(room =>
                      property.category === "HELLO_COLIVING" || 
                      property.category === "HELLO_ROOM"
                    );
                    setRoomsData(filteredRooms);
                  }}
                >
                  {property.name}
                </li>
              ))}
            </ul>
          )}
        </div>

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
                    {`${item.startDate} a ${item.endDate}`}
                  </option>
                ))}
              </>
            ) : (
              <option value="">No hay items de alquiler disponibles</option>
            )}
          </select>
        </div>

        {/* Select para elegir la habitación */}
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
                    {room.serial} {/* Muestra el serial de la habitación */}
                  </option>
                ))}
              </>
            ) : (
              <option value="">No hay habitaciones disponibles</option>
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
            value={user}
            onChange={handleUserChange}
            placeholder="Nombre o ID del usuario"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          {/* Desplegable para mostrar coincidencias de usuarios */}
          {filteredUsers.length > 0 && (
            <ul className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setUser(user.email);
                    setFilteredUsers([]);
                  }}
                >
                  {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input para subir documento */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subir Documento
          </label>
          <input
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={createLeaseOrder}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Crear Orden de Alquiler
          </button>

          <button
            onClick={clearForm}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Limpiar
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
