import { Formik, Form, Field } from "formik";

const supplyTypeMap = {
  WATER: "Agua",
  GAS: "Gas",
  ELECTRICITY: "Electricidad",
  EXPENSES: "Expensas",
  INTERNET: "Internet",
  OTHERS: "Otros",
};

const EditPaymentModal = ({
  isOpen,
  onClose,
  payment,
  paymentType,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative max-h-[80%] flex flex-col">
        <h2 className="text-xl font-semibold pl-4">
          Editar Pago
          {paymentType === "rent"
            ? payment.type === "MONTHLY"
              ? "(Mensual)"
              : "(Reserva)"
            : paymentType === "supply"
            ? ` (Suministro - ${supplyTypeMap[payment.type]})`
            : null}
        </h2>
        {/* <span className="pl-4 text-sm font-light">ID : {payment.paymentId ? payment.paymentId : "-"}</span> */}

        <Formik
          initialValues={payment}
          onSubmit={(values) => onSubmit({ ...values, paymentType })}
        >
          {({ values, handleChange }) => (
            <Form className="p-4 space-y-4 overflow-y-auto grow">
              {paymentType === "rent" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Monto (€)
                    </label>
                    <Field
                      name="amount"
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha
                    </label>
                    <Field
                      name="date"
                      type="date"
                      value={new Date(values.date).toISOString().split("T")[0]}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "date",
                            value: new Date(e.target.value).toISOString(),
                          },
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Descripción
                    </label>
                    <Field
                      name="description"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ID de pago
                    </label>
                    <Field
                      name="paymentId"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cuota
                    </label>
                    <Field
                      name="quotaNumber"
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    >
                      <option value="APPROVED">Aprobado</option>
                      <option value="PENDING">Pendiente</option>
                      <option value="REJECTED">Rechazado</option>
                    </Field>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tipo de pago
                    </label>
                    <Field
                      as="select"
                      name="type"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    >
                      <option value="MONTHLY">Mensual</option>
                      <option value="RESERVATION">Reserva</option>
                    </Field>
                  </div>
                </>
              )}

              {paymentType === "supply" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Título
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Monto (€)
                    </label>
                    <Field
                      name="amount"
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha
                    </label>
                    <Field
                      name="date"
                      type="date"
                      value={
                        values.date
                          ? new Date(values.date).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = new Date(e.target.value);
                        // Validar si la fecha es correcta
                        handleChange({
                          target: {
                            name: "date",
                            value: !isNaN(dateValue)
                              ? dateValue.toISOString()
                              : "",
                          },
                        });
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Expiración
                    </label>
                    <Field
                      name="expirationDate"
                      type="date"
                      value={
                        values.expirationDate
                          ? new Date(values.expirationDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = new Date(e.target.value);
                        // Validar si la fecha es correcta
                        handleChange({
                          target: {
                            name: "expirationDate",
                            value: !isNaN(dateValue)
                              ? dateValue.toISOString()
                              : "",
                          },
                        });
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de pago
                    </label>
                    <Field
                      name="paymentDate"
                      type="date"
                      value={
                        values.paymentDate
                          ? new Date(values.paymentDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = new Date(e.target.value);
                        handleChange({
                          target: {
                            name: "paymentDate",
                            value: !isNaN(dateValue)
                              ? dateValue.toISOString()
                              : "",
                          },
                        });
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ID de pago
                    </label>
                    <Field
                      name="paymentId"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Descripción
                    </label>
                    <Field
                      name="reference"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tipo de suministro
                    </label>
                    <Field
                      as="select"
                      name="type"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    >
                      <option value="WATER">Agua</option>
                      <option value="GAS">Gas</option>
                      <option value="ELECTRICITY">Electricidad</option>
                      <option value="EXPENSES">Expensas</option>
                      <option value="INTERNET">Internet</option>
                      <option value="OTHERS">Otros</option>
                    </Field>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    >
                      <option value="PENDING">Pendiente</option>
                      <option value="PAID">Pagado</option>
                      <option value="CANCELED">Cancelado</option>
                    </Field>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Guardar Cambios
                </button>
              </div>
            </Form>
          )}
        </Formik>
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
};

export default EditPaymentModal;
