"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import Supplies from "@/app/components/user/supplies/Supplies";
import { Context } from "@/app/context/GlobalContext";
import { useContext, useEffect, useState } from "react";

export default function SuppliesPage({ params }) {
  const { id } = params;
  const { state } = useContext(Context);
  const [supplies, setSupplies] = useState(state?.user?.supplies || null);

  useEffect(() => {
    if (!supplies) {
      setSupplies(state?.user?.supplies);
    }
    if (supplies) {
      const result = supplies.filter((supply) => supply.propertyId == id);
      setSupplies(result);
    }
  }, [state?.user]);

  if (!supplies) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <header className="px-2">
        <NavBar />
      </header>
      <Supplies
        data={supplies}
        user={state?.user}
      />
    </>
  );
}
