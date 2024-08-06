import NavBar from "@/app/components/nav_bar/NavBar";
import OwnerTenants from "@/app/components/owner/owner_tenants/OwnerTenants";
import React from "react";

const MyTenantsPage = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <OwnerTenants />
    </>
  );
};

export default MyTenantsPage;
