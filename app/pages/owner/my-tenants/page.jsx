import NavBar from "@/app/components/nav_bar/NavBar";
import OwnerTenants from "@/app/components/owner/owner_tenants/OwnerTenants";
import React from "react";

const MyTenantsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <NavBar client={false} admin={false} owner={true} />
      </header>
      <main className="flex-1">
        <OwnerTenants />
      </main>
    </div>
  );
};

export default MyTenantsPage;
