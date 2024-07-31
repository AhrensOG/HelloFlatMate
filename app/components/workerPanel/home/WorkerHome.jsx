import { plus_jakarta } from "@/font";
import SideModal from "./SideModal";
import { useState } from "react";
import SearchBar from "./SearchBar";
import TodayTaskSection from "./TodayTaskSection";
import NewsItem from "./NewsItem";

export default function WorkerHome() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <main
      className={`${plus_jakarta.className} relative flex flex-col gap-4 m-3`}
    >
      <SearchBar />
      <TodayTaskSection />
      <section className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl text-[#121417]">Noticias</h2>
        <NewsItem
          title={"Nuevas normas disponibles"}
          action={handleShowModal}
        />
      </section>
      {showModal && (
        <SideModal
          children={<NewsItem title={"Nuevas normas disponibles"} />}
          action={handleShowModal}
        />
      )}
    </main>
  );
}
