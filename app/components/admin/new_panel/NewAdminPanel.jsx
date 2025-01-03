"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AdminSideBar from "./sidebar/AdminSideBar";
import PreReservationsPanel from "./pre_reservations/PreReservationsPanel";

const NewAdminPanel = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "propiedades";

  // Función para renderizar la sección según la URL
  const renderSection = () => {
    switch (section) {
      case "propiedades":
        return <PreReservationsPanel />;
      default:
        return <PreReservationsPanel leaseOrders={data.leaseOrders} />;
    }
  };

  return (
    <main className="flex h-screen">
      <AdminSideBar
        onSelect={(name) => router.push(`?section=${name.toLowerCase()}`)}
      />
      <div className="grow">{renderSection()}</div>
    </main>
  );
};

export default NewAdminPanel;
