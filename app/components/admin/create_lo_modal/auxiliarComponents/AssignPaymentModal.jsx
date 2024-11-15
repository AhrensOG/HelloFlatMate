import { useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";

export default function PaymentModal({ leaseOrder, onClose }) {
  console.log(leaseOrder);
  const [paymentType, setPaymentType] = useState(""); // Estado para controlar el tipo de pago

  // Función para manejar la selección del tipo de pago
  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  // Función de envío para RentPayment
  const handleRentPaymentSubmit = async (values) => {
    try {
      // Aquí realizarías la llamada a la API para registrar el pago de rentPayment
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
      // onClose(); // Cierra el modal al finalizar
    } catch (error) {
      console.error("Error al enviar RentPayment:", error);
    }
  };

  // Función de envío para Supply
  const handleSupplySubmit = async (values) => {
    try {
      // Aquí realizarías la llamada a la API para registrar el pago de supply
      const data = {
        ...values,
        propertyId: leaseOrder.propertyId,
        clientId: leaseOrder.clientId,
      };
      console.log(data);
      await axios.post("/api/admin/supply/manualCreate", data);
      // onClose(); // Cierra el modal al finalizar
    } catch (error) {
      console.error("Error al enviar SupplyPayment:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[80%] flex flex-col">
        <h2 className="text-lg font-bold mb-4">Asignar Pago</h2>
        <div className="grow overflow-y-auto border-2 border-gray-300 rounded-lg p-2">
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
    </div>
  );
}
