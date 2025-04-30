import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function CreateLeaseOrderModal({
  clients,
  properties,
  onClose,
  mutate,
}) {
  const [rentalItemsData, setRentalItemsData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [propertySearch, setPropertySearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRentalItem, setSelectedRentalItem] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [price, setPrice] = useState(0);
  const [isSigned, setIsSigned] = useState(false);
  const [inReview, setInReview] = useState(false);
  const [status, setStatus] = useState("PENDING");

  const handlePropertySearchChange = (e) => {
    const value = e.target.value;
    setPropertySearch(value);
    const lower = value.toLowerCase();
    const filtered = properties.filter((p) =>
      (p.serial?.toLowerCase() || "").includes(lower)
    );
    setFilteredProperties(filtered);
  };

  const handleUserChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const lower = value.toLowerCase();
    const filtered = clients.filter((u) =>
      (u.email?.toLowerCase() || "").includes(lower)
    );
    setFilteredUsers(filtered);
  };

  const handleSelectProperty = (property) => {
    setPropertySearch(property.serial);
    setSelectedProperty(property);
    setFilteredProperties([]);
    const rooms = property.rooms || [];
    setRoomsData(rooms);
    setRentalItemsData([]);
  };

  const handleRoomChange = (e) => {
    const selectedRoomId = e.target.value;
    const room = roomsData.find((room) => room.id == selectedRoomId);
    setSelectedRoom(selectedRoomId);
    if (room) {
      setRentalItemsData(room.rentalItems || []);
      setPrice(room.price || 0);
    } else {
      setRentalItemsData([]);
    }
  };

  const handleRentalItemChange = (e) => {
    const rentalItemId = e.target.value;
    const rentalItem = rentalItemsData.find((item) => item.id == rentalItemId);
    setSelectedRentalItem(rentalItemId);
    if (rentalItem) {
      setStartDate(rentalItem.rentalPeriod.startDate);
      setEndDate(rentalItem.rentalPeriod.endDate);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const createLeaseOrder = async () => {
    const toastId = toast.loading("Creando orden...");
    try {
      const leaseOrderData = {
        propertyId: selectedProperty.id,
        date: new Date(),
        startDate,
        endDate,
        itemRentalId: selectedRentalItem || null,
        clientId: user.id,
        price,
        ownerId: selectedProperty.ownerId,
        status,
        isActive: true,
        isSigned,
        inReview,
        roomId: selectedRoom,
      };
      await axios.post("/api/lease_order/manualCreate", leaseOrderData);
      await mutate();
      toast.success("Orden creada correctamente", { id: toastId });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la orden", { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[95%] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Crear Orden de Alquiler</h2>

        {/* Buscar Propiedad */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar Propiedad
          </label>
          <input
            type="text"
            value={propertySearch}
            onChange={handlePropertySearchChange}
            placeholder="Serial o Nombre"
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
          />
          {filteredProperties.length > 0 && (
            <ul className="border rounded-lg mt-1 max-h-40 overflow-y-auto">
              {filteredProperties.map((property) => (
                <li
                  key={property.id}
                  onClick={() => handleSelectProperty(property)}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm">
                  {property.serial}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Seleccionar Habitación */}
        {selectedProperty && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar Habitación
            </label>
            <select
              value={selectedRoom}
              onChange={handleRoomChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm">
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

        {/* Seleccionar Período */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seleccionar Período de Alquiler
          </label>
          <select
            value={selectedRentalItem}
            onChange={handleRentalItemChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm">
            {rentalItemsData.length > 0 ? (
              <>
                <option value="">Seleccione un período</option>
                {rentalItemsData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {`${formatDate(item.rentalPeriod.startDate)} a ${formatDate(
                      item.rentalPeriod.endDate
                    )}`}
                  </option>
                ))}
              </>
            ) : (
              <option value="">No hay períodos disponibles</option>
            )}
          </select>
        </div>

        {/* Buscar Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar Usuario
          </label>
          <input
            type="text"
            value={email}
            onChange={handleUserChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
          />
          {filteredUsers.length > 0 && (
            <ul className="border rounded-lg mt-1 max-h-40 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    setEmail(user.email);
                    setUser(user);
                    setFilteredUsers([]);
                  }}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm">
                  {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
          />
        </div>

        {/* Firmado */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ¿Firmado?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                checked={isSigned}
                onChange={() => setIsSigned(true)}
              />{" "}
              Sí
            </label>
            <label>
              <input
                type="radio"
                checked={!isSigned}
                onChange={() => setIsSigned(false)}
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* En Revisión */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ¿En Revisión?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                checked={inReview}
                onChange={() => setInReview(true)}
              />{" "}
              Sí
            </label>
            <label>
              <input
                type="radio"
                checked={!inReview}
                onChange={() => setInReview(false)}
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* Estado */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm">
            <option value="PENDING">Pendiente</option>
            <option value="APPROVED">Aprobado</option>
            <option value="REJECTED">Rechazado</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex justify-end">
          <button
            onClick={createLeaseOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Crear Orden
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
