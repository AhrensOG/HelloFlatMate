"use client";

import PropertiesPanel from "@/app/components/admin/properties_panel/PropertiesPanel";
import NavBar from "@/app/components/nav_bar/NavBar";
import { getAllProperties } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function PropertiesPanelPage() {
  const { state, dispatch } = useContext(Context);
  const [propertiesSimple, setPropertiesSimple] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/property?ownerId=" + "1");
      setPropertiesSimple(res.data);
    };
    
      fetchData();
  }, []);

  return (
    <>
    {propertiesSimple.length > 0 && (
      <>
      <header>
        <NavBar client={false} admin={false} owner={true} />
      </header>
      <PropertiesPanel data={{properties:propertiesSimple}} role={"OWNER"} />
    </>
    )}</>
  );
}
