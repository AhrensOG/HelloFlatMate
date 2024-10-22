import { useState } from "react";

export default function CreateLeaseOrderModal({data}) {
  console.log(data);
  
  const [propertiesData, setPropertiesData] = useState(data?.properties || []);
  const [usersData, setUsersData] = useState(data?.users || []);
  const [rentalItemsData, setRentalItemsData] = useState([]);
  
  const [propertySearch, setPropertySearch] = useState("");
  const [rentalPeriod, setRentalPeriod] = useState("");
  const [document, setDocument] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState("");
  const [selectedRentalItem, setSelectedRentalItem] = useState("");
  
  const handlePropertySearchChange = (event) => {
    setPropertySearch(event.target.value);
    const filteredProperties = filterProperties(event);
    setPropertiesData(filteredProperties);

    // Al seleccionar una propiedad, también se deben cargar los rentalItems correspondientes
    if (filteredProperties.length === 1) {
      setRentalItemsData(filteredProperties[0].rentalItems || []);
    } else {
      setRentalItemsData([]);
    }
  };

  const handleRentalItemChange = (event) => {
    const rentalItemId = event.target.value;
    const rentalItem = rentalItemsData.find(item => item.id === rentalItemId);
    
    setSelectedRentalItem(rentalItemId);

    // Establece las fechas de inicio y final del ítem seleccionado
    if (rentalItem) {
      setStartDate(rentalItem.startDate);
      setEndDate(rentalItem.endDate);
    }
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };


  //FILTERS
  const filterUsers = (event) => {
    let usersFiltered
    if(event.target.value !== "" || event.target.value !== null || event.target.value !== undefined || event.target.value.trim() !== ""){
      usersFiltered  = data?.users.filter((user) => user.email.toLowerCase().includes(event.target.value.toLowerCase()))
    }else{
      usersFiltered = data?.users
    }
    return usersFiltered
    }

   // Función para filtrar propiedades
   const filterProperties = (event) => {
    let propertiesFiltered;
    const value = event.target.value.trim();
    
    if (value) {
      propertiesFiltered = data?.properties.filter(
        (property) => 
          property.name.toLowerCase().includes(value.toLowerCase()) ||
          property.serial.toLowerCase().includes(value.toLowerCase()) ||
          property.id === value
      );
    } else {
      propertiesFiltered = data?.properties;
    }
    
    return propertiesFiltered;
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
              placeholder="Seleccione un ítem de alquiler"
            >
              {rentalItemsData.length > 0 ? (
                <option value="">Seleccione un ítem de alquiler</option>,
                rentalItemsData.map((item) => (
                  <option key={item.id} value={item.id}>
                    `${item.startDate} a ${item.endDate}`
                </option>
              ))
              ):(
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
            value={user}
            onChange={handleUserChange}
            placeholder="Nombre o ID del usuario"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Botón para subir documento */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subir Documento
          </label>
          <input
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between space-x-2">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            // onClick={handleClear}
          >
            Limpiar
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            // onClick={handleSave}
          >
            Guardar
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            // onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}