import { useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import EditPaymentModal from "./EditPaymentModal";
import { toast } from "sonner";

const statusMap = {
  APPROVED: "Aprobado",
  PENDING: "Pendiente",
  PAID: "Pagado",
  CANCELED: "Cancelado",
  REJECTED: "Rechazado",
};

const supplyTypeMap = {
  WATER: "Agua",
  GAS: "Gas",
  ELECTRICITY: "Electricidad",
  EXPENSES: "Expensas",
  INTERNET: "Internet",
  OTHERS: "Otros",
};

export default function PaymentModal({ leaseOrder, onClose }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentType, setPaymentType] = useState("");
  const [editPaymentType, setEditPaymentType] = useState("");
  const [clientPayments, setClientPayments] = useState({
    rentPayments: leaseOrder.client?.rentPayments,
    supplies: leaseOrder.client?.supplies,
    payments: leaseOrder.client?.payments,
  });

  // Función para manejar la selección del tipo de pago
  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  // Función para eliminar un pago
  const handleDeletePayment = async (paymentId, type) => {
    try {
      const url =
        type === "rent" ? "/api/admin/rent_payment" : "/api/admin/supply";
      // await axios.delete(`${url}/${paymentId}`);
      // Actualiza los pagos del cliente después de la eliminación
      setClientPayments((prevState) => ({
        ...prevState,
        rentPayments: prevState.rentPayments.filter(
          (payment) => payment.id !== paymentId
        ),
        supplies: prevState.supplies.filter(
          (supply) => supply.id !== paymentId
        ),
      }));
    } catch (error) {
      console.error("Error al eliminar el pago:", error);
    }
  };

  const handleEditPayment = (payment, type) => {
    setSelectedPayment(payment);
    setEditPaymentType(type);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedPayment(null);
  };

  const handleSubmitEdit = async (editedPayment) => {
    let toastId;
    try {
      toastId = toast.loading("Actualizando...");
      if (editedPayment.paymentType === "supply") {
        await axios.put(`/api/admin/supply/manualCreate`, editedPayment);
      }
      if (editedPayment.paymentType === "rent") {
        await axios.put(`/api/admin/rent_payment`, editedPayment);
      }
      toast.success("Pago actualizado!", { id: toastId });
    } catch (error) {
      toast.info(`Error actualizando el pago: ${error.message}`, {
        id: toastId,
      });
    }
  };

  // Función de envío para RentPayment
  const handleRentPaymentSubmit = async (values) => {
    let toastId;
    try {
      toastId = toast.loading("Asignando...");
      const data = {
        ...values,
        paymentableId:
          leaseOrder.type === "room"
            ? leaseOrder.roomId
            : leaseOrder.propertyId,
        paymentableType: leaseOrder.type?.toUpperCase(),
        leaseOrderId: leaseOrder.id,
        leaseOrderType: leaseOrder.type?.toUpperCase(),
        ownerId: leaseOrder.property?.ownerId,
        clientId: leaseOrder.clientId,
      };
      await axios.post("/api/admin/rent_payment", data);
      toast.success("Pago de renta asignado!", { id: toastId });
      onClose(); // Cierra el modal al finalizar (si es necesario)
    } catch (error) {
      console.log(error);
      toast.info(`Error asignando el pago`, {
        id: toastId,
      });
    }
  };

  // Función de envío para Supply
  const handleSupplySubmit = async (values) => {
    let toastId;
    try {
      toastId = toast.loading("Asignando...");

      const data = {
        ...values,
        propertyId: leaseOrder.propertyId,
        clientId: leaseOrder.clientId,
      };
      await axios.post("/api/admin/supply/manualCreate", data);
      toast.success("Pago de suministros asignado!", { id: toastId });
      onClose(); // Cierra el modal al finalizar (si es necesario)
    } catch (error) {
      console.log(error);
      toast.info(`Error asignando el pago`, {
        id: toastId,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90%] flex flex-col">
        {/* Mostrar los pagos existentes del cliente */}
        <h3 className="text-md font-semibold bg-white w-full">
          Pagos del Cliente
        </h3>
        <div className="mb-2 max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-2 space-y-2">
          {clientPayments.rentPayments.length === 0 &&
          clientPayments.supplies.length === 0 ? (
            <p className="text-gray-500 text-center">
              No hay pagos realizados.
            </p>
          ) : (
            <>
              {clientPayments.rentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-lg text-gray-700">
                      {payment.type === "MONTHLY"
                        ? `Renta (Cuota ${payment.quotaNumber})`
                        : "Reserva"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Fecha: {new Date(payment.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Descripción: {payment.description}
                    </p>
                    <p className="text-gray-500 text-sm">
                      ID de pago: {payment.paymentId}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-bold text-green-600">
                      {payment.amount}€
                    </p>
                    <span
                      className={`text-sm font-medium ${
                        payment.status === "APPROVED"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {statusMap[payment.status] || payment.status}
                    </span>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEditPayment(payment, "rent")}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePayment(payment.id, "rent")}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {clientPayments.supplies.map((supply) => (
                <div
                  key={supply.id}
                  className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-lg text-gray-700">
                      Suministro ({supplyTypeMap[supply.type] || supply.type})
                    </p>
                    <p className="text-gray-500 text-sm">
                      Fecha de Expiración:{" "}
                      {new Date(supply.expirationDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Fecha de Pago:{" "}
                      {supply.paymentDate
                        ? new Date(supply.paymentDate).toLocaleDateString()
                        : "-"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Referencia: {supply.reference}
                    </p>
                    <p className="text-gray-500 text-sm">
                      ID de pago: {supply.paymentId || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-bold text-green-600">
                      {supply.amount}€
                    </p>
                    <span
                      className={`text-sm font-medium ${
                        supply.status === "PAID"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {statusMap[supply.status] || supply.status}
                    </span>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEditPayment(supply, "supply")}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePayment(supply.id, "supply")}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <h2 className="text-md font-semibold">Asignar Pago</h2>
        <div className="grow overflow-y-auto border border-gray-300 rounded-lg p-2">
          {/* Selector de tipo de pago */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Selecciona el tipo de pago
            </label>
            <select
              value={paymentType}
              onChange={handlePaymentTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            >
              <option value="">Seleccione un tipo</option>
              <option value="rent">Pago mensual</option>
              <option value="reserve">Reserva</option>
              <option value="supply">Suministros</option>
            </select>
          </div>

          {/* Formulario según el tipo de pago */}
          {(paymentType === "rent" || paymentType === "reserve") && (
            <Formik
              initialValues={{
                amount: "",
                date: "",
                status: "APPROVED",
                description: "",
                type: paymentType === "rent" ? "MONTHLY" : "RESERVATION",
                quotaNumber: "1",
                paymentId: "",
              }}
              onSubmit={handleRentPaymentSubmit}
            >
              <Form>
                {/* Campo de Monto */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Monto (€)
                  </label>
                  <Field
                    type="number"
                    name="amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Campo de Fecha */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha
                  </label>
                  <Field
                    type="date"
                    name="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Campo de Referencia */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <Field
                    type="text"
                    name="description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Campo de Número de Cuota (quotaNumber) */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Número de Cuota
                  </label>
                  <Field
                    type="number"
                    name="quotaNumber"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Campo de Payment ID */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    ID del pago (Referencia de pago)
                  </label>
                  <Field
                    type="text"
                    name="paymentId"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Botón de Enviar */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Asignar Pago de Renta
                </button>
              </Form>
            </Formik>
          )}

          {paymentType === "supply" && (
            <Formik
              initialValues={{
                name: "",
                amount: "",
                type: "WATER", // Valor por defecto
                status: "PENDING", // Valor por defecto
                reference: "",
                expirationDate: null,
                paymentDate: null,
                paymentId: null,
              }}
              onSubmit={handleSupplySubmit}
            >
              <Form>
                {/* Campo para el Nombre del Suministro */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Título
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Campo de Tipo (type) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de suministro
                  </label>
                  <Field
                    as="select"
                    name="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="WATER">Agua</option>
                    <option value="GAS">Gas</option>
                    <option value="ELECTRICITY">Electricidad</option>
                    <option value="EXPENSES">Expensas</option>
                    <option value="INTERNET">Internet</option>
                    <option value="OTHERS">Otros</option>
                  </Field>
                </div>

                {/* Campo para Monto */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Monto
                  </label>
                  <Field
                    type="number"
                    name="amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Campo para Fecha de Expiración */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha de expiración
                  </label>
                  <Field
                    type="date"
                    name="expirationDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Campo de Estado (status) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <Field
                    as="select"
                    name="status"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="PENDING">Pendiente</option>
                    <option value="PAID">Pagado</option>
                    <option value="CANCELED">Cancelado</option>
                  </Field>
                </div>

                {/* Campo para la Referencia */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <Field
                    type="text"
                    name="reference"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Campo para la Fecha de Pago */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha de pago (Si se realizó el pago)
                  </label>
                  <Field
                    type="date"
                    name="paymentDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Campo de Payment ID */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Payment ID (Si se realizó el pago)
                  </label>
                  <Field
                    type="text"
                    name="paymentId"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Botón de Enviar */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Asignar Pago de Suministro
                </button>
              </Form>
            </Formik>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
      {isEditModalOpen && (
        <EditPaymentModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          payment={selectedPayment}
          paymentType={editPaymentType}
          onSubmit={handleSubmitEdit}
        />
      )}
    </div>
  );
}
