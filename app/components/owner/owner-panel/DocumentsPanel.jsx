import { useState } from "react";
import TitleAdminPanel from "../../admin/shared/TitleAdminPanel";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import DocumentItem from "./documents_panel/DocumentItem";
import ImportantDocumentsSection from "./documents_panel/ImportantDocumentsSection";
import ExpiredContractsSection from "./documents_panel/ExpiredContractsSection";

export default function DocumentsPanel() {
  return (
    <main
      className={`${plus_jakarta.className} relative flex flex-col justify-center items-center p-2 gap-6 mt-3`}
    >
      <ImportantDocumentsSection />
      <ExpiredContractsSection />
    </main>
  );
}
