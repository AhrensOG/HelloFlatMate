import DocumentItem from "./DocumentItem";
import { motion } from "framer-motion";

export default function ExpiredContractsSection() {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: "-100%" }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <section className="flex flex-col gap-3 w-full">
        <h2 className="font-semibold text-xl text-[#191B23] grow m-auto">
          Contratos Vencidos
        </h2>
        <DocumentItem
          title={"Contrato Jorgelina"}
          type={"pdf"}
          date={"28 Oct 2023"}
        />
        <DocumentItem
          title={"Contrato Jorgelina"}
          type={"pdf"}
          date={"28 Oct 2023"}
        />
        <DocumentItem
          title={"Contrato Jorgelina"}
          type={"pdf"}
          date={"28 Oct 2023"}
        />
        <DocumentItem
          title={"Contrato Jorgelina"}
          type={"pdf"}
          date={"28 Oct 2023"}
        />
      </section>
    </motion.div>
  );
}
