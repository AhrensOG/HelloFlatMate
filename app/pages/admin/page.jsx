"use client";
import DashBoardAdmin from "@/app/components/admin/dashboard/DashBoardAdmin";
import NavBar from "@/app/components/nav_bar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminProfilePage() {
  const [propertiesSimple, setPropertiesSimple] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/admin/property?simple=true");
      console.log(res.data);
      setPropertiesSimple(res.data);
    };
    fetchData();
  }, []);
  if (propertiesSimple.length <= 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <headear className="">
        <NavBar client={false} admin={true} owner={false} />
      </headear>
      <DashBoardAdmin data={propertiesSimple} />
    </>
  );
}
