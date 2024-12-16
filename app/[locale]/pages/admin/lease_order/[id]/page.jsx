"use client";

import LeaseOrderPanel from "@/app/components/admin/lease_order_panel/LeaseOrderPanel";
import NavBar from "@/app/components/nav_bar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LeaseOrderPage(params) {
  const [data, setData] = useState(null);
  const id = params.params.id;

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const data = await axios.get(`/api/admin/property/lease_order_request?id=${id}`);
          setData(data.data.property);
        } catch (error) {
          console.error("Error fetching property data:", error);
        }
      };

      fetchData();
    }
  }, [id]);
  if (!data) {
    return (
      <div className="h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <div className="flex items-center justify-center grow">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <header>
        <NavBar />
      </header>
      <LeaseOrderPanel data={data} />
    </>
  );
}
