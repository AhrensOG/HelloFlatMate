"use client"
import GuestHome from "./components/guest-home/GuestHome";
import FeaturedSection from "./components/home/FeaturedSection";
import Hero from "./components/home/Hero";
import PromotionSection from "./components/home/PromotionSection";
import NavBar from "./components/nav_bar/NavBar";
import SearchBar from "./components/search_bar/SearchBar";

export default function Home() {
  return (
    <div>
      <header className="px-2">
        <NavBar />
      </header>
      <main>
        <Hero />
        <div className="w-full pt-4">
          <SearchBar value={"Buscar..."} />
        </div>
        <FeaturedSection />
        <PromotionSection />
      </main>
    </div>
  );
}
