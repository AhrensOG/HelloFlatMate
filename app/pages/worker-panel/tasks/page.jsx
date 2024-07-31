"use client";
import TasksSection from "@/app/components/user_service/tasks/TasksSection";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";

export default function TasksPage() {
  return (
    <BaseWorkerPanelTemplate children={<TasksSection />} section={"tareas"} />
  );
}
