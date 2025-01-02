"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Tooltip from "@/app/components/public/AuxiliarComponents/Tooltip";
import { useTranslations } from "next-intl";

function generateDsOrder(leaseOrderId) {
    const baseStr = String(leaseOrderId);
    const timePart = Date.now().toString().slice(-4);
    const randomDigit = Math.floor(Math.random() * 10).toString();
    let dsOrder = baseStr + timePart + randomDigit;

    // Redsys suele soportar 12:
    if (dsOrder.length > 12) {
        dsOrder = dsOrder.slice(0, 12);
    }

    return dsOrder;
}

export default function ReservationPropertyCard({ property, leaseOrder, user = false }) {
    const t = useTranslations("user_history.card");
    const [isTooltipOpen, setIsTooltipOpen] = useState({
        signed: false,
        pending: false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Nuevo: Aquí guardaremos la info de Redsys
    const [redsysData, setRedsysData] = useState(null);

    // Creamos una ref para un form oculto, si queremos “submit” programático
    const formRef = useRef(null);

    const route = useRouter();
    const category = property?.property?.category || property?.category;

    const handleRedirect = () => {
        const path = `/pages/property-details/${property.propertyId}/room-details/${property.id}`;
        route.push(path);
    };

    const handleRedirectToContract = () => {
        const path = `/pages/user/contract/${property?.propertyId}?r=${property.id}&lo=${leaseOrder.id}`;
        route.push(path);
    };

    const handleRedirectToForm = () => {
        const path = `/pages/user/contract/${property?.propertyId || property?.id}`;
        route.push(path);
    };

    const handleRedsysCheckout = async () => {
        try {
            const propertyId = property?.propertyId || property?.id;
            const roomId = property?.id;

            const order = generateDsOrder(leaseOrder?.id);
            // Info que enviamos al endpoint:
            const body = {
                amount: property?.price * 100, // Ejemplo: 43,45€ => 4345 en céntimos
                order,
                paymentMetaData: {
                    order,
                    paymentType: "reservation",
                    price: property.price,
                    category,
                    leaseOrderId: leaseOrder?.id,
                    roomId,
                    propertyId,
                    userEmail: user?.email || "",
                    merchantName: `Alojamiento ${property.serial}`,
                    merchantDescription: `Reserva - Alojamiento ${property.serial} (${user.name} ${user.lastName})`,
                    merchantUrlOk: `/pages/user/success/${propertyId}?type=reserve&r=${roomId}&lo=${leaseOrder.id}`,
                    merchantUrlkO: `/pages/user/my-reservations`,
                },
            };

            // Petición con fetch o axios
            const res = await fetch("/api/redsys/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Guardamos los datos en el estado
            setRedsysData(data);
            toast(t("info.loading"));

            // Opción A) Enviar el formulario automáticamente
            setTimeout(() => {
                formRef.current.submit();
            }, 500);
        } catch (error) {
            console.error(t("error.error"), error.message);
            toast.error(t("error.info"));
        }
    };

    const redsysForm = redsysData && (
        <form
            ref={formRef}
            name="redsysForm"
            action={redsysData.redsysUrl}
            method="POST"
            style={{ display: "none" }} // oculto
        >
            <input type="hidden" name="Ds_SignatureVersion" value={redsysData.Ds_SignatureVersion} />
            <input type="hidden" name="Ds_MerchantParameters" value={redsysData.Ds_MerchantParameters} />
            <input type="hidden" name="Ds_Signature" value={redsysData.Ds_Signature} />
        </form>
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);

        return `${day}/${month}/${year}`;
    };

    const renderStatus = (label, color, tooltipKey, tooltipContent) => (
        <div
            className="relative flex items-center justify-center gap-1 cursor-pointer"
            onMouseEnter={() => setIsTooltipOpen((prev) => ({ ...prev, [tooltipKey]: true }))}
            onMouseLeave={() => setIsTooltipOpen((prev) => ({ ...prev, [tooltipKey]: false }))}
        >
            <p className={`text-center text-${color} tex-yello font-bold`}>{label}</p>
            <QuestionMarkCircleIcon className={`w-5 h-5 text-${color}`} />
            <Tooltip isOpen={isTooltipOpen[tooltipKey]} content={tooltipContent} position="top" />
        </div>
    );

    const renderActions = () => {
        if (leaseOrder.isSigned && leaseOrder.status === "APPROVED") {
            return renderStatus(t("contract.signed"), "green-600", "signed", t("contract.signed_info"));
        }
        if (!leaseOrder.isSigned && leaseOrder.status === "APPROVED") {
            return (
                <>
                    <button
                        onClick={() => handleRedirectToContract()}
                        className="w-full py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition duration-200"
                    >
                        {t("continue.btn")}
                    </button>
                </>
            );
        }

        if (!leaseOrder.isSigned && leaseOrder.status === "PENDING" && !leaseOrder.inReview) {
            return (
                <>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition duration-200"
                    >
                        {t("continue.btn_2")}
                    </button>
                </>
            );
        }

        if (!leaseOrder.isSigned && leaseOrder.status === "IN_PROGRESS" && leaseOrder.inReview) {
            return renderStatus(t("contract.in_revision"), "blue-500", "pending", t("contract.in_revision_info"));
        }

        return null;
    };

    return (
        <>
            <article className="max-w-md bg-white border border-gray-200 rounded-xl drop-shadow-md hover:drop-shadow-xl duration-300 overflow-hidden">
                {/* Imagen */}
                <div onClick={handleRedirect} className="relative h-36 w-36 sm:w-[302.55px] sm:h-48 rounded-xl">
                    <Image className="h-full rounded-t-xl" src={property?.images[0] || ""} fill alt="Imagen de propiedad" />
                </div>

                {/* Contenido */}
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">{category?.replace(/_/g, "").toLowerCase() || ""}</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(leaseOrder.date)}</span>
                    </div>

                    <div>
                        <h2 className="text-sm text-gray-500 flex items-center gap-2">
                            <Image src="/property-card/location-icon.svg" width={14} height={14} alt="Ubicación" />
                            {`${property?.property?.city}, ${property?.property?.street} ${property?.property?.streetNumber}`}
                        </h2>
                        <span className="text-xs font-medium text-gray-600">
                            {t("code")} {property.serial || ""}
                        </span>
                    </div>

                    {/* Información de contrato */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">
                                {t("income")} {formatDate(leaseOrder.startDate)}
                            </p>
                            <p className="text-sm text-gray-600">
                                {t("out")} {formatDate(leaseOrder.endDate)}
                            </p>
                        </div>
                        {property?.price > 0 && (
                            <span className="text-lg font-bold text-blue-600">
                                € {property?.price} <span className="text-sm">{t("month")}</span>
                            </span>
                        )}
                    </div>

                    {/* Acciones y estados */}
                    <div>{renderActions()}</div>
                </div>
            </article>

            {/* Formulario oculto para Redsys */}
            {redsysForm}

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative"
                            initial={{ y: "-100vh", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100vh", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        >
                            {/* Botón de cerrar */}
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                ✖
                            </button>

                            {/* Contenido del Modal */}
                            <h2 className="text-lg font-semibold mb-4">{t("detail_payment.title")}</h2>
                            <p className="text-sm mb-4">
                                <strong>{t("income")}</strong> {formatDate(leaseOrder.startDate)}
                            </p>
                            <p className="text-sm mb-4">
                                <strong>{t("out")}</strong> {formatDate(leaseOrder.endDate)}
                            </p>
                            <p className="text-sm mb-4">
                                {t("detail_payment.total_pay")} <span className="font-bold">{property?.price}€</span>.
                            </p>
                            <p className="text-sm mb-6">{t("detail_payment.after_pay")}</p>
                            <button
                                onClick={handleRedsysCheckout}
                                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                {t("detail_payment.make_pay")}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
