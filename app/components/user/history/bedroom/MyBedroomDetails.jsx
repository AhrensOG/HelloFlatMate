import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import SliderDetails from "../../property-details/header/SliderDetails";
import SliderItem from "../../property-details/header/slider/SliderItem";
import Link from "next/link";
import { toast } from "sonner";
import RentPaymentModal from "./RentPaymentModal";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function MyBedroomDetails({ room, rentPayments }) {
    const t = useTranslations("user_panel.bedrooms_details");

    const { type, location, dueDate, price, amenities, images, property, leaseOrder } = room;
    const [nextDueDate, setNextDueDate] = useState(null);
    const [totalPayments, setTotalPayments] = useState(0);
    const [leaseDurationMonths, setLeaseDurationMonths] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        function calculateNextDueDate(startDate, endDate) {
            const today = new Date();
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (today > end) {
                return null;
            }

            const nextDue = new Date(today.getFullYear(), today.getMonth() + 1, 1);

            if (nextDue <= end) {
                return nextDue;
            } else {
                return null;
            }
        }

        function calculateTotalPayments(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            let monthsDifference = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

            if (start.getDate() === 1) {
                monthsDifference += 1;
            }

            return monthsDifference;
        }

        function calculateLeaseDurationMonths(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
        }

        if (dueDate?.startDate && dueDate?.endDate) {
            const calculatedNextDueDate = calculateNextDueDate(dueDate.startDate, dueDate.endDate);
            setNextDueDate(calculatedNextDueDate);

            const calculatedTotalPayments = calculateTotalPayments(dueDate.startDate, dueDate.endDate);
            setTotalPayments(calculatedTotalPayments);

            const calculatedLeaseDurationMonths = calculateLeaseDurationMonths(dueDate.startDate, dueDate.endDate);
            setLeaseDurationMonths(calculatedLeaseDurationMonths);
        }
    }, [dueDate]);

    function formatDate(date) {
        if (!date || isNaN(new Date(date).getTime())) {
            return "-";
        }
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }

    function getMonthName(date) {
        if (!date || isNaN(new Date(date).getTime())) {
            return "-";
        }
        const options = { month: "long" }; // Esto da el mes en formato texto largo
        return new Date(date).toLocaleString("es-ES", options); // Devuelve el mes en español
    }

    const handlePayment = async (price, quota) => {
        const data = {
            amount: price,
            type: "MONTHLY",
            paymentableId:
                room?.type === "HELLO_ROOM" || room?.type === "HELLO_COLIVING" || room?.type === "HELLO_LANDLORD" ? room.property?.id : room.id,
            paymentableType: room?.type === "HELLO_ROOM" || room?.type === "HELLO_COLIVING" || room?.type === "HELLO_LANDLORD" ? "ROOM" : "PROPERTY",
            clientId: room?.leaseOrder?.clientId,
            leaseOrderId: room?.leaseOrder?.id,
            leaseOrderType: room?.type === "HELLO_ROOM" || room?.type === "HELLO_COLIVING" || room?.type === "HELLO_LANDLORD" ? "ROOM" : "PROPERTY",
            quotaNumber: quota,
            propertyName: room.property?.name,
        };

        const toastId = toast.loading("Procesando el pago...");

        try {
            const res = await axios.post("/api/stripe/create-monthly-checkout-session", data);
            const session = await res.data;
            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            // Si el redireccionamiento es exitoso, actualizamos el toast
            toast.success("Redirigiendo al sistema de pagos", { id: toastId });
        } catch (error) {
            // Actualiza el toast en caso de error
            toast.info("Ocurrió un error al intentar el pago", {
                id: toastId,
                description: "Intenta nuevamente más tarde o reporta el error por nuestro canal de soporte.",
            });
            console.log(error);
        }
    };

    return (
        <div className="w-full">
            <section className="w-full flex flex-col gap-2">
                <div className="relative rounded-2xl h-[250px] w-full">
                    <SliderDetails rounded="rounded-2xl">
                        {images.map((image, index) => {
                            return <SliderItem rounded="rounded-2xl" height="h-[250px]" key={index} img={image} />;
                        })}
                    </SliderDetails>
                    <p className="absolute top-0 right-0 z-20 flex items-center justify-center w-[6.7rem] h-[1.88rem] rounded-bl-3xl rounded-tr-2xl bg-[#0C1660] text-white text-xs text-center">
                        {type.replace(/_/g, "").toLowerCase()}
                    </p>
                </div>
                <div className="flex flex-wrap justify-between items-start gap-1">
                    <div className="flex gap-1">
                        <span className="h-6 w-5">
                            <MapPinIcon />
                        </span>
                        <h3 className="text-sm font-medium text-[#000000E5]">{`${location.street}, ${
                            location.postalCode ? location.postalCode : ""
                        } ${location.city}`}</h3>
                    </div>
                    <p className="text-xs font-normal text-[#828282] pl-2">{amenities.join(" - ")}</p>
                </div>
                <div className="text-sm flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="font-light">
                            {type === "HELLO_STUDIO" ? t("finish") : `${t("pay")} ${nextDueDate ? getMonthName(nextDueDate) : "-"}`}
                        </p>
                        <p className="font-medium">
                            {type === "HELLO_STUDIO"
                                ? formatDate(new Date(dueDate.endDate))
                                : nextDueDate
                                ? formatDate(nextDueDate)
                                : t("not_expired")}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-light">{type === "HELLO_STUDIO" ? t("total_pay") : t("total_price")}</p>
                        <p className="font-medium">{type === "HELLO_STUDIO" ? `$${leaseOrder.price || 0}` : `$${price}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-light">{t("lease_duration")}</p>
                        <p className="font-medium">{`${leaseDurationMonths} ${t("months")}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-light">{t("start_date")}</p>
                        <p className="font-medium">{dueDate.startDate ? formatDate(new Date(dueDate.startDate)) : "-"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-light">{t("end_date")}</p>
                        <p className="font-medium">{dueDate.endDate ? formatDate(new Date(dueDate.endDate)) : "-"}</p>
                    </div>
                </div>
                {/* {type === "HELLO_STUDIO" ? (
                    <Link
                        href={`/pages/user/property-details/${property.id}`}
                        className="bg-[#0C1660] rounded-xl text-center flex items-center justify-center text-white font-medium text-sm h-11"
                        type="button"
                    >
                        {t("new_reserv")}
                    </Link>
                ) : ( */}
                    <Link
                        href={"/pages/user/history/payments"}
                        // onClick={() => setIsModalOpen(true)}
                        className="bg-[#0C1660] rounded-xl text-center text-white font-medium text-lg py-2"
                        // type="button"
                    >
                        {t("next_payments")}
                    </Link>
                {/* )} */}
            </section>

            {/* Modal para el pago */}
            <RentPaymentModal
                totalAmount={room.price}
                leaseOrder={room.leaseOrder}
                data={room}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handlePayment={handlePayment}
                rentPayments={rentPayments}
            />
        </div>
    );
}
