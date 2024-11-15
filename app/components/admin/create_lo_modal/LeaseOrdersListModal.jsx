import { useState, useEffect } from "react";
import axios from "axios";
import EditLeaseOrderModal from "./auxiliarComponents/EditLeaseOrderModal";
import AssignPaymentModal from "./auxiliarComponents/AssignPaymentModal";

const getStatusDescription = (status) => {
  switch (status) {
    case "PENDING":
      return {
        label: "Pendiente de revisión",
        color: "bg-yellow-100 text-yellow-800",
      };
    case "READY_TO_SIGN":
      return { label: "Listo para firmar", color: "bg-blue-100 text-blue-800" };
    case "APPROVED":
      return { label: "Aprobado", color: "bg-green-100 text-green-800" };
    case "REJECTED":
      return { label: "Rechazado", color: "bg-red-100 text-red-800" };
    case "IN_PROGRESS":
      return { label: "En progreso", color: "bg-purple-100 text-purple-800" };
    case "CANCELED":
      return { label: "Cancelado", color: "bg-gray-100 text-gray-800" };
    case "FINISHED":
      return { label: "Finalizado", color: "bg-indigo-100 text-indigo-800" };
    default:
      return { label: "Desconocido", color: "bg-gray-100 text-gray-800" };
  }
};

export default function LeaseOrdersListModal({ onClose }) {
  const [leaseOrders, setLeaseOrders] = useState([]);
  const [filteredLeaseOrders, setFilteredLeaseOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingLeaseOrder, setEditingLeaseOrder] = useState(null); // Estado para la lease order seleccionada
  const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Estado para el modal de pago
  const [selectedLeaseOrder, setSelectedLeaseOrder] = useState(null); // Estado para la lease order seleccionada para el pago

  const fetchLeaseOrders = async () => {
    try {
      const res = await axios.get("/api/admin/lease_order");
      setLeaseOrders(res.data);
      setFilteredLeaseOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaseOrders();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = leaseOrders.filter(
      (order) =>
        order.room?.serial.toLowerCase().includes(value.toLowerCase()) ||
        order.property?.serial.toLowerCase().includes(value.toLowerCase()) ||
        order.client?.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLeaseOrders(filtered);
  };

  const handleEdit = (leaseOrder) => {
    setEditingLeaseOrder(leaseOrder); // Establece la lease order seleccionada
    setShowEditModal(true); // Muestra el modal de edición
  };

  const handleAssignPayment = (leaseOrder) => {
    setSelectedLeaseOrder(leaseOrder); // Guardar la orden de alquiler seleccionada
    setShowPaymentModal(true); // Mostrar el modal de pago
  };

  // const handleDelete = async (leaseOrderId) => {
  //   try {
  //     await axios.delete(`/api/lease_order/${leaseOrderId}`);
  //     setLeaseOrders(leaseOrders.filter((order) => order.id !== leaseOrderId));
  //     setFilteredLeaseOrders(
  //       filteredLeaseOrders.filter((order) => order.id !== leaseOrderId)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Lista de Ordenes de Alquiler
        </h2>

        {/* Barra de búsqueda */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar por Propiedad o Cliente
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Código de la propiedad o correo del cliente"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>

        {/* Lista de lease orders */}
        {filteredLeaseOrders.length > 0 ? (
          <ul className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
            {filteredLeaseOrders.map((order) => {
              const statusInfo = getStatusDescription(order.status);
              return (
                <li
                  key={order.id}
                  className="flex justify-between items-center px-3 py-2 border-b last:border-b-0 bg-white hover:bg-blue-50"
                >
                  <div>
                    <span className="block font-medium text-gray-900">
                      Propiedad: {order.property?.serial}
                    </span>
                    {order.type === "room" && (
                      <span className="block font-medium text-gray-700">
                        Room: {order.room?.serial}
                      </span>
                    )}
                    <span
                      className="block text-blue-600 hover:underline cursor-pointer"
                      onClick={() => handleAssignPayment(order)}
                    >
                      Cliente: {order.client?.email}
                    </span>
                    <span className="block text-gray-700">
                      Período: {new Date(order.startDate).toLocaleDateString()}{" "}
                      - {new Date(order.endDate).toLocaleDateString()}
                    </span>
                    <span className="block text-gray-700">
                      Precio: {order.price} EUR
                    </span>
                    <span
                      className={`block text-sm px-2 py-1 rounded-full font-semibold ${statusInfo.color}`}
                    >
                      {statusInfo.label}
                    </span>
                    <span
                      className={`block text-sm px-2 py-1 mt-1 rounded-full font-semibold ${order.isActive ? "bg-violet-100 text-violet-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {order.isActive ? "Orden activa" : "Orden inactiva"}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                      onClick={() => handleEdit(order)}
                    >
                      Editar
                    </button>
                    {/* <button
                      className="text-red-600 hover:text-red-800 font-semibold"
                      onClick={() => handleDelete(order.id)}
                    >
                      Eliminar
                    </button> */}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-700">No se encontraron órdenes de alquiler</p>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg shadow-sm hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <EditLeaseOrderModal
          leaseOrder={editingLeaseOrder}
          onClose={() => setShowEditModal(false)}
          fetch={fetchLeaseOrders}
        />
      )}
      {showPaymentModal && (
        <AssignPaymentModal
          leaseOrder={selectedLeaseOrder}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
