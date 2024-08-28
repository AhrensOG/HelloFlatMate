"use client";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";
import WorkerChats from "@/app/components/workerPanel/chats/WorkerChats";

export default function WorkerChatsPage() {
  return (
    <BaseWorkerPanelTemplate children={<WorkerChats />} section={"mensajes"} />
  );
}
