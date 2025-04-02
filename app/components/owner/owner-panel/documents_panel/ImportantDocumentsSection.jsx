import { useTranslations } from "next-intl";
import TitleOwnerPanel from "../TitleOwnerPanel";
import DocumentItem from "./DocumentItem";
import { motion } from "framer-motion";
export default function ImportantDocumentsSection() {
    const t = useTranslations("owner_panel.documents_panel");
    return (
        <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: "-100%" }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.8 }}
            className="w-full"
        >
            <TitleOwnerPanel title={"Historial de pagos"} />
            <section className="flex flex-col py-6 gap-3 w-full">
                <DocumentItem title={t("t_1")} date={"28 Oct 2023"} type={"pdf"} />
                <DocumentItem title={t("t_1")} date={"28 Oct 2023"} type={"pdf"} />
                <DocumentItem title={t("t_1")} date={"28 Oct 2023"} type={"pdf"} />
                <DocumentItem title={t("t_1")} date={"28 Oct 2023"} type={"pdf"} />
            </section>
        </motion.div>
    );
}
