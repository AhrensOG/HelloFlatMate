import { plus_jakarta } from "@/font";
import SupplieAdminCard from "./SupplieAdminCard";
import RequestPayment from "./reques_payment/RequestPayment";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PreviewPayment from "./reques_payment/PreviewPayment";
import FinishModal from "./reques_payment/FinishModal";

export default function SuppliesPanel() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [continueModal, setContinueModal] = useState(0);

  const handleShowRequestModal = () => {
    setShowRequestModal(!showRequestModal);
  };

  const handleCloseModal = () => {
    setShowRequestModal(false);
    setContinueModal(0);
  };

  return (
    <AnimatePresence mode="wait">
      <main
        className={`${plus_jakarta.className} relative flex flex-col justify-center items-center p-2`}
      >
        <section className="flex flex-col p-2 gap-3">
          <SupplieAdminCard
            status={"pending"}
            name={"Agua"}
            image={"/supplies/whater.svg"}
            date={"Abril 9, 2024"}
            users={"Tamara Garcia / Astur Ramos"}
            price={"7,9"}
            action={handleShowRequestModal}
          />
          <SupplieAdminCard
            status={"aprobed"}
            name={"Gas"}
            image={"/supplies/gas.svg"}
            date={"Abril 9, 2024"}
            users={"Tamara Garcia / Astur Ramos"}
            price={"7,9"}
            action={handleShowRequestModal}
          />
          <SupplieAdminCard
            status={"in_process"}
            name={"Internet"}
            image={"/supplies/wifi.svg"}
            date={"Abril 9, 2024"}
            users={"Tamara Garcia / Astur Ramos"}
            price={"7,9"}
            action={handleShowRequestModal}
          />
          <SupplieAdminCard
            status={"pending"}
            name={"Tasas"}
            image={"/supplies/tax.svg"}
            date={"Abril 9, 2024"}
            users={"Tamara Garcia / Astur Ramos"}
            price={"7,9"}
            action={handleShowRequestModal}
          />
        </section>
        {showRequestModal && continueModal === 0 ? (
          <RequestPayment
            next={() => {
              setContinueModal(continueModal + 1);
            }}
            back={handleCloseModal}
          />
        ) : showRequestModal && continueModal === 1 ? (
          <PreviewPayment
            next={() => {
              setContinueModal(continueModal + 1);
            }}
            back={() => {
              setContinueModal(continueModal - 1);
            }}
          />
        ) : showRequestModal && continueModal === 2 ? (
          <FinishModal action={handleCloseModal} />
        ) : null}
      </main>
    </AnimatePresence>
  );
}
