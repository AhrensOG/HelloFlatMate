import FeaturedSection from "./components/home/FeaturedSection";
import Hero from "./components/home/Hero";
import PromotionSection from "./components/home/PromotionSection";
import NavBar from "./components/nav_bar/NavBar";

export default function Home() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Hero />
        <FeaturedSection />
        <PromotionSection />
      </main>
    </div>
  );
  // return <main className=""><h1>Hello, World!</h1></main>;
}
