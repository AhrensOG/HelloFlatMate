import { useState, useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function MyBedroomCard({
    action,
    type,
    location,
    amenities,
    price,
    dueDate, // Objeto con startDate y endDate
    images,
    leaseOrder,
}) {
    const t = useTranslations("user_panel.bedrooms_list.card");
    const [nextDueDate, setNextDueDate] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false); // Estado para manejar la visibilidad del tooltip

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

        if (dueDate?.startDate && dueDate?.endDate) {
            const calculatedNextDueDate = calculateNextDueDate(dueDate.startDate, dueDate.endDate);
            setNextDueDate(calculatedNextDueDate);
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

    const contratStatus = (bgOk, bgWarning, bgFinish, dueDate) => {
        const today = new Date();
        const endDate = new Date(dueDate.endDate);

        const differenceTime = endDate - today;
        const differenceDays = differenceTime / (1000 * 3600 * 24);

        return differenceDays <= 15 && differenceDays > 0
            ? { bg: bgWarning, text: "text-red-800 font-bold" }
            : differenceDays <= 0
            ? { bg: bgFinish + " text-black", text: "text-red-800" }
            : { bg: bgOk + " text-white", text: "text-black" };
    };

    // Obtener las clases de estado
    const statusClasses = contratStatus("bg-[#0E155F]", "bg-amber-400", "bg-[#FFD7D1]", dueDate);

    return (
        <article className="flex gap-1 items-stretch h-48" onClick={action}>
            <div className="relative h-full min-w-[7.25rem] w-[7.25rem] rounded-2xl">
                <Image
                    className="rounded-2xl"
                    alt="Ilustracion de un cuarto"
                    src={images}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                />
            </div>
            <div className="flex flex-col py-2 pl-1 gap-1.5 flex-1 h-full justify-between relative">
                <p
                    className={`text-sm font-medium p-1 text-center rounded-3xl w-28 ${statusClasses.bg} cursor-default`}
                    onMouseEnter={() => statusClasses.text === "text-red-800 font-bold" && setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    {type.replace(/_/g, "").toLowerCase()}
                </p>
                {showTooltip && (
                    <div className="absolute right-[5rem] top-[-2.5rem] transform mt-1 w-40 p-2 bg-black text-white text-sm rounded-md shadow-lg z-[1000]">
                        Está pronto a vencer
                    </div>
                )}
                <div className="flex items-top">
                    <span className="h-5 w-5">
                        <MapPinIcon />
                    </span>
                    <h3 className="text-xs text-[#000000E5] align-text-bottom">
                        {`${location.street}, ${location.postalCode ? location.postalCode : ""} ${location.city}`}
                    </h3>
                </div>
                <p className="text-[10px] font-normal text-[#828282]">{amenities.slice(0, 3).join(" - ")}</p>
                <p className="font-light text-sm flex justify-between">
                    {type === "HELLO_STUDIO" ? t("finish") : t("expiration")}
                    <span className={statusClasses.text}>
                        {type === "HELLO_STUDIO" ? formatDate(new Date(dueDate.endDate)) : nextDueDate ? formatDate(nextDueDate) : t("not_expired")}
                    </span>
                </p>
                <p className="font-light text-sm flex justify-between">
                    {type === "HELLO_STUDIO" ? "Total pagado" : "Cantidad a pagar"}
                    <span className="font-medium text-sm">{type === "HELLO_STUDIO" ? `$${leaseOrder.price || 0}` : `$${price}`}</span>
                </p>
            </div>
        </article>
    );
}
