"use client";
import UserSerivceNavBar from "@/app/components/workerPanel/nav_bar/UserServiceNavBar";
import TitleSection from "@/app/components/workerPanel/TitleSection";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";
import WorkerChat from "@/app/components/workerPanel/chats/WorkerChat";
import { plus_jakarta } from "@/font";

export default function ChatPage() {
  return (
    <div className={`${plus_jakarta.className} flex flex-col`}>
      <div className="px-2">
        <UserSerivceNavBar />
      </div>
      <TitleSection title={"Chat"} />
      <WorkerChat />
    </div>
  );
}
