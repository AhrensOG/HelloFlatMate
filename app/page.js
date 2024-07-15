import FeaturedSection from "./components/home/FeaturedSection";
import Hero from "./components/home/Hero";
import PromotionSection from "./components/home/PromotionSection";
import SearchBar from "./components/search_bar/SearchBar";
import NavBar from "./components/nav_bar/NavBar";

export default function Home() {
  return (
    <div>
      <header>
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
