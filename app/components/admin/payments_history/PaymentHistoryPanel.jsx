import TitleAdminPanel from "../shared/TitleAdminPanel";
 
import PaymentCard from "./PaymentCard";
import PaymentDetails from "./PaymentDetails";
import EyeButton from "../documents_panel/EyeButton";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PaymentHistoryPanel() {
  const [showDetails, setShowDetails] = useState(false);
  const [detailsInfo, setDetailsInfo] = useState();

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <main
      className={`  relative flex flex-col justify-center items-center p-2 gap-6 mt-3`}
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
              button={
                <EyeButton
                  action={() => {
                    setDetailsInfo("/admin/ejemplo-ticket.png");
                    handleShowDetails();
                  }}
                />
              }
            />
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
              button={
                <EyeButton
                  action={() => {
                    setDetailsInfo("/admin/ejemplo-ticket.png");
                    handleShowDetails();
                  }}
                />
              }
            />
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
              button={
                <EyeButton
                  action={() => {
                    setDetailsInfo("/admin/ejemplo-ticket.png");
                    handleShowDetails();
                  }}
                />
              }
            />
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
              button={
                <EyeButton
                  action={() => {
                    setDetailsInfo("/admin/ejemplo-ticket.png");
                    handleShowDetails();
                  }}
                />
              }
            />
            <PaymentCard
              name={"Villa eden"}
              amount={"400"}
              date={"Abril 9, 2024"}
              button={
                <EyeButton
                  action={() => {
                    setDetailsInfo("/admin/ejemplo-ticket.png");
                    handleShowDetails();
                  }}
                />
              }
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
