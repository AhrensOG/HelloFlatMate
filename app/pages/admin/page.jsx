"use client";
import DocumentsPanel from "@/app/components/admin/documents_panel/DocumentsPanel";
import PaymentHistoryPanel from "@/app/components/admin/payments_history/PaymentHistoryPanel";
import AdminProfile from "@/app/components/admin/profile/AdminProfile";
import PropertiesPanel from "@/app/components/admin/properties_panel/PropertiesPanel";
import SuppliesPanel from "@/app/components/admin/supplies_panel/SuppliesPanel";
import UsersPanel from "@/app/components/admin/users_panel/UsersPanel";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function AdminProfilePage() {
  return (
    <>
      <headear className="">
        <NavBar />
      </headear>
      <PaymentHistoryPanel />
    </>
  );
}
