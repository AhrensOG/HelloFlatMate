import axios from "axios";
import { Formik, Field, Form } from "formik";
import { toast } from "sonner";

export default function EditReservationModal({ leaseOrder, onClose, mutate }) {
  const handleSubmit = async (values) => {
    const toastId = toast.loading("Actualizando...");
    try {
      const data = {
        ...values,
        type: leaseOrder.type,
        leaseOrderId: leaseOrder.id,
      };
      await axios.put(`/api/admin/lease_order`, data);
      await mutate();
      toast.success("Orden actualizada correctamente!", { id: toastId });
    } catch (error) {
      toast.info("Ocurrió un error al actualizar", { id: toastId });
      console.log(error);
    }
  };

  const handleManualPaymentGeneration = async () => {
    const toastId = toast.loading("Generando cobros...");
    try {
      await axios.post(
        "/api/admin/lease_order/new_panel/manual_payment_generation",
        { leaseOrderId: leaseOrder.id }
      );
      await mutate();
      toast.success("Cobros generados con éxito", { id: toastId });
    } catch (error) {
      toast.error("Error al generar los cobros", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[95%] overflow-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Editar Orden de Alquiler <br />
          <span className="text-sm font-light">
            {leaseOrder.type === "room"
              ? `${leaseOrder.property?.serial} / ${leaseOrder.room?.serial}`
              : `${leaseOrder.property?.serial}`}
          </span>
        </h2>

        <Formik
          initialValues={{
            startDate: new Date(leaseOrder.startDate)
              .toISOString()
              .substring(0, 10),
            endDate: new Date(leaseOrder.endDate)
              .toISOString()
              .substring(0, 10),
            price: leaseOrder.price,
            status: leaseOrder.status,
            isActive: leaseOrder.isActive,
            isSigned: leaseOrder.isSigned,
            inReview: leaseOrder.inReview,
            clientId: leaseOrder.clientId,
          }}
          onSubmit={handleSubmit}
          enableReinitialize={true}>
          <Form>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <Field
                type="text"
                name="clientId"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio
              </label>
              <Field
                type="date"
                name="startDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de fin
              </label>
              <Field
                type="date"
                name="endDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio
              </label>
              <Field
                type="number"
                name="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <Field
                as="select"
                name="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="PENDING">Pendiente</option>
                {/* <option value="READY_TO_SIGN">Listo para firmar</option> */}
                <option value="APPROVED">Aprobado</option>
                <option value="REJECTED">Rechazado</option>
                <option value="IN_PROGRESS">En progreso</option>
                <option value="CANCELED">Cancelado</option>
                <option value="FINISHED">Finalizado</option>
              </Field>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ¿Está activa?
              </label>
              <div className="flex justify-start items-stretch">
                <Field
                  type="checkbox"
                  name="isActive"
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">Sí</span>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ¿Está firmada?
              </label>
              <div className="flex justify-start items-stretch">
                <Field
                  type="checkbox"
                  name="isSigned"
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">Sí</span>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ¿Está en revisión?
              </label>
              <div className="flex justify-start items-stretch">
                <Field
                  type="checkbox"
                  name="inReview"
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">Sí</span>
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400">
                Cerrar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Guardar
              </button>
              <button
                type="button"
                onClick={handleManualPaymentGeneration}
                className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                // disabled={leaseOrder.status === "APPROVED"}
                title={
                  leaseOrder.status === "APPROVED"
                    ? "Ya está aprobado"
                    : "Generar todos los cobros"
                }>
                Generar cobros
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
