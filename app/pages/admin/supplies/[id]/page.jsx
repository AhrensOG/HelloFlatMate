"use client";

import SuppliesPanel from "@/app/components/admin/supplies_panel/SuppliesPanel";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function SuppliesPanelPage({ params }) {
  const { id } = params;
  return (
    <>
      <header>
        <NavBar client={false} admin={true} owner={false} />
      </header>
      <SuppliesPanel propertyId={id} />
    </>
  );
}
