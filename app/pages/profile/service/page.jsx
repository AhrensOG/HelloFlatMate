"use client";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";
import WorkerProfile from "@/app/components/workerPanel/profile/WorkerProfile";

export default function UserServiceProfile() {
  return (
    <BaseWorkerPanelTemplate children={<WorkerProfile />} section={"home"} />
  );
}