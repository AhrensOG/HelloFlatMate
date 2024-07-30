"use client";
import Services from "@/app/components/history/services/Services";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function ServicesPage() {
  return (
    <>
      <header className="px-2">
        <NavBar />
      </header>
      <Services />
    </>
  );
}
