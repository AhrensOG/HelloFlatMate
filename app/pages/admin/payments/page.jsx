"use client";
import PaymentHistoryPanel from "@/app/components/admin/payments_history/PaymentHistoryPanel";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function PaymentsPanelPage() {
  return (
    <>
      <headear>
        <NavBar />
      </headear>
      <PaymentHistoryPanel />
    </>
  );
}
