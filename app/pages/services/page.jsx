"use client";
import Services from "@/app/components/history/services/Services";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";

export default function ServicesPage() {
  return <BaseWorkerPanelTemplate children={<Services />} section={""} />;
}
