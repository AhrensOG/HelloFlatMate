"use client";
import TaskDetails from "@/app/components/workerPanel/tasks/TaskDetails";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";

export default function TaskDetailsPage() {
  return (
    <BaseWorkerPanelTemplate children={<TaskDetails />} section={"tareas"} />
  );
}
