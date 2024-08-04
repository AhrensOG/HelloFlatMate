"use client";
import BarGraphic from "@/app/components/admin/graphics/BarGraphic";
import PieGraphic from "@/app/components/admin/graphics/PieGraphic";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function AdminProfilePage() {
  return (
    <>
      <headear className="">
        <NavBar />
      </headear>
      <PieGraphic />
      <BarGraphic />
    </>
  );
}
