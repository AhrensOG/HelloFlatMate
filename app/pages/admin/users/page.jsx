"use client";

import UsersPanel from "@/app/components/admin/users_panel/UsersPanel";
import NavBar from "@/app/components/nav_bar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UsersPanelPage() {
  const [users, setUsers] = useState(null);

  const fetchData = async () => {
    try {
      const data = await axios.get("/api/admin/user");
      if (data) {
        setUsers([
          ...data.data.owners,
          ...data.data.clients,
          ...data.data.admins,
        ]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!users) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <headear>
        <NavBar client={false} admin={true} owner={false} />
      </headear>
      <UsersPanel data={users} reload={fetchData} />
    </>
  );
}
