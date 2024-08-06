"use client";

import SuppliesPanel from "@/app/components/admin/supplies_panel/SuppliesPanel";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function SuppliesPanelPage() {
  return (
    <>
      <headear>
        <NavBar />
      </headear>
      <SuppliesPanel />
    </>
  );
}
