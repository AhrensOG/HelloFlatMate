"use client";

import UsersPanel from "@/app/components/admin/users_panel/UsersPanel";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function UsersPanelPage() {
  return (
    <>
      <headear>
        <NavBar />
      </headear>
      <UsersPanel />
    </>
  );
}
