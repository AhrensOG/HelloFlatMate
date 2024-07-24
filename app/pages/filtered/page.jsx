"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import PropertyCard from "@/app/components/property/PropertyCard";
import SearchBarFiltered from "@/app/components/search_bar/SearchBarFiltered";

export default function Filtered() {
  return (
    <div>
      <header className="px-2">
        <NavBar />
      </header>
      <main className="mt-3">
        <SearchBarFiltered value={"Habitacion"} />
        <div className="flex flex-col m-3 mt-7 gap-7">
          <PropertyCard type={"Hello Room"} offer={15} price={140} />
          <PropertyCard type={"Hello Landlord"} offer={15} price={180} />
          <PropertyCard type={"Hello Studio"} offer={0} price={140} />
          <PropertyCard type={"Hello Coliving"} offer={0} price={140} />
        </div>
      </main>
    </div>
  );
}
