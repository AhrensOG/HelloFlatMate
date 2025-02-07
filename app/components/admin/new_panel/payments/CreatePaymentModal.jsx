import React, { useState } from "react";
import { useFormik, Formik, Field, Form } from "formik";
import { toast } from "sonner";
import axios from "axios";

const TYPE_LABELS = {
  INTERNET: "WIFI",
  AGENCY_FEES: "Tasa de la agencia",
  CLEANUP: "Limpieza check-out",
  OTHERS: "Otros",
  DEPOSIT: "Depósito",
  GENERAL_SUPPLIES: "Suministros generales (agua, luz, gas)",
  MONTHLY: "Mensual",
  RESERVATION: "Reserva",
};

const CreatePaymentModal = ({ users, onClose, mutate }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleUserSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchValue(query);
    if (!query) return setFilteredUsers([]);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      )
    );
  };

  const handleUserSelect = (user, setFieldValue) => {
    setSelectedUser(user);
    setSearchValue(`${user.name} - ${user.email}`);
    setFieldValue("userId", user.id);
    setFilteredUsers([]);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => onClose(false)}
    >
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[95%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onClose(false)}
          className="absolute top-1 right-1 bg-gray-200 rounded-full w-5 h-5 text-sm flex items-center justify-center"
        >
          X
        </button>
        <h2 className="text-lg font-semibold pb-2">Crear Pago</h2>
        <Formik
          initialValues={{
            userId: "",
            leaseOrderId: "",
            type: "",
            name: "",
            status: "",
            date: "",
            amount: "",
            quotaNumber: "",
            description: "",
            paymentId: "",
          }}
          onSubmit={async (values) => {
            const toastId = toast.loading("Creando cobro...");
            try {
              if (values.type === "RESERVATION" || values.type === "MONTHLY") {
                await axios.post("/api/admin/payments/rentPayments", values);
              } else {
                await axios.post("/api/admin/payments/supplyPayments", values);
              }
              await mutate();
              toast.success("Cobro asignado correctamente", { id: toastId });
            } catch (error) {
              toast.info("Ocurrio un error creando el cobro", {
                description: "Intenta nuevamente o contacta con el soporte",
                id: toastId,
              });
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div className="w-full relative flex flex-col justify-center items-start">
                <label className="text-xs font-light">Usuario</label>
                <input
                  type="text"
                  placeholder="Buscar usuario por nombre o email"
                  value={searchValue}
                  onChange={handleUserSearch}
                  className="outline-none border p-2 w-full"
                />
                {filteredUsers.length > 0 && (
                  <ul className="outline-none border p-2 top-14 absolute max-h-64 w-full bg-white overflow-y-scroll">
                    {filteredUsers.map((user) => (
                      <li
                        key={user.id}
                        className="cursor-pointer p-1 hover:bg-gray-100"
                        onClick={() => handleUserSelect(user, setFieldValue)}
                      >
                        {user.name} - {user.email}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedUser && (
                <div>
                  <label className="text-xs font-light">Orden - room</label>
                  <Field
                    as="select"
                    name="leaseOrderId"
                    className="outline-none border p-2 w-full"
                  >
                    <option value="">
                      Seleccionar orden de alquiler (room)
                    </option>
                    {selectedUser.leaseOrdersRoom.map((order) => (
                      <option key={order.id} value={order.id}>
                        {order.room?.serial}
                      </option>
                    ))}
                  </Field>
                </div>
              )}
              <div>
                <label className="text-xs font-light">Tipo de cobro</label>
                <Field
                  as="select"
                  name="type"
                  className="outline-none border p-2 w-full"
                >
                  <option value="">Seleccionar Tipo de cobro</option>
                  {Object.entries(TYPE_LABELS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Field>
              </div>
              {values.type !== "RESERVATION" && values.type !== "MONTHLY" ? (
                <div>
                  <label className="text-xs font-light">Estado</label>
                  <Field
                    as="select"
                    name="status"
                    className="outline-none border p-2 w-full"
                  >
                    <option value="">Seleccionar estado</option>
                    <option value="PENDING">Pendiente</option>
                    <option value="PAID">Pagado</option>
                  </Field>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-light">Estado</label>
                  <Field
                    as="select"
                    name="status"
                    className="outline-none border p-2 w-full"
                  >
                    <option value="">Seleccionar estado</option>
                    <option value="PENDING">Pendiente</option>
                    <option value="APPROVED">Pagado</option>
                  </Field>
                </div>
              )}
              <div>
                <label className="text-xs font-light">Fecha</label>
                <Field
                  type="date"
                  name="date"
                  className="outline-none border p-2 w-full"
                />
              </div>
              <div>
                <label className="text-xs font-light">Importe</label>
                <Field
                  type="number"
                  name="amount"
                  placeholder="Importe"
                  className="outline-none border p-2 w-full"
                />
              </div>
              {values.type === "RESERVATION" || values.type === "MONTHLY" ? (
                <>
                  <div>
                    <label className="text-xs font-light">
                      Nº de cobro (cuota)
                    </label>
                    <Field
                      type="number"
                      name="quotaNumber"
                      placeholder="Nº de cobro"
                      className="outline-none border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-light">Descripción</label>
                    <Field
                      type="text"
                      name="description"
                      placeholder="Descripción"
                      className="outline-none border p-2 w-full"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-xs font-light">Título</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Título"
                    className="outline-none border p-2 w-full"
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-light">ID de cobro</label>
                <Field
                  type="text"
                  name="paymentId"
                  placeholder="ID de cobro"
                  className="outline-none border p-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 w-full"
              >
                Crear Pago
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreatePaymentModal;
