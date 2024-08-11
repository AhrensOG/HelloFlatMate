"use client";

import PropertiesPanel from "@/app/components/admin/properties_panel/PropertiesPanel";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function PropertiesPanelPage() {
  return (
    <>
      <headear>
        <NavBar client={false} admin={true} owner={false} />
      </headear>
      <PropertiesPanel />
    </>
  );
}
