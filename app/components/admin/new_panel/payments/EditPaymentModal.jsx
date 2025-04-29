import React from "react";
import { Formik, Field, Form } from "formik";
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
  MAINTENANCE: "Mantenimiento",
};

const EditPaymentModal = ({ payment, onClose, mutate }) => {
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
        <h2 className="text-lg font-semibold pb-2">Editar Pago</h2>
        <Formik
          initialValues={{
            id: payment.id,
            userId: `${payment?.user?.name} - ${payment?.user?.email}` || "",
            leaseOrderId: payment?.leaseOrderInfo?.room || "",
            type: payment?.type || "",
            name: payment?.name || "",
            status: payment?.status || "",
            date: payment?.date ? payment.date.split("T")[0] : "",
            amount: payment?.amount || "",
            quotaNumber: payment?.quotaNumber || "",
            description: payment?.description || "",
            paymentId: payment?.paymentId || "",
          }}
          onSubmit={async (values) => {
            const toastId = toast.loading("Actualizando cobro...");
            try {
              if (values.type === "RESERVATION" || values.type === "MONTHLY") {
                await axios.put("/api/admin/payments/rentPayments", values);
              } else {
                await axios.put("/api/admin/payments/supplyPayments", values);
              }
              await mutate()
              toast.success("Cobro actualizado correctamente", { id: toastId });
            } catch (error) {
              toast.info("Error al actualizar el cobro", {
                description: "Intenta nuevamente o contacta con soporte",
                id: toastId,
              });
            }
          }}
        >
          {({ values }) => (
            <Form className="space-y-4">
              <div>
                <label className="text-xs font-light">
                  Usuario
                </label>
                <Field
                  type="text"
                  name="userId"
                  placeholder="ID de Usuario"
                  className="outline-none border p-2 w-full"
                  disabled
                />
              </div>
              <div>
                <label className="text-xs font-light">
                  Orden - Room
                </label>
                <Field
                  type="text"
                  name="leaseOrderId"
                  className="outline-none border p-2 w-full"
                  disabled
                />
              </div>

              <div>
                <label className="text-xs font-light">
                  Tipo de cobro
                </label>
                <Field
                  as="select"
                  name="type"
                  className="outline-none border p-2 w-full"
                >
                  <option value="">Seleccionar tipo de cobro</option>
                  {Object.entries(TYPE_LABELS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Field>
              </div>

              {values.type !== "RESERVATION" && values.type !== "MONTHLY" ? (
                <div>
                  <label className="text-xs font-light">
                    Estado
                  </label>
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
                  <label className="text-xs font-light">
                    Estado
                  </label>
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
                <label className="text-xs font-light">
                  Fecha
                </label>
                <Field
                  type="date"
                  name="date"
                  className="outline-none border p-2 w-full"
                />
              </div>

              <div>
                <label className="text-xs font-light">
                  Importe
                </label>
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
                    <label className="text-xs font-light">
                      Descripción
                    </label>
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
                  <label className="text-xs font-light">
                    Título
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Título"
                    className="outline-none border p-2 w-full"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-light">
                  ID de cobro
                </label>
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
                Actualizar Pago
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPaymentModal;
