import axios from "axios";
import { Formik, Field, Form } from "formik";
import { toast } from "sonner";
export default function EditReservationModal({ leaseOrder, onClose, fetch }) {
    console.log(leaseOrder);

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Actualizadno...");
        try {
            const data = {
                ...values,
                type: leaseOrder.type,
                leaseOrderId: leaseOrder.id,
            };
            await axios.put(`/api/admin/lease_order`, data);
            await fetch();
            toast.success("Orden actualizada correctamente!", { id: toastId });
            // onClose();
        } catch (error) {
            toast.info("Ocurrió un error al actualizar", { id: toastId });
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
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
                            startDate: new Date(leaseOrder.startDate).toISOString().substring(0, 10),
                            endDate: new Date(leaseOrder.endDate).toISOString().substring(0, 10),
                            price: leaseOrder.price,
                            status: leaseOrder.status,
                            clientId: leaseOrder.clientId,
                        }}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        <Form>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                <Field type="text" name="clientId" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
                                <Field type="date" name="startDate" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de fin</label>
                                <Field type="date" name="endDate" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                                <Field type="number" name="price" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <Field as="select" name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                    <option value="PENDING">Pendiente</option>
                                    {/* <option value="READY_TO_SIGN">Listo para firmar</option> */}
                                    <option value="APPROVED">Aprobado</option>
                                    <option value="REJECTED">Rechazado</option>
                                    {/* <option value="IN_PROGRESS">En progreso</option> */}
                                    <option value="CANCELED">Cancelado</option>
                                    <option value="FINISHED">Finalizado</option>
                                </Field>
                            </div>

                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mr-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cerrar
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                    Guardar
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}
