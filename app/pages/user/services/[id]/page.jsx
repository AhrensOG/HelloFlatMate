"use client";
import Services from "@/app/components/user/history/services/Services";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function ServicesPage({ params }) {
  const { id } = params;
  return (
    <>
      <header className="px-2">
        <NavBar />
      </header>
      <Services id={id} />
    </>
  );
}
