import { useState } from "react";
import TitleAdminPanel from "../../admin/shared/TitleAdminPanel";
import PaymentCard from "../../admin/payments_history/PaymentCard";
import EyeButton from "../../admin/documents_panel/EyeButton";
import PaymentDetails from "../../admin/payments_history/PaymentDetails";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";

export default function PaymentHistory() {
  const [showDetails, setShowDetails] = useState(false);
  const [detailsInfo, setDetailsInfo] = useState();

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <main
      className={`${plus_jakarta.className} relative flex flex-col justify-center items-center p-2 gap-6 mt-3`}
    >
      {!showDetails && (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: "-100%" }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <TitleAdminPanel title={"Historial de pagos"} />
          <section className="flex flex-col py-6 gap-3 w-full">
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
            />
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
            />
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
            />
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
            />
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
            />
          </section>
        </motion.div>
      )}
      {showDetails && (
        <PaymentDetails img={detailsInfo} action={handleShowDetails} />
      )}
    </main>
  );
}
