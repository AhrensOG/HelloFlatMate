import Image from "next/image";
import TitleOwnerPanel from "../TitleOwnerPanel";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PaymentDetails({ img, action }) {
    const t = useTranslations("owner_panel.payment");
    return (
        <motion.aside
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: "100%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-col items-center justify-center gap-6 abosolute inset-0 z-50 bg-white"
        >
            <TitleOwnerPanel title={t("title")} action={action} />
            <article className="relative w-72 h-80 m-4 rounded-md shadow-[0px 4px 4px 0px #00000040]">
                <Image
                    className="rounded-md"
                    src={img}
                    alt="Ilustracion de comprobante de pago"
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                />
            </article>
        </motion.aside>
    );
}
