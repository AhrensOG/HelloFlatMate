"use client";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";
import WorkerChats from "@/app/components/workerPanel/chats/WorkerChats";
import { Suspense } from "react";

export default function WorkerChatsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <BaseWorkerPanelTemplate
        children={<WorkerChats />}
        section={"mensajes"}
      />
    </Suspense>
  );
}

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="loader"></div>{" "}
      {/* Puedes crear una animación CSS para el loader */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
