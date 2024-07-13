import SearchBar from "./components/search_bar/SearchBar";
import NavBar from "./components/nav_bar/NavBar";

export default function Home() {
  return (
    <div className="flex justify-between w-full h-[7vh] px-1.5 pt-1.5">
    <header className="w-full flex justify-between items-center">
      <NavBar />
    </header>
    <main>
      <SearchBar />
    </main>
    </div>
  )
}
