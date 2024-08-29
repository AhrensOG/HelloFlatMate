"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import Supplies from "@/app/components/user/supplies/Supplies";

export default function SuppliesPage() {
  return (
    <>
      <header className="px-2">
        <NavBar />
      </header>
      <Supplies />
    </>
  );
}
