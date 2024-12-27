"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import OwnerTenants from "@/app/components/owner/owner_tenants/OwnerTenants";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const MyTenantsPage = () => {
  const { state, dispatch } = useContext(Context);
  const [tenantsData, setTenantsData] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      if (state.user?.id) {
        try {
          const res = await axios.get("/api/user?id=" + state.user?.id);
        } catch (error) {
          console.error("Error al obtener los inquilinos:", error);
        }
      }
    };

    fetchTenants();
  }, [state.user]);

  if (!tenantsData || tenantsData.length <= 0) {
    return (
      <div className="h-screen flex flex-col w-full">
        <header>
          <NavBar client={true} admin={false} owner={false} />
        </header>
        <div className="flex items-center justify-center grow">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header>
        <NavBar client={false} admin={false} owner={true} />
      </header>
      <main className="grow w-full"></main>
    </div>
  );
};

export default MyTenantsPage;
