"use client";

import DocumentsPanel from "@/app/components/admin/documents_panel/DocumentsPanel";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function DocumentsPanelPage() {
  return (
    <>
      <headear>
        <NavBar />
      </headear>
      <DocumentsPanel />
    </>
  );
}
