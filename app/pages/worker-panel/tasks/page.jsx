"use client";
import TasksSection from "@/app/components/workerPanel/tasks/TasksSection";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";

export default function TasksPage() {
  return (
    <BaseWorkerPanelTemplate children={<TasksSection />} section={"tareas"} />
  );
}
