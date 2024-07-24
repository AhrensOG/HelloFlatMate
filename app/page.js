"use client";
import { useContext } from "react";
import GuestHome from "./components/guest-home/GuestHome";
import FeaturedSection from "./components/home/FeaturedSection";
import Hero from "./components/home/Hero";
import PromotionSection from "./components/home/PromotionSection";
import NavBar from "./components/nav_bar/NavBar";
import SearchBar from "./components/search_bar/SearchBar";
import { Context } from "./context/GlobalContext";

export default function Home() {
  const { state } = useContext(Context);
  if (!state.user) {
    return <GuestHome />;
  } else {
    return (
      <div>
        <header className="px-2">
          <NavBar />
        </header>
        <main>
          <Hero />
          <div className="w-full pt-4">
            <SearchBar />
          </div>
          <FeaturedSection />
          <PromotionSection />
        </main>
      </div>
    );
  }
}
