"use client";

import AdminProfile from "@/app/components/admin/profile/AdminProfile";
import NavBar from "@/app/components/nav_bar/NavBar";
import { Context } from "@/app/context/GlobalContext";
import { useContext } from "react";

export default function AdminProfilePage() {
  const { state } = useContext(Context);

  return (
    <>
      <headear>
        <NavBar client={false} admin={true} owner={false} />
      </headear>
      <AdminProfile
        image={state?.user?.profilePicture || "/profile/profile.jfif"}
        name={state?.user?.name || "Usuario"}
        lastName={state?.user?.lastName || "helloflatmate"}
        email={state?.user?.email || "email"}
      />
    </>
  );
}
