"use client";
import TasksHistory from "@/app/components/user_service/history_task/TasksHistory";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";

export default function TasksHistoryPage() {
  return (
    <BaseWorkerPanelTemplate children={<TasksHistory />} section={"tareas"} />
  );
}
