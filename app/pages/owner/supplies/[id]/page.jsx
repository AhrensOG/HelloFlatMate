"use client";

import SuppliesPanel from "@/app/components/admin/supplies_panel/SuppliesPanel";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function SuppliesPanelPage({ params }) {
  const { id } = params;
  return (
    <>
      <headear>
        <NavBar client={false} admin={true} owner={false} />
      </headear>
      <SuppliesPanel propertyId={id} />
    </>
  );
}
