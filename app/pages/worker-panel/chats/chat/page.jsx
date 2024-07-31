"use client";
import UserSerivceNavBar from "@/app/components/user_service/nav_bar/UserServiceNavBar";
import TitleSection from "@/app/components/user_service/TitleSection";
import BaseWorkerPanelTemplate from "@/app/components/workerPanel/BaseWorkerPanelTemplate";
import WorkerChat from "@/app/components/workerPanel/chats/WorkerChat";

export default function ChatPage() {
  return (
    <div className="flex flex-col">
      <div className="px-2">
        <UserSerivceNavBar />
      </div>
      <TitleSection title={"Chat"} />
      <WorkerChat />
    </div>
  );
}
