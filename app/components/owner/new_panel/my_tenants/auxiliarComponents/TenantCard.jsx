import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlinePayments } from "react-icons/md";
import { TbTools } from "react-icons/tb";
import {
    ClipboardDocumentListIcon,
    DevicePhoneMobileIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import formatDateToDDMMYYYY from "@/app/components/admin/new_panel/utils/formatDate";

const STATUS_LABEL = {
    IN_PROCESS: "En Proceso",
    PENDING: "Pendiente",
    APPROVED: "Aprobada",
    FINISHED: "Finalizada",
};

const PAYMENT_LABELS = {
    MONTHLY: "Mensual",
    RESERVATION: "Reserva",
    DEPOSIT: "Depósito",
    AGENCY_FEES: "Tasa de la agencia",
    CLEANUP: "Limpieza check-out",
    GENERAL_SUPPLIES: "Suministros generales (agua, luz, gas)",
    INTERNET: "WIFI",
    OTHERS: "Otros",
    APPROVED: "Pagado",
    PAID: "Pagado",
    PENDING: "Pendiente",
};

const TenantCard = ({ order, isOld = false }) => {
    const client = order.client;
    const [showPayments, setShowPayments] = useState(false);

    const cardBorder = isOld ? "border-gray-200" : "border-[#440cac]";
    const headingColor = "text-[#440cac]";

    const documents =
        client.documents?.filter((doc) => doc.leaseOrderId === order.id) || [];

    const contracts =
        client.contracts?.filter((c) => c.leaseOrderId === order.id) || [];

    const rentPayments =
        client.rentPayments?.filter((p) => p.leaseOrderId === order.id) || [];

    const supplies =
        client.supplies?.filter((s) => s.leaseOrderId === order.id) || [];

    return (
        <div
            className={`w-full md:w-[48%] p-4 rounded-lg border ${cardBorder} bg-white shadow-sm flex flex-col gap-2`}
        >
            {/* Info básica */}
            <div className="flex flex-col gap-1">
                <p
                    className={`font-semibold text-md md:text-lg ${headingColor}`}
                >
                    {client.name} {client.lastName}
                </p>
                <p className="text-xs md:text-base text-gray-600">
                    Orden: {STATUS_LABEL[order.status]}
                </p>
                <p className="text-xs md:text-base text-gray-600">
                    Email: {client.email}
                </p>
                {client.phone && (
                    <p className="text-xs md:text-base text-gray-600">
                        Tel: +{client.phone}
                    </p>
                )}
            </div>

            {/* Fechas y precio */}
            <div className="text-xs md:text-base text-gray-500">
                <p>
                    <strong>Desde: </strong>
                    {formatDateToDDMMYYYY(order.startDate)}
                </p>
                <p>
                    <strong>Hasta: </strong>
                    {formatDateToDDMMYYYY(order.endDate)}
                </p>
                <p>
                    <strong>Precio: </strong> {order.price} €
                </p>
            </div>

            {/* Emergencia */}
            {(client.emergencyName ||
                client.emergencyPhone ||
                client.emergencyEmail) && (
                <div className="border-t border-gray-100 py-4 space-y-2">
                    <p className="text-xs md:text-base font-semibold text-gray-600 mb-1">
                        Contacto de emergencia
                    </p>
                    {client.emergencyName && (
                        <p className="text-xs md:text-base text-gray-600 flex items-center gap-1">
                            <UserIcon className="text-[#440cac] size-5" />
                            {client.emergencyName}
                        </p>
                    )}
                    {client.emergencyPhone && (
                        <p className="text-xs md:text-base text-gray-600 flex items-center gap-1">
                            <DevicePhoneMobileIcon className="text-[#440cac] size-5" />
                            +{client.emergencyPhone}
                        </p>
                    )}
                    {client.emergencyEmail && (
                        <p className="text-xs md:text-base text-gray-600 flex items-center gap-1">
                            <EnvelopeIcon className="text-[#440cac] size-5" />
                            {client.emergencyEmail}
                        </p>
                    )}
                </div>
            )}

            {/* Documentos */}
            {documents.length > 0 && (
                <div className="border-t border-gray-100 py-4">
                    <p className="text-xs md:text-base font-semibold text-gray-600 mb-1">
                        Documentos
                    </p>
                    {documents.map((doc, i) => (
                        <div key={i} className="mb-1">
                            <p className="text-xs md:text-base text-gray-600 flex items-center gap-1">
                                <DocumentTextIcon className="text-[#440cac] size-5" />
                                {doc.name}
                            </p>
                            {doc.urls.map((url, j) => (
                                <a
                                    key={j}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base text-[#440cac] underline"
                                >
                                    Ver documento {j + 1}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {/* Contratos */}
            {contracts.length > 0 && (
                <div className="border-t border-gray-100 py-4">
                    <p className="text-xs md:text-base font-semibold text-gray-600 mb-1">
                        Contratos firmados
                    </p>
                    {contracts.map((contract, i) => (
                        <a
                            key={i}
                            href={contract.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-[#440cac] underline flex items-center gap-1"
                        >
                            <ClipboardDocumentListIcon className="text-[#440cac] size-5" />
                            Ver contrato {i + 1}
                        </a>
                    ))}
                </div>
            )}

            <div className="border-t border-gray-100 py-4">
                <p className="text-xs md:text-base font-semibold text-gray-600 mb-1">
                    Todos los pagos
                </p>
                {/* Toggle botón */}
                <button
                    onClick={() => setShowPayments((prev) => !prev)}
                    className="text-sm md:text-base text-[#440cac] underline w-fit transition hover:opacity-80"
                >
                    {showPayments ? "Ocultar pagos" : "Ver pagos"}
                </button>

                <AnimatePresence initial={false}>
                    {showPayments && (
                        <motion.div
                            key="payments"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t pt-3 border-gray-100"
                        >
                            {/* Rent payments */}
                            {rentPayments.length > 0 && (
                                <div className="mb-3">
                                    <h4 className="flex items-center gap-1 text-xs md:text-base font-semibold text-gray-700 mb-1">
                                        <MdOutlinePayments className="text-[#440cac]" />
                                        Pagos de renta
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        {rentPayments.map((payment, i) => (
                                            <div
                                                key={i}
                                                className="text-xs md:text-base text-gray-600 bg-gray-50 rounded-md px-3 py-2 shadow-sm"
                                            >
                                                <p>
                                                    <strong>
                                                        {payment.description}
                                                    </strong>
                                                </p>
                                                <p>
                                                    <strong>
                                                        {payment.amount} €
                                                    </strong>
                                                    (
                                                    {
                                                        PAYMENT_LABELS[
                                                            payment.type
                                                        ]
                                                    }
                                                    )
                                                </p>
                                                <p>
                                                    <strong>Fecha: </strong>
                                                    {formatDateToDDMMYYYY(
                                                        payment.date
                                                    )}
                                                </p>
                                                <p>
                                                    <strong>Estado: </strong>
                                                    <span
                                                        className={`${
                                                            payment.status ===
                                                            "APPROVED"
                                                                ? "text-green-700"
                                                                : "text-yellow-700"
                                                        } font-bold`}
                                                    >
                                                        {
                                                            PAYMENT_LABELS[
                                                                payment.status
                                                            ]
                                                        }
                                                    </span>
                                                </p>
                                                {payment.paymentId && (
                                                    <p>
                                                        <strong>
                                                            ID de pago:
                                                        </strong>{" "}
                                                        {payment.paymentId}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Supplies */}
                            {supplies.length > 0 && (
                                <div>
                                    <h4 className="flex items-center gap-1 text-xs md:text-base font-semibold text-gray-700 mb-1">
                                        <TbTools className="text-[#440cac]" />
                                        Suministros y extras
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        {supplies.map((supply, i) => (
                                            <div
                                                key={i}
                                                className="text-xs md:text-base text-gray-600 bg-gray-50 rounded-md px-3 py-2 shadow-sm"
                                            >
                                                <p>
                                                    <strong>Concepto: </strong>
                                                    {supply.name}
                                                </p>
                                                <p>
                                                    <strong>Monto: </strong>
                                                    {supply.amount} €
                                                </p>
                                                <p>
                                                    <strong>Fecha: </strong>
                                                    {formatDateToDDMMYYYY(
                                                        supply.date
                                                    )}
                                                </p>
                                                <p>
                                                    <strong>Estado: </strong>
                                                    <span
                                                        className={`
                                                            ${
                                                                supply.status ===
                                                                "PAID"
                                                                    ? "text-green-700"
                                                                    : "text-blue-700"
                                                            } font-bold`}
                                                    >
                                                        {
                                                            PAYMENT_LABELS[
                                                                supply.status
                                                            ]
                                                        }
                                                    </span>
                                                </p>
                                                <p>
                                                    <strong>ID pago: </strong>
                                                    {supply.paymentId || "-"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TenantCard;
