"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AdminSideBar from "./sidebar/AdminSideBar";
import PreReservationsPanel from "./pre_reservations/PreReservationsPanel";

const NewAdminPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "propiedades";

  // Función para renderizar la sección según la URL
  const renderSection = () => {
    switch (section) {
      case "propiedades":
        return <PreReservationsPanel />;
      default:
        return <PreReservationsPanel />;
    }
  };

  return (
    <main className="flex">
      <AdminSideBar
        onSelect={(name) => router.push(`?section=${name.toLowerCase()}`)}
      />
      <div className="grow p-4">{renderSection()}</div>
    </main>
  );
};

export default NewAdminPanel;
