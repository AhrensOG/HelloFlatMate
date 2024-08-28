"use client";

import AdminProfile from "@/app/components/admin/profile/AdminProfile";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function AdminProfilePage() {
  return (
    <>
      <headear>
        <NavBar client={false} admin={true} owner={false} />
      </headear>
      <AdminProfile />
    </>
  );
}
