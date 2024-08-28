"use client";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";
import WorkerHome from "@/app/components/workerPanel/home/WorkerHome";
import React from "react";

const WorkerPanelPage = () => {
  return <BaseWorkerPanelTemplate children={<WorkerHome />} section={"home"} />;
};

export default WorkerPanelPage;
