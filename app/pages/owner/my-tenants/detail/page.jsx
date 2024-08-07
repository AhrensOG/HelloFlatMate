"use client"
import NavBar from "@/app/components/nav_bar/NavBar";
import OwnerTenantDetail from "@/app/components/owner/owner_tenant_detail/OwnerTenantDetail";
import React from "react";

const MyTenantDetailPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex-1">
        <OwnerTenantDetail />
      </main>
    </div>
  );
};

export default MyTenantDetailPage;
