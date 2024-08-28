"use client";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";
import TasksHistory from "@/app/components/workerPanel/history_task/TasksHistory";

export default function TasksHistoryPage() {
  return (
    <BaseWorkerPanelTemplate children={<TasksHistory />} section={"tareas"} />
  );
}
