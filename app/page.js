"use client";
import { useContext, useEffect, useState } from "react";
import GuestHome from "./components/guest-home/GuestHome";
import FeaturedSection from "./components/home/FeaturedSection";
import Hero from "./components/home/Hero";
import PromotionSection from "./components/home/PromotionSection";
import NavBar from "./components/nav_bar/NavBar";
import SearchBar from "./components/search_bar/SearchBar";
import { Context } from "./context/GlobalContext";
import { toast } from "sonner";

export default function Home() {
  const { state } = useContext(Context);
  const [home, setHome] = useState(false);
  useEffect(() => {
    if (state.user) {
      setHome(true);
    }
  }, [state.user]);

  if (!home) {
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
