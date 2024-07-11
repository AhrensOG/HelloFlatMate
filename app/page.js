import NavBar from "./components/nav_bar/NavBar";

export default function Home() {
  return <div className="flex justify-between w-[342px] h-[41px] m-3">
    <header>
      <NavBar />
    </header>
  </div>
  // return <main className=""><h1>Hello, World!</h1></main>;
}
