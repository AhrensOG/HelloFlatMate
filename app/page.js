import NavBar from "./components/nav_bar/NavBar";

export default function Home() {
  return <div className="flex justify-between w-full h-[7vh] px-1.5 pt-1.5">
    <header className="w-full flex justify-between items-center">
      <NavBar />
    </header>
  </div>
  // return <main className=""><h1>Hello, World!</h1></main>;
}
