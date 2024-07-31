"use client";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";
import ServiceProfile from "@/app/components/workerPanel/profile/ServiceProfile";

export default function UserServiceProfile() {
  return (
    <BaseWorkerPanelTemplate children={<ServiceProfile />} section={"home"} />
  );
}
