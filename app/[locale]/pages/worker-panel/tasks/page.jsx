"use client";
import TasksSection from "@/app/components/workerPanel/tasks/TasksSection";
import { Suspense } from "react";

export default function TasksPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="relative">
        <TasksSection section={"tareas"} />;
      </div>
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
